import { Injectable } from '@angular/core';
import { MsgbusService } from 'eediom-sdk';

@Injectable({
  providedIn: 'root',
})
export class QueryService {
  constructor(private msgbus: MsgbusService) {}

  queryIds: number[] = [];

  async query(queryString: string, limit: number, offset: number): Promise<QueryResult> {
    const msg = await this.createQuery(queryString);
    console.log('TCL: QueryService -> constructor -> queryString', queryString);
    console.log('TCL: QueryService -> constructor -> params', msg);
    const id = msg['params']['id'];
    this.queryIds.push(id);
    await this.startQuery(id);
    await this.writeQueryHistory(queryString);

    return await this.getResult(id, offset, limit);
  }

  createQuery(queryString: string): Promise<any> {
    return this.msgbus.call('org.araqne.logdb.msgbus.LogQueryPlugin.createQuery', {
      query: queryString,
      source: 'adhoc',
      use_trap: true,
    });
  }

  writeQueryHistory(queryString: string): Promise<any> {
    return this.msgbus.call('com.logpresso.sonar.msgbus.QueryHistoryPlugin.writeQueryHistory', { query: queryString });
  }

  startQuery(id: number): Promise<any> {
    return this.msgbus.call('org.araqne.logdb.msgbus.LogQueryPlugin.startQuery', { id }).then((resp) => {
      return resp;
    });
  }

  async getResult(id: number, offset: number, limit: number, lazy: boolean = false, schema: string = null): Promise<QueryResult> {
    const res = await this.msgbus.call('org.araqne.logdb.msgbus.LogQueryPlugin.getResult', {
      id,
      offset,
      limit,
      return_type: true,
      schema,
    });

    const result = new QueryResult();
    result.count = res.params.count;
    result.fieldOrder = res.params.field_order;
    result.records = res.params.result;
    result.fieldTypes = QueryResult.parseFieldTypes(res.params.field_types);

    if (result.count > 0 && (result.records || []).length === 0) {
      await this.delay();
      return await this.getResult(id, offset, limit);
    } else {
      return result;
    }
  }

  private delay(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 500);
    });
  }
}
export enum FieldType {
  OBJECT = 'object',
  STRING = 'string',
  INT = 'int',
  LONG = 'long',
  DATE = 'date',
  SHORT = 'short',
  BOOL = 'bool',
  IPV4 = 'ipv4',
  MAP = 'map',
  DOUBLE = 'double',
  LIST = 'list',
  BLOB = 'blob',
  FLOAT = 'float',
  IPV6 = 'ipv6',
  IP = 'ip',
}
export class QueryResult {
  records: any[];
  count: number;
  fieldOrder: string[];
  fieldTypes: FieldTypes[];

  static parseFieldTypes(fieldTypes: any) {
    if (!fieldTypes) return;

    const types = Object.keys(fieldTypes);
    return types.map((key: any) => ({
      key,
      value: fieldTypes[key],
    }));
  }
}

export interface FieldTypes {
  key: string;
  value: FieldType;
}

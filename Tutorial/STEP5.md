# 예제 쿼리의 데이터를 Chart를 통해서 보여주기

## dashboard.module에 ChartModule 추가

```typescript
import { QueryService, GridModule, ChartModule } from 'eediom-sdk'; // 추가한 부분
import { DashboardComponent } from './dashboard.component';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    BrowserModule,
    GridModule,
    ChartModule
  ],
  providers: [QueryService],
  exports: [DashboardComponent]
})
export class DashboardModule{}
```

## template에 edm-chart를 가져오기

```html
<edm-chart #chartComponent (chartRendered)="onRender()"></edm-chart> <!-- viewChild로 chart 컴포넌트에 직접 접근하기 위해서-->
```

## queryResult를 기준으로 chart를 보여주기


```typescript
import { Component, ViewChild, OnInit } from '@angular/core';
import { QueryService, GridData, ChartTypes, Chart, ChartComponent } from 'eediom-sdk';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less'],
})
export class DashboardComponent implements OnInit {
    @ViewChild('chartComponent', { static: true }) chartComponent: ChartComponent; // template에 사용중인 컴포넌트에 직접 접근 하기 위해서

    query: string = 'table sys_cpu_logs';
    gridData: GirdData;
    pageSize: number;
    queryResult: QueryResult;

    chart: Chart; // 차트를 eediom-sdk에서 추가
    

    constructor(private queryService: QueryService){}

    ngOnInit() {
        this.queryService.query(this.query, (queryId, subscribeData) => {
            if (subscribeData.type === SubscribeTypes.Eof) { // 해당 쿼리가 종료 되면
                this.queryService.getResult(queryId, 0, 100).then((queryResult) => {
                    console.log(queryResult); // queryId를 기준으로 쿼리의 결과 값을 가져옵니다.
                    this.queryResult = queryResult;

                    this.gridData = new GridData({
                        records: this.queryResult.records,
                    });
                    
                    // GridData로 보내주어 컬럼과 로우를 만듭니다.
                })
            }
        })

        this.chart = new Chart(ChartTypes.Bar, 
            new BarChartConfigs(
                new Field('_time', 'date', '날짜'), 
                // queryResult에 있는 records에 _time을 종속 변수로 사용하기 위해,
                // _time은 date 타입이기 때문에,
                // _time이 아니라 '날짜'로 보여주기 위해서

                [new Field('users', 'long')] // users를 차트에 표현하기 위해서
                false // 종속 변수 자동 추가 기능을 사용하지 않기 위해서
            )
        );

        this.chartComponent.render(null, this.chart); // 컴포넌트에서 렌더링 하기 위해서 별도의 selector는 지정하지 않음
    }

    onRender(): void {
        this.chartComponent.update(this.chart, this.queryResult.records);
    }
}
```
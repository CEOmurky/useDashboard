# 쿼리 서비스를 사용해서 dashboard.component에서 query보내기

## providers에 QueryService 추가

`dashboard.module.ts` QueryService를 providers에 추가 

```typescript
import { QueryService } from 'eediom-sdk';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    BrowserModule,
  ],
  providers: [QueryService],
  exports: [DashboardComponent]
})
export class DashboardModule{}
```

## dashboard 예제 쿼리 입력

```typescript
import { QueryService } from 'eediom-sdk';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less'],
})
export class DashboardComponent implements OnInit {

    query: string = 'table sys_cpu_logs';
    

    constructor(private queryService: QueryService){}

    ngOnInit() {
        this.queryService.query(this.query, (queryId, subscribeData) => {
            if (subscribeData.type === SubscribeTypes.Eof) { // 해당 쿼리가 종료 되면
                this.queryService.getResult(queryId, 0, 100).then((queryResult) => {
                    console.log(queryResult); // queryId를 기준으로 쿼리의 결과 값을 가져옵니다.

                    
                })
            }
        })
    }
}
```

## queryResult를 dashboard에 담기

```typescript
import { QueryService } from 'eediom-sdk';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less'],
})
export class DashboardComponent implements OnInit {

    query: string = 'table sys_cpu_logs';
    queryResult: QueryResult; // 추가된 부분

    constructor(private queryService: QueryService){}

    ngOnInit() {
        this.queryService.query(this.query, (queryId, subscribeData) => {
            if (subscribeData.type === SubscribeTypes.Eof) { // 해당 쿼리가 종료 되면
                this.queryService.getResult(queryId, 0, 100).then((queryResult) => {
                    console.log(queryResult); // queryId를 기준으로 쿼리의 결과 값을 가져옵니다.

                    this.queryResult = queryResult; // 추가된 부분
                })
            }
        })
    }
}
```
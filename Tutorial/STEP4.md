# 예제 쿼리의 데이터를 Grid를 통해서 보여주기

## app.module에 GridModule 추가

```typescript
import { QueryService, GridModule } from 'eediom-sdk'; // 추가한 부분
import { DashboardComponent } from './dashboard.component';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    BrowserModule,
    GridModule
  ],
  providers: [QueryService],
  exports: [DashboardComponent]
})
export class DashboardModule{}
```

## template에 edm-grid를 가져오기

```html
<edm-grid [gridData]="gridData" [pageSize]="pageSize" [showPager]="false"></edm-grid>
```

## queryResult를 기준으로 grid를 보여주기

```typescript
import { QueryService, GridData } from 'eediom-sdk';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less'],
})
export class DashboardComponent implements OnInit {

    query: string = 'table sys_cpu_logs';
    gridData: GirdData;
    pageSize: number;
    

    constructor(private queryService: QueryService){}

    ngOnInit() {
        this.queryService.query(this.query, (queryId, subscribeData) => {
            if (subscribeData.type === SubscribeTypes.Eof) { // 해당 쿼리가 종료 되면
                this.queryService.getResult(queryId, 0, 100).then((queryResult) => {
                    console.log(queryResult); // queryId를 기준으로 쿼리의 결과 값을 가져옵니다.

                    this.gridData = new GridData({
                        records: this.queryResult.records,
                    });
                    
                    // GridData로 보내주어 컬럼과 로우를 만듭니다.
                })
            }
        })
    }
}
```

위의 과정으로 받아온 데이터를 그리드에 보여줄 수 있습니다.
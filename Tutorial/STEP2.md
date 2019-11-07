# 새로운 라우터 추가

`ng g m dashboard && ng g c dashboard`를 입력 컴포넌트와 모듈 생성

`app-routing.module`의 routes에 방금 만든 컴포넌트를 추가, `imports`에 DashboardModule추가

```typescript
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardModule } from './dashboard/dashboard.module';

const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent }
];


@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), DashboardModule],
  exports: [RouterModule],
})
```

주소창에 `/dashboard`로 이동하여 방금 생성한 Dashboard 컴포넌트가 잘 작동하는지 확인
# App.module에 Eediom-sdk 추가

```typescript
import { ServiceModule } from 'eediom-sdk';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ServiceModule.forRoot({
      productName: 'Araqne'
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule{}
```

- productName을 Araqne로 해야하는 이유
  - logpresso에 내장되어 있는 Araqne 서비스 들을 사용하기 위해서

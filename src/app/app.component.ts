import { Component, OnInit } from '@angular/core';
import { HostAuthService, MsgbusService, OverlayService, Field } from 'eediom-sdk';
import { WidgetManagerComponent } from 'src/component/widget-manager/widget-manager.component';
import { Widget, WidgetTypes } from 'src/component/widget/widget';
import { FieldTypes } from 'src/service/query.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
  dashboards: Dashboard[] = [
    {
      widget: null,
      col: 1,
      row: 2,
    },
    {
      widget: null,
      col: 1,
      row: 3,
    },
    {
      widget: null,
      col: 1,
      row: 1,
    },
    {
      widget: null,
      col: 1,
      row: 1,
    },
    {
      widget: null,
      col: 1,
      row: 1,
    },
    {
      widget: null,
      col: 1,
      row: 1,
    },
    {
      widget: new Widget({
        title: '전역 필터',
        type: WidgetTypes.Filter,
      }),
      col: 1,
      row: 1,
    },
    {
      widget: null,
      col: 1,
      row: 1,
    },
    {
      widget: null,
      col: 1,
      row: 1,
    },
  ];

  widgetManager: WidgetManagerComponent;
  constructor(private msgbus: MsgbusService, private hostAuth: HostAuthService, private overlay: OverlayService) {}

  ngOnInit(): void {
    /**
     * 강제 로그인
     */
    setTimeout(() => {
      this.hostAuth.login('root', 'eediom_01').then((res) => {});
    }, 5000);
  }

  onSetting(id: number = 1, dashboard: Dashboard): void {
    if (this.widgetManager) return;
    this.widgetManager = this.overlay.attach(WidgetManagerComponent);

    if (dashboard.widget) {
      this.setWidgetManagerVariables(this.widgetManager, dashboard);
    }

    this.widgetManager.getData.subscribe((widget?: Widget) => {
      this.widgetManager = null;

      if (!widget) return;
      this.dashboards[id].widget = widget;
    });
  }

  private setWidgetManagerVariables(manager: WidgetManagerComponent, dashboard: Dashboard): void {
    const { widget } = dashboard;
    manager.queryString = widget.query;
    manager.onPreviewQuery().then(() => {
      manager.title = widget.title;
      manager.tick = widget.tick;
      manager.currentType = widget.type;

      if (widget.chartPreset) {
        manager.currentChartType = widget.chartPreset.type;
        manager.currentIndependentVariable = widget.chartPreset.x.key;
        manager.currentDependentVariables = (<FieldTypes[]>widget.chartPreset.y).map((field) => field.key);
      }
    });
  }
}

interface Dashboard {
  widget: Widget;
  col: number;
  row: number;
  data?: any[];
  showEdit?: boolean;
}

enum DashboardTypes {
  Grid = 1,
  Chart,
  Filter,
}

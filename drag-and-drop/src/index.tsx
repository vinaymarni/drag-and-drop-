import * as ReactDOM from 'react-dom';
import * as React from 'react';

import {
  DashboardLayoutComponent,
  PanelsDirective,
  PanelDirective,
} from '@syncfusion/ej2-react-layouts';
import { PanelModel, ResizeArgs } from '@syncfusion/ej2-layouts';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { DialogComponent } from '@syncfusion/ej2-react-popups';
import {
  AccumulationChartComponent,
  AccumulationSeriesCollectionDirective,
  AccumulationSeriesDirective,
  Inject,
  SeriesCollectionDirective,
  SeriesDirective,
  ChartComponent,
} from '@syncfusion/ej2-react-charts';
import {
  Legend,
  Category,
  Tooltip,
  DataLabel,
  SplineAreaSeries,
  DateTime,
  ILoadedEventArgs,
  ChartTheme,
  AccumulationTheme,
  IAccLoadedEventArgs,
  AccumulationDataLabel,
  AccumulationLegend,
  PieSeries,
  AccumulationTooltip,
  ColumnSeries,
} from '@syncfusion/ej2-charts';
import { SidebarComponent } from '@syncfusion/ej2-react-navigations';
import './dynamic.css';
import { ListViewComponent } from '@syncfusion/ej2-react-lists';
export class DynamicWidget extends React.Component {
  public sidebarobj: SidebarComponent;
  public dataList: { [key: string]: Object }[] = [
    { text: 'Home' },
    { text: 'About' },
    { text: 'Careers' },
    { text: 'FAQs' },
    { text: 'Blog' },
    { text: 'Uses' },
    { text: 'Contact' },
  ];
  public fields: object = { tooltip: 'text' };
  public btnobj: ButtonComponent;
  public dashboardObj: DashboardLayoutComponent;
  public dialogObj: DialogComponent;
  constructor(props: {}) {
    super(props);
    this.state = {
      hideDialog: false,
    };
  }
  btnClick(): void {
    if ((this.btnobj as any).element.classList.contains('e-active')) {
      (this.dashboardObj as any).allowDragging = true;
      (this.dashboardObj as any).allowResizing = true;
      (this.btnobj as any).content = 'Save';
      (this.btnobj as any).iconCss = 'save';
      document.getElementById('dialogBtn').style.display = 'block';
    } else {
      (this.dashboardObj as any).allowDragging = false;
      (this.dashboardObj as any).allowResizing = false;
      (this.btnobj as any).content = 'Edit';
      (this.btnobj as any).iconCss = 'edit';
      document.getElementById('dialogBtn').style.display = 'none';
    }
  }
  onPanelResize(args: ResizeArgs): void {
    if (
      args.element &&
      args.element.querySelector('.e-panel-container .e-panel-content div div')
    ) {
      let chartObj: any = (
        args.element.querySelector(
          '.e-panel-container .e-panel-content div div'
        ) as any
      ).ej2_instances[0];
      chartObj.height = '95%';
      chartObj.width = '100%';
      chartObj.refresh();
    }
  }
  public content(data: any): JSX.Element {
    return (
      <div id="dialogcontent">
        <div>
          <div id="linetemplate">
            <p className="dialog-text">Linechart (1x1) </p>
          </div>
          <div id="pietemplate">
            <p className="dialog-text">Piechart (1x1) </p>
          </div>
          <div id="splinetemplate">
            <p className="dialog-text">Splinechart (2x1) </p>
          </div>
        </div>
      </div>
    );
  }
  private count: number = 4;
  public onAdd(): void {
    let proxy: any = this;
    let panel: PanelModel[] = [
      {
        id: this.count.toString() + '_layout',
        sizeX: 2,
        sizeY: 2,
        row: 0,
        col: 0,
        header: '<div>Panel' + this.count.toString() + '</div>',
        content: '<div></div>',
      },
    ];
    this.count = this.count + 1;
    proxy.dashboardObj.addPanel(panel[0]);
  }

  public splineTemplate(): JSX.Element {
    let splineData1: object[] = [
      { x: new Date(2002, 0, 1), y: 2.2 },
      { x: new Date(2003, 0, 1), y: 3.4 },
      { x: new Date(2004, 0, 1), y: 2.8 },
      { x: new Date(2005, 0, 1), y: 1.6 },
      { x: new Date(2006, 0, 1), y: 2.3 },
      { x: new Date(2007, 0, 1), y: 2.5 },
      { x: new Date(2008, 0, 1), y: 2.9 },
      { x: new Date(2009, 0, 1), y: 3.8 },
      { x: new Date(2010, 0, 1), y: 1.4 },
      { x: new Date(2011, 0, 1), y: 3.1 },
    ];

    let splineData2: object[] = [
      { x: new Date(2002, 0, 1), y: 2 },
      { x: new Date(2003, 0, 1), y: 1.7 },
      { x: new Date(2004, 0, 1), y: 1.8 },
      { x: new Date(2005, 0, 1), y: 2.1 },
      { x: new Date(2006, 0, 1), y: 2.3 },
      { x: new Date(2007, 0, 1), y: 1.7 },
      { x: new Date(2008, 0, 1), y: 1.5 },
      { x: new Date(2009, 0, 1), y: 2.8 },
      { x: new Date(2010, 0, 1), y: 1.5 },
      { x: new Date(2011, 0, 1), y: 2.3 },
    ];
    return (
      <div className="template">
        <ChartComponent
          style={{ height: '100%', width: '100%', textAlign: 'center' }}
          primaryXAxis={{
            valueType: 'DateTime',
            labelFormat: 'MMM',
            majorGridLines: { width: 0 },
            intervalType: 'Months',
            edgeLabelPlacement: 'Shift',
          }}
          primaryYAxis={{
            labelFormat: '{value}%',
            lineStyle: { width: 0 },
            maximum: 4,
            interval: 1,
            majorTickLines: { width: 0 },
            minorTickLines: { width: 0 },
          }}
          load={this.load.bind(this)}
          chartArea={{ border: { width: 0 } }}
        >
          <Inject services={[SplineAreaSeries, DateTime, Legend]} />
          <SeriesCollectionDirective>
            <SeriesDirective
              dataSource={splineData1}
              xName="x"
              yName="y"
              name="Jan"
              opacity={0.5}
              type="SplineArea"
              width={2}
              fill="rgb(239, 183, 202)"
            ></SeriesDirective>
            <SeriesDirective
              dataSource={splineData2}
              xName="x"
              yName="y"
              name="Feb"
              opacity={0.5}
              type="SplineArea"
              width={2}
              fill="rgb(0, 189, 174)"
            ></SeriesDirective>
          </SeriesCollectionDirective>
        </ChartComponent>
      </div>
    );
  }

  public lineTemplate(): JSX.Element {
    let data1: any[] = [
      { x: 'Jan', y: 46 },
      { x: 'Feb', y: 27 },
      { x: 'Mar', y: 26 },
    ];
    let data2: any[] = [
      { x: 'Jan', y: 37 },
      { x: 'Feb', y: 23 },
      { x: 'Mar', y: 18 },
    ];
    let data3: any[] = [
      { x: 'Jan', y: 38 },
      { x: 'Feb', y: 17 },
      { x: 'Mar', y: 26 },
    ];
    return (
      <div className="template">
        <ChartComponent
          style={{ height: '100%', width: '100%' }}
          load={this.load.bind(this)}
          primaryXAxis={{
            valueType: 'Category',
            interval: 1,
            majorGridLines: { width: 0 },
          }}
          primaryYAxis={{
            majorGridLines: { width: 0 },
            majorTickLines: { width: 0 },
            lineStyle: { width: 0 },
            labelStyle: { color: 'transparent' },
          }}
          chartArea={{ border: { width: 0 } }}
          tooltip={{ enable: true }}
        >
          <Inject
            services={[ColumnSeries, Legend, Tooltip, Category, DataLabel]}
          />
          <SeriesCollectionDirective>
            <SeriesDirective
              dataSource={data1}
              xName="x"
              yName="y"
              name="Jan"
              type="Column"
              marker={{ dataLabel: { visible: false } }}
              fill="#00bdae"
            ></SeriesDirective>
            <SeriesDirective
              dataSource={data2}
              xName="x"
              yName="y"
              name="Feb"
              type="Column"
              marker={{ dataLabel: { visible: false } }}
              fill="#e56691"
            ></SeriesDirective>
            <SeriesDirective
              dataSource={data3}
              xName="x"
              yName="y"
              name="Mar"
              type="Column"
              marker={{ dataLabel: { visible: false } }}
              fill="#357cd2"
            ></SeriesDirective>
          </SeriesCollectionDirective>
        </ChartComponent>
      </div>
    );
  }

  public pieTemplate(): JSX.Element {
    let pieData: object[] = [
      { x: 'Jan', y: 12.5, text: 'January' },
      { x: 'Feb', y: 25, text: 'February' },
      { x: 'Mar', y: 50, text: 'March' },
    ];
    let piePalette: string[] = ['#00bdaed1', '#357cd2bf', '#e56691e8'];
    return (
      <div className="template">
        <AccumulationChartComponent
          style={{ height: '100%', width: '100%' }}
          legendSettings={{ visible: false }}
          enableSmartLabels={true}
          enableAnimation={true}
          center={{ x: '50%', y: '50%' }}
          load={this.Pieload.bind(this)}
          tooltip={{
            enable: true,
            header: '<b>${point.x}</b>',
            format: 'Composition : <b>${point.y}%</b>',
          }}
        >
          <Inject
            services={[
              AccumulationLegend,
              PieSeries,
              AccumulationTooltip,
              AccumulationDataLabel,
            ]}
          />
          <AccumulationSeriesCollectionDirective>
            <AccumulationSeriesDirective
              dataSource={pieData}
              name="Earnings"
              xName="x"
              yName="y"
              dataLabel={{
                visible: true,
                position: 'Inside',
                name: 'value',
                font: { fontWeight: '600' },
              }}
              radius="100%"
              innerRadius="40%"
              palettes={['#00bdae', '#357cd2', '#e56691']}
            ></AccumulationSeriesDirective>
          </AccumulationSeriesCollectionDirective>
        </AccumulationChartComponent>
      </div>
    );
  }

  private cellSpacing: number[] = [10, 10];

  public render(): JSX.Element {
    return (
      <React.Fragment>
        <SidebarComponent id="sidebar-menu" width="200px">
          <ListViewComponent
            id="menuList"
            dataSource={this.dataList}
            fields={this.fields}
          ></ListViewComponent>
        </SidebarComponent>

        <div>
          <div id="edit_target" className="control-section">
            <div>
              <div
                style={{
                  width: '100%',
                  marginBottom: '10px',
                  marginTop: '10px',
                  height: '30px',
                }}
              >
                <ButtonComponent
                  cssClass="e-outline e-flat e-primary"
                  ref={(scope) => {
                    this.btnobj = scope;
                  }}
                  iconCss="edit"
                  isToggle={true}
                  onClick={this.btnClick.bind(this)}
                  style={{ float: 'right', width: '75px' }}
                >
                  Edit
                </ButtonComponent>
              </div>
              <div
                style={{
                  padding: '5px',
                  marginBottom: '5px',
                  textAlign: 'end',
                }}
              >
                <div
                  id="dialogBtn"
                  className="add-widget-button e-control e-btn e-lib"
                  onClick={this.dlgClick.bind(this)}
                >
                  Add New Widget
                </div>
              </div>
            </div>
            <DashboardLayoutComponent
              id="edit_dashboard"
              columns={2}
              cellSpacing={this.cellSpacing}
              ref={(scope) => {
                this.dashboardObj = scope;
              }}
              resizeStop={this.onPanelResize.bind(this)}
              allowResizing={false}
              allowDragging={false}
            >
              <PanelsDirective>
                <PanelDirective
                  sizeX={1}
                  sizeY={1}
                  row={0}
                  col={0}
                  content={this.lineTemplate.bind(this) as any}
                  header="<div>Line Chart</div>"
                ></PanelDirective>
                <PanelDirective
                  sizeX={1}
                  sizeY={1}
                  row={0}
                  col={1}
                  content={this.pieTemplate.bind(this) as any}
                  header="<div>Pie Chart</div>"
                ></PanelDirective>
                <PanelDirective
                  sizeX={2}
                  sizeY={1}
                  row={1}
                  col={0}
                  content={this.splineTemplate.bind(this) as any}
                  header="<div>Spline Chart</div>"
                ></PanelDirective>
              </PanelsDirective>
            </DashboardLayoutComponent>
          </div>
          <DialogComponent
            id="listdialog"
            width="500px"
            height="260px"
            visible={false}
            header={'Add a widget'}
            showCloseIcon={true}
            animationSettings={{ effect: 'Zoom' }}
            isModal={true}
            target="#edit_target"
            ref={(scope) => {
              this.dialogObj = scope;
            }}
            content={this.content as any}
          ></DialogComponent>
        </div>
      </React.Fragment>
    );
  }
  dlgClick(): void {
    (this.dialogObj as any).visible = true;
    document.getElementById('linetemplate').onclick = () => {
      let countValue: string = this.count.toString();
      let panel: PanelModel[] = [
        {
          id: '_layout' + countValue,
          sizeX: 1,
          sizeY: 1,
          row: 0,
          col: 0,
          header: '<div>Line Chart</div>',
          content: this.lineTemplate.bind(this) as any,
        },
      ];
      this.count = this.count + 1;
      (this.dashboardObj as any).addPanel(panel[0]);
      (this.dialogObj as any).visible = false;
      (
        document
          .getElementById('_layout' + countValue)
          .querySelector('.e-control.e-chart') as any
      ).ej2_instances[0].refresh();
    };
    document.getElementById('pietemplate').onclick = () => {
      let countValue: string = this.count.toString();
      let panel: PanelModel[] = [
        {
          id: '_layout' + countValue,
          sizeX: 1,
          sizeY: 1,
          row: 0,
          col: 0,
          header: '<div>Pie Chart</div>',
          content: this.pieTemplate.bind(this) as any,
        },
      ];
      this.count = this.count + 1;
      (this.dashboardObj as any).addPanel(panel[0]);
      (this.dialogObj as any).visible = false;
      (
        document
          .getElementById('_layout' + countValue)
          .querySelector('.e-control.e-accumulationchart') as any
      ).ej2_instances[0].refresh();
    };
    document.getElementById('splinetemplate').onclick = () => {
      let countValue: string = this.count.toString();
      let panel: PanelModel[] = [
        {
          id: '_layout' + countValue,
          sizeX: 2,
          sizeY: 1,
          row: 0,
          col: 0,
          header: '<div>Spline Chart</div>',
          content: this.splineTemplate.bind(this) as any,
        },
      ];
      this.count = this.count + 1;
      (this.dashboardObj as any).addPanel(panel[0]);
      (this.dialogObj as any).visible = false;
      (
        document
          .getElementById('_layout' + countValue)
          .querySelector('.e-control.e-chart') as any
      ).ej2_instances[0].refresh();
    };
  }

  public load(args: ILoadedEventArgs): void {
    let selectedTheme: string = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'Material';
    args.chart.theme = (
      selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)
    ).replace(/-dark/i, 'Dark') as ChartTheme;
  }

  public Pieload(args: IAccLoadedEventArgs): void {
    let selectedTheme: string = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'Material';
    args.accumulation.theme = (
      selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)
    ).replace(/-dark/i, 'Dark') as AccumulationTheme;
  }
}
ReactDOM.render(<DynamicWidget />, document.getElementById('sample'));

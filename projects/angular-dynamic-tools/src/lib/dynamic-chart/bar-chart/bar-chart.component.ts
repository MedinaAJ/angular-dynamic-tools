import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ApexOptions, ChartType } from 'ng-apexcharts';
import { DynamicChartService } from '../dynamic-chart.service';

@Component({
  selector: 'dynamic-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss'
})
export class BarChartComponent implements OnChanges {
  @Input() categories: string[] = [];
  @Input() series: any[] = [];
  @Input() yAxisTitle: string = '';
  @Input() type?: ChartType = 'bar';
  @Input() yDecimals?: number = 2;
  @Input() stacked?: boolean = false;
  @Input() mainColor?: string = '#cff4fc';

  public chartOptions: Partial<ApexOptions>;

  constructor(
    private dynamicChartService: DynamicChartService
    ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.categories || changes.series || changes.yAxisTitle) {
      this.generateChartOptions();
    }
  }

  private generateChartOptions(): void {
    let colors = [this.mainColor];
    if(this.series.length > 1) {
      colors = this.dynamicChartService.generateColorPalette(this.mainColor, this.series.length);
    }

    this.chartOptions = {
      series: this.series,
      colors: colors,
      chart: {
        stacked: this.stacked,
        type: this.type,
        height: 300,
        zoom: {
          enabled: true
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%'
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
      },
      xaxis: {
        categories: this.categories,
        tickPlacement: 'on',
        labels: {
          rotateAlways: true, // Forza la rotación siempre
          rotate: -45, // Rota los labels del eje X a 45 grados
          style: {
            fontSize: '12px'
          }
        }
      },
      yaxis: {
        title: {
          text: this.yAxisTitle
        },
        labels: {
          formatter: (val) => {
            return val?.toFixed(this.yDecimals);
          }
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val.toFixed(2);
          }
        }
      }
    };
  }


}

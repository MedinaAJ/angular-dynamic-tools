import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ApexOptions, ChartType } from 'ng-apexcharts';
import { DynamicChartService } from '../dynamic-chart.service';

@Component({
  selector: 'dynamic-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss'
})
export class LineChartComponent implements OnChanges {
  @Input() categories: string[] = [];
  @Input() series: any[] = [];
  @Input() yAxisTitle: string = '';
  @Input() type: ChartType = 'line'; // Asegúrate de que el tipo predeterminado sea 'line'
  @Input() yDecimals?: number = 2;
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
    // Este código puede permanecer igual si deseas generar paletas de colores para las series
    if(this.series.length > 1) {
      colors = this.dynamicChartService.generateColorPalette(this.mainColor, this.series.length);
    }

    // Las opciones del gráfico pueden necesitar algunos ajustes para adaptarse a un gráfico de líneas
    this.chartOptions = {
      series: this.series,
      colors: colors,
      chart: {
        type: this.type,
        height: 300,
        zoom: {
          enabled: true
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: 3,
        curve: 'straight'
      },
      xaxis: {
        categories: this.categories,
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
            // Formatea el valor a un número con dos decimales
            return val.toFixed(this.yDecimals);
          }
        }
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

import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ApexOptions, ChartType } from 'ng-apexcharts';
import { DynamicChartService } from '../dynamic-chart.service';

@Component({
  selector: 'dynamic-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss'
})
export class PieChartComponent implements OnChanges {
  @Input() labels: string[] = [];
  @Input() series: number[] = [];
  @Input() type: ChartType = 'pie'; // Asegura que el tipo por defecto sea 'pie'
  @Input() mainColor?: string = '#cff4fc';
  @Input() legendPosition?: 'top' | 'right' | 'bottom' | 'left' = 'right';
  @Input() height?: number = 350;
  @Input() showLegend?: boolean = true;

  public chartOptions: Partial<ApexOptions>;

  constructor(
    private dynamicChartService: DynamicChartService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.labels || changes.series) {
      this.generateChartOptions();
    }
  }

  private generateChartOptions(): void {
    const colors = this.series.length > 1 
      ? this.dynamicChartService.generateColorPalette(this.mainColor, this.series.length)
      : [this.mainColor];

    this.chartOptions = {
      series: this.series,
      colors: colors,
      chart: {
        type: this.type,
        height: this.height,
      },
      labels: this.labels,
      responsive: [],
      legend: {
        show: this.showLegend,
        position: this.legendPosition
      }
    };
  }
}

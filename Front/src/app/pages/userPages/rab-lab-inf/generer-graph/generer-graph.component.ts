import { Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  BarController,
  BarElement, 
  CategoryScale, 
  LinearScale,
  Title,
  Tooltip,
Legend, Chart } from 'chart.js';
import html2canvas from 'html2canvas';
import { UserDataService } from '../../../../services/userData/user-data.service';
import { HeaderComponent } from "../../../../components/header-user/header.component";
import { DashBoardComponent } from "../../../../components/dash-board/dash-board.component";
import { LoadingScreenComponent } from "../../../../components/loading-screen/loading-screen.component";

@Component({
  selector: 'app-generer-graph',
  standalone: true,
  imports: [FormsModule, HeaderComponent, DashBoardComponent, LoadingScreenComponent, CommonModule],
  templateUrl: './generer-graph.component.html',
  styleUrl: './generer-graph.component.css'
})

export class GenererGraphComponent {

  isDashBoardVisible = true;
  user = inject(UserDataService).getUserData() //Njibou Data te3 user te3na
  
  updateDashboardVisibility(isVisible: boolean) {
    console.log('Dashboard visibility updated:', isVisible);
    this.isDashBoardVisible = isVisible;
  }

  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;
  chart: Chart | null = null;

  data: { name: string; value: number }[] = [];
  newItem = { name: '', value: 0 };

  constructor() {
    // Register necessary Chart.js components
    Chart.register(
      BarController,
      BarElement,
      CategoryScale,
      LinearScale,
      Title,
      Tooltip,
      Legend
    );
  }

  addData(): void {
    if (this.newItem.name && this.newItem.value > 0) {
      this.data.push({ ...this.newItem });
      this.newItem = { name: '', value: 0 };
    }
  }

  removeData(): void{
    if(this.data.length > 0){
      this.data.splice(this.data.length - 1, 1);
    }
  }

  generateGraph(): void {
    if (this.chart) {
      this.chart.destroy();
    }

    const labels = this.data.map((item) => item.name);
    const values = this.data.map((item) => item.value);

    this.chart = new Chart(this.chartCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Résultats de patient',
            data: values,
            backgroundColor: '#10B981',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  async downloadGraph(): Promise<void> {
    const canvas = this.chartCanvas.nativeElement;
    const image = await html2canvas(canvas).then((canvas) =>
      canvas.toDataURL('image/png')
    );

    const link = document.createElement('a');
    link.href = image;
    link.download = 'bar-graph.png';
    link.click();
  }
}

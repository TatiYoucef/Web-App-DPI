import { Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core'; // Importing necessary Angular components
import { CommonModule } from '@angular/common'; // CommonModule for basic Angular features
import { FormsModule } from '@angular/forms'; // FormsModule to use ngModel for two-way binding
import { 
  BarController,
  BarElement, 
  CategoryScale, 
  LinearScale,
  Title,
  Tooltip,
  Legend, Chart } from 'chart.js'; // Importing Chart.js components to create charts
import html2canvas from 'html2canvas'; // Importing html2canvas to capture canvas content as an image
import { UserDataService } from '../../../../services/userData/user-data.service'; // Service to fetch user data
import { HeaderComponent } from "../../../../components/header-user/header.component"; // Header component
import { DashBoardComponent } from "../../../../components/dash-board/dash-board.component"; // Dashboard component
import { LoadingScreenComponent } from "../../../../components/loading-screen/loading-screen.component"; // Loading screen component
import { ActivatedRoute } from '@angular/router'; // ActivatedRoute to access route parameters

@Component({
  selector: 'app-generer-graph', // Component selector for use in HTML templates
  standalone: true, // Specifies the component as standalone (no need for module declaration)
  imports: [FormsModule, HeaderComponent, DashBoardComponent, LoadingScreenComponent, CommonModule], // Importing necessary modules and components
  templateUrl: './generer-graph.component.html', // HTML template for this component
  styleUrl: './generer-graph.component.css' // CSS styles for this component
})

export class GenererGraphComponent implements OnInit{

  isDashBoardVisible = true; // Boolean to control the visibility of the dashboard
  user = inject(UserDataService).getUserData() // Injecting user data service and fetching user data
  id!:number; // Variable to store the patient ID
  rout = inject(ActivatedRoute); // Injecting ActivatedRoute to access route parameters

  // Function to update the visibility of the dashboard
  updateDashboardVisibility(isVisible: boolean) {
    console.log('Dashboard visibility updated:', isVisible); // Logging the updated visibility state
    this.isDashBoardVisible = isVisible; // Updating the visibility state
  }

  ngOnInit(): void { // Component initialization
    // Subscribing to route parameter changes to fetch the patient ID from the URL
    this.rout.paramMap.subscribe((params) =>{
      this.id = Number(params.get("id")); // Extracting the patient ID from the URL and converting it to a number
    });
  }

  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>; // Reference to the chart canvas element
  chart: Chart | null = null; // Variable to store the chart instance

  data: { name: string; value: number }[] = []; // Array to hold the data for the chart
  newItem = { name: '', value: 0 }; // Object to hold the new item data for input fields

  constructor() {
    // Registering necessary Chart.js components to create the bar chart
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

  // Function to add a new data entry to the chart
  addData(): void {
    if (this.newItem.name && this.newItem.value > 0) { // Checking if the name and value are valid
      this.data.push({ ...this.newItem }); // Adding the new item to the data array
      this.newItem = { name: '', value: 0 }; // Resetting the input fields
    }
  }

  // Function to remove the last data entry from the chart
  removeData(): void{
    if(this.data.length > 0){ // Checking if there is any data to remove
      this.data.splice(this.data.length - 1, 1); // Removing the last item from the data array
    }
  }

  // Function to generate the bar chart based on the data
  generateGraph(): void {
    if (this.chart) { // If a chart already exists, destroy it before creating a new one
      this.chart.destroy(); // Destroy the existing chart
    }

    const labels = this.data.map((item) => item.name); // Extracting labels from the data array
    const values = this.data.map((item) => item.value); // Extracting values from the data array

    // Creating a new chart using Chart.js
    this.chart = new Chart(this.chartCanvas.nativeElement, {
      type: 'bar', // Setting the chart type to 'bar'
      data: {
        labels, // Setting the labels for the chart
        datasets: [
          {
            label: 'Résultats de patient', // Label for the dataset
            data: values, // Data for the chart
            backgroundColor: '#10B981', // Background color for the bars
            borderColor: 'rgba(75, 192, 192, 1)', // Border color for the bars
            borderWidth: 1, // Border width for the bars
          },
        ],
      },
      options: {
        responsive: true, // Making the chart responsive
        scales: {
          y: {
            beginAtZero: true, // Setting the Y-axis to start from zero
          },
        },
      },
    });
  }

  // Function to download the generated graph as an image
  async downloadGraph(): Promise<void> {
    const canvas = this.chartCanvas.nativeElement; // Getting the canvas element
    const image = await html2canvas(canvas).then((canvas) => // Converting the canvas to an image
      canvas.toDataURL('image/png') // Getting the image as a PNG data URL
    );

    const link = document.createElement('a'); // Creating an anchor element to trigger the download
    link.href = image; // Setting the href attribute to the image data URL
    link.download = 'bar-graph.png'; // Setting the download file name
    link.click(); // Triggering the download
  }
}

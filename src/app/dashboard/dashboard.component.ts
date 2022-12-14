import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { io } from "socket.io-client";
import { environment } from '../../environments/environment';
import { AuthService } from '../Auth/Authservice';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  socket: any = io(environment.Urlsocket, { transports: ["websocket"] });


  public lineBigDashboardChartType;
  public gradientStroke;
  public chartColor;
  public canvas: any;
  public ctx;
  public gradientFill;
  public lineBigDashboardChartData: Array<any>;
  public lineBigDashboardChartOptions: any;
  public lineBigDashboardChartLabels: Array<any>;
  public lineBigDashboardChartColors: Array<any>

  public gradientChartOptionsConfiguration: any;
  public gradientChartOptionsConfigurationWithNumbersAndGrid: any;

  public lineChartType;
  public lineChartData: Array<any>;
  public lineChartOptions: any;
  public lineChartLabels: Array<any>;
  public lineChartColors: Array<any>

  public lineChartWithNumbersAndGridType;
  public lineChartWithNumbersAndGridData: Array<any>;
  public lineChartWithNumbersAndGridOptions: any;
  public lineChartWithNumbersAndGridLabels: Array<any>;
  public lineChartWithNumbersAndGridColors: Array<any>

  public lineChartGradientsNumbersType;
  public lineChartGradientsNumbersData: Array<any>;
  public lineChartGradientsNumbersOptions: any;
  public lineChartGradientsNumbersLabels: Array<any>;
  public lineChartGradientsNumbersColors: Array<any>
  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
  public hexToRGB(hex, alpha) {
    var r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
      return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
      return "rgb(" + r + ", " + g + ", " + b + ")";
    }
  }
  constructor(private authService: AuthService) { }
  ngAfterViewInit() {
    this.CreatedGraf1([]);


  }
  ngOnInit() {

    // receive a message from the server
    this.socket.on('report', (...args) => {
      // console.log(args,'**********')
      this.CreatedGraf1(args)
    });

    this.authService.GetConsumption().subscribe(data => {
  // timeout solo para que se alcance ver el cambio de la grafica
      setTimeout(() => {
        this.CreatedGraf1(data);
      }, 1000);
    })



  }


  CreatedGraf1(data) {
    // Line General - Header
    var DataGrafica1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    var DataGrafica2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    var DataGrafica3 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    // si existe un error al recorrer los datos mostrar todo en  0
    try {

      console.log(data[0])
      if (data.length) {
        data[0][0]?.forEach(element => {
          DataGrafica1[element.Month - 1] = element.consumo
        });

        var DataGr2 =data[0][1];
        var tmpGrafica2 = DataGr2.filter(e => e.SALA == 1)
        var tpmGrafica3 = DataGr2.filter(e => e.SALA == 2)
        tmpGrafica2?.forEach(element => {
          DataGrafica2[element.MONTH - 1] = element.CONSUMO
        });


        tpmGrafica3?.forEach(element => {
          DataGrafica3[element.MONTH - 1] = element.CONSUMO
        });


      }
    } catch (error) {
      console.log(error, 'el error')
    }




    this.chartColor = "#dce0e8";
    this.canvas = document.getElementById("bigDashboardChart");
    this.ctx = this.canvas.getContext("2d");

    this.gradientStroke = this.ctx.createLinearGradient(500, 0, 100, 0);
    this.gradientStroke.addColorStop(0, '#80b6f4');
    this.gradientStroke.addColorStop(1, this.chartColor);

    this.gradientFill = this.ctx.createLinearGradient(0, 200, 0, 43);
    // Gradient General
    this.gradientFill.addColorStop(0, "rgba(64, 160, 43, 0)");
    this.gradientFill.addColorStop(1, "rgba(64, 160, 43, 0.24)");

    this.lineBigDashboardChartData = [
      {
        label: "Data",

        pointBorderWidth: 1,
        pointHoverRadius: 7,
        pointHoverBorderWidth: 2,
        pointRadius: 5,
        fill: true,

        borderWidth: 2,
        data: DataGrafica1
      }
    ];
    this.lineBigDashboardChartColors = [
      {
        backgroundColor: this.gradientFill,
        borderColor: this.chartColor,
        pointBorderColor: this.chartColor,
        // Colors dots General
        pointBackgroundColor: "#40a02b",
        pointHoverBackgroundColor: "#40a02b",
        pointHoverBorderColor: this.chartColor,
      }
    ];
    this.lineBigDashboardChartLabels = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    this.lineBigDashboardChartOptions = {

      layout: {
        padding: {
          left: 20,
          right: 20,
          top: 0,
          bottom: 0
        }
      },
      maintainAspectRatio: false,
      tooltips: {
        backgroundColor: '#fff',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      legend: {
        position: "bottom",
        fillStyle: "#FFF",
        display: false
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: "rgba(220, 224, 232, 0.4)",
            fontStyle: "bold",
            beginAtZero: true,
            maxTicksLimit: 5,
            padding: 10
          },
          gridLines: {
            drawTicks: true,
            drawBorder: false,
            display: true,
            color: "rgba(220, 224, 232,0.1)",
            zeroLineColor: "transparent"
          }

        }],
        xAxes: [{
          gridLines: {
            zeroLineColor: "transparent",
            display: false,

          },
          ticks: {
            padding: 10,
            fontColor: "rgba(220, 224, 232,0.4)",
            fontStyle: "bold"
          }
        }]
      }
    };



    this.lineBigDashboardChartType = 'line';


    this.gradientChartOptionsConfiguration = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      tooltips: {
        bodySpacing: 4,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
        xPadding: 10,
        yPadding: 10,
        caretPadding: 10
      },
      responsive: 1,
      scales: {
        yAxes: [{
          display: 0,
          ticks: {
            display: false
          },
          gridLines: {
            zeroLineColor: "transparent",
            drawTicks: false,
            display: false,
            drawBorder: false
          }
        }],
        xAxes: [{
          display: 0,
          ticks: {
            display: false
          },
          gridLines: {
            zeroLineColor: "transparent",
            drawTicks: false,
            display: false,
            drawBorder: false
          }
        }]
      },
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 15,
          bottom: 15
        }
      }
    };

    this.gradientChartOptionsConfigurationWithNumbersAndGrid = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      tooltips: {
        bodySpacing: 4,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
        xPadding: 10,
        yPadding: 10,
        caretPadding: 10
      },
      responsive: true,
      scales: {
        yAxes: [{
          gridLines: {
            zeroLineColor: "transparent",
            drawBorder: false
          },
          ticks: {
            stepSize: 500
          }
        }],
        xAxes: [{
          display: 0,
          ticks: {
            display: false
          },
          gridLines: {
            zeroLineColor: "transparent",
            drawTicks: false,
            display: false,
            drawBorder: false
          }
        }]
      },
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 15,
          bottom: 15
        }
      }
    };

    // grafica 2 
    this.canvas = document.getElementById("lineChartExample");
    this.ctx = this.canvas.getContext("2d");

    this.gradientStroke = this.ctx.createLinearGradient(500, 0, 100, 0);
    this.gradientStroke.addColorStop(0, '#C6C581');
    this.gradientStroke.addColorStop(1, this.chartColor);

    this.gradientFill = this.ctx.createLinearGradient(0, 170, 0, 50);
    // Gradient - All Rooms
    this.gradientFill.addColorStop(0, "rgba(4, 165, 229, 0)");
    this.gradientFill.addColorStop(1, "rgba(4, 165, 229, 0.40)");

    this.lineChartData = [
      {
        label: "CONSUMO POR MES",
        pointBorderWidth: 2,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 1,
        pointRadius: 4,
        fill: true,
        borderWidth: 2,
        data: DataGrafica2
      }
    ];
    this.lineChartColors = [

      {
        // Color Line - All Rooms
        borderColor: "#5c5f77",
        pointBorderColor: "#FFF",
        // Colors dots - All Rooms
        pointBackgroundColor: "#04a5e5",
        backgroundColor: this.gradientFill
      }
    ];
    this.lineChartLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    this.lineChartOptions = this.gradientChartOptionsConfiguration;

    this.lineChartType = 'line';

    this.canvas = document.getElementById("lineChartExampleWithNumbersAndGrid");
    this.ctx = this.canvas.getContext("2d");

    this.gradientStroke = this.ctx.createLinearGradient(500, 0, 100, 0);
    this.gradientStroke.addColorStop(0, '#18ce0f');
    this.gradientStroke.addColorStop(1, this.chartColor);

    this.gradientFill = this.ctx.createLinearGradient(0, 170, 0, 50);
    // Color Gradient - Room 1
    this.gradientFill.addColorStop(0, "rgba(136, 57, 239, 0)");
    this.gradientFill.addColorStop(1, "rgba(136, 57, 239, 0.4)");

    this.lineChartWithNumbersAndGridData = [
      {
        label: "Consumption",
        pointBorderWidth: 2,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 1,
        pointRadius: 4,
        fill: true,
        borderWidth: 2,
        data: DataGrafica3
      }
    ];
    this.lineChartWithNumbersAndGridColors = [
      {
        // Color Line - Room 1
        borderColor: "#5c5f77",
        pointBorderColor: "#FFF",
        // Color Dots = Room 1
        pointBackgroundColor: "#8839ef",
        backgroundColor: this.gradientFill
      }
    ];
    this.lineChartWithNumbersAndGridLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    this.lineChartWithNumbersAndGridOptions = this.gradientChartOptionsConfigurationWithNumbersAndGrid;

    this.lineChartWithNumbersAndGridType = 'line';




    this.canvas = document.getElementById("barChartSimpleGradientsNumbers");
    this.ctx = this.canvas.getContext("2d");

    this.gradientFill = this.ctx.createLinearGradient(0, 170, 0, 50);
    this.gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
    this.gradientFill.addColorStop(1, this.hexToRGB('#2CA8FF', 0.6));


    this.lineChartGradientsNumbersData = [
      {
        label: "Consumption",
        pointBorderWidth: 2,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 1,
        pointRadius: 4,
        fill: true,
        borderWidth: 1,
        data: DataGrafica3
      }
    ];
    this.lineChartGradientsNumbersColors = [
      {
        backgroundColor: this.gradientFill,
        borderColor: "#2CA8FF",
        pointBorderColor: "#FFF",
        pointBackgroundColor: "#2CA8FF",
      }
    ];
    this.lineChartGradientsNumbersLabels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    this.lineChartGradientsNumbersOptions = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      tooltips: {
        bodySpacing: 4,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
        xPadding: 10,
        yPadding: 10,
        caretPadding: 10
      },
      responsive: 1,
      scales: {
        yAxes: [{
          gridLines: {
            zeroLineColor: "transparent",
            drawBorder: false
          },
          ticks: {
            stepSize: 20
          }
        }],
        xAxes: [{
          display: 0,
          ticks: {
            display: false
          },
          gridLines: {
            zeroLineColor: "transparent",
            drawTicks: false,
            display: false,
            drawBorder: false
          }
        }]
      },
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 15,
          bottom: 15
        }
      }
    }

    this.lineChartGradientsNumbersType = 'bar';

  }
}

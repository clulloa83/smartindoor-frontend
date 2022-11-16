import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Alert } from 'src/app/models/alert';
import { Dispositivo } from 'src/app/models/dispositivo';
import { Registro } from 'src/app/models/registro';
import { AlertService } from 'src/app/services/alert.service';
import { LoaderService } from 'src/app/services/loader.service';
import { RegistroService } from 'src/app/services/registro.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.page.html',
  styleUrls: ['./grafico.page.scss'],
})
export class GraficoPage implements AfterViewInit {

  id: any;
  registros: Array<Registro> = [];

  // Importing ViewChild. We need @ViewChild decorator to get a reference to the local variable 
  // that we have added to the canvas element in the HTML template.
  @ViewChild('barCanvas') private barCanvas: ElementRef;
  @ViewChild('doughnutCanvas') private doughnutCanvas: ElementRef;
  @ViewChild('lineCanvas') private lineCanvas: ElementRef;
  barChart: any;
  doughnutChart: any;
  lineChart: any;

  @ViewChild('chartCanvas') chartCanvas : ElementRef;
  data : any = [];
  canvasChart : Chart;

  constructor(
    private actRoute: ActivatedRoute,
    private registroService: RegistroService,
    private loaderService: LoaderService,
    private alertService: AlertService,
  ) {
    // this.id = this.actRoute.snapshot.paramMap.get('id');
    this.inicializar();
   }

   inicializar = () => {
    this.id = this.actRoute.snapshot.paramMap.get('id');
   };

  obtenerRegistros = async() => {

    await this.loaderService.simpleLoader('cargando');
    
    const dispositivo: Dispositivo = new Dispositivo();
    dispositivo.id = this.id;

    try {

      this.registros = await this.registroService.registrosObtener(dispositivo);
      
      // this.registros.sort((a, b) => b.fechaRegistro.getTime() - a.fechaRegistro.getTime());
      
      // console.log('this.registros[0]', this.registros[0]);
      await this.loaderService.dismissLoader();

    } catch (error) {
      
      console.log('obtenerRegistros error', error);
      await this.loaderService.dismissLoader();

      const alertOpt: Alert = new Alert();
      alertOpt.header = 'Error al obtener registros';
      alertOpt.message = 'Se ha producido un error, favor intentar más tarde';
      alertOpt.buttons = ['OK'];

      await this.alertService.simpleAlert(alertOpt);
    }

  };

  ngAfterViewInit() {
    // this.barChartMethod();
    // this.doughnutChartMethod();
    // this.lineChartMethod();

    this.generarGrafico();
  };
  barChartMethod() {
    // Now we need to supply a Chart element reference with an object that defines the type of chart we want to use, and the type of data we want to display.
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: ['BJP', 'INC', 'AAP', 'CPI', 'CPI-M', 'NCP'],
        datasets: [{
          label: '# of Votes',
          data: [200, 50, 30, 15, 20, 34],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  };
  doughnutChartMethod() {
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['BJP', 'Congress', 'AAP', 'CPM', 'SP'],
        datasets: [{
          label: '# of Votes',
          data: [50, 29, 15, 10, 7],
          backgroundColor: [
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)'
          ],
          hoverBackgroundColor: [
            '#FFCE56',
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#FF6384'
          ]
        }]
      }
    });
  };
  lineChartMethod() {
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December'],
        datasets: [
          {
            label: 'Sell per week',
            fill: false,
            // lineTension: 0.1,
            tension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40, 10, 5, 50, 10, 15],
            spanGaps: false,
          }
        ]
      }
    });
  };

  generarGrafico = async() => {

    await this.loaderService.simpleLoader('cargando');
    
    const dispositivo: Dispositivo = new Dispositivo();
    dispositivo.id = this.id;

    try {

      this.registros = await this.registroService.registrosObtener(dispositivo);
      // this.registros.sort((a, b) => b.fechaRegistro.getTime() - a.fechaRegistro.getTime());
      // console.log('this.registros[0]', this.registros[0]);

      let etiquetas: Array<number> = [];
      let datos: Array<number> = [];

      for (let index = 0; index < this.registros.length; index++) {
        
        const registro = this.registros[index];
        etiquetas.push(index);
        datos.push(Number(registro.valor));
      };

      this.data = {
        labels: etiquetas,
        datasets: [{
          label: 'Temperaturas',
          data: datos,
          backgroundColor: 'rgba(255, 199, 132, 0.2)',
          borderColor: 'rgba(255, 99, 32, 0.8)',
          borderWidth: 2
        }]
      };

      await this.loaderService.dismissLoader();

    } catch (error) {
      
      console.log('obtenerRegistros error', error);
      await this.loaderService.dismissLoader();

      const alertOpt: Alert = new Alert();
      alertOpt.header = 'Error al obtener registros';
      alertOpt.message = 'Se ha producido un error, favor intentar más tarde';
      alertOpt.buttons = ['OK'];

      await this.alertService.simpleAlert(alertOpt);
    }


    this.changeChart({detail: {
      value : 'line'
    }});

  }

  changeChart( event: any ) {
    const type = event.detail.value || 'line';
    if ( this.canvasChart ) {
      this.canvasChart.destroy();
    }
    this.canvasChart = new Chart(this.chartCanvas.nativeElement, {
      type: type,
      data: this.data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Chart.js Line Chart'
          }
        },
        
        indexAxis: 'x'
      }
    });
  }

}

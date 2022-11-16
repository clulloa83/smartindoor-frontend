import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Alert } from 'src/app/models/alert';
import { Dispositivo } from 'src/app/models/dispositivo';
import { Registro } from 'src/app/models/registro';
import { AlertService } from 'src/app/services/alert.service';
import { LoaderService } from 'src/app/services/loader.service';
import { RegistroService } from 'src/app/services/registro.service';

export type NgxGaugeType = 'full' | 'arch' | 'semi';
export type NgxGaugeCap = 'round' | 'butt';

@Component({
  selector: 'app-temperatura',
  templateUrl: './temperatura.page.html',
  styleUrls: ['./temperatura.page.scss'],
})
export class TemperaturaPage implements OnInit {

  id: any;
  registros: Array<Registro> = [];

  gaugeType = 'arch' as NgxGaugeType;
  // gaugeValue = 78.3;
  gaugeValue: number;
  // gaugeLabel = "Grados";
  gaugeLabel: string;
  // gaugeAppendText = "°C";
  gaugeAppendText: string;
  // gaugeSize = 200;
  // gaugemax = 100;
  gaugemax: number;
  gaugethresholds = {
    '0': { color: 'green' },
    '30': { color: 'orange' },
    '70': { color: 'orangeRed' },
    '100': { color: 'red' },
  };

  constructor(
    private actRoute: ActivatedRoute,
    private registroService: RegistroService,
    private loaderService: LoaderService,
    private alertService: AlertService,
  ) {
    this.id = this.actRoute.snapshot.paramMap.get('id');
    // console.log('this.id', this.id);
    this.obtenerRegistros();
   }

  ngOnInit() {
  }

  obtenerRegistros = async() => {

    await this.loaderService.simpleLoader('cargando');
    
    const dispositivo: Dispositivo = new Dispositivo();
    // dispositivo.id = id;
    dispositivo.id = this.id;
    
    try {
      
      this.registros = await this.registroService.registrosObtener(dispositivo);
      
      // this.registros.sort((a, b) => b.fechaRegistro.getTime() - a.fechaRegistro.getTime());
      
      // console.log('this.registros[0]', this.registros[0]);

      this.gaugeValue = Number(this.registros[0].valor);
      this.gaugeLabel = this.registros[0].etiqueta;
      this.gaugeAppendText = this.registros[0].unidad;
      this.gaugemax = Number(this.registros[0].maximo);

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



}

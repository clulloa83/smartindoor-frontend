import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Alert } from 'src/app/models/alert';
import { Cultivo } from 'src/app/models/cultivo';
import { AlertService } from 'src/app/services/alert.service';
import { CultivoService } from 'src/app/services/cultivo.service';
import { LoaderService } from 'src/app/services/loader.service';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-cultivo',
  templateUrl: './cultivo.page.html',
  styleUrls: ['./cultivo.page.scss'],
})
export class CultivoPage {

  form: FormGroup;

  constructor(
    private loaderService: LoaderService,
    private alertService: AlertService,
    private router: Router,
    private cultivoService: CultivoService,
  ) {

    this.inicializar();
   }

  inicializar = () => {

    const ahora = dayjs(new Date(), 'YYYY-MM-DD').format();

    this.form = new FormGroup({
      nombre: new FormControl(''),
      banco: new FormControl(''),
      tipo: new FormControl('feminizada'),
      genotipo: new FormControl(''),
      unidad: new FormControl(''),
      fecha: new FormControl(ahora),
    });

    // const fechaNow = new Date(Date.now());
    // this.form.patchValue({ fecha: fechaNow.toISOString() });

    // const fechaNow = new Date();
    // this.form.patchValue({ fecha: fechaNow.toLocaleDateString('sv') });

  }

  guardarCultivo = async() => {

    const cultivo: Cultivo = new Cultivo();
    cultivo.semilla.nombre = this.form.value.nombre;
    cultivo.semilla.banco = this.form.value.banco;
    cultivo.semilla.tipo = this.form.value.tipo;
    cultivo.semilla.genotipo = this.form.value.genotipo;
    cultivo.semilla.unidad = this.form.value.unidad;
    cultivo.fecha = this.form.value.fecha;

    try {

      await this.loaderService.simpleLoader('cargando');
      await this.cultivoService.cultivoGuardar(cultivo);
      await this.loaderService.dismissLoader();
      this.router.navigate([`cultivos`])
      
    } catch (error) {
      console.log('guardarCultivo error', error);

      this.loaderService.dismissLoader();

      const alertOpt: Alert  = new Alert();
      alertOpt.header = 'Error al guardar cultivo';
      alertOpt.message = 'Se ha producido un error, favor intentar más tarde';
      alertOpt.buttons = ['OK'];
      this.alertService.simpleAlert(alertOpt);
    }

  };

}

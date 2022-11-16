import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Alert } from 'src/app/models/alert';
import { Cultivo } from 'src/app/models/cultivo';
import { AlertService } from 'src/app/services/alert.service';
import { CultivoService } from 'src/app/services/cultivo.service';
import { LoaderService } from 'src/app/services/loader.service';
import { NavparamsService } from 'src/app/services/navparams.service';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-cultivo-editar',
  templateUrl: './cultivo-editar.page.html',
  styleUrls: ['./cultivo-editar.page.scss'],
})
export class CultivoEditarPage {

  id: string;
  cultivo: Cultivo = new Cultivo();
  form: FormGroup;

  constructor(
    private actRoute: ActivatedRoute,
    private Navparams: NavparamsService,
    private loaderService: LoaderService,
    private alertService: AlertService,
    private router: Router,
    private cultivoService: CultivoService,
  ) {
    this.inicializar();
   }

  inicializar = async() => {

    this.id = this.actRoute.snapshot.paramMap.get('id');
    this.cultivo = this.Navparams.getData();
    
    const fecha = dayjs(this.cultivo.fecha, 'YYYY-MM-DD').format();

    this.form = new FormGroup({
      nombre: new FormControl(this.cultivo.semilla.nombre),
      banco: new FormControl(this.cultivo.semilla.banco ),
      tipo: new FormControl(this.cultivo.semilla.tipo),
      genotipo: new FormControl(this.cultivo.semilla.genotipo),
      unidad: new FormControl(this.cultivo.semilla.unidad),
      fecha: new FormControl(fecha),
    });

  };

  actualizarCultivo = async() => {

    const cultivo: Cultivo = new Cultivo();
    cultivo.id = this.cultivo.id;
    cultivo.semilla.nombre = this.form.value.nombre;
    cultivo.semilla.banco = this.form.value.banco;
    cultivo.semilla.tipo = this.form.value.tipo;
    cultivo.semilla.genotipo = this.form.value.genotipo;
    cultivo.semilla.unidad = this.form.value.unidad;
    cultivo.fecha = this.form.value.fecha;

    try {

      await this.loaderService.simpleLoader('cargando');
      await this.cultivoService.cultivoActualizarPorId(cultivo);
      await this.loaderService.dismissLoader();
      this.router.navigate([`cultivos`])
      
    } catch (error) {
      console.log('actualizarCultivo error', error);

      this.loaderService.dismissLoader();

      const alertOpt: Alert = new Alert();
      alertOpt.header = 'Error al actualizar cultivo';
      alertOpt.message = 'Se ha producido un error, favor intentar más tarde';
      alertOpt.buttons = ['OK'];
      this.alertService.simpleAlert(alertOpt);
    }

  };

}

import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Alert } from 'src/app/models/alert';
import { Seguimiento } from 'src/app/models/seguimiento';
import { AlertService } from 'src/app/services/alert.service';
import { LoaderService } from 'src/app/services/loader.service';
import { NavparamsService } from 'src/app/services/navparams.service';
import { SeguimientoService } from 'src/app/services/seguimiento.service';

@Component({
  selector: 'app-seguimiento-editar',
  templateUrl: './seguimiento-editar.page.html',
  styleUrls: ['./seguimiento-editar.page.scss'],
})
export class SeguimientoEditarPage {

  id: string;
  seguimiento: Seguimiento = new Seguimiento();
  form: FormGroup;
  capturas: string[] = [];

  constructor(
    private actRoute: ActivatedRoute,
    private Navparams: NavparamsService,
    private loaderService: LoaderService,
    private alertService: AlertService,
    private router: Router,
    private seguimientoService: SeguimientoService,

  ) { 

    this.inicializar();
  }

  inicializar = () => {

    this.form = new FormGroup({
      observacion: new FormControl('', Validators.required),
      fecha: new FormControl('', Validators.required),
    });

    this.id = this.actRoute.snapshot.paramMap.get('id');
    this.seguimiento = this.Navparams.getData();
    this.capturas = this.seguimiento.capturas;

    this.form.patchValue({ observacion: this.seguimiento.observacion });
    const fechaNow = new Date(this.seguimiento.fecha);
    this.form.patchValue({ fecha: fechaNow.toISOString() });

  }

  guardarSeguimiento = async() => {

    const seguimiento: Seguimiento = new Seguimiento();
    seguimiento.id = this.id;
    seguimiento.observacion = this.form.value.observacion;
    seguimiento.fecha = this.form.value.fecha;

    try {

      await this.loaderService.simpleLoader('cargando');
      await this.seguimientoService.seguimientoActualizarPorId(seguimiento);
      await this.loaderService.dismissLoader();

      const alertOpt: Alert = new Alert();
      alertOpt.header = 'Edición Seguimiento';
      alertOpt.message = 'editar seguimiento ok';
      alertOpt.message = 'Se ha editado correctamente el seguimiento';
      alertOpt.buttons = [
        {
          text: 'OK',
          role: 'confirm',
          handler: async() => { 
            await this.router.navigate([`seguimientos/${ this.seguimiento.cultivo }`])

          }
        }
      ];
      this.alertService.simpleAlert(alertOpt);
      
    } catch (error) {
      console.log('editarSeguimiento error', error);

      this.loaderService.dismissLoader();

      const alertOpt: Alert = new Alert();
      alertOpt.header = 'Error al editar seguimiento';
      alertOpt.message = 'Se ha producido un error, favor intentar más tarde';
      alertOpt.buttons = ['OK'];
      this.alertService.simpleAlert(alertOpt);
    }
  };

}

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Alert } from 'src/app/models/alert';
import { Cultivo } from 'src/app/models/cultivo';
import { Seguimiento } from 'src/app/models/seguimiento';
import { AlertService } from 'src/app/services/alert.service';
import { LoaderService } from 'src/app/services/loader.service';
import { NavparamsService } from 'src/app/services/navparams.service';
import { SeguimientoService } from 'src/app/services/seguimiento.service';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-seguimientos',
  templateUrl: './seguimientos.page.html',
  styleUrls: ['./seguimientos.page.scss'],
})
export class SeguimientosPage {

  cultivo: Cultivo = new Cultivo();
  seguimientos: Array<Seguimiento> = [];
  id: string;
  filterTerm: string;

  constructor(
    private Navparams: NavparamsService,
    private alertService: AlertService,
    private router: Router,
    private loaderService: LoaderService,
    private seguimientoService: SeguimientoService,
    private actRoute: ActivatedRoute,

  ) {
   }

  ionViewWillEnter() {
    this.inicializar();
  }

  inicializar = async() => {

    this.id = this.actRoute.snapshot.paramMap.get('id');
    await this.obtenerSeguimientos();

  };

  obtenerSeguimientos = async() => {

    const cultivo: Cultivo = new Cultivo();
    cultivo.id = this.id;

    try {
      
      await this.loaderService.simpleLoader('cargando');
      this.seguimientos = await this.seguimientoService.seguimientosObtener(cultivo);
      await this.loaderService.dismissLoader();

    } catch (error) {
      
      await this.loaderService.dismissLoader();

      console.log('obtenerSeguimientos error', error);

      const alertOpt: Alert = new Alert();
      alertOpt.header = 'Error al obtener seguimientos';
      alertOpt.message = 'Se ha producido un error, favor intentar más tarde';
      alertOpt.buttons = ['OK'];

      await this.alertService.simpleAlert(alertOpt);
    }

  };

  agregarSeguimiento = () => {

    this.router.navigateByUrl(`/seguimiento/${ this.id }`);

  };

  loadMore = (event: any) => {

    setTimeout(() => {
      
      event.target.complete();
      // this.obtenerSeguimientos();
      this.inicializar();
      if (this.seguimientos.length === 1000) {
        event.target.disabled = true;
      }
    }, 1000)

  };

  confirmarEliminar = async(seguimientoId: string) => {

    const alertOpt: Alert = new Alert();
      alertOpt.header = 'Alerta!';
      alertOpt.message = 'favor confirmar eliminación de seguimiento';
      alertOpt.buttons = [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => { 
            // console.log('Alert canceled');
          }
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: async() => { 
            await this.eliminarSeguimiento(seguimientoId);
          }
        }
      ];
      await this.alertService.simpleAlert(alertOpt);
  };

  eliminarSeguimiento = async(seguimientoId: string) => {

    const seguimiento: Seguimiento = new Seguimiento();
    seguimiento.id = seguimientoId;

     try {

      await this.loaderService.simpleLoader('cargando');
      await this.seguimientoService.seguimientoEliminarPorId(seguimiento);
      await this.loaderService.dismissLoader();

      // console.log('eliminarSeguimiento');
      await this.inicializar();
      
      
    } catch (error) {
      console.log('eliminarSeguimiento error', error);

      this.loaderService.dismissLoader();

      const alertOpt: Alert = new Alert();
      alertOpt.header = 'Error al eliminar seguimiento';
      alertOpt.message = 'Se ha producido un error, favor intentar más tarde';
      alertOpt.buttons = ['OK'];

      this.alertService.simpleAlert(alertOpt);
    }

  };

  editarSeguimiento = async(seguimiento: Seguimiento) => {
    
    this.Navparams.setData(seguimiento);
    this.router.navigateByUrl(`/seguimiento-editar/${ seguimiento.id }`);

  };

  formatearFecha = (fecha: any) => {

    const fechaNew = dayjs(fecha, 'YYYY-MM-DD').format('DD-MM-YYYY');
    // const fechaNew :string = dayjs(fecha).format('DD/MM/YYYY');
    return fechaNew;

  };

}

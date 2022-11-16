import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Alert } from 'src/app/models/alert';
import { Dispositivo } from 'src/app/models/dispositivo';
import { Programa } from 'src/app/models/programa';
import { AlertService } from 'src/app/services/alert.service';
import { LoaderService } from 'src/app/services/loader.service';
import { NavparamsService } from 'src/app/services/navparams.service';
import { ProgramasService } from 'src/app/services/programas.service';

@Component({
  selector: 'app-programas',
  templateUrl: './programas.page.html',
  styleUrls: ['./programas.page.scss'],
})
export class ProgramasPage {

  id: string;
  programas: Array<Programa> = [];

  constructor(
    private actRoute: ActivatedRoute,
    private loaderService: LoaderService,
    private alertService: AlertService,
    private router: Router,
    private programaService: ProgramasService,
    private Navparams: NavparamsService,
  ) {
   }

  inicializar = async() => {
    this.id = this.actRoute.snapshot.paramMap.get('id');
    await this.obtenerProgramas();
  };

  ionViewWillEnter() {
    this.inicializar();
  }

  agregarPrograma = () => {

    this.Navparams.setData(this.id);
    this.router.navigateByUrl('/programa');

  };

  confirmarEliminar = async(programaId: string) => {

    const alertOpt: Alert = new Alert();
      alertOpt.header = 'Alerta!';
      alertOpt.message = 'favor confirmar eliminación de programa';
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
            await this.eliminarPrograma(programaId);
          }
        }
      ];
      await this.alertService.simpleAlert(alertOpt);
  };

  eliminarPrograma = async(programaId: string) => {

    const programa: Programa = new Programa();
    programa.id = programaId;

     try {

      await this.loaderService.simpleLoader('cargando');
      await this.programaService.programaEliminarPorId(programa);
      await this.loaderService.dismissLoader();
      await this.inicializar();
      
    } catch (error) {
      console.log('eliminarPrograma error', error);

      this.loaderService.dismissLoader();

      const alertOpt: Alert = new Alert();
      alertOpt.header = 'Error al eliminar programa';
      alertOpt.message = 'Se ha producido un error, favor intentar más tarde';
      alertOpt.buttons = ['OK'];

      this.alertService.simpleAlert(alertOpt);
    }

  };

  obtenerProgramas = async() => {

    const dispositivo: Dispositivo = new Dispositivo();
    dispositivo.id = this.id;
    
    try {
      
      await this.loaderService.simpleLoader('cargando');
      this.programas = await this.programaService.programasObtener(dispositivo);
      await this.loaderService.dismissLoader();

    } catch (error) {
      
      await this.loaderService.dismissLoader();

      console.log('programasObtener error', error);

      const alertOpt: Alert = new Alert();
      alertOpt.header = 'Error al obtener programas';
      alertOpt.message = 'Se ha producido un error, favor intentar más tarde';
      alertOpt.buttons = ['OK'];

      await this.alertService.simpleAlert(alertOpt);
    }

  };

  editarPrograma = async(programa: Programa) => {
    
    this.Navparams.setData(programa);
    this.router.navigateByUrl(`/programa-editar/${ programa.id }`);

  };

  actualizarPrograma = async(event: any, id: string) => {
    
    const programa: Programa = new Programa();
    programa.id = id;
    programa.activo = event.detail.checked;
    
    try {

      await this.loaderService.simpleLoader('cargando');
      await this.programaService.programaActualizarPorId(programa);
      await this.loaderService.dismissLoader();
      await this.inicializar();
      
    } catch (error) {
      await this.loaderService.dismissLoader();

      console.log('actualizarPrograma error', error);

      const alertOpt: Alert = new Alert();
      alertOpt.header = 'Error al actualizar dispositivo';
      alertOpt.message ='Se ha producido un error, favor intentar más tarde';
      alertOpt.buttons = ['OK'];

      await this.alertService.simpleAlert(alertOpt);
    }
    
  };

  loadMore = (event: any) => {

    setTimeout(() => {
      
      event.target.complete();
      this.inicializar();
      if (this.programas.length === 1000) {
        event.target.disabled = true;
      }
    }, 1000)

  };

 
}

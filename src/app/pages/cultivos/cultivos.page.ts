import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { ActionSheetButton } from 'src/app/models/action-sheet-button';
import { Alert } from 'src/app/models/alert';
import { Cultivo } from 'src/app/models/cultivo';
import { AlertService } from 'src/app/services/alert.service';
import { CultivoService } from 'src/app/services/cultivo.service';
import { LoaderService } from 'src/app/services/loader.service';
import { NavparamsService } from 'src/app/services/navparams.service';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-cultivos',
  templateUrl: './cultivos.page.html',
  styleUrls: ['./cultivos.page.scss'],
})
export class CultivosPage {

  cultivos: Array<Cultivo> = [];
  id: string;

  constructor(
    private loaderService: LoaderService,
    private alertService: AlertService,
    private router: Router,
    private cultivoService: CultivoService,
    private Navparams: NavparamsService,
    private actRoute: ActivatedRoute,
    private actionSheetController: ActionSheetController,
  ) {
   }

  inicializar = async() => {
    this.id = this.actRoute.snapshot.paramMap.get('id');
    await this.obtenerCultivos();
  };

  ionViewWillEnter() {
    this.inicializar();
  }  

  obtenerCultivos = async() => {

    try {
      
      await this.loaderService.simpleLoader('cargando');
      this.cultivos = await this.cultivoService.cultivosObtener();
      await this.loaderService.dismissLoader();

    } catch (error) {
      
      await this.loaderService.dismissLoader();

      console.log('obtenerCultivos error', error);

      const alertOpt: Alert = new Alert();
      alertOpt.header = 'Error al obtener Cultivos';
      alertOpt.message = 'Se ha producido un error, favor intentar más tarde';
      alertOpt.buttons = ['OK'];

      await this.alertService.simpleAlert(alertOpt);
    }

  };

  editarCultivo = (cultivo: Cultivo) => {

    this.Navparams.setData(cultivo);
    this.router.navigateByUrl(`/cultivo-editar/${ cultivo.id }`);

  };

  confirmarEliminar = async(cultivoId: string) => {

    const alertOpt: Alert = new Alert();
      alertOpt.header = 'Alerta!';
      alertOpt.message = 'favor confirmar eliminación de cultivo';
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
            await this.eliminarCultivo(cultivoId);
          }
        }
      ];
      await this.alertService.simpleAlert(alertOpt);

  };

  eliminarCultivo = async(cultivoId: string) => {

    const cultivo: Cultivo = new Cultivo();
    cultivo.id = cultivoId;

     try {

      await this.loaderService.simpleLoader('cargando');
      await this.cultivoService.cultivoEliminarPorId(cultivo);
      await this.loaderService.dismissLoader();
      await this.inicializar();
      
    } catch (error) {
      console.log('eliminarCultivo error', error);

      this.loaderService.dismissLoader();

      const alertOpt: Alert = new Alert();
      alertOpt.header = 'Error al eliminar cultivo';
      alertOpt.message = 'Se ha producido un error, favor intentar más tarde';
      alertOpt.buttons = ['OK'];

      this.alertService.simpleAlert(alertOpt);
    }

  };

  loadMore = (event: any) => {

    setTimeout(() => {
      
      event.target.complete();
      this.inicializar();
      if (this.cultivos.length === 1000) {
        event.target.disabled = true;
      }
    }, 1000)

  };

  obtenerOpciones = async(cultivo: Cultivo) => {

    const listaOpciones: Array<ActionSheetButton> = [];

    let opcion: ActionSheetButton = {
      text: 'ver seguimientos',
      icon: 'bookmarks-outline',
      handler: () => {

        this.router.navigateByUrl(`/seguimientos/${ cultivo.id }`);
      }
    };
    listaOpciones.push(opcion);

    const cancelBoton: ActionSheetButton = { text: 'Cancel', role: 'cancel', icon: 'close-outline' };
    listaOpciones.push(cancelBoton);
  
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      buttons: listaOpciones
    });

    await actionSheet.present();

  };

  formatearFecha = (fecha: any) => {

    const ahora = dayjs(fecha, 'YYYY-MM-DD').format('YYYY-MM-DD');
    return ahora;

    // const fechaNew :string = dayjs(fecha).format('DD/MM/YYYY');
    // return fechaNew;

  };

  agregarCultivo = () => {

    this.router.navigateByUrl('/cultivo');

  };

}

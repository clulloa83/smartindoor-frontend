import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { ActionSheetButton } from 'src/app/models/action-sheet-button';
import { Alert } from 'src/app/models/alert';
import { Dispositivo } from 'src/app/models/dispositivo';
import { AlertService } from 'src/app/services/alert.service';
import { DispositivosService } from 'src/app/services/dispositivos.service';
import { LoaderService } from 'src/app/services/loader.service';
import { NavparamsService } from 'src/app/services/navparams.service';

@Component({
  selector: 'app-dispositivos',
  templateUrl: './dispositivos.page.html',
  styleUrls: ['./dispositivos.page.scss'],
})
export class DispositivosPage {

  dispositivos: Array<Dispositivo> = [];

  constructor(
    private dispositivosService: DispositivosService,
    private actionSheetController: ActionSheetController,
    private router: Router,
    private loaderService: LoaderService,
    private alertService: AlertService,
    private Navparams: NavparamsService,
  ) { 
    // this.inicializar();

  }

  inicializar = async() => {
    await this.obtenerDispositivos();
  };

  ionViewWillEnter() {
    this.inicializar();
  }  

  obtenerDispositivos = async() => {

    await this.loaderService.simpleLoader('cargando');
    
    try {
      
      this.dispositivos = await this.dispositivosService.dispositivosObtener();
      // console.log('this.dispositivos', this.dispositivos);

      await this.loaderService.dismissLoader();

    } catch (error) {
      
      await this.loaderService.dismissLoader();

      console.log('obtenerDispositivos2 error', error);

      const alertOpt: Alert = new Alert();
      alertOpt.header = 'Error al obtener dispositivos';
      alertOpt.message = 'Se ha producido un error, favor intentar más tarde';
      alertOpt.buttons = ['OK'];

      await this.alertService.simpleAlert(alertOpt);
    }

  }

  loadMore = (event: any) => {

    setTimeout(() => {
    
      event.target.complete();
      this.inicializar();
      if (this.dispositivos.length === 1000) {
        event.target.disabled = true;
      }
    }, 1000)

  };

  obtenerOpciones = async(dispositivo: Dispositivo) => {

    const listaOpciones: Array<ActionSheetButton> = [];

    const opcionTemperatura = dispositivo.tipos.find(item => item === 'temperatura');
    if(opcionTemperatura){

      let opcion: ActionSheetButton = {
        text: 'ver temperatura',
        icon: 'thermometer-outline',
        handler: () => {
          this.router.navigate([`temperatura/${ dispositivo.id }`]);
        }
      };
      listaOpciones.push(opcion);

      opcion = {
        text: 'ver grafico',
        icon: 'stats-chart-outline',
        handler: () => {
          this.router.navigate([`grafico/${ dispositivo.id }`]);
        }
      };
      listaOpciones.push(opcion);
    };

    const opcionInterruptor = dispositivo.tipos.find(item => item === 'interruptor');
    if(opcionInterruptor){

      let opcion: ActionSheetButton = {
        text: 'ver programas',
        icon: 'alarm-outline',
        handler: () => {
          this.router.navigate([`programas/${ dispositivo.id }`]);
        }
      };
      listaOpciones.push(opcion);

    };
    
    const cancelBoton: ActionSheetButton = { text: 'Cancel', role: 'cancel', icon: 'close-outline' };
    listaOpciones.push(cancelBoton);
  
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      buttons: listaOpciones
    });

    await actionSheet.present();

  };

  editarDispositivo = async(dispositivo: Dispositivo) => {

    this.Navparams.setData(dispositivo);
    this.router.navigateByUrl(`/dispositivo-editar/${ dispositivo.id }`);

  };

  confirmarEliminar = async(dispositivoId: string) => {

    const alertOpt: Alert = new Alert();
      alertOpt.header = 'Alerta!';
      alertOpt.message = 'favor confirmar eliminación de dispositivo';
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
            await this.eliminarDispositivo(dispositivoId);
          }
        }
      ];
      await this.alertService.simpleAlert(alertOpt);
  };

  eliminarDispositivo = async(dispositivoId: string) => {

    const dispositivo: Dispositivo = new Dispositivo();
    dispositivo.id = dispositivoId;

     try {

      await this.loaderService.simpleLoader('cargando');
      await this.dispositivosService.dispositivoEliminarPorId(dispositivo);
      await this.loaderService.dismissLoader();
      await this.inicializar();
      
    } catch (error) {
      console.log('eliminarDispositivo error', error);

      this.loaderService.dismissLoader();

      const alertOpt: Alert = new Alert();
      alertOpt.header = 'Error al eliminar dispositivo';
      alertOpt.message = 'Se ha producido un error, favor intentar más tarde';
      alertOpt.buttons = ['OK'];

      this.alertService.simpleAlert(alertOpt);
    }

  };

  agregarDispositivo = () => {

    this.router.navigateByUrl('/dispositivo');

  };

}

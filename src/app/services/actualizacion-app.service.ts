import { Injectable, ApplicationRef } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { ToastController } from '@ionic/angular';
// import { interval } from 'rxjs';
// import { filter, map } from 'rxjs/operators';
import { concat, interval } from 'rxjs';
import { first } from 'rxjs/operators'
import { SeguimientoService } from './seguimiento.service';

const intervalo = 30;
const intervaloHoras = 8;

// const tiempoIntervalo = intervalo*1000;

@Injectable({
  providedIn: 'root'
})
export class ActualizacionAppService {

  constructor(
    private update: SwUpdate,
    private appRef: ApplicationRef,
    private toastController: ToastController,
    private seguimientosService: SeguimientoService,
  ) { }

  /**
   * metodo que detecta y actualiza la version de la aplicacion
   */
   public updateClient = () => {

    if (!this.update.isEnabled) {
      console.log('No habilitado');
      return;
    }
    this.update.available.subscribe((event) => {
      //console.log(`Actual`, event.current, `disponible `, event.available);
      if (confirm('actualización disponible para la aplicación por favor confirmar')) {
        this.update.activateUpdate().then(() => location.reload());
      }
    });

    this.update.activated.subscribe((event) => {
      //console.log(`Actual`, event.previous, `disponible `, event.current);
    });


    // if (this.update.isEnabled) {

    //   this.update.versionUpdates
    //   .toPromise()
    //   .then(evt => {
    //     switch (evt.type) {
    //       case 'VERSION_DETECTED':
    //         console.log(`Downloading new app version: ${evt.version.hash}`);
    //         break;
    //       case 'VERSION_READY':
    //         console.log(`Current app version: ${evt.currentVersion.hash}`);
    //         console.log(`New app version ready for use: ${evt.latestVersion.hash}`);

    //         if (confirm('actualización disponible para la aplicación por favor confirmar')) {
    //           this.update.activateUpdate().then(() => document.location.reload());
    //         };

    //         this.update.activateUpdate()
    //         .then(result => {
    //           console.log('activateUpdate result', result);
    //         })
    //         .catch(error => {
    //           console.log('activateUpdate error', error);
    //         });

    //         break;
    //       case 'VERSION_INSTALLATION_FAILED':
    //         console.log(`Failed to install app version '${evt.version.hash}': ${evt.error}`);
    //         break;
    //     }
    //   })

    // }
    // else{
    //   console.log('SwUpdate No habilitado');
    //   return;
    // };

  };

  /**
   * metodo que verifica cada intervalo actualizaciones
   */
   public checkUpdate = () => {

    this.appRef.isStable.subscribe((isStable) => {
      if (isStable) {

        const timeInterval = interval(intervaloHoras * 60 * 60 * 1000);

        timeInterval.subscribe(() => {
          this.update.checkForUpdate().then(() => console.log('comprobado'));
          console.log('actualización comprobada');
        });
      }
    });

    //    // Allow the app to stabilize first, before starting
    // // polling for updates with `interval()`.
    // const appIsStable$ = this.appRef.isStable.pipe(first(isStable => isStable === true));
    // const everySixHours$ = interval(6 * 60 * 60 * 1000);
    // const everySixHoursOnceAppIsStable$ = concat(appIsStable$, everySixHours$);

    // everySixHoursOnceAppIsStable$.subscribe(() => this.update.checkForUpdate());

  };


   /**
   * verifica red enviando snackbar infomativo
   */
    public checkInternet = () => {

      addEventListener('offline', e => {
        this.displayToast('offline', 'Por favor checkear conexión');
      });
  
      addEventListener('online', e => {
        this.displayToast('online', 'Tiene conexión');
        this.verificarSincronizaciones();
      });
    };

    displayToast = (header: string, message: string) => {

      // Stop multiple toasts 
      try {
        this.toastController.dismiss().then(() => {
        }).catch(() => {
        }).finally(() => {
          console.log('Closed')
        });
      } catch(e) {}      

      this.toastController.create({
        header: header,
        message: message,
        position: 'top',
        cssClass: 'toast-custom-class',
        buttons: [
          {
            side: 'end',
            icon: 'person',
            handler: () => {
              console.log('');
            }
          }, {
            side: 'end',
            text: 'Close',
            role: 'cancel',
            handler: () => {
              console.log('');
            }
          }
        ]
      }).then((toast) => {
        toast.present();
      });
    };

    verificarSincronizaciones = async() => {

      try {

        await this.sincronizacionesSeguimiento();
        
      } catch (error) {
        console.log('error', error);
      }

    }

    sincronizacionesSeguimiento = async() => {

      try {

        const seguimientos = await this.seguimientosService.seguimientosSincronizadosObtener();
        if (seguimientos.length > 0){
          this.displayToast('Sincronización Seguimientos', `Se ${ seguimientos.length > 1 ? 'han':'ha' } sincronizado ${ seguimientos.length } ${ seguimientos.length > 1 ? 'seguimientos':'seguimiento' }`);
        }
        
      } catch (error) {
        console.log('error', error);

      }
    };
}

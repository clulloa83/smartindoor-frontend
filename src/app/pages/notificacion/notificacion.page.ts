import { Component, OnInit } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { ToastController } from '@ionic/angular';
import { NotificacionService } from 'src/app/services/notificacion.service';

@Component({
  selector: 'app-notificacion',
  templateUrl: './notificacion.page.html',
  styleUrls: ['./notificacion.page.scss'],
})
export class NotificacionPage {
  
  isEnabled = this.swPush.isEnabled;
  isGranted = Notification.permission === 'granted';

  constructor(
    private swPush: SwPush,
    private notificacionService: NotificacionService,
    public toastController: ToastController
  ) { }

  suscribir = async() => {

    if (!this.swPush.isEnabled) {
      this.isEnabled = false;
      console.log('La notificación no está habilitada');
      return;
    }
    else{
      
      this.isEnabled = true;

      await this.notificacionService.suscribirNotificaciones()
      .then(() => {
        this.isGranted = true;
        return this.displayToast('Acción', 'Notificaciones activadas!');
      })
      .catch(error => {
        this.isGranted = false;
        console.log('error' , error);
      });
    }
  };

  dessuscribir = () => {
    this.notificacionService.dessuscribirNotificaciones();
  };

  displayToast = (header: string, message: string) => {

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

}

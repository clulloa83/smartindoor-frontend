import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Alert } from '../models/alert';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private alertController: AlertController,
  ) { }

  simpleAlert = async(alertOpt: Alert) => {

    try {

      await this.alertController.create(alertOpt)
      .then(alert => {
        alert.present();
      });      
      
    } catch (error) {
      console.log('error simpleAlert', error);
      throw new Error(error);
    };
    
  };

}

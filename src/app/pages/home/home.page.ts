import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Alert } from 'src/app/models/alert';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private authService: AuthService,
    private router: Router,
    private menuController: MenuController,
    private loaderService: LoaderService,
    private alertService: AlertService,
    ) {}

    toggleTheme = (event: any) => {
      if(event.detail.checked){
        document.body.setAttribute('color-theme', 'dark');
      }
      else{
        document.body.setAttribute('color-theme', 'light');
      }
    };

    logout = async() => {

      await this.loaderService.simpleLoader('cargando');

      try {
        
        await this.authService.logout();
        await this.menuController.enable(false);

        await this.loaderService.dismissLoader();
        this.router.navigateByUrl('/login', { replaceUrl: true });
        
      } catch (error) {

        console.log('error logout', error);
        
        await this.loaderService.dismissLoader();

        const alertOpt: Alert = new Alert();
        alertOpt.header = 'Error en Logout';
        alertOpt.message = 'Se ha producido un error, favor intentar más tarde';
        alertOpt.buttons = ['OK'];
  
        await this.alertService.simpleAlert(alertOpt);
        
      }

    };

    dispositivosBluetooth = async() => {

      try {

        const options = {
          acceptAllDevices:  true,
          // optionalServices: ['device_information']
        };
  
        const device = await (window.navigator as any).bluetooth.requestDevice(options);
        console.log('device', device);


        
      } catch (error) {
        console.error('error', error);
      }
      
    }

}

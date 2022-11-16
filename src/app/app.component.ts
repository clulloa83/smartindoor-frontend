import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ActualizacionAppService } from './services/actualizacion-app.service';
import { AuthService } from './services/auth.service';
import { NotificacionService } from './services/notificacion.service';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(
    private storageService: StorageService,
    private notificacionService: NotificacionService,
    private authService: AuthService,
    private menuController: MenuController,
    private actualizacionApp: ActualizacionAppService,
  ) {
    this.inicializar();
  }

  inicializar = async() => {
    await this.storageService.init();
    await this.notificacionService.recibeNotificaciones();
    
    this.actualizacionApp.checkInternet();
    this.actualizacionApp.checkUpdate();
    this.actualizacionApp.updateClient();

    const auth = await this.authService.isAuthenticated();
    if(auth){
      this.menuController.enable(true);
    }
    else{
      this.menuController.enable(false);
    };

  };

}

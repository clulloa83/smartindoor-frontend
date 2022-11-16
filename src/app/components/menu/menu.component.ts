import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Alert } from 'src/app/models/alert';
import { Menu } from 'src/app/models/menu';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  menus: Array<Menu>;

  constructor(
    private menuService: MenuService, 
    private authService: AuthService,
    private router: Router,
    private menuController: MenuController,
    private loaderService: LoaderService,
    private alertService: AlertService,
  ) {
    this.cargaMenu();
   }

  ngOnInit() {
    // this.cargaMenu();
  }

  cargaMenu = async() => {
    this.menus = await this.menuService.menuPerfilAdminObtener();
  }

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

}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Alert } from 'src/app/models/alert';
import { Usuario } from 'src/app/models/usuario';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form = new FormGroup({
    correo: new FormControl('', Validators.compose([Validators.maxLength(70), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'),Validators.required])),
    contraseña: new FormControl('', Validators.required)
  });
  
  usuario = new Usuario();

  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

  constructor(
    private authService: AuthService,
    private router: Router,
    private loaderService: LoaderService,
    private menuController: MenuController,
    private alertService: AlertService,
  ) { }

  ngOnInit() {
  }

  logear = async () => {

    await this.loaderService.simpleLoader('cargando');

    try {

      const correo: string = this.form.controls.correo.value;
      const contraseña: string = this.form.controls.contraseña.value;

      await this.authService.login(correo, contraseña)
      .then(result => {
        this.cargarMenu();
        this.loaderService.dismissLoader();
        this.router.navigateByUrl('/home', { replaceUrl: true });
      })
      
    } catch (err) {

      await this.loaderService.dismissLoader();

      const alertOpt: Alert = new Alert();
      alertOpt.header = 'Error en Login';
      // alertOpt.message = err.error.errors[0];
      alertOpt.message = 'Se ha producido un error, favor intentar más tarde';
      
      alertOpt.buttons = ['OK'];

      await this.alertService.simpleAlert(alertOpt);
     
    };

  };

  cargarMenu = async() => {
    this.menuController.enable(true);
  };

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

}

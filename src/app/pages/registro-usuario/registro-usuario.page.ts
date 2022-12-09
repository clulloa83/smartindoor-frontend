import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Alert } from 'src/app/models/alert';
import { Usuario } from 'src/app/models/usuario';
import { AlertService } from 'src/app/services/alert.service';
import { LoaderService } from 'src/app/services/loader.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.page.html',
  styleUrls: ['./registro-usuario.page.scss'],
})
export class RegistroUsuarioPage implements OnInit {

  form = new FormGroup({
    nombres: new FormControl('', Validators.required),
    apellidos: new FormControl('', Validators.required),
    correo: new FormControl('', Validators.compose([Validators.maxLength(70), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'),Validators.required])),
    contraseña: new FormControl('', Validators.required)
  });

  constructor(
    private router: Router,
    private loaderService: LoaderService,
    private alertService: AlertService,
    private usuarioService: UsuariosService
  ) { }

  ngOnInit() {
  }

  registrar = async () => {

    try {

      const usuario: Usuario = new Usuario();
      usuario.nombres = this.form.value.nombres;
      usuario.apellidos = this.form.value.apellidos;
      usuario.correo = this.form.value.correo;
      usuario.contraseña = this.form.value.contraseña;

      await this.loaderService.simpleLoader('cargando');
      await this.usuarioService.registrarUsuario(usuario);
      await this.loaderService.dismissLoader();
      const alertOpt: Alert = new Alert();
      alertOpt.header = 'Registro Usuario';
      alertOpt.message = 'Se ha registrado correctamente';
      alertOpt.buttons = [
        {
          text: 'OK',
          role: 'confirm',
          handler: async() => { 
            await this.router.navigate([`login`]);
          }
        }
      ];
      this.alertService.simpleAlert(alertOpt);      

      
    } catch (error) {
      console.log('error', error);

      this.loaderService.dismissLoader();

      const alertOpt: Alert = new Alert();
      alertOpt.header = 'Error al guardar dispositivo';
      alertOpt.message = 'Se ha producido un error, favor intentar más tarde';
      alertOpt.buttons = ['OK'];
      this.alertService.simpleAlert(alertOpt);
    }

  };

}

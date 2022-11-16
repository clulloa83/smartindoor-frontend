import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Alert } from 'src/app/models/alert';
import { Dispositivo } from 'src/app/models/dispositivo';
import { AlertService } from 'src/app/services/alert.service';
import { DispositivosService } from 'src/app/services/dispositivos.service';
import { LoaderService } from 'src/app/services/loader.service';

interface Icategoria {
  id: string;
  checked: boolean;
};
interface Itipo {
  id: string;
  checked: boolean;
};

@Component({
  selector: 'app-dispositivo',
  templateUrl: './dispositivo.page.html',
  styleUrls: ['./dispositivo.page.scss'],
})
export class DispositivoPage {

  categorias: Icategoria[] = [
    { id: 'sensor', checked: false },
    { id: 'modulo', checked: false },
    { id: 'motor', checked: false },
  ];

  tipos: Itipo[] = [
    { id: 'temperatura', checked: true },
    { id: 'humedad', checked: false },
    { id: 'interruptor', checked: false },
  ];

  form: FormGroup;

  constructor(
    private dispositivosService: DispositivosService,
    private loaderService: LoaderService,
    private alertService: AlertService,
    private router: Router
  ) {
    this.inicializar();
   }

  inicializar = () => {

    this.form = new FormGroup({
      nombre: new FormControl('', [ Validators.required, Validators.maxLength(100)]),
      icon: new FormControl(''),
      ubicacion: new FormControl(''),
      categoria: new FormControl('', [ Validators.required ]),
      tipos: new FormArray([], [ Validators.required, this.minSelectedCheckboxes(1)]),
    });

    this.tipos.forEach(t => {
      this.tiposFormArray.push(new FormControl(t.checked));
    });

  };

  minSelectedCheckboxes = (min = 1) => {
    const validator: ValidatorFn = (formArray: FormArray) => {
      const totalSelected = formArray.controls
        // get a list of checkbox values (boolean)
        .map(control => control.value)
        // total up the number of checked checkboxes
        .reduce((prev, next) => next ? prev + next : prev, 0);
  
      // if the total is not greater than the minimum, return the error message
      return totalSelected >= min ? null : { required: true };
    };
  
    return validator;
  }

  get tiposFormArray() {
    return this.form.controls.tipos as FormArray;
  };

  guardarDispositivo = async() => {

    const tiposSeleccion = this.form.value.tipos
      .map((v, i) => v ? this.tipos[i].id : null)
      .filter(v => v !== null);

    const dispositivo: Dispositivo = new Dispositivo();
    dispositivo.nombre = this.form.value.nombre;
    dispositivo.icon = this.form.value.icon;
    dispositivo.ubicacion = this.form.value.ubicacion;
    dispositivo.categoria = this.form.value.categoria;
    dispositivo.tipos = tiposSeleccion;

    try {

      await this.loaderService.simpleLoader('cargando');
      await this.dispositivosService.dispositivoGuardar(dispositivo);
      await this.loaderService.dismissLoader();
      this.router.navigate([`dispositivos`])
      
    } catch (error) {
      console.log('guardarDispositivo error', error);

      this.loaderService.dismissLoader();

      const alertOpt: Alert = new Alert();
      alertOpt.header = 'Error al guardar dispositivo';
      alertOpt.message = 'Se ha producido un error, favor intentar más tarde';
      alertOpt.buttons = ['OK'];
      this.alertService.simpleAlert(alertOpt);
    }

  };

}

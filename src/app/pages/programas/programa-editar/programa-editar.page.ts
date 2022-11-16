import { Component, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavparamsService } from 'src/app/services/navparams.service';
import * as dayjs from 'dayjs';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';
import { Programa } from 'src/app/models/programa';
import { LoaderService } from 'src/app/services/loader.service';
import { AlertService } from 'src/app/services/alert.service';
import { Alert } from 'src/app/models/alert';
import { ProgramasService } from 'src/app/services/programas.service';

interface Iaccion {
  id: string;
  checked: boolean;
};

interface Idia {
  id: string;
  checked: boolean;
};

@Component({
  selector: 'app-programa-editar',
  templateUrl: './programa-editar.page.html',
  styleUrls: ['./programa-editar.page.scss'],
})
export class ProgramaEditarPage {

  id: any;
  programa: Programa;

  @ViewChild(IonModal) modal: IonModal;

  acciones: Iaccion[] = [
    { id: 'ENCENDIDO', checked: true },
    { id: 'APAGADO', checked: false }
  ];

  dias: Idia[] = [
    { id: 'Lun', checked: false },
    { id: 'Mar', checked: false },
    { id: 'Mie', checked: false },
    { id: 'Jue', checked: false },
    { id: 'Vie', checked: false },
    { id: 'Sab', checked: false },
    { id: 'Dom', checked: false }
  ];
  
  form: FormGroup;
  
  constructor(
    private actRoute: ActivatedRoute,
    private Navparams: NavparamsService,
    private loaderService: LoaderService,
    private alertService: AlertService,
    private programaService: ProgramasService,
    private router: Router,
  ) { 

    this.inicializar();

  }

  inicializar = () => {
    
    this.id = this.actRoute.snapshot.paramMap.get('id');
    this.programa = this.Navparams.getData();
    
    const fecha = dayjs(this.fechaObtener(), 'YYYY-MM-DD').format();

    this.form = new FormGroup({
      hora: new FormControl(fecha, Validators.required),
      accion: new FormControl('', Validators.required),
      dias: new FormArray([]),
    });

    const diasForm = this.programa.dias;
    this.dias.forEach(d => {
      const diaSeleccionado = diasForm.find(df => df === d.id);
      if(diaSeleccionado){
        d.checked = true;
        this.diasFormArray.push(new FormControl(true));
      }
      else{
        d.checked = false;
        this.diasFormArray.push(new FormControl(false));
      };
    });

    this.form.patchValue({ accion: this.programa.accion });

  }

  get diasFormArray() {

    return this.form.controls.dias as FormArray;

  };

  get repetirDias (){

    const diasSeleccionados: Iaccion[] = this.form.value.dias
    .map((checked, i) => checked ? this.dias[i].id : null)
    .filter(v => v !== null);

    if(diasSeleccionados.length < 1){
      return 'Una vez';
    }
    if(diasSeleccionados.length == this.dias.length){
      return 'Cada día';
    }

    return diasSeleccionados;
   
  };

  diasObtener = () => {
    
    const diasForm = this.programa.dias;
    
    this.dias.forEach(d => {
      const diaSeleccionado = diasForm.find(df => df === d.id);
      if(diaSeleccionado){
        d.checked = true;
      }
      else{
        d.checked = false;
      };
    });

    return this.dias.map(d => {
      return d.checked;
    });

  };

  fechaObtener = () => {

    const horaForm: string = this.programa.hora;
    
    const hora = horaForm.split(':')[0];
    const minuto = horaForm.split(':')[1];
    const fecha = new Date(Date.now());
    const año = fecha.getFullYear();
    const mes = fecha.getMonth();
    const dia = fecha.getDay();
    return new Date(año, mes, dia, Number(hora), Number(minuto));

  };

  cancel = () => {

    const diasFormNew = this.diasObtener();
    this.form.patchValue({ dias: diasFormNew });

    this.modal.dismiss(null, 'cancel');
  };

  confirm = () => {
    this.modal.dismiss(null, 'confirm');
  };

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;

    switch (ev.detail.role) {
      case 'backdrop':
        const diasFormNew = this.diasObtener();
        this.form.patchValue({ dias: diasFormNew });
        break;
      case 'confirm':
        break;
    };
  };

  guardarPrograma = async() => {

    const diasSeleccionados = this.form.value.dias
    .map((checked, i) => checked ? this.dias[i].id : null)
    .filter(v => v !== null);

    const programa: Programa = new Programa();
    programa.id = this.id;
    programa.accion = this.form.value.accion;
    programa.hora = dayjs(this.form.value.hora).format('HH:mm');
    programa.dias = diasSeleccionados;

    try {
      
      await this.loaderService.simpleLoader('cargando');
      await this.programaService.programaActualizarPorId(programa);
      await this.loaderService.dismissLoader();

      const alertOpt: Alert = new Alert();
      alertOpt.header = 'Edición Programa';
      alertOpt.message = 'Se ha editado correctamente el programa';
      alertOpt.buttons = [
        {
          text: 'OK',
          role: 'confirm',
          handler: async() => { 
            await this.router.navigate([`programas/${ this.programa.dispositivo }`])

          }
        }
      ];
      this.alertService.simpleAlert(alertOpt);

    } catch (error) {

      console.log('programaActualizarPorId error', error);

      this.loaderService.dismissLoader();

      const alertOpt: Alert = new Alert();
      alertOpt.header = 'Error al editar programa';
      alertOpt.message = 'Se ha producido un error, favor intentar más tarde';
      alertOpt.buttons = ['OK'];
      this.alertService.simpleAlert(alertOpt);
    }

  };

}

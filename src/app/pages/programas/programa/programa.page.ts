import { Component, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { ProgramasService } from 'src/app/services/programas.service';
import * as dayjs from 'dayjs';
// import 'dayjs/locale/es';
import { Programa } from 'src/app/models/programa';
import { NavparamsService } from 'src/app/services/navparams.service';
import { LoaderService } from 'src/app/services/loader.service';
import { AlertService } from 'src/app/services/alert.service';
import { Alert } from 'src/app/models/alert';

interface Iaccion {
  id: string;
  checked: boolean;
};

interface Idia {
  id: string;
  checked: boolean;
};

@Component({
  selector: 'app-programa',
  templateUrl: './programa.page.html',
  styleUrls: ['./programa.page.scss'],
})
export class ProgramaPage {
  
  @ViewChild(IonModal) modal: IonModal;
  
  id: any;
  dispositivoId: any;

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
    private programaService: ProgramasService,
    private actRoute: ActivatedRoute,
    private Navparams: NavparamsService,
    private loaderService: LoaderService,
    private alertService: AlertService,
    private router: Router,
  ) {
    
    this.inicializar();
   }

  inicializar = () => {

    const ahora = dayjs(new Date(), 'YYYY-MM-DD').format();
    
    this.id = this.actRoute.snapshot.paramMap.get('id');
    this.dispositivoId = this.Navparams.getData();

    this.form = new FormGroup({
      hora: new FormControl(ahora, Validators.required),
      accion: new FormControl('', Validators.required),
      dias: new FormArray([]),
    });


    this.dias.forEach(d => {
      this.diasFormArray.push(new FormControl(d.checked));
    });

    this.form.patchValue({ accion: this.acciones.find(ac => ac.checked === true).id });

  };

  get diasFormArray() {
    return this.form.controls.dias as FormArray;
  }

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
    
    this.dias.forEach(d => {
         d.checked = false;
    });

    return this.dias.map(d => {
      return d.checked;
    });

  };

  cancel = () => {

    const diasFormNew = this.diasObtener();
    this.form.patchValue({ dias: diasFormNew });

    this.modal.dismiss(null, 'cancel');
  }

  confirm = () => {
    this.modal.dismiss(null, 'confirm');
  }

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
  }  

  guardarPrograma = async() => {
    
    const diasSeleccionados = this.form.value.dias
    .map((checked, i) => checked ? this.dias[i].id : null)
    .filter(v => v !== null);
    
    const programa: Programa = new Programa();
    programa.dispositivo.id = this.dispositivoId;
    programa.accion = this.form.value.accion;
    programa.hora = dayjs(this.form.value.hora).format('HH:mm');
    programa.dias = diasSeleccionados;

    try {

      await this.loaderService.simpleLoader('cargando');
      await this.programaService.programaGuardar(programa);
      await this.loaderService.dismissLoader();
      await this.router.navigate([`programas/${ this.dispositivoId }`])
      
    } catch (error) {
      console.log('guardarPrograma error', error);

      this.loaderService.dismissLoader();

      const alertOpt: Alert = new Alert();
      alertOpt.header = 'Error al guardar programa';
      alertOpt.message = 'Se ha producido un error, favor intentar más tarde';
      alertOpt.buttons = ['OK'];
      this.alertService.simpleAlert(alertOpt);
    }

  };

}

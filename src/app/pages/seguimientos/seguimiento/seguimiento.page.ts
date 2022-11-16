import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Seguimiento } from 'src/app/models/seguimiento';
import { AlertService } from 'src/app/services/alert.service';
import { LoaderService } from 'src/app/services/loader.service';
import { SeguimientoService } from 'src/app/services/seguimiento.service';
import { Alert } from 'src/app/models/alert';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';
import { StorageService } from 'src/app/services/storage.service';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-seguimiento',
  templateUrl: './seguimiento.page.html',
  styleUrls: ['./seguimiento.page.scss'],
})
export class SeguimientoPage {

  id: string;
  form: FormGroup;
  captures: any[] = [];
  @ViewChild(IonModal) modal: IonModal;
  @ViewChild('video') public video: ElementRef;

  constructor(
    private loaderService: LoaderService,
    private alertService: AlertService,
    private router: Router,
    private seguimientoService: SeguimientoService,
    private actRoute: ActivatedRoute,
    private storageService: StorageService
  ) {

    // console.log('constructor');
    this.inicializar();
   }

  inicializar = () => {

    const ahora = dayjs(new Date(), 'YYYY-MM-DD').format();

    this.id = this.actRoute.snapshot.paramMap.get('id');
    this.form = new FormGroup({
      observacion: new FormControl('', Validators.required),
      fecha: new FormControl(ahora, Validators.required),
    });

    // const fechaNow = new Date();
    // this.form.patchValue({ fecha: fechaNow.toLocaleDateString('sv') });
  };

  guardarSeguimiento = async() => {

    const seguimiento: Seguimiento = new Seguimiento();
    seguimiento.cultivo.id = this.id;
    seguimiento.observacion = this.form.value.observacion;
    
    seguimiento.fecha = this.form.value.fecha;

    const capturesBlobs = [];
    for (let i = 0; i < this.captures.length; i++) {
      const element = this.captures[i];
      const imageBlob = this.dataURItoBlob(element.split(',')[1]);
      const imageFile = new File([imageBlob], `capture${ i }`, { type: 'image/png' });
      capturesBlobs.push(imageFile);
    };
    seguimiento.capturas = capturesBlobs;

    try {

      await this.loaderService.simpleLoader('cargando');
      await this.seguimientoService.seguimientoGuardar(seguimiento);
      await this.loaderService.dismissLoader();

      await this.router.navigateByUrl(`/seguimientos/${ this.id }`)
      
    } catch (error) {
      console.log('guardarSeguimiento error', error);

      // //Procedimiento para almacanear peticion de registro en indexedDB
      // const seguimientos: any[] = await this.seguimientoService.seguimientosObtenerStorage();
      // seguimientos.push(seguimiento);
      // this.storageService.set('seguimientos',seguimientos);
      // this.storageService.set('seguimientos-sync',[]);

      this.porSincronizar(seguimiento);
      
      this.seguimientoService.backgroundSync();

      this.loaderService.dismissLoader();

      const alertOpt: Alert = new Alert();
      alertOpt.header = 'Error al registrar seguimiento';
      alertOpt.message = 'Sin Internet. El seguimiento se sincronizará automáticamente al retomar conectividad';
      alertOpt.buttons = [
        {
          text: 'OK',
          role: 'confirm',
          handler: async() => { 
            this.router.navigateByUrl(`/seguimientos/${ this.id }`)
          }
        }
      ];
      this.alertService.simpleAlert(alertOpt);
    };

  };

  cancel = () => {
    this.detenerCamara();
    this.modal.dismiss(null, 'cancel');
  }

  confirm = () => {
    this.detenerCamara();
    this.modal.dismiss(null, 'confirm');
  }

  onWillDismiss = async(event: Event) => {

    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    switch (ev.detail.role) {
      case 'backdrop':
        this.detenerCamara();
        break;
      case 'confirm':
        break;
    };

  };

  dataURItoBlob = (dataURI) => {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/png' });    
    return blob;
  };

  detenerCamara = async() => {
    
    const stream = this.video.nativeElement.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach(function(track) {
      track.stop();
    });
    this.video.nativeElement.srcObject = null;

  };

  porSincronizar = async(seguimiento: Seguimiento) => {

    
      //Procedimiento para almacanear peticion de registro en indexedDB
      const seguimientos: any[] = await this.seguimientoService.seguimientosObtenerStorage();
      seguimientos.push(seguimiento);
      this.storageService.set('seguimientos',seguimientos);
      this.storageService.set('seguimientos-sync',[]);

  }

}

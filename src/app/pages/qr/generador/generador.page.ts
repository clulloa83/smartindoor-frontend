import { Component, OnInit } from '@angular/core';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';

@Component({
  selector: 'app-generador',
  templateUrl: './generador.page.html',
  styleUrls: ['./generador.page.scss'],
})
export class GeneradorPage implements OnInit {

  title = 'ngx-qrcode-demo';
  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.LOW;
  value = 'Techiediaries';

  valor = JSON.stringify({
    mensaje: 'hola mundo'
  });
  
  constructor() { }

  ngOnInit() {
  }

}

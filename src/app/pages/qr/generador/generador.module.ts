import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeneradorPageRoutingModule } from './generador-routing.module';

import { GeneradorPage } from './generador.page';
// import { ComponentsModule } from 'src/app/components/components.module';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GeneradorPageRoutingModule,
    // ComponentsModule,
    NgxQRCodeModule
  ],
  declarations: [GeneradorPage]
})
export class GeneradorPageModule {}

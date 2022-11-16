import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LectorPageRoutingModule } from './lector-routing.module';

import { LectorPage } from './lector.page';
import { ZXingScannerModule } from '@zxing/ngx-scanner';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LectorPageRoutingModule,
    ZXingScannerModule
  ],
  declarations: [LectorPage]
})
export class LectorPageModule {}

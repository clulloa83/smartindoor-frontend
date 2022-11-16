import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TemperaturaEnlineaPageRoutingModule } from './temperatura-enlinea-routing.module';

import { TemperaturaEnlineaPage } from './temperatura-enlinea.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TemperaturaEnlineaPageRoutingModule
  ],
  declarations: [TemperaturaEnlineaPage]
})
export class TemperaturaEnlineaPageModule {}

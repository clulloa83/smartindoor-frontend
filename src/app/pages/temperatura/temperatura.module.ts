import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TemperaturaPageRoutingModule } from './temperatura-routing.module';

import { TemperaturaPage } from './temperatura.page';
// import { ComponentsModule } from 'src/app/components/components.module';
import { NgxGaugeModule } from 'ngx-gauge';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TemperaturaPageRoutingModule,
    ReactiveFormsModule,
    // ComponentsModule,
    NgxGaugeModule,
  ],
  declarations: [TemperaturaPage]
})
export class TemperaturaPageModule {}

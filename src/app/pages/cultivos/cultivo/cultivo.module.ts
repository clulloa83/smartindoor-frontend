import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CultivoPageRoutingModule } from './cultivo-routing.module';

import { CultivoPage } from './cultivo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CultivoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CultivoPage]
})
export class CultivoPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CultivoEditarPageRoutingModule } from './cultivo-editar-routing.module';

import { CultivoEditarPage } from './cultivo-editar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CultivoEditarPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CultivoEditarPage]
})
export class CultivoEditarPageModule {}

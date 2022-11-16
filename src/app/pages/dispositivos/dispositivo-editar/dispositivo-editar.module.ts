import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DispositivoEditarPageRoutingModule } from './dispositivo-editar-routing.module';

import { DispositivoEditarPage } from './dispositivo-editar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DispositivoEditarPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [DispositivoEditarPage]
})
export class DispositivoEditarPageModule {}

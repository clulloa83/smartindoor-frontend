import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeguimientoEditarPageRoutingModule } from './seguimiento-editar-routing.module';

import { SeguimientoEditarPage } from './seguimiento-editar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeguimientoEditarPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [SeguimientoEditarPage]
})
export class SeguimientoEditarPageModule {}

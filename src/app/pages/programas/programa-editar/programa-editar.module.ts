import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProgramaEditarPageRoutingModule } from './programa-editar-routing.module';

import { ProgramaEditarPage } from './programa-editar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProgramaEditarPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ProgramaEditarPage]
})
export class ProgramaEditarPageModule {}

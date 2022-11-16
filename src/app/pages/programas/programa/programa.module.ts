import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProgramaPageRoutingModule } from './programa-routing.module';

import { ProgramaPage } from './programa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProgramaPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ProgramaPage]
})
export class ProgramaPageModule {}

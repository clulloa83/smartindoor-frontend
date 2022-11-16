import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeguimientosPageRoutingModule } from './seguimientos-routing.module';

import { SeguimientosPage } from './seguimientos.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeguimientosPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [SeguimientosPage]
})
export class SeguimientosPageModule {}

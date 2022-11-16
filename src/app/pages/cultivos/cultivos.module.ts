import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CultivosPageRoutingModule } from './cultivos-routing.module';

import { CultivosPage } from './cultivos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CultivosPageRoutingModule
  ],
  declarations: [CultivosPage]
})
export class CultivosPageModule {}

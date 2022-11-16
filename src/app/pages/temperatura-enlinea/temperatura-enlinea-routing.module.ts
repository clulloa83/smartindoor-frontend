import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TemperaturaEnlineaPage } from './temperatura-enlinea.page';

const routes: Routes = [
  {
    path: '',
    component: TemperaturaEnlineaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TemperaturaEnlineaPageRoutingModule {}

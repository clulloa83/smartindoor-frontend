import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DispositivoEditarPage } from './dispositivo-editar.page';

const routes: Routes = [
  {
    path: '',
    component: DispositivoEditarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DispositivoEditarPageRoutingModule {}

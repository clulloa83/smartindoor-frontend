import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeguimientoEditarPage } from './seguimiento-editar.page';

const routes: Routes = [
  {
    path: '',
    component: SeguimientoEditarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeguimientoEditarPageRoutingModule {}

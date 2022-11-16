import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeguimientosPage } from './seguimientos.page';

const routes: Routes = [
  {
    path: '',
    component: SeguimientosPage
  },
  {
    path: 'seguimiento',
    loadChildren: () => import('./seguimiento/seguimiento.module').then( m => m.SeguimientoPageModule)
  },
  {
    path: 'seguimiento-editar',
    loadChildren: () => import('./seguimiento-editar/seguimiento-editar.module').then( m => m.SeguimientoEditarPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeguimientosPageRoutingModule {}

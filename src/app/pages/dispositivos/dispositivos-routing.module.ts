import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DispositivosPage } from './dispositivos.page';

const routes: Routes = [
  {
    path: '',
    component: DispositivosPage
  },
  {
    path: 'dispositivo',
    loadChildren: () => import('./dispositivo/dispositivo.module').then( m => m.DispositivoPageModule)
  },
  {
    path: 'dispositivo-editar',
    loadChildren: () => import('./dispositivo-editar/dispositivo-editar.module').then( m => m.DispositivoEditarPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DispositivosPageRoutingModule {}

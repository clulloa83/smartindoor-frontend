import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CultivosPage } from './cultivos.page';

const routes: Routes = [
  {
    path: '',
    component: CultivosPage
  },
  {
    path: 'cultivo',
    loadChildren: () => import('./cultivo/cultivo.module').then( m => m.CultivoPageModule)
  },
  {
    path: 'cultivo-editar',
    loadChildren: () => import('./cultivo-editar/cultivo-editar.module').then( m => m.CultivoEditarPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CultivosPageRoutingModule {}

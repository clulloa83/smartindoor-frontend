import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProgramasPage } from './programas.page';

const routes: Routes = [
  {
    path: '',
    component: ProgramasPage
  },
  {
    path: 'programa',
    loadChildren: () => import('./programa/programa.module').then( m => m.ProgramaPageModule)
  },
  {
    path: 'programa-editar',
    loadChildren: () => import('./programa-editar/programa-editar.module').then( m => m.ProgramaEditarPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProgramasPageRoutingModule {}

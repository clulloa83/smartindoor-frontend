import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProgramaEditarPage } from './programa-editar.page';

const routes: Routes = [
  {
    path: '',
    component: ProgramaEditarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProgramaEditarPageRoutingModule {}

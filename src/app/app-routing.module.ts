import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { IntroGuard } from './services/intro.guard';

const routes: Routes = [
  // { path: '**', redirectTo: '' },
  {
    path: 'intro',
    loadChildren: () => import('./pages/intro/intro.module').then( m => m.IntroPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    canActivate:[IntroGuard,]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    canActivate: [ AuthGuard ]
  },
  {
    path: 'lector',
    loadChildren: () => import('./pages/qr/lector/lector.module').then( m => m.LectorPageModule),
    canActivate: [ AuthGuard ]
  },
  {
    path: 'generador',
    loadChildren: () => import('./pages/qr/generador/generador.module').then( m => m.GeneradorPageModule),
    canActivate: [ AuthGuard ]
  },
  {
    path: 'dispositivos',
    loadChildren: () => import('./pages/dispositivos/dispositivos.module').then( m => m.DispositivosPageModule),
    canActivate: [ AuthGuard ]
  },
  {
    path: 'dispositivo',
    loadChildren: () => import('./pages/dispositivos/dispositivo/dispositivo.module').then( m => m.DispositivoPageModule),
    canActivate: [ AuthGuard ]
  },
  {
    path: 'dispositivo-editar/:id',
    loadChildren: () => import('./pages/dispositivos/dispositivo-editar/dispositivo-editar.module').then( m => m.DispositivoEditarPageModule),
    canActivate: [ AuthGuard ]
  },
  {
    path: 'temperatura/:id',
    loadChildren: () => import('./pages/temperatura/temperatura.module').then( m => m.TemperaturaPageModule),
    canActivate: [ AuthGuard ]
  },
  {
    path: 'grafico/:id',
    loadChildren: () => import('./pages/grafico/grafico.module').then( m => m.GraficoPageModule),
    canActivate: [ AuthGuard ]
  },
  {
    path: 'notificacion',
    loadChildren: () => import('./pages/notificacion/notificacion.module').then( m => m.NotificacionPageModule),
    canActivate: [ AuthGuard ]
  },
  {
    path: 'programas/:id',
    loadChildren: () => import('./pages/programas/programas.module').then( m => m.ProgramasPageModule),
    canActivate: [ AuthGuard ]
  },
  {
    path: 'programa',
    loadChildren: () => import('./pages/programas/programa/programa.module').then( m => m.ProgramaPageModule),
    canActivate: [ AuthGuard ]
  },
  {
    path: 'programa-editar/:id',
    loadChildren: () => import('./pages/programas/programa-editar/programa-editar.module').then( m => m.ProgramaEditarPageModule),
    canActivate: [ AuthGuard ]
  },
  {
    path: 'cultivos',
    loadChildren: () => import('./pages/cultivos/cultivos.module').then( m => m.CultivosPageModule),
    canActivate: [ AuthGuard ]
  },
  {
    path: 'cultivo',
    loadChildren: () => import('./pages/cultivos/cultivo/cultivo.module').then( m => m.CultivoPageModule),
    canActivate: [ AuthGuard ]
  },
  {
    path: 'cultivo-editar/:id',
    loadChildren: () => import('./pages/cultivos/cultivo-editar/cultivo-editar.module').then( m => m.CultivoEditarPageModule),
    canActivate: [ AuthGuard ]
  },
  {
    path: 'seguimientos/:id',
    loadChildren: () => import('./pages/seguimientos/seguimientos.module').then( m => m.SeguimientosPageModule),
    canActivate: [ AuthGuard ],
    // runGuardsAndResolvers: 'always'
  },
  {
    path: 'seguimiento/:id',
    loadChildren: () => import('./pages/seguimientos/seguimiento/seguimiento.module').then( m => m.SeguimientoPageModule),
    canActivate: [ AuthGuard ],
    // runGuardsAndResolvers: 'always'
  },
  {
    path: 'seguimiento-editar/:id',
    loadChildren: () => import('./pages/seguimientos/seguimiento-editar/seguimiento-editar.module').then( m => m.SeguimientoEditarPageModule),
    canActivate: [ AuthGuard ],
    // runGuardsAndResolvers: 'always'
  },
  {
    path: 'mapa',
    loadChildren: () => import('./pages/mapa/mapa.module').then( m => m.MapaPageModule),
    canActivate: [ AuthGuard ]
  },
  {
    path: 'temperatura-enlinea',
    loadChildren: () => import('./pages/temperatura-enlinea/temperatura-enlinea.module').then( m => m.TemperaturaEnlineaPageModule),
    canActivate: [ AuthGuard ]
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules,
    // onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { RouterModule } from '@angular/router';
import { WebcamSnapshotComponent } from './webcam-snapshot/webcam-snapshot.component';
// import { WebcamSnapshotPage } from './webcam-snapshot/webcam-snapshot.page';

@NgModule({
  declarations: [ 
    HeaderComponent,
    MenuComponent,
    WebcamSnapshotComponent
    // WebcamSnapshotPage
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    MenuComponent,
    WebcamSnapshotComponent
    // WebcamSnapshotPage
  ]
})
export class ComponentsModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage-angular';
import { ComponentsModule } from './components/components.module';
import { NgxGaugeModule } from 'ngx-gauge';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
const baseUrl = environment.api;
const config: SocketIoConfig = { url: baseUrl, 
  options: { 
    withCredentials: true,
    extraHeaders: {
      'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiY2xhdWRpby51bGxvYSIsImlhdCI6MTY0OTM2MjkxMH0.tHH_efvfy3JL2xK5Es5zcDm_ZLO-9lhOBJMz1_FHisU'
    }
  } 
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    ZXingScannerModule,
    NgxQRCodeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    ComponentsModule,
    NgxGaugeModule,
    Ng2SearchPipeModule,
    SocketIoModule.forRoot(config),
    ServiceWorkerModule.register('service-worker.js', {
    // ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}

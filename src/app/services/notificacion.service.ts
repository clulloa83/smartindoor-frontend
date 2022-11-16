import { Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from './storage.service';
import { Usuario } from '../models/usuario';

const baseUrl = environment.api;
const sistema = environment.sistema;
export const NOTIFICACION_KEY = 'publicKey';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {

  usuario = new Usuario();

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private swPush: SwPush,
  ) { }

  obtenerKey = async() => {

    this.usuario = await this.storageService.get('usuario');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.usuario.token
    });

    return await this.http.get<any>(`${ baseUrl }/api/notificacion/key`, { headers: headers })
    .toPromise()
    .then(result => {
      this.storageService.set(NOTIFICACION_KEY, result);
      return result;
    })
    .catch(error => {
      console.log('obtenerKey error:', error);
    });
    
  };

  enviarSubcripcion = async(suscripcion: PushSubscription) => {

    const usuario: Usuario = await this.storageService.get('usuario');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.usuario.token
    });

    const data = {
      sistema: sistema,
      usuario: usuario.id,
      suscripcion: suscripcion
    };

    return await this.http.post<any>(`${ baseUrl }/api/notificacion/suscribir`, data, { headers: headers })
    .toPromise()
    .then((res) => {
      return res;
    });
    // .catch(error => console.log(`enviarSubcripcion error: ${ error }`));

  }

  suscribirNotificaciones = async() => {

    const llave = await this.obtenerKey();

    await this.swPush
    .requestSubscription({
      serverPublicKey: llave
    })
    .then((sub) => {
      console.log('sub', sub);
      return this.enviarSubcripcion(sub);
    })
    .then(() => {
      console.log('notificaciones activadas!');
    })
    .catch((error) => {
      console.log('suscribirNotificaciones error', error);
      throw new Error(error);
    });

}

  recibeNotificaciones = async() => {
    this.swPush.messages.subscribe((message) => {
      console.log('message', message);
    });

    this.swPush.notificationClicks.subscribe(({ action, notification }) => {
      // TODO: Hacer algo en respuesta al clic de notificación
      window.open(notification.data.url);
      // fetch('  ', { method: })
    });

  }

  dessuscribirNotificaciones = async() => {

    this.swPush.unsubscribe()
      .then(() => {
        console.log('unsubscribe OK');
      })
      .catch((error) => {
        console.log('error unsubscribe', error);
      });

  }

}

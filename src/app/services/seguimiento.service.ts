import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Cultivo } from '../models/cultivo';
import { Seguimiento } from '../models/seguimiento';
import { Usuario } from '../models/usuario';
import { StorageService } from './storage.service';

const baseUrl = environment.api;
const TAG_SYNC = 'sync-seguimiento';

@Injectable({
  providedIn: 'root'
})
export class SeguimientoService {

  seguimientos: Array<Seguimiento> = [];

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
  ) { 
  }

 /**
   * obtiene los seguimientos estado=true de un cultivo
   * @param cultivo 
   * @returns 
   */
  seguimientosObtener = async(cultivo: Cultivo) => {

    const usuario: Usuario = await this.storageService.get('usuario');
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': usuario.token
    });

    const params = new HttpParams()
    .set('cultivo', cultivo.id);

    return await this.http.get<any>(`${ baseUrl }/api/seguimiento`, { headers: headers, params: params })
    .toPromise()
    .then(result => {
      // console.log('result seguimientosObtener', result);

      this.seguimientos = result;
      return this.seguimientos;
    })
    .catch(error => {
      console.log('error seguimientosObtener', error);
      throw new Error(error);
    });

  };

 /**
   * guarda el seguimiento de cultivo en BD
   * @param seguimiento 
   */
  seguimientoGuardar = async(seguimiento: Seguimiento) => {

    const form = new FormData();
    form.append('cultivo', seguimiento.cultivo.id);
    form.append('observacion', seguimiento.observacion);
    form.append('fecha', seguimiento.fecha.toString());
    for (let i = 0; i < seguimiento.capturas.length; i++) {
      const element = seguimiento.capturas[i];
      
      form.append(`capture${ i }`, element);
    };

    const usuario: Usuario = await this.storageService.get('usuario');
    
    const headers = new HttpHeaders({
      // 'Content-Type': 'multipart/form-data',
      // 'Content-Type': 'application/json',
      'Authorization': usuario.token
    });

    await this.http.post<any>(`${ baseUrl }/api/seguimiento`, form, { headers: headers })
    .toPromise()
    .then(result => {
      // console.log('result seguimientoGuardar', result);
    })
    .catch(error => {
      console.log('error seguimientoGuardar', error);
      throw new Error(error);
    });

  };

    /**
   * elimina el seguimiento según Id en BD(eliminación logica estado=false)
   * @param seguimiento 
   */
  seguimientoEliminarPorId = async(seguimiento: Seguimiento) => {

    const usuario: Usuario = await this.storageService.get('usuario');
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': usuario.token
    });

    const params = new HttpParams()
    .set('seguimiento', seguimiento.id);

    await this.http.delete<any>(`${ baseUrl }/api/seguimiento`, { headers: headers, params: params })
    .toPromise()
    .then(result => {
      // console.log('result seguimientoEliminarPorId', result);
    })
    .catch(error => {
      console.log('error seguimientoEliminarPorId', error);
      throw new Error(error);
    });
  };

  /**
 * actualiza los parametros del programa según Id en BD
 * @param seguimiento 
 */
   seguimientoActualizarPorId = async(seguimiento: Seguimiento) => {
    
    const usuario: Usuario = await this.storageService.get('usuario');
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': usuario.token
    });

    let form = {
      seguimiento: seguimiento.id,
    };
    
    if(seguimiento.observacion){
        form['observacion'] = seguimiento.observacion;
    };
    if(seguimiento.fecha){
        form['fecha'] = seguimiento.fecha;
    };
    if(seguimiento.estado != null){
        form['estado'] = seguimiento.estado;
    };

    await this.http.patch<any>(`${ baseUrl }/api/seguimiento`,form , { headers: headers })
    .toPromise()
    .then(result => {
      // console.log('result seguimientoActualizarPorId', result);
    })
    .catch(error => {
      console.log('error service seguimientoActualizarPorId', error);
      throw new Error(error);
    });

  };

  seguimientosObtenerStorage = async() => {

    const seguimientos = await this.storageService.get('seguimientos');
    return seguimientos ? seguimientos : [];

  };

  /**
 * registra tag o bandera indicativa de sincronizaciones de peticiones pendientes en idb
 */
  backgroundSync = async() => {

    await navigator.serviceWorker.ready.then((registration: any) => {
      if (registration.sync) {
        // console.log('se agrega tag para sincronizacion');
        // Background Sync is supported.
          registration.sync.register(TAG_SYNC);
      } else {
          // Background Sync isn't supported.
          console.log('no se agrega tag, sync no soportado');
      }
    });

  };

  seguimientosSincronizadosObtener = async() => {

    try {

      const seguimientosSync = await this.storageService.get('seguimientos-sync')
      .then(seguimientos => {
        return seguimientos ? seguimientos : [];
      });

      return seguimientosSync

    } catch (error) {
      console.log('error', error);
    }

  };


}

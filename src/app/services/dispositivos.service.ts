import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Usuario } from '../models/usuario';
import { environment } from 'src/environments/environment';
import { Dispositivo } from '../models/dispositivo';

const baseUrl = environment.api;
const sistema = '626ae7e950bd71cef8ec82e1';

@Injectable({
  providedIn: 'root'
})
export class DispositivosService {

  dispositivos: Array<Dispositivo> = [];

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
  ) { }

  dispositivosObtener = async() => {
    
    const usuario: Usuario = await this.storageService.get('usuario');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': usuario.token
    });

    const params = new HttpParams()
    .set('usuario', usuario.id);

    return await this.http.get<any>(`${ baseUrl }/api/dispositivo`, { headers: headers, params: params })
    .toPromise()
    .then(result => {
      // console.log('result dispositivos', result);
      this.dispositivos = result;
     
      return this.dispositivos;
    })
    .catch(error => {
      console.log('error dispositivosObtener', error);
      throw new Error(error);
    });

  };

    /**
   * guarda el programa de dispositivo en BD
   * @param dispositivo 
   */
    dispositivoGuardar = async(dispositivo: Dispositivo) => {
       
      const usuario: Usuario = await this.storageService.get('usuario');  

      const form = {
        sistema: sistema,
        usuario: usuario.id,
        nombre: dispositivo.nombre,
        icon: dispositivo.icon,
        ubicacion: dispositivo.ubicacion,
        categoria: dispositivo.categoria,
        tipos: dispositivo.tipos,
      };

      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': usuario.token
      });
  
      await this.http.post<any>(`${ baseUrl }/api/dispositivo`, form, { headers: headers })
      .toPromise()
      .then(result => {
        // console.log('result dispositivoGuardar', result);
      })
      .catch(error => {
        console.log('error dispositivoGuardar', error);
        throw new Error(error);
      });
  
    };

  /**
   * elimina el programa según Id en BD(eliminación logica estado=false)
   * @param programa 
   */
   dispositivoEliminarPorId = async(dispositivo: Dispositivo) => {

    const usuario: Usuario = await this.storageService.get('usuario');
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': usuario.token
    });

    const params = new HttpParams()
    .set('dispositivo', dispositivo.id);

    await this.http.delete<any>(`${ baseUrl }/api/dispositivo`, { headers: headers, params: params })
    .toPromise()
    .then(result => {
      // console.log('result dispositivoEliminarPorId', result);
    })
    .catch(error => {
      console.log('error service dispositivoEliminarPorId', error);
      throw new Error(error);
    });

  };

/**
 * actualiza los parametros del programa según Id en BD
 * @param programa 
 */
 dispositivoActualizarPorId = async(dispositivo: Dispositivo) => {
    
  const usuario: Usuario = await this.storageService.get('usuario');
  
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': usuario.token
  });

  let form = {
    dispositivo: dispositivo.id,
  };
  
  if(dispositivo.nombre){
      form['nombre'] = dispositivo.nombre;
  };
  if(dispositivo.icon){
      form['icon'] = dispositivo.icon;
  };
  if(dispositivo.ubicacion){
      form['ubicacion'] = dispositivo.ubicacion;
  };
  if(dispositivo.categoria){
    form['categoria'] = dispositivo.categoria;
  };
  if(dispositivo.tipos){
    form['tipos'] = dispositivo.tipos;
  };
  if(dispositivo.estado != null){
      form['estado'] = dispositivo.estado;
  };

  await this.http.patch<any>(`${ baseUrl }/api/dispositivo`,form , { headers: headers })
  .toPromise()
  .then(result => {
    // console.log('result dispositivoActualizarPorId', result);
  })
  .catch(error => {
    console.log('error service dispositivoActualizarPorId', error);
    throw new Error(error);
  });

};

}

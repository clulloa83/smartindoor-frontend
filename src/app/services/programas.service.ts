import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Dispositivo } from '../models/dispositivo';
import { Programa } from '../models/programa';
import { Usuario } from '../models/usuario';
import { StorageService } from './storage.service';

const baseUrl = environment.api;

@Injectable({
  providedIn: 'root'
})
export class ProgramasService {

  programas: Array<Programa> = [];

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
  ) { }

  /**
   * obtiene los programas estado=true de un dispositivo
   * @param dispositivo 
   * @returns 
   */
  programasObtener = async(dispositivo: Dispositivo) => {

    const usuario: Usuario = await this.storageService.get('usuario');
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': usuario.token
    });

    const params = new HttpParams()
    .set('dispositivo', dispositivo.id);

    return await this.http.get<any>(`${ baseUrl }/api/programa`, { headers: headers, params: params })
    .toPromise()
    .then(result => {
      this.programas = result;
      return this.programas;
    })
    .catch(error => {
      console.log('error programasObtener', error);
      throw new Error(error);
    });

  };

  /**
   * guarda el programa de dispositivo en BD
   * @param programa 
   */
  programaGuardar = async(programa: Programa) => {

    const form = {
      dispositivo: programa.dispositivo.id,
      accion: programa.accion,
      hora: programa.hora,
      dias: programa.dias
    };

    const usuario: Usuario = await this.storageService.get('usuario');
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': usuario.token
    });

    await this.http.post<any>(`${ baseUrl }/api/programa`, form, { headers: headers })
    .toPromise()
    .then(result => {
      // console.log('result programaGuardar', result);
    })
    .catch(error => {
      console.log('error programasObtener', error);
      throw new Error(error);
    });

  };

  /**
   * elimina el programa según Id en BD(eliminación logica estado=false)
   * @param programa 
   */
  programaEliminarPorId = async(programa: Programa) => {

    const usuario: Usuario = await this.storageService.get('usuario');
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': usuario.token
    });

    const params = new HttpParams()
    .set('programa', programa.id);

    await this.http.delete<any>(`${ baseUrl }/api/programa`, { headers: headers, params: params })
    .toPromise()
    .then(result => {
      // console.log('result programaEliminarPorId', result);
    })
    .catch(error => {
      console.log('error serviceprogramaEliminar', error);
      throw new Error(error);
    });

  };

/**
 * actualiza los parametros del programa según Id en BD
 * @param programa 
 */
  programaActualizarPorId = async(programa: Programa) => {
    
    const usuario: Usuario = await this.storageService.get('usuario');
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': usuario.token
    });

    let form = {
      programa: programa.id,
    };
    
    if(programa.accion){
        form['accion'] = programa.accion;
    };
    if(programa.hora){
        form['hora'] = programa.hora;
    };
    if(programa.dias){
        form['dias'] = programa.dias;
    };
    if(programa.activo != null){
        form['activo'] = programa.activo;
    };
    if(programa.estado != null){
        form['estado'] = programa.estado;
    };

    await this.http.patch<any>(`${ baseUrl }/api/programa`,form , { headers: headers })
    .toPromise()
    .then(result => {
      // console.log('result programaActualizarPorId', result);
    })
    .catch(error => {
      console.log('error service programaActualizarPorId', error);
      throw new Error(error);
    });

  };

}

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Cultivo } from '../models/cultivo';
import { Usuario } from '../models/usuario';
import { StorageService } from './storage.service';

const baseUrl = environment.api;

@Injectable({
  providedIn: 'root'
})
export class CultivoService {

  cultivos: Array<Cultivo> = [];

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
  ) { }

    /**
     * obtiene los cultivos estado=true de un usuario
     * @param dispositivo 
     * @returns 
     */
      cultivosObtener = async() => {

        const usuario: Usuario = await this.storageService.get('usuario');
        
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': usuario.token
        });
    
        const params = new HttpParams()
        .set('usuario', usuario.id);
    
        return await this.http.get<any>(`${ baseUrl }/api/cultivo`, { headers: headers, params: params })
        .toPromise()
        .then(result => {
          this.cultivos = result;
          return this.cultivos;
        })
        .catch(error => {
          console.log('error cultivosObtener', error);
          throw new Error(error);
        });
    
      };

    /**
     * guarda el cultivo de usuario en BD
     * @param cultivo 
     */
      cultivoGuardar = async(cultivo: Cultivo) => {

        const usuario: Usuario = await this.storageService.get('usuario');

        const form = {
          usuario: usuario.id,
          cultivo: cultivo.id,
          semilla: cultivo.semilla,
          fecha: cultivo.fecha,
        };
        
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': usuario.token
        });

        await this.http.post<any>(`${ baseUrl }/api/cultivo`, form, { headers: headers })
        .toPromise()
        .then(result => {
          // console.log('result cultivoGuardar', result);
        })
        .catch(error => {
          console.log('error cultivoGuardar', error);
          throw new Error(error);
        });

      };

    /**
     * elimina el cultivo según Id en BD(eliminación logica estado=false)
     * @param cultivo 
     */
      cultivoEliminarPorId = async(cultivo: Cultivo) => {

        const usuario: Usuario = await this.storageService.get('usuario');
        
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': usuario.token
        });

        const params = new HttpParams()
        .set('cultivo', cultivo.id);

        await this.http.delete<any>(`${ baseUrl }/api/cultivo`, { headers: headers, params: params })
        .toPromise()
        .then(result => {
          // console.log('result cultivoEliminarPorId', result);
        })
        .catch(error => {
          console.log('error cultivoEliminarPorId', error);
          throw new Error(error);
        });

      };

    /**
     * actualiza los parametros del cultivo según Id en BD
     * @param cultivo 
     */
      cultivoActualizarPorId = async(cultivo: Cultivo) => {
        
        const usuario: Usuario = await this.storageService.get('usuario');
        
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': usuario.token
        });

        let form = {
          cultivo: cultivo.id,
        };
        
        if(cultivo.semilla){
            form['semilla'] = cultivo.semilla;
        };
        if(cultivo.fecha){
            form['fecha'] = cultivo.fecha;
        };
        if(cultivo.activo != null){
            form['activo'] = cultivo.activo;
        };
        if(cultivo.estado != null){
            form['estado'] = cultivo.estado;
        };

        await this.http.patch<any>(`${ baseUrl }/api/cultivo`,form , { headers: headers })
        .toPromise()
        .then(result => {
          // console.log('result cultivoActualizarPorId', result);
        })
        .catch(error => {
          console.log('error service cultivoActualizarPorId', error);
          throw new Error(error);
        });

      };

}

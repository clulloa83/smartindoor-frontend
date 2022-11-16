import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Dispositivo } from '../models/dispositivo';
import { Registro } from '../models/registro';
import { Usuario } from '../models/usuario';
import { StorageService } from './storage.service';

const baseUrl = environment.api;

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  registros: Array<Registro> = [];

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
  ) { }

  registrosObtener = async(dispositivo: Dispositivo) => {

    let usuario = new Usuario();
    usuario = await this.storageService.get('usuario');
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': usuario.token
    });

    const params = new HttpParams()
    .set('dispositivo', dispositivo.id);

    return await this.http.get<any>(`${ baseUrl }/api/registro`, { headers: headers, params: params })
    .toPromise()
    .then(result => {
      this.registros = result;
      this.registros.map(reg => {
        return { ...reg, fechaRegistro: new Date(reg.fechaRegistro) }
      });
      
      // console.log('result registros', this.registros);

      return this.registros;

    })
    .catch(error => {
      console.log('error registrosObtener', error);
      throw new Error(error);
    });

  };

}

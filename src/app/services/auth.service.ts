import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from './storage.service';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario';

const baseUrl = environment.api;
const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  // 'Authorization': token
});

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) { }

  login = async(correo: string, contraseña: string) => {

    const form = {
      correo,
      contraseña
    };
    
    const usuario: Usuario = new Usuario();

    await this.http.post<any>(`${ baseUrl }/api/login`, form, { headers: headers })
    .toPromise()
    .then(result => {

      // console.log('result', result);

      usuario.id = result.id;
      usuario.nombres = result.nombres;
      usuario.apellidos = result.apellidos;
      usuario.correo = result.correo;
      usuario.token = result.token;

    })

    await this.storageService.set('usuario', usuario);

  };

  logout = async() => {
    return await this.storageService.clear();
  };

  public isAuthenticated = async() => {

    const usuario = await this.storageService.get('usuario');

    if(usuario != null){
      return true;
    };
    return false;

  };

}

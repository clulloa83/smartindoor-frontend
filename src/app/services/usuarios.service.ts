import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario';

const baseUrl = environment.api;

export enum perfil {
  administrador = '624e2a9a78c2edcbb2e46114',
  visitante = ''
};

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(
    private http: HttpClient,
  ) { }

  registrarUsuario = async(usuario: Usuario) => {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Authorization': usuario.token
    });

    const form = {
      nombres: usuario.nombres,
      apellidos: usuario.apellidos,
      contraseña: usuario.contraseña,
      correo: usuario.correo,
      perfil: perfil.administrador
    };

    await this.http.post<any>(`${ baseUrl }/api/usuario`, form, { headers: headers })
    .toPromise()
    .then(result => {

      console.log('result', result);

    });

  }

}

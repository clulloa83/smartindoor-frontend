import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Menu } from '../models/menu';
import { Usuario } from '../models/usuario';
import { StorageService } from './storage.service';

const baseUrl = environment.api;

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  menus: Array<Menu> = [];

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
  ) { }

  menuObtener = async() => {

    const usuario: Usuario = await this.storageService.get('usuario');

    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Authorization': usuario.token
      'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NDk0NDgzOTV9.NgfBwi28AHXdEamdtHjyENHd9WXI6QOF4UnQDItsC4c'
    });
    // 'Authorization': 'Bearer ' + token     

    const params = new HttpParams()
    .set('perfil', '624e2a9a78c2edcbb2e46114');
    // .set('perfil', usuario.perfil.id);

    return await this.http.get<Menu[]>(`${ baseUrl }/api/menu`, { headers: headers, params: params })
    // return await this.http.get<any>(`${ baseUrl }/api/menu`, { headers: headers, params: params })
    .toPromise()
    .then(result => {
      // console.log('result', result);
      return result;
    })
    .catch(error => {
      console.log('error menuObtener ', error);
    })

  };

  menuPerfilAdminObtener = async() => {

    try {

      this.menus = await this.storageService.get('menus');
      if(this.menus){
        return this.menus;
      };
  
      const perfilAdmin: string = '624e2a9a78c2edcbb2e46114';
      const token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NDk0NDgzOTV9.NgfBwi28AHXdEamdtHjyENHd9WXI6QOF4UnQDItsC4c';
  
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      });
  
      const params = new HttpParams()
      .set('perfil', perfilAdmin);
  
      await this.http.get<any>(`${ baseUrl }/api/menu`, { headers: headers, params: params })
      .toPromise()
      .then(result => {
        // console.log('menuPerfilAdminObtener result', result);
        this.menus = result;
        // return this.menus;
      })
      .catch(error => {
        console.log('menuPerfilAdminObtener1 error', error);
        throw new Error(`error ${ error }`);
      });
  
      await this.storageService.set('menus', this.menus);
  
      return this.menus;      
      
    } catch (error) {
      console.log('menuPerfilAdminObtener2 error', error);
      throw new Error(`error ${ error }`);
    };

  };

}

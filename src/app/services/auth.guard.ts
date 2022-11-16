import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  canActivate = async() => {

    const auth = await this.authService.isAuthenticated();

    if(!auth){
      this.router.navigateByUrl('/login', { replaceUrl: true });
      return false;
    };
    return true;
    
  };
  
}

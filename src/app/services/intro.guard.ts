import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from './storage.service';

export const INTRO_KEY = 'intro-seen';

@Injectable({
  providedIn: 'root'
})
export class IntroGuard implements CanActivate {
  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }

  constructor(
    private router: Router,
    private storageService: StorageService
  ){}

  canActivate = async() => {

    const hasSeenIntro = await this.storageService.get(INTRO_KEY);
    if(!hasSeenIntro){
      this.router.navigateByUrl('/intro', { replaceUrl: true });
      return false;
    };
    return true;

  }

}



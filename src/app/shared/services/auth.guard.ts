import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private localStorageService: LocalStorageService
  ) { }
  
  canActivate() {
    const currentUser = this.localStorageService.get('user');
    if (currentUser?.token && currentUser?.token.length) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}

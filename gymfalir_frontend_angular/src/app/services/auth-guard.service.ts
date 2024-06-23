import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivateFn } from '@angular/router';
import { Location } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private router: Router, private location: Location) { }
  

  canActivate(): boolean {
    if(this.isLoggedIn()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

 canAccessLogin():boolean {
  if(!localStorage.getItem('token')) {
    return true
  }
  this.location.back()
  return false;
 }

 checkRole(): boolean {
  const role = localStorage.getItem('role')
  console.log(role)
  if (role !== 'admin') {
    this.location.back()
    return false
  }
  return true;
 }
 
}

export const guestGuard: CanActivateFn =  (route, state) => {
  return inject(AuthGuardService).canActivate();
};

export const accessLogin: CanActivateFn =  (route, state) => {
  return inject(AuthGuardService).canAccessLogin();
};

export const validRole: CanActivateFn =  (route, state) => {
  return inject(AuthGuardService).checkRole();
};

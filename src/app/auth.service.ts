import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  expiration_time: number | undefined;

  setToken(token: string) {
    const tokenpayload = jwtDecode(token);
    this.expiration_time = tokenpayload.exp;
    localStorage.setItem('jwtToken', token);
  }

  getToken() {
    return localStorage.getItem('jwtToken');
  }

  removeToken() {
    localStorage.removeItem('jwtToken');
  }

  isSessionOpen(): boolean {
    const current_time = Date.now() / 1000
    /* if (this.expiration_time < current_time)
      this.removeToken(); */
    return this.getToken() !== null;
  }

}

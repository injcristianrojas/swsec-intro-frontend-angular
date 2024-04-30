import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  expiration_time?: number;

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(
      'http://127.0.0.1:9000/api/v2/login',
      { 'username': username, 'password': password }
    );
  }

  handleAuthentication(response: any): void {
    const token = response.token;
    if (token) {
      localStorage.setItem('token', token);
      const tokenpayload = jwtDecode(token);
      this.expiration_time = tokenpayload.exp;
    } else {
      console.error('Token not found in response.');
    }
  }

  getPosts() {
    return this.http.get('http://127.0.0.1:9000/api/v2/messages', { headers: this.getBearerHeaders() });
  }

  insertPost(message: string) {
    return this.http.post(
      'http://127.0.0.1:9000/api/v2/messages/add',
      { 'message': message },
      { headers: this.getBearerHeaders() }
    )
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getBearerHeaders() {
    return new HttpHeaders({ 'Authorization': 'Bearer ' + this.getToken() });
  }

  removeToken() {
    localStorage.removeItem('token');
  }

  isSessionOpen(): boolean {
    const token: string | null = this.getToken();
    if (token !== null) {
      let tknexpdate: number | undefined = jwtDecode(token).exp
      if (tknexpdate !== undefined)
        if (Date.now() >= tknexpdate * 1000)
          this.removeToken();
    }
    return this.getToken() !== null;
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  expiration_time: number | undefined;

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(
      'http://127.0.0.1:9000/api/v2/login',
      {'username': username, 'password': password}
    );
  }

  handleAuthentication(response: any): void {
    const token = response.token;
    if (token) {
      localStorage.setItem('token', token);
    } else {
      console.error('Token not found in response.');
    }
  }
  
  getPosts() {
    return this.http.get('http://127.0.0.1:9000/api/v1/messages');
  }

  insertPost(message: string) {
    return this.http.post(
      'http://127.0.0.1:9000/api/v1/messages/add',
      {'message': message}
    )
  }

  getToken() {
    return localStorage.getItem('token');
  }

  removeToken() {
    localStorage.removeItem('token');
  }

  isSessionOpen(): boolean {
    const current_time = Date.now() / 1000
    /* if (this.expiration_time < current_time)
      this.removeToken(); */
    return this.getToken() !== null;
  }

}

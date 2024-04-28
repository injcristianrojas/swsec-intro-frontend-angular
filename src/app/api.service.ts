import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post(
      'http://127.0.0.1:9000/api/v2/login',
      {'username': username, 'password': password},
      { observe: 'response' }
    )
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

}

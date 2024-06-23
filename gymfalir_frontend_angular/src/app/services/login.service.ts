import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  login(username: String, password: String): Observable<any> {
     return this.http.post('http://localhost:3002/user/signinweb', {username, password})
  }
}

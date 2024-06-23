import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, last, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

 
  constructor(private http: HttpClient) { }

  getAllusers(): Observable<any> {
    const token = localStorage.getItem('token') ?? ''
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` 
    });
     return this.http.get('http://localhost:3002/user', { headers })
  }

  getDashboard(): Observable<any> {
     return this.http.get('http://localhost:3002/user/dashboard')
  }

  getOneuser(id: String): Observable<any> {
    console.log(id)
    const token = localStorage.getItem('token') ?? ''
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` 
    });
     return this.http.post('http://localhost:3002/user/one', { id }, { headers } )
  }

  edituser(id: String, username: String, email: String, photo: String,
    birth:String, role: String, image: File ): Observable<any> {
    const token = localStorage.getItem('token') ?? ''
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` 
    });
    const formData: FormData = new FormData();
    formData.append('id', `${id}`);
    formData.append('username', `${username}`);
    formData.append('birth', `${birth}`);
    formData.append('email', `${email}`);
    formData.append('role', `${role}`);
    formData.append('photo', `${photo}`);
    formData.append('image', image);
     return this.http.post('http://localhost:3002/user/edit', formData, { headers } )
  }

  adduser(id: String, username: String, email: String, password: String,
    birth:String, role: String, image: File): Observable<any> {
    const token = localStorage.getItem('token') ?? ''
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` 
    });
    
    const formData: FormData = new FormData();
    formData.append('id', `${id}`);
    formData.append('username', `${username}`);
    formData.append('birth', `${birth}`);
    formData.append('password', `${password}`);
    formData.append('email', `${email}`);
    formData.append('role', `${role}`);
    formData.append('image', image);
     return this.http.post('http://localhost:3002/user/signup', formData, { headers } )
  }

  deleteuser(id: String): Observable<any> {
    console.log("this is id "+id)
    const token = localStorage.getItem('token') ?? ''
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` 
    });
     return this.http.post('http://localhost:3002/user/delete', { id }, { headers } )
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourService {

  constructor(private http: HttpClient) { }

  getAllcours(): Observable<any> {
    const token = localStorage.getItem('token') ?? ''
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` 
    });
     return this.http.get('http://localhost:3002/cour', { headers })
  }

  getOnecour(id: String): Observable<any> {
    const token = localStorage.getItem('token') ?? ''
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` 
    });
     return this.http.post('http://localhost:3002/cour/one', { id }, { headers } )
  }

  editcour(id: String, nom: String, capacite: String, 
    date: String, start: String, end: String, coach: String): Observable<any> {
    const token = localStorage.getItem('token') ?? ''
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` 
    });
    const data = {
      id, nom, capacite, 
     date, start, end, coach
    }
    
     return this.http.post('http://localhost:3002/cour/edit', data, { headers } )
  }

  addcour(id: String, nom: String, capacite: String, 
    date: String, start: String, end: String, coach: String ): Observable<any> {
    const token = localStorage.getItem('token') ?? ''
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` 
    });
    
    const data = {
      id, nom, capacite, 
     date, start, end, coach
    }
     return this.http.post('http://localhost:3002/cour/create', data, { headers } )
  }

  deletecour(id: String): Observable<any> {
    const token = localStorage.getItem('token') ?? ''
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` 
    });
     return this.http.post('http://localhost:3002/cour/delete', { id }, { headers } )
  }
}

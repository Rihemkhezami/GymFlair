import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  getAllevents(): Observable<any> {
    const token = localStorage.getItem('token') ?? ''
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` 
    });
     return this.http.get('http://localhost:3002/event', { headers })
  }

  getOneevent(id: String): Observable<any> {
    const token = localStorage.getItem('token') ?? ''
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` 
    });
     return this.http.post('http://localhost:3002/event/one', { id }, { headers } )
  }

  editevent(id: String, nom: String, desc: String, 
    date: String, start: String, photo: String, image: File): Observable<any> {
    const token = localStorage.getItem('token') ?? ''
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` 
    });
    const formData: FormData = new FormData();
    formData.append('id', `${id}`);
    formData.append('nom', `${nom}`);
    formData.append('date', `${date}`);
    formData.append('desc', `${desc}`);
    formData.append('start', `${start}`);
    formData.append('photo', `${photo}`);
    formData.append('image', image);
    
     return this.http.post('http://localhost:3002/event/edit', formData, { headers } )
  }

  addevent(id: String, nom: String, desc: String, 
    date: String, start: String, photo: String, image: File ): Observable<any> {
    const token = localStorage.getItem('token') ?? ''
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` 
    });
    
    const formData: FormData = new FormData();
    formData.append('id', `${id}`);
    formData.append('nom', `${nom}`);
    formData.append('date', `${date}`);
    formData.append('desc', `${desc}`);
    formData.append('start', `${start}`);
    formData.append('photo', `${photo}`);
    formData.append('image', image);
     return this.http.post('http://localhost:3002/event/create', formData, { headers } )
  }

  deleteevent(id: String): Observable<any> {
    const token = localStorage.getItem('token') ?? ''
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` 
    });
     return this.http.post('http://localhost:3002/event/delete', { id }, { headers } )
  }
}

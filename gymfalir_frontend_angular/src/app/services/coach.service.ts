import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, last, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoachService {

  constructor(private http: HttpClient) { }

  getAllcoachs(): Observable<any> {
    const token = localStorage.getItem('token') ?? ''
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` 
    });
     return this.http.get('http://localhost:3002/coach', { headers })
  }

  getOnecoach(id: String): Observable<any> {
    console.log(id)
    const token = localStorage.getItem('token') ?? ''
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` 
    });
     return this.http.post('http://localhost:3002/coach/one', { id }, { headers } )
  }

  editcoach(id: String, firstname: String, lastname: String, 
    phone: String, email: String, speciality: String, currentImage: String, image: File ): Observable<any> {
    const token = localStorage.getItem('token') ?? ''
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` 
    });
    const formData: FormData = new FormData();
    formData.append('id', `${id}`);
    formData.append('firstname', `${firstname}`);
    formData.append('lastname', `${lastname}`);
    formData.append('email', `${email}`);
    formData.append('phone', `${phone}`);
    formData.append('speciality', `${speciality}`);
    formData.append('currentImage', `${currentImage}`);
    formData.append('image', image);
     return this.http.post('http://localhost:3002/coach/edit', formData, { headers } )
  }

  addcoach(firstname: String, lastname: String, 
    phone: String, email: String, speciality: String, image: File ): Observable<any> {
    const token = localStorage.getItem('token') ?? ''
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` 
    });
    
    const formData: FormData = new FormData();
    formData.append('firstname', `${firstname}`);
    formData.append('lastname', `${lastname}`);
    formData.append('email', `${email}`);
    formData.append('phone', `${phone}`);
    formData.append('speciality', `${speciality}`);
    formData.append('image', image);
     return this.http.post('http://localhost:3002/coach/create', formData, { headers } )
  }

  deletecoach(id: String): Observable<any> {
    console.log("this is id "+id)
    const token = localStorage.getItem('token') ?? ''
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` 
    });
     return this.http.post('http://localhost:3002/coach/delete', { id }, { headers } )
  }
}

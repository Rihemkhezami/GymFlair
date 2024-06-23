import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EquipmentsService {

  constructor(private http: HttpClient) { }

  

  getAllEquipments(): Observable<any> {
    const token = localStorage.getItem('token') ?? ''
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` 
    });
     return this.http.get('http://localhost:3002/equipment/all/', { headers })
  }

  getOneEquipment(id: String): Observable<any> {
    const token = localStorage.getItem('token') ?? ''
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` 
    });
     return this.http.post('http://localhost:3002/equipment/one', { id }, { headers } )
  }

  editEquipment(id: String, nom: String, prix: String, 
    description: String, currentImage: String, image: File ): Observable<any> {
    const token = localStorage.getItem('token') ?? ''
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` 
    });
    const formData: FormData = new FormData();
    formData.append('id', `${id}`);
    formData.append('nom', `${nom}`);
    formData.append('prix', `${prix}`);
    formData.append('description', `${description}`);
    formData.append('currentImage', `${currentImage}`);
    formData.append('image', image);
     return this.http.post('http://localhost:3002/equipment/edit', formData, { headers } )
  }

  addEquipment(nom: String, prix: String, 
    description: String, image: File ): Observable<any> {
    const token = localStorage.getItem('token') ?? ''
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` 
    });
    const formData: FormData = new FormData();
    formData.append('nom', `${nom}`);
    formData.append('prix', `${prix}`);
    formData.append('description', `${description}`);
    formData.append('image', image);
     return this.http.post('http://localhost:3002/equipment/create', formData, { headers } )
  }

  deleteEquipment(id: String): Observable<any> {
    const token = localStorage.getItem('token') ?? ''
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` 
    });
     return this.http.post('http://localhost:3002/equipment/delete', { id }, { headers } )
  }
}

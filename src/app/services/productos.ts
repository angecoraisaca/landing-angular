import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../interfaces/producto';

@Injectable({
  providedIn: 'root'
})
export class Productos {

  private apiURL = 'http://localhost:3000/api/productos';

  constructor(private http: HttpClient) {}

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiURL);
  }

  getProducto(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiURL}/${id}`);
  }
}

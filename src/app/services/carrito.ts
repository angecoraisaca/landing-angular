import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private apiUrl = 'http://localhost:3000/api/carrito'; // 👈 URL correcta para el carrito

  private _itemsCount = new BehaviorSubject<number>(0);
  itemsCount$ = this._itemsCount.asObservable();

  get itemsCountValue(): number {
  return this._itemsCount.value;
  }

  constructor(private http: HttpClient) {
    this.loadCartCount();
  }

  private loadCartCount(): void {
    this._itemsCount.next(0);
  }

  agregarAlCarrito(producto: any, cantidad: number = 1): Observable<any> {
    const payload = {
      user_id: 1,                // 👈 por ahora fijo (luego lo hacemos dinámico)
      producto_id: producto.id,
      cantidad
    };

    return this.http.post(this.apiUrl, payload);
  }

  actualizarContador(nuevoConteo: number): void {
    this._itemsCount.next(nuevoConteo);
  }

  obtenerCarrito(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  actualizarCantidad(id: number, cantidad: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, { cantidad });
  }

  eliminarItem(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }


}

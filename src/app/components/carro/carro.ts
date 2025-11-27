import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../../services/carrito';

@Component({
  selector: 'app-carro',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carro.html',
  styleUrls: ['./carro.css']
})
export class CarroComponent implements OnInit {

  items: any[] = [];
  cargando = true;

  constructor(private carritoService: CarritoService) {}

  ngOnInit() {
    this.obtenerCarro();
  }

  obtenerCarro() {
    this.carritoService.obtenerCarrito().subscribe({
      next: (data) => {
        this.items = data;
        this.cargando = false;
      },
      error: () => {
        this.cargando = false;
      }
    });
  }

  incrementar(item: any) {
    item.cantidad++;
    this.carritoService.actualizarCantidad(item.id, item.cantidad).subscribe();
  }

  disminuir(item: any) {
    if (item.cantidad > 1) {
      item.cantidad--;
      this.carritoService.actualizarCantidad(item.id, item.cantidad).subscribe();
    }
  }

  eliminar(item: any) {
    this.carritoService.eliminarItem(item.id).subscribe({
      next: () => {
        this.items = this.items.filter(i => i.id !== item.id);
      }
    });
  }

  get total() {
    return this.items.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
  }

}

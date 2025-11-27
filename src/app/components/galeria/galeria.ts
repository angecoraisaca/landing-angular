import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Productos } from '../../services/productos';
import { CarritoService } from '../../services/carrito';

@Component({
  selector: 'app-galeria',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './galeria.html',
  styleUrls: ['./galeria.css']
})
export class Galeria {
  productos: any[] = [];
  cargando = true;
  error = false;

  constructor(
    private productosService: Productos,
    private carritoService: CarritoService,   // 👈 IMPORTANTE
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit() {
    this.productosService.getProductos().subscribe({
      next: (data) => {
        this.productos = data;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = true;
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }

  agregarAlCarrito(producto: any) {
    this.carritoService.agregarAlCarrito(producto).subscribe({
      next: () => {
        alert('Producto agregado al carrito');
      },
      error: (err) => {
        console.error(err);
        alert('Hubo un error al agregar al carrito');
      }
    });
  }

}

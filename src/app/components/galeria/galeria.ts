import { Component, OnInit } from '@angular/core';
import { Productos } from '../../services/productos';
import { Producto } from '../../interfaces/producto';

@Component({
  selector: 'app-galeria',
  standalone: true,
  templateUrl: './galeria.html',   // ← CORREGIDO
  styleUrls: ['./galeria.css']
})
export class Galeria implements OnInit {

  productos: Producto[] = [];
  cargando = true;
  error = '';

  constructor(private productosService: Productos) {}

  ngOnInit(): void {
    this.productosService.getProductos().subscribe({
      next: (data) => {
        this.productos = data;
        this.cargando = false;
      },
      error: (err) => {
        this.error = 'No se pudieron cargar los productos';
        this.cargando = false;
      }
    });
  }
}

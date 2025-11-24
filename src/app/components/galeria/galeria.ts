import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Productos } from '../../services/productos';

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
    private cdr: ChangeDetectorRef      // 👈 se agrega aquí
  ) {}

  ngOnInit() {
    this.productosService.getProductos().subscribe({
      next: (data) => {
        this.productos = data;
        this.cargando = false;
        this.cdr.detectChanges();       // 👈 fuerza actualización de vista
      },
      error: () => {
        this.error = true;
        this.cargando = false;
        this.cdr.detectChanges();       // 👈 también aquí
      }
    });
  }
}

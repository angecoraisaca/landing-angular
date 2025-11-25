import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Productos } from '../../services/productos';
import { Producto } from '../../interfaces/producto';

@Component({
  selector: 'app-productodetalle',
  standalone: true,
  templateUrl: './productodetalle.html',
  styleUrls: ['./productodetalle.css'],
  imports: []
})
export class ProductoDetalle implements OnInit {   // 👈 NOMBRE CORREGIDO

  producto!: Producto;
  cargando = true;

  constructor(
    private route: ActivatedRoute,
    private productosService: Productos
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.productosService.obtenerProductoPorId(id).subscribe({
      next: (data) => {
        this.producto = data;
        this.cargando = false;
      }
    });
  }

}

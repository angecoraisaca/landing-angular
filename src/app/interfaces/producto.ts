export interface Producto {
  id: number;
  titulo: string;
  descripcion: string;
  precio: number;
  categoria: string;
  imagen_url: string;
  creado_en: string;
  activo: number;
  stock: number;
  stock_min: number;
}
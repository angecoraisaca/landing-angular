import { Routes } from '@angular/router';
import { Galeria } from './components/galeria/galeria';
import { ProductoDetalle } from './components/productodetalle/productodetalle';

export const routes: Routes = [
    { path: 'galeria', component: Galeria },
    { path: 'producto/:id', component: ProductoDetalle },
    { path: '', redirectTo: 'galeria', pathMatch: 'full' }
];

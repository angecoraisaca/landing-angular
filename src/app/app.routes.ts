import { Routes } from '@angular/router';
import { Galeria } from './components/galeria/galeria';

export const routes: Routes = [
  { path: 'galeria', component: Galeria },

  { path: '', redirectTo: 'galeria', pathMatch: 'full' },

  { 
    path: 'carro',
    loadComponent: () => import('./components/carro/carro')
      .then(m => m.CarroComponent)   // <-- aquí estaba el nombre antiguo
  }
];

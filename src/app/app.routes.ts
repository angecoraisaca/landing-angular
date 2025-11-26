import { Routes } from '@angular/router';
import { Galeria } from './components/galeria/galeria';

export const routes: Routes = [
    { path: 'galeria', component: Galeria },

    { path: '', redirectTo: 'galeria', pathMatch: 'full' }
];

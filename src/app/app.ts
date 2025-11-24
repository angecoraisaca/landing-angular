import { Component } from '@angular/core';
import { Navbar } from './components/navbar/navbar';
import { Hero } from './components/hero/hero';
import { Servicios } from './components/servicios/servicios';
import { Contacto } from './components/contacto/contacto';
import { Footer } from './components/footer/footer';
import { Escena3d } from './components/escena3d/escena3d';
import { Galeria } from './components/galeria/galeria';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    Navbar,
    Hero,
    Servicios,
    Contacto,
    Footer,
    Escena3d,
    Galeria
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}

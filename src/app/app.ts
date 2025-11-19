import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Hero } from './components/hero/hero';
import { Servicios } from './components/servicios/servicios';
import { Contacto } from './components/contacto/contacto';
import { Footer } from './components/footer/footer';
import { Escena3d } from './components/escena3d/escena3d';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    Navbar,
    Hero,
    Servicios,
    Contacto,
    Footer,
    Escena3d,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}

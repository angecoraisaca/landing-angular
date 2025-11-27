import { Component } from '@angular/core';
import { Navbar } from './components/navbar/navbar';
import { Hero } from './components/hero/hero';
import { Servicios } from './components/servicios/servicios';
import { Contacto } from './components/contacto/contacto';
import { Footer } from './components/footer/footer';
import { Escena3d } from './components/escena3d/escena3d';
import { Galeria } from './components/galeria/galeria';
// IMPORT CORRECTO: importa exactamente el nombre de la clase exportada en ./components/carro/carro
import { CarroComponent } from './components/carro/carro';

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
    Galeria,
    CarroComponent   // <- usar el nombre correcto aquí
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']   // <- CORRECCIÓN: styleUrls (en plural)
})
export class App {}

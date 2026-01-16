import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ListaAlumnosComponent } from './components/lista-alumnos/lista-alumnos';
import { AgregarAlumnoComponent } from './components/agregar-alumno/agregar-alumno';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ListaAlumnosComponent, AgregarAlumnoComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  title = 'Frontend'; // Sin paréntesis, es una variable simple
}
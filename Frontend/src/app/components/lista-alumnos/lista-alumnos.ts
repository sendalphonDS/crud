import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlumnoService } from '../../services/alumno';
import { Alumno } from '../../models/alumno.model';

@Component({
  selector: 'app-lista-alumnos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-alumnos.html'
})
export class ListaAlumnosComponent implements OnInit {
  alumnos: Alumno[] = [];

  constructor(private alumnoService: AlumnoService) {}

  ngOnInit(): void {
    this.cargarAlumnos();
    
    // NUEVO: Escuchar cuando el formulario nos diga que hubo cambios
    this.alumnoService.actualizarLista$.subscribe(() => {
      this.cargarAlumnos();
    });
  }

  cargarAlumnos(): void {
    this.alumnoService.getAlumnos().subscribe({
      next: (data) => this.alumnos = data,
      error: (err) => console.error('Error al cargar', err)
    });
  }

  eliminar(id?: number): void {
    if (id && confirm('¿Estás seguro de eliminar este alumno?')) {
      this.alumnoService.deleteAlumno(id).subscribe({
        next: () => {
          // Filtramos localmente para una respuesta instantánea
          this.alumnos = this.alumnos.filter(a => a.id !== id);
        },
        error: (err) => console.error('Error al eliminar', err)
      });
    }
  }

  editar(alumno: Alumno): void {
    this.alumnoService.enviarAlumnoAFormulario(alumno);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlumnoService } from '../../services/alumno';
import { Alumno } from '../../models/alumno.model';

@Component({
  selector: 'app-agregar-alumno',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './agregar-alumno.html',
  styleUrl: './agregar-alumno.scss'
})
export class AgregarAlumnoComponent implements OnInit {
  nuevoAlumno: Alumno = { nombre: '', apellido: '', grado: '', edad: 0 };
  editando = false;

  constructor(private alumnoService: AlumnoService) {}

  ngOnInit(): void {
    this.alumnoService.alumnoEditar$.subscribe((alumno) => {
      this.nuevoAlumno = { ...alumno };
      this.editando = true;
    });
  }

  guardar() {
    if (this.editando && this.nuevoAlumno.id) {
      this.alumnoService.updateAlumno(this.nuevoAlumno.id, this.nuevoAlumno).subscribe({
        next: () => {
          alert('¡Alumno actualizado!');
          this.limpiarFormulario();
        },
        error: (e) => console.error('Error al actualizar:', e)
      });
    } else {
      this.alumnoService.createAlumno(this.nuevoAlumno).subscribe({
        next: () => {
          alert('¡Alumno guardado!');
          this.limpiarFormulario();
        },
        error: (e) => console.error('Error al guardar:', e)
      });
    }
  }

  limpiarFormulario() {
    this.nuevoAlumno = { nombre: '', apellido: '', grado: '', edad: 0 };
    this.editando = false;
    // En lugar de recargar la página, avisamos al otro componente
    this.alumnoService.notificarActualizacion();
  }
}
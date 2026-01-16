import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Alumno } from '../models/alumno.model';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {
  private apiUrl = 'http://localhost:5182/api/alumnos'; 

  private alumnoEditar = new Subject<Alumno>();
  alumnoEditar$ = this.alumnoEditar.asObservable();

  // NUEVO: Canal para avisar que la lista debe refrescarse
  private actualizarLista = new Subject<void>();
  actualizarLista$ = this.actualizarLista.asObservable();

  constructor(private http: HttpClient) { }

  enviarAlumnoAFormulario(alumno: Alumno) {
    this.alumnoEditar.next(alumno);
  }

  // NUEVO: Método para disparar la actualización
  notificarActualizacion() {
    this.actualizarLista.next();
  }

  getAlumnos(): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(this.apiUrl);
  }

  createAlumno(alumno: Alumno): Observable<Alumno> {
    return this.http.post<Alumno>(this.apiUrl, alumno);
  }

  updateAlumno(id: number, alumno: Alumno): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, alumno);
  }

  deleteAlumno(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
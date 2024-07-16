// Importación de módulos y servicios necesarios
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Practicas } from '../classes/practica';
import { UsuariosService } from './usuarios.service';
import { Usuarios } from '../classes/usuario';
import { Tareas } from '../classes/tareas';

// Decorador @Injectable define el servicio PracticasService
@Injectable({
  providedIn: 'root', // Proveedor del servicio a nivel de aplicación
})
export class PracticasService {
  listaPracticas: Practicas[] = []; // Lista de prácticas
  listaTareas: Tareas[] = []; // Lista de tareas

  // Constructor que inyecta ToastrService, Router y UsuariosService
  constructor(
    private readonly notificador: ToastrService,
    private readonly enrutador: Router,
    private readonly usuariosService: UsuariosService
  ) {
    this.cargarPracticas(); // Cargar prácticas desde el almacenamiento local
  }

  // Método privado para cargar prácticas desde el almacenamiento local
  private cargarPracticas(): void {
    const practicasAlmacenadas = localStorage.getItem('practicas');
    this.listaPracticas = practicasAlmacenadas
      ? JSON.parse(practicasAlmacenadas)
      : [];
  }

  // Método público para obtener la lista de prácticas
  public obtenerPracticas(): Practicas[] {
    return this.listaPracticas;
  }

  // Método privado para generar un UUID
  private generarUUID(): string {
    return 'xxxxyxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  // Método público para crear una nueva práctica
  public crearPractica(nuevaPractica: Practicas) {
    const estudiante: Usuarios = this.usuariosService.obtenerUsuarioActual();
    this.listaPracticas.push({
      id: this.generarUUID(),
      estado: 'Pendiente',
      estudiante: estudiante,
      tutor: estudiante.tutor,
      empresa: nuevaPractica.empresa,
    });
    localStorage.setItem('practicas', JSON.stringify(this.listaPracticas));
    this.notificador.success('Práctica registrada con éxito', 'Ok!');
    this.enrutador.navigate(['/index']);
  }

  // Método privado para buscar el índice de una práctica por su ID
  private buscarPractica(id: string) {
    return this.listaPracticas.findIndex((practica) => practica.id === id);
  }

  // Método público para aceptar una práctica
  public aceptarPractica(id: string) {
    const indice = this.buscarPractica(id);
    this.listaPracticas[indice] = {
      ...this.listaPracticas[indice],
      estado: 'Aprobada',
    };
    localStorage.setItem('practicas', JSON.stringify(this.listaPracticas));
    this.cargarPracticas();
  }

  // Método público para culminar una práctica
  public culminarPractica(id: string) {
    const indice = this.buscarPractica(id);
    this.listaPracticas[indice] = {
      ...this.listaPracticas[indice],
      estado: 'Culminada',
    };
    localStorage.setItem('practicas', JSON.stringify(this.listaPracticas));
    this.cargarPracticas();
  }

  // Método público para buscar una práctica por el ID del usuario
  buscarPracticaPorUsuario(id: string) {
    return this.listaPracticas.find(
      (practica) => practica.estudiante?.id === id
    );
  }
}

// Importación de módulos y servicios necesarios
import { Injectable } from '@angular/core';
import { UsuariosService } from './usuarios.service';
import { PracticasService } from './practicas.service';
import { Practicas } from '../classes/practica';
import { Usuarios } from '../classes/usuario';
import { Tareas } from '../classes/tareas';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

// Decorador @Injectable define el servicio TareasService
@Injectable({
  providedIn: 'root', // Proveedor del servicio a nivel de aplicación
})
export class TareasService {
  listaPracticas: Practicas[] = []; // Lista de prácticas
  listaTareas: Tareas[] = []; // Lista de tareas

  // Constructor que inyecta UsuariosService, PracticasService, Router y ToastrService
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly practicasService: PracticasService,
    private readonly enrutador: Router,
    private readonly notificador: ToastrService
  ) {
    this.cargarTareas(); // Cargar tareas desde el almacenamiento local
    this.listaPracticas = practicasService.obtenerPracticas(); // Obtener prácticas desde PracticasService
  }

  // Método público para obtener la lista de tareas
  public obtenerTareas(): Tareas[] {
    return this.listaTareas;
  }

  // Método privado para cargar tareas desde el almacenamiento local
  private cargarTareas(): void {
    const tareasAlmacenadas = localStorage.getItem('tareas');
    this.listaTareas = tareasAlmacenadas ? JSON.parse(tareasAlmacenadas) : [];
  }

  // Método privado para generar un UUID
  private generarUUID(): string {
    return 'xxxxyxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  // Método público para crear una nueva tarea
  public crearTarea(nuevaTarea: Tareas) {
    const estudiante: Usuarios = this.usuariosService.obtenerUsuarioActual();
    const practica = this.listaPracticas.find(
      (item) => item.estudiante?.id === estudiante.id
    );

    // Agregar la nueva tarea a la lista de tareas
    this.listaTareas.push({
      id: this.generarUUID(),
      titulo: nuevaTarea.titulo,
      detalles: nuevaTarea.detalles,
      practica: practica,
    });

    // Guardar la lista de tareas actualizada en el almacenamiento local
    localStorage.setItem('tareas', JSON.stringify(this.listaTareas));

    // Notificar al usuario que la tarea fue registrada con éxito
    this.notificador.success('Tarea registrada con éxito', 'Ok!');

    // Navegar a la página de inicio
    this.enrutador.navigate(['/index']);
  }
}

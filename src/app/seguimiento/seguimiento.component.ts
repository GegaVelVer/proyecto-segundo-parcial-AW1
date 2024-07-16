// Importación de componentes y servicios necesarios
import { Component } from '@angular/core';
import { Usuarios } from '../classes/usuario';
import { UsuariosService } from '../servicios/usuarios.service';
import { Tareas } from '../classes/tareas';
import { TareasService } from '../servicios/tareas.service';

// Decorador @Component define el componente SeguimientoComponent
@Component({
  selector: 'app-seguimiento', // Selector para el componente
  templateUrl: './seguimiento.component.html', // Ruta del archivo HTML de la plantilla
  styleUrl: './seguimiento.component.css', // Ruta del archivo CSS para estilos del componente
})
export class SeguimientoComponent {
  userActual: Usuarios; // Propiedad para almacenar el usuario actual
  public listaTareas: Tareas[] = []; // Lista de tareas

  // Constructor que inyecta TareasService y UsuariosService
  constructor(
    private readonly tareasService: TareasService,
    private readonly usuariosService: UsuariosService
  ) {
    // Asignación del usuario actual utilizando el servicio UsuariosService
    this.userActual = usuariosService.obtenerUsuarioActual();
    // Obtención de la lista de tareas utilizando el servicio TareasService
    this.listaTareas = tareasService.obtenerTareas();
  }

  // Método para cerrar sesión, utiliza el servicio UsuariosService
  cerrarSesion() {
    this.usuariosService.cerrarSesion();
  }
}

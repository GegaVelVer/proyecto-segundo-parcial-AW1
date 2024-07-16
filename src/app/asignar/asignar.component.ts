// Importación de componentes y servicios necesarios
import { Component } from '@angular/core';
import { Usuarios } from '../classes/usuario';
import { UsuariosService } from '../servicios/usuarios.service';

// Decorador @Component define el componente AsignarComponent
@Component({
  selector: 'app-asignar', // Selector para el componente
  templateUrl: './asignar.component.html', // Ruta del archivo HTML de la plantilla
  styleUrl: './asignar.component.css', // Ruta del archivo CSS para estilos del componente
})
export class AsignarComponent {
  userActual: Usuarios; // Propiedad para almacenar el usuario actual
  public usuarios: Usuarios[] = []; // Lista de todos los usuarios
  public profesores: Usuarios[] = []; // Lista de usuarios de tipo Profesor

  // Constructor que inyecta el servicio UsuariosService
  constructor(private readonly usuariosService: UsuariosService) {
    // Asignación del usuario actual utilizando el servicio UsuariosService
    this.userActual = usuariosService.obtenerUsuarioActual();
    // Obtención de todos los usuarios utilizando el servicio UsuariosService
    this.usuarios = usuariosService.obtenerUsuarios();
    // Filtrado de usuarios para obtener solo aquellos que son Profesores
    this.profesores = this.usuarios.filter((item) => item.tipo === 'Profesor');
  }

  // Método para asignar un tutor a un estudiante
  asignarTutor(estudianteId: string, event: Event) {
    // Obtener el ID del profesor seleccionado del evento
    const selectElement = event.target as HTMLSelectElement;
    const profesorId = selectElement.value;
    // Asignar el tutor utilizando el servicio UsuariosService
    this.usuariosService.asignarTutor(estudianteId, profesorId);
  }

  // Método para cerrar sesión, utiliza el servicio UsuariosService
  cerrarSesion() {
    this.usuariosService.cerrarSesion();
  }
}

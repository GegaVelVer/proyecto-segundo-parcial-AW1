// Importación de componentes y servicios necesarios
import { Component } from '@angular/core';
import { Usuarios } from '../classes/usuario';
import { UsuariosService } from '../servicios/usuarios.service';

// Decorador @Component define el componente IndexComponent
@Component({
  selector: 'app-index', // Selector para el componente
  templateUrl: './index.component.html', // Ruta del archivo HTML de la plantilla
  styleUrl: './index.component.css', // Ruta del archivo CSS para estilos del componente
})
export class IndexComponent {
  userActual: Usuarios; // Propiedad para almacenar el usuario actual

  // Constructor que inyecta el servicio UsuariosService
  constructor(private readonly usuariosService: UsuariosService) {
    // Asignación del usuario actual utilizando el servicio UsuariosService
    this.userActual = usuariosService.obtenerUsuarioActual();
  }

  // Método para cerrar sesión, utiliza el servicio UsuariosService
  cerrarSesion() {
    this.usuariosService.cerrarSesion();
  }
}

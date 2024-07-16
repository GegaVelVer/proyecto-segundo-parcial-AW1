// Importación de componentes y servicios necesarios
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Usuarios } from '../classes/usuario';
import { PracticasService } from '../servicios/practicas.service';
import { UsuariosService } from '../servicios/usuarios.service';
import { TareasService } from '../servicios/tareas.service';

// Decorador @Component define el componente AgregarComponent
@Component({
  selector: 'app-agregar', // Selector para el componente
  templateUrl: './agregar.component.html', // Ruta del archivo HTML de la plantilla
  styleUrl: './agregar.component.css', // Ruta del archivo CSS para estilos del componente
})
export class AgregarComponent {
  userActual: Usuarios; // Propiedad para almacenar el usuario actual
  tareaForm: FormGroup; // Formulario reactivo para la creación de tareas

  // Constructor que inyecta varios servicios y el FormBuilder
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly fb: FormBuilder,
    private readonly toastr: ToastrService,
    private readonly practicasService: PracticasService,
    private readonly tareasService: TareasService
  ) {
    // Asignación del usuario actual utilizando el servicio UsuariosService
    this.userActual = usuariosService.obtenerUsuarioActual();
    // Inicialización del formulario reactivo con validaciones
    this.tareaForm = this.fb.group({
      titulo: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(20),
        ],
      ],
      detalles: [
        '',
        [
          Validators.required,
          Validators.minLength(20),
          Validators.maxLength(50),
        ],
      ],
    });
  }

  // Método para cerrar sesión, utiliza el servicio UsuariosService
  cerrarSesion() {
    this.usuariosService.cerrarSesion();
  }

  // Método que se ejecuta al enviar el formulario
  onSubmit() {
    if (this.tareaForm.valid) {
      // Si el formulario es válido, crear una nueva tarea utilizando el servicio TareasService
      this.tareasService.crearTarea(this.tareaForm.value);
    } else {
      // Si el formulario no es válido, mostrar un mensaje de error utilizando ToastrService
      this.toastr.error('Rellene todos los campos correctamente!', 'Error!');
    }
  }
}

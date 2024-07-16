// Importación de componentes y servicios necesarios
import { Component } from '@angular/core';
import { Usuarios } from '../classes/usuario';
import { UsuariosService } from '../servicios/usuarios.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PracticasService } from '../servicios/practicas.service';

// Decorador @Component define el componente SolicitarComponent
@Component({
  selector: 'app-solicitar', // Selector para el componente
  templateUrl: './solicitar.component.html', // Ruta del archivo HTML de la plantilla
  styleUrl: './solicitar.component.css', // Ruta del archivo CSS para estilos del componente
})
export class SolicitarComponent {
  userActual: Usuarios; // Propiedad para almacenar el usuario actual
  solicitudForm: FormGroup; // Formulario reactivo para la solicitud de prácticas

  // Constructor que inyecta UsuariosService, FormBuilder, ToastrService y PracticasService
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly fb: FormBuilder,
    private readonly toastr: ToastrService,
    private readonly practicasService: PracticasService
  ) {
    // Asignación del usuario actual utilizando el servicio UsuariosService
    this.userActual = usuariosService.obtenerUsuarioActual();
    // Inicialización del formulario reactivo con validaciones
    this.solicitudForm = this.fb.group({
      empresa: ['', [Validators.required]], // Campo de empresa con validación requerida
    });
  }

  // Método para cerrar sesión, utiliza el servicio UsuariosService
  cerrarSesion() {
    this.usuariosService.cerrarSesion();
  }

  // Método que se ejecuta al enviar el formulario
  onSubmit() {
    if (this.solicitudForm.valid) {
      // Si el formulario es válido, crear una nueva práctica
      this.practicasService.crearPractica(this.solicitudForm.value);
    } else {
      // Mostrar mensaje de error si el formulario no es válido
      this.toastr.error('Rellene todos los campos correctamente!', 'Error!');
    }
  }
}

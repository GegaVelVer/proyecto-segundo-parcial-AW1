// Importación de componentes y servicios necesarios
import { Component } from '@angular/core';
import { Usuarios } from '../classes/usuario';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UsuariosService } from '../servicios/usuarios.service';

// Decorador @Component define el componente LoginComponent
@Component({
  selector: 'app-login', // Selector para el componente
  templateUrl: './login.component.html', // Ruta del archivo HTML de la plantilla
  styleUrl: './login.component.css', // Ruta del archivo CSS para estilos del componente
})
export class LoginComponent {
  userActual: Usuarios; // Propiedad para almacenar el usuario actual
  loginForm: FormGroup; // Formulario reactivo para el inicio de sesión

  // Constructor que inyecta FormBuilder y UsuariosService
  constructor(
    private readonly fb: FormBuilder,
    private readonly usuariosService: UsuariosService
  ) {
    // Asignación del usuario actual utilizando el servicio UsuariosService
    this.userActual = usuariosService.obtenerUsuarioActual();
    // Inicialización del formulario reactivo con validaciones
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required]], // Campo de correo con validación requerida
      contraseña: ['', Validators.required], // Campo de contraseña con validación requerida
    });
  }

  // Método que se ejecuta al enviar el formulario
  onSubmit(): void {
    if (this.loginForm.valid) {
      // Si el formulario es válido, iniciar sesión
      this.iniciarSesion();
    } else {
      // Si el formulario no es válido, marcar los campos como tocados
      this.markFormGroupTouched(this.loginForm);
    }
  }

  // Método privado para marcar todos los campos del formulario como tocados
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }

  // Método para iniciar sesión utilizando el servicio UsuariosService
  iniciarSesion() {
    this.usuariosService.iniciarSesion(
      this.loginForm.value.correo,
      this.loginForm.value.contraseña
    );
  }
}

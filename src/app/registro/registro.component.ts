// Importación de componentes y servicios necesarios
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Usuarios } from '../classes/usuario';
import { ToastrService } from 'ngx-toastr';
import { UsuariosService } from '../servicios/usuarios.service';

// Decorador @Component define el componente RegistroComponent
@Component({
  selector: 'app-registro', // Selector para el componente
  templateUrl: './registro.component.html', // Ruta del archivo HTML de la plantilla
  styleUrl: './registro.component.css', // Ruta del archivo CSS para estilos del componente
})
export class RegistroComponent {
  registerForm: FormGroup; // Formulario reactivo para el registro de usuarios
  usuarios: Usuarios[] = []; // Lista de usuarios
  userActual: Usuarios; // Propiedad para almacenar el usuario actual

  // Constructor que inyecta FormBuilder, ToastrService y UsuariosService
  constructor(
    private readonly fb: FormBuilder,
    private readonly toastr: ToastrService,
    private readonly usuarioService: UsuariosService
  ) {
    // Asignación del usuario actual utilizando el servicio UsuariosService
    this.userActual = usuarioService.obtenerUsuarioActual();
    // Inicialización del formulario reactivo con validaciones
    this.registerForm = this.fb.group({
      nombres: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.pattern('^[a-zA-Z ]*$'), // Validación para solo permitir letras y espacios
        ],
      ],
      apellidos: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.pattern('^[a-zA-Z ]*$'), // Validación para solo permitir letras y espacios
        ],
      ],
      ci: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10), // Validación para CI de longitud exacta 10
        ],
      ],
      correo: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[ep][0-9]{10}@live.uleam.edu.ec$'), // Validación para correo institucional
        ],
      ],
      contraseña: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          CustomValidators.passwordValidator(), // Validación personalizada para la fortaleza de la contraseña
        ],
      ],
      contraseña2: ['', [Validators.required, Validators.minLength(6)]], // Confirmación de contraseña
    });
  }

  // Método para prevenir la entrada de números en campos específicos
  preventNumbers(event: KeyboardEvent): void {
    const charCode = event.charCode;
    if (charCode >= 48 && charCode <= 57) {
      event.preventDefault();
    }
  }

  // Método que se ejecuta al enviar el formulario
  onSubmit() {
    if (this.registerForm.valid) {
      // Verificar si las contraseñas coinciden
      if (
        this.registerForm.value.contraseña !==
        this.registerForm.value.contraseña2
      ) {
        this.toastr.error('Las contraseñas no coinciden!', 'Error!');
      } else {
        // Registrar usuario utilizando el servicio UsuariosService
        this.usuarioService.registrarUsuario(this.registerForm.value);
      }
    } else {
      // Mostrar mensaje de error si el formulario no es válido
      if (this.registerForm)
        this.toastr.error('Rellene todos los campos correctamente!', 'Error!');
    }
  }

  // Método para obtener usuarios almacenados en localStorage
  obtenerUsuarios() {
    const userJson = localStorage.getItem('user');
    return userJson ? JSON.parse(userJson) : null;
  }
}

// Clase para validaciones personalizadas
export class CustomValidators {
  static passwordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      // Validaciones para fortaleza de la contraseña
      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasNumeric = /[0-9]/.test(value);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
      const isValid =
        hasUpperCase && hasLowerCase && hasNumeric && hasSpecialChar;

      // Devolver error si no cumple con los criterios de fortaleza
      return !isValid ? { passwordStrength: true } : null;
    };
  }
}

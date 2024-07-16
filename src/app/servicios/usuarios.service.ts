// Importación de módulos y servicios necesarios
import { Injectable } from '@angular/core';
import { Usuarios } from '../classes/usuario';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

// Decorador @Injectable define el servicio UsuariosService
@Injectable({
  providedIn: 'root', // Proveedor del servicio a nivel de aplicación
})
export class UsuariosService {
  private listaUsuarios: Usuarios[] = []; // Lista de usuarios

  // Constructor que inyecta Router y ToastrService
  constructor(
    private readonly enrutador: Router,
    private readonly toastr: ToastrService
  ) {
    this.cargarUsuarios(); // Cargar usuarios desde el almacenamiento local
  }

  // Método privado para cargar usuarios desde el almacenamiento local
  private cargarUsuarios(): void {
    const usuariosAlmacenados = localStorage.getItem('usuarios');
    this.listaUsuarios = usuariosAlmacenados
      ? JSON.parse(usuariosAlmacenados)
      : [];
  }

  // Método privado para generar un UUID
  private generarUUID(): string {
    return 'xxxxyxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  // Método público para obtener la lista de usuarios
  obtenerUsuarios(): Usuarios[] {
    return this.listaUsuarios;
  }

  // Método público para registrar un nuevo usuario
  registrarUsuario(usuario: Usuarios) {
    const existe = this.listaUsuarios.find(
      (usr) => usr.correo === usuario.correo || usr.ci === usuario.ci
    );

    if (existe) {
      this.toastr.error('Usuario ya existe', 'Error!');
    } else {
      const nuevoUsuario: Usuarios = {
        id: this.generarUUID(),
        nombres: usuario.nombres,
        apellidos: usuario.apellidos,
        ci: usuario.ci,
        correo: usuario.correo,
        contraseña: usuario.contraseña,
        tipo: usuario.correo?.at(0) === 'e' ? 'Estudiante' : 'Profesor',
      };
      this.listaUsuarios.push(nuevoUsuario);
      localStorage.setItem('usuarios', JSON.stringify(this.listaUsuarios));
      this.enrutador.navigate(['/login']);
      this.toastr.success('Usuario registrado con éxito', 'Ok!');
    }
  }

  // Método público para iniciar sesión
  iniciarSesion(correo: string, contraseña: string) {
    const usuarioEncontrado = this.listaUsuarios.find(
      (usuario) => usuario.correo === correo
    );
    if (usuarioEncontrado) {
      if (usuarioEncontrado.contraseña === contraseña) {
        this.toastr.success(`Bienvenido ${usuarioEncontrado.nombres}`);
        localStorage.setItem(
          'usuarioActual',
          JSON.stringify(usuarioEncontrado)
        );
        this.enrutador.navigate(['/index']);
      } else {
        this.toastr.error('Contraseña incorrecta', 'Error!');
      }
    } else {
      this.toastr.error('Usuario no existe', 'Error!');
    }
  }

  // Método público para cerrar sesión
  cerrarSesion() {
    localStorage.removeItem('usuarioActual');
    this.enrutador.navigate(['/index']);
  }

  // Método público para obtener el usuario actual desde el almacenamiento local
  obtenerUsuarioActual() {
    const usuario = localStorage.getItem('usuarioActual');
    return usuario ? JSON.parse(usuario) : null;
  }

  // Método público para buscar un usuario por su ID
  buscarUsuario(id: string) {
    return this.listaUsuarios.find((usr) => usr.id === id);
  }

  // Método público para asignar un tutor a un estudiante
  asignarTutor(idEstudiante: string, idTutor: string) {
    const estudiante = this.buscarUsuario(idEstudiante);
    const profesor = this.buscarUsuario(idTutor);
    if (estudiante) {
      const indice = this.listaUsuarios.findIndex(
        (usuario) => usuario.id === idEstudiante
      );
      this.listaUsuarios[indice] = {
        ...this.listaUsuarios[indice],
        tutor: profesor,
      };
      localStorage.setItem('usuarios', JSON.stringify(this.listaUsuarios));
      this.cargarUsuarios();
    }
  }
}

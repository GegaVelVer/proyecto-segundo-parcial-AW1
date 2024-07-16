// Definición de la clase Usuarios
export class Usuarios {
  id?: string; // Identificador único para el usuario
  nombres?: string; // Nombres del usuario
  apellidos?: string; // Apellidos del usuario
  ci?: string; // Carnet de identidad del usuario
  correo?: string; // Correo electrónico del usuario
  contraseña?: string; // Contraseña del usuario
  tipo?: string; // Tipo de usuario (por ejemplo, "Estudiante", "Profesor")
  tutor?: Usuarios; // Objeto Usuario que representa al tutor del usuario, si aplica
}

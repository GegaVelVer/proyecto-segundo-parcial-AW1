// Importación de la clase Usuarios
import { Usuarios } from './usuario';

// Definición de la clase Practicas
export class Practicas {
  id?: string; // Identificador único para la práctica
  empresa?: string; // Nombre de la empresa donde se realiza la práctica
  tutor?: Usuarios; // Objeto Usuario que representa al tutor de la práctica
  estudiante?: Usuarios; // Objeto Usuario que representa al estudiante de la práctica
  estado?: string; // Estado actual de la práctica (por ejemplo, "en curso", "finalizada")
}

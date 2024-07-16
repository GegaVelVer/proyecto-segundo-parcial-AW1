// Importación de la clase Practicas
import { Practicas } from './practica';

// Definición de la clase Tareas
export class Tareas {
  id?: string; // Identificador único para la tarea
  titulo?: string; // Título de la tarea
  detalles?: string; // Detalles o descripción de la tarea
  practica?: Practicas; // Objeto Practicas que representa la práctica asociada a la tarea
}

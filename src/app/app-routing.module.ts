// Importación de módulos y componentes necesarios
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { AboutComponent } from './about/about.component';
import { SolicitarComponent } from './solicitar/solicitar.component';
import { SeguimientoComponent } from './seguimiento/seguimiento.component';
import { AsignarComponent } from './asignar/asignar.component';
import { AgregarComponent } from './agregar/agregar.component';

// Definición de las rutas de la aplicación
const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' }, // Redirige la ruta vacía a 'index'
  { path: 'index', component: IndexComponent }, // Ruta para el componente IndexComponent
  { path: 'login', component: LoginComponent }, // Ruta para el componente LoginComponent
  { path: 'registro', component: RegistroComponent }, // Ruta para el componente RegistroComponent
  { path: 'acerca-de', component: AboutComponent }, // Ruta para el componente AboutComponent
  { path: 'solicitud', component: SolicitarComponent }, // Ruta para el componente SolicitarComponent
  { path: 'seguimiento', component: SeguimientoComponent }, // Ruta para el componente SeguimientoComponent
  { path: 'asignar', component: AsignarComponent }, // Ruta para el componente AsignarComponent
  { path: 'agregar', component: AgregarComponent }, // Ruta para el componente AgregarComponent
  { path: '**', redirectTo: 'index' }, // Redirige cualquier ruta no definida a 'index'
];

// Decorador @NgModule define el módulo de enrutamiento
@NgModule({
  imports: [RouterModule.forRoot(routes)], // Importa RouterModule y configura las rutas
  exports: [RouterModule], // Exporta RouterModule para que esté disponible en toda la aplicación
})
export class AppRoutingModule {}

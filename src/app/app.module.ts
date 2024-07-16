// Importación de módulos necesarios
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

// Importación de módulos y componentes de la aplicación
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { SolicitarComponent } from './solicitar/solicitar.component';
import { AsignarComponent } from './asignar/asignar.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { SeguimientoComponent } from './seguimiento/seguimiento.component';
import { AgregarComponent } from './agregar/agregar.component';

// Decorador @NgModule define el módulo raíz de la aplicación
@NgModule({
  declarations: [
    AppComponent, // Componente raíz de la aplicación
    AboutComponent, // Componente About
    SolicitarComponent, // Componente Solicitar
    AsignarComponent, // Componente Asignar
    IndexComponent, // Componente Index
    LoginComponent, // Componente Login
    RegistroComponent, // Componente Registro
    SeguimientoComponent, // Componente Seguimiento
    AgregarComponent, // Componente Agregar
  ],
  imports: [
    BrowserModule, // Módulo necesario para aplicaciones web
    AppRoutingModule, // Módulo de enrutamiento de la aplicación
    BrowserAnimationsModule, // Módulo para animaciones en el navegador
    ReactiveFormsModule, // Módulo para formularios reactivos
    FormsModule, // Módulo para formularios template-driven
    ToastrModule.forRoot(), // Módulo para notificaciones Toastr, configurado con opciones por defecto
  ],
  providers: [], // Proveedores de servicios, si los hay
  bootstrap: [AppComponent], // Componente de arranque de la aplicación
})
export class AppModule {}

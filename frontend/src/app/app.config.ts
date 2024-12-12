import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { routes } from './app.routes'; // Importa las rutas

export const appConfig = {
  providers: [
    provideRouter(routes), // Configuración de rutas
    provideHttpClient(),   // Habilita HttpClient
    importProvidersFrom(BrowserModule), // Habilita BrowserModule
  ],
};

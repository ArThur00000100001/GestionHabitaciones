import { Routes } from '@angular/router';
import { inicio } from './inicio/inicio';
import { usuarios } from './usuarios/usuarios';

export const routes: Routes = [
    {path: '', component: inicio},
    {path: 'usuarios', component: usuarios}
];

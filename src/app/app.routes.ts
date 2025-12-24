import { Routes } from '@angular/router';
import { inicio } from './inicio/inicio';
import { usuarios } from './usuarios/usuarios';
import { reserva } from './reserva/reserva';
import { Example } from './example/example';
import { FormReactivo } from './formReactivo/formReactivo';

export const routes: Routes = [
    {path: '', component: inicio},
    {path: 'usuarios', component: usuarios},
    {path: 'reservas', component: reserva},
    {path: 'example', component: Example},
    {path: 'reactivo', component: FormReactivo}
];

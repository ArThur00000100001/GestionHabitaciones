import { Routes } from '@angular/router';
import { inicio } from './inicio/inicio';
import { listado } from './listado/listado';

export const routes: Routes = [
    {path: '', component: inicio},
    {path: 'lista', component: listado}
];

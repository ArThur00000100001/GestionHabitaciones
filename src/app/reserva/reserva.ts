import { Component, signal } from '@angular/core';
import { baseUrl } from '../../enviroment';
import { Usuario } from '../usuarios/usuarios';
import { Habitacion } from '../inicio/inicio';

type ModalData = { mode: 'edit' | 'add'; item: reserva | null };

type Reserva = {
  id: number;
  habitacion_id: number;
  usuario_id: number;
  estado: number;
  fecha_registro: string;
  habitacion: Habitacion | null | undefined;
  usuario: Usuario | null | undefined;
};

@Component({
  selector: 'reserva-view1',
  templateUrl: './reserva.html',
  styleUrl: './reserva.scss',
})
export class reserva {
  reservas = signal<Reserva[]>([]);
  usuarios = signal<Usuario[]>([])
  readonly data = signal<ModalData | null>(null);

  constructor() {
    this.cargarDatos();
    this.cargarUsuarios();
  }

  async cargarDatos() {
    const list = await fetch(`${baseUrl}/registros`);
    const data = await list.json();
    if (data != null && Array.isArray(data)) {
      this.reservas.set(data as Reserva[]);
    }
  }

  async cargarUsuarios() {
    const list = await fetch(`${baseUrl}/usuarios`);
    const data = await list.json();

    if (data != null && Array.isArray(data)) {
      this.usuarios.set(data as Usuario[]);
      console.log(data);
    }
  }

  selectHabitacion(id: string | null){

    console.log(Number(id))

  }


}

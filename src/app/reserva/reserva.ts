import { Component, signal } from '@angular/core';
import { baseUrl } from '../../enviroment';
import { Usuario } from '../usuarios/usuarios';
import { Habitacion } from '../inicio/inicio';
import { DatePipe } from '@angular/common';
import { UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

type ModalData = { mode: 'edit' | 'add'; item: reserva | null };

type Reserva = {
  id: number;
  habitacion_id: number;
  usuario_id: number;
  estado: number;
  fecha_registro: string;
  habitacion: Habitacion;
  usuario: Usuario | null | undefined;
};

@Component({
  selector: 'reserva-view1',
  imports: [DatePipe, UpperCasePipe, FormsModule],
  templateUrl: './reserva.html',
  styleUrl: './reserva.scss',
})
export class reserva {
  reservas = signal<Reserva[]>([]);
  usuarios = signal<Usuario[]>([]);
  readonly data = signal<ModalData | null>(null);

  readonly idH = signal<string>('')
  readonly estadoH = signal<string>('')
  readonly userId = signal<string>('')

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

  selectHabitacion(
    estado: HTMLInputElement,
    boton: HTMLButtonElement,
    select: HTMLSelectElement
  ) {
    if (this.data()?.mode == 'edit') {
      const habi = this.reservas().filter((x) => x.habitacion.id == Number(this.idH()));
      const habi2 = habi.map((x) => habi);
      if (habi2.length != 0) {
        if (habi2[0][0].estado == 0) {
          estado.value = 'Libre';
          estado.style.display = 'none';
          boton.disabled = false;
          select.style.display = 'block';
        } else if (habi2[0][0].estado == 1) {
          estado.value = 'Reservado';
          estado.style.display = 'none';
          boton.disabled = false;
          select.style.display = 'block';
        } else if (habi2[0][0].estado == 2) {
          estado.value = 'Ocupado';
          estado.style.display = 'none';
          boton.disabled = false;
          select.style.display = 'block';
        }

        console.log(Number(this.idH()), habi2[0][0].estado);
      }
    }
    if (this.data()?.mode == 'add') {
      const habi = this.reservas().filter((x) => x.habitacion.id == Number(this.idH()));
      const habi2 = habi.map((x) => habi);

      if (habi2[0][0].estado == 0) {
        estado.value = 'Libre';
        estado.style.display = 'none';
        boton.disabled = false;
        select.style.display = 'block';
      } else if (habi2[0][0].estado == 1) {
        estado.value = 'Reservado';
        estado.style.display = 'block';
        boton.disabled = true;
        select.style = 'display: none';
      } else if (habi2[0][0].estado == 2) {
        estado.value = 'Ocupado';
        estado.style.display = 'block';
        boton.disabled = true;
        select.style = 'display: none';
      }

      console.log(Number(this.idH()), habi2[0][0].estado);
    }
  }

  async guardar(userId: string, estado: string, habitacionId: string) {
    if (this.data()?.mode == 'edit') {
      if (+estado == 0) {
        
        const response = await fetch(`${baseUrl}/registros`, {
          method: 'post',
          body: JSON.stringify({
            habitacion_id: +habitacionId,
            usuario_id: null,
            estado: +estado,
            usuario: null,
          }),
          headers: {
            'Content-type': 'application/json',
            Accept: 'application/json',
          },
        });

        if (!response.ok) {
          console.log('Error');
        } else {
          console.log('Funciona');
          this.cargarDatos();
        }

      } else {
        const response = await fetch(`${baseUrl}/registros`, {
          method: 'post',
          body: JSON.stringify({
            habitacion_id: +habitacionId,
            usuario_id: +userId,
            estado: +estado,
          }),
          headers: {
            'Content-type': 'application/json',
            Accept: 'application/json',
          },
        });

        if (!response.ok) {
          console.log('Error');
        } else {
          console.log('Funciona');
          this.cargarDatos();
        }
      }
    }
    if (this.data()?.mode == 'add') {
      const response = await fetch(`${baseUrl}/registros`, {
        method: 'POST',
        body: JSON.stringify({
          habitacion_id: +habitacionId,
          usuario_id: +userId,
          estado: +estado,
        }),
        headers: {
          'Content-type': 'application/json',
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        console.log('Error');
      } else {
        console.log('Funciona');
        this.cargarDatos();
      }
    }
  }

  async eliminar(id: number, fecha: HTMLSpanElement, habitacionId: number) {
    const response = await fetch(`${baseUrl}/registros`, {
      method: 'post',
      body: JSON.stringify({
        id: null,
        usuario_id: null,
        habitacion_id: habitacionId,
        estado: 0,
        fecha_registro: null,
        usuario: null,
      }),
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      console.log('Error');
    } else {
      console.log('Funciona');
      fecha.innerHTML = '';
      this.cargarDatos();
    }
  }
}

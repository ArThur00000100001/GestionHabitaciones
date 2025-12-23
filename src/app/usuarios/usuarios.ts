import { Component, signal } from '@angular/core';
import { baseUrl } from '../../enviroment';
type ModalData = { mode: 'edit' | 'add'; item: Usuario | null };
export type Usuario = {
  id: number;
  nombres: string;
  primer_apellido: string;
  segundo_apellido: string;
  dni: number;
};

@Component({
  selector: 'usuarios-view',
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.scss',
})
export class usuarios {
  usuarios = signal<Usuario[]>([]);
  dniValue = signal<string>('');

  dniUser = signal<string>('');
  nombreUser = signal<string>('');
  apelldioPUser = signal<string>('');
  apelldioMUser = signal<string>('');

  readonly data = signal<ModalData | null>(null);

  constructor() {
    this.cargarDatos();
  }

  async cargarDatos() {
    const list = await fetch(`${baseUrl}/usuarios`);
    const data = await list.json();

    if (data != null && Array.isArray(data)) {
      this.usuarios.set(data as Usuario[]);
      console.log(data);
    }
  }

  async ingresar(dni: string, nombres: string, apellidoP: string, apellidoM: string) {
    if (!(+dni == +dni)) {
      this.dniValue.set('');
      console.log('ere');
      alert('Ingrese un dni valido');
      return;
    }

    const response = await fetch(`${baseUrl}/usuarios`, {
      method: 'POST',
      body: JSON.stringify({
        nombres: nombres,
        primer_apellido: apellidoP,
        segundo_apellido: apellidoM,
        dni: +dni,
      }),
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
      },
    });

    if (!response) {
      console.log('Error');
    } else {
      console.log('Funciona');
    }

    this.cargarDatos();
  }

  async borrar(id: number) {
    const response = await fetch(`${baseUrl}/usuarios/${id}`, {
      method: 'DELETE',
      headers: { 'Content-type': 'application/son ' },
    });

    if (!response) {
      console.log('Error');
    } else {
      console.log('Funciona');
    }

    this.cargarDatos();
  }

  async guardar(
    id: number | undefined,
    dni: string,
    nombre: string,
    apellidoP: string,
    apellidoM: string,
  ) {
    if (this.data()?.mode == 'edit') {
      const response = await fetch(`${baseUrl}/usuarios/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          nombres: nombre,
          primer_apellido: apellidoP,
          segundo_apellido: apellidoM,
          dni: +dni,
        }),
        headers: { 'Content-type': 'application/json' },
      });

      if (!response) {
        console.log('Error');
      } else {
        console.log('Funciona');
        this.cargarDatos();
      }
     
    }
    if (this.data()?.mode == 'add') {
      this.ingresar(dni, nombre, apellidoP, apellidoM);
    }

     this.data.set(null);
  }

  closeModal(
    dni: HTMLInputElement,
    nombre: HTMLInputElement,
    apellidoP: HTMLInputElement,
    apellidoM: HTMLInputElement,
  ) {
    dni.value = '';
    nombre.value = '';
    apellidoP.value = '';
    apellidoM.value = '';
  }

  verificar(event: Event, inputElement: HTMLInputElement) {
    const input = event.target as HTMLInputElement;
    let valor = input.value;

    const soloNumeros = valor.replace(/[^0-9]/g, '');

    if (valor !== soloNumeros) {
      input.value = soloNumeros;
    }
  }
  //   readonly usuario_actual = signal<Usuario | null>(null);
  //   seleccionarUsuario(usuario: Usuario) {
  //     this.usuario_actual.set(usuario);
  //   }
}

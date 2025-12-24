import { Component, signal } from '@angular/core';
import { baseUrl } from '../../enviroment';
import { FormsModule } from '@angular/forms';
import { Validator, FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';

type ModalData = { mode: 'edit' | 'add'; item: Usuario | null };
export type Usuario = {
  id: number;
  nombres: string;
  primer_apellido: string;
  segundo_apellido: string;
  dni: number;
};

@Component({
  imports: [FormsModule, ReactiveFormsModule],
  selector: 'usuarios-view',
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.scss',
})
export class usuarios {
  usuarios = signal<Usuario[]>([]);
  dniValue = signal<string>('');
  formData: FormGroup;

  dniUser = signal<string>('');
  nombreUser = signal<string>('');
  apelldioPUser = signal<string>('');
  apelldioMUser = signal<string>('');

  readonly data = signal<ModalData | null>(null);
  readonly userDNI = signal<string>('');
  readonly userName = signal<string>('');
  readonly userLastnameP = signal<string>('');
  readonly userLasnameM = signal<string>('');

  constructor() {
    this.cargarDatos();

    this.formData = new FormGroup({
      dni: new FormControl('', [
        Validators.required,
        Validators.maxLength(8),
        Validators.minLength(8),
      ]),
      nombre: new FormControl('', [
        Validators.required,
        Validators.maxLength(15),
        Validators.minLength(3),
      ]),
      apellidoP: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(15),
      ]),
      apellidoM: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(15),
      ]),
    });
  }

  async cargarDatos() {
    const list = await fetch(`${baseUrl}/usuarios`);
    const data = await list.json();

    if (data != null && Array.isArray(data)) {
      this.usuarios.set(data as Usuario[]);
      console.log(data);
    }
  }

  async ingresar() {
    if (!(+this.formData.get('dni')?.value == +this.formData.get('dni')?.value)) {
      this.formData.get('dni')?.setValue('');
      console.log('ere');
      alert('Ingrese un dni valido');
      return;
    }

    const isValidForm = this.formData.valid;

    if (isValidForm) {
      const response = await fetch(`${baseUrl}/usuarios`, {
        method: 'POST',
        body: JSON.stringify({
          nombres: this.formData.get('nombre')?.value,
          primer_apellido: this.formData.get('apellidoP')?.value,
          segundo_apellido: this.formData.get('apellidoM')?.value,
          dni: +this.formData.get('dni')?.value,
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
        this.data.set(null);
      }
    }else{
      this.formData.markAllAsTouched();
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

  async guardar(id: number | undefined) {
    if (this.data()?.mode == 'edit') {
      const response = await fetch(`${baseUrl}/usuarios/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          nombres: this.userName(),
          primer_apellido: this.userLastnameP(),
          segundo_apellido: this.userLasnameM(),
          dni: +this.userDNI(),
        }),
        headers: { 'Content-type': 'application/json' },
      });

      if (!response) {
        console.log('Error');
      } else {
        console.log('Funciona');
        this.cargarDatos();
        this.data.set(null);
      }
    }
    if (this.data()?.mode == 'add') {
      this.ingresar();
    }

    
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

  verificar(inputElement: HTMLInputElement) {
    //const input = event.target as HTMLInputElement;
    let valor = inputElement.value;
    const soloNumeros = valor.replace(/[^0-9]/g, '');

    if (valor !== soloNumeros) {
      inputElement.value = soloNumeros;
    }
  }
  //   readonly usuario_actual = signal<Usuario | null>(null);
  //   seleccionarUsuario(usuario: Usuario) {
  //     this.usuario_actual.set(usuario);
  //   }
}

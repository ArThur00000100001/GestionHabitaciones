import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validator } from '@angular/forms';

@Component({
  imports: [ReactiveFormsModule, JsonPipe],
  template: `
    <!-- tu-componente.component.html -->
    <div class="card">
      <form [formGroup]="miFormulario" (ngSubmit)="sendForm()">
        <div>
          <label for="nombre">Nombre:</label>
          <input type="text" id="nombre" formControlName="nombre" />

          <div class="text-danger">
            @if (miFormulario.get('nombre')?.invalid && miFormulario.get('nombre')?.touched) {
              @if (miFormulario.get('nombre')?.errors?.['required']) {
                El nombre es obligatorio
              }
            }
          </div>
          <div>
            @if (miFormulario.get('nombre')?.errors?.['minlength']) {
              <span>El nombre debe tener al menos 3 caracteres</span>
            }
          </div>

          <label for="">Email</label>
          <input type="email" id="email" formControlName="email" />
          <div class="text-danger">
            @if (miFormulario.get('email')?.invalid && miFormulario.get('email')?.touched) {
              @if (miFormulario.get('email')?.errors?.['required']) {
                El email es obligatorio
              }
              @if (miFormulario.get('email')?.errors?.['email']) {
                El formato es incorrecto
              }
            }
          </div>

          <div>
            <label for="">Detalle</label>
            <input formControlName="mensaje" />
            <div class="text-danger">
              @if (miFormulario.get('mensaje')?.invalid && miFormulario.get('mensaje')?.touched) {               
                @if (miFormulario.get('mensaje')?.errors?.['maxlength']) {
                  Caracteres excedidos
                }
              }
              <!-- {{miFormulario.get('mensaje')?.errors | json}} -->
            </div>
          </div>

          <!-- Muestra error si el campo es inválido y fue tocado/enviado 
    <div *ngIf="miFormulario.get('nombre')?.invalid && miFormulario.get('nombre')?.touched">
      <div *ngIf="miFormulario.get('nombre')?.errors?.['required']">
        El nombre es obligatorio.
      </div>
      <div *ngIf="miFormulario.get('nombre')?.errors?.['minlength']">
        El nombre debe tener al menos 3 caracteres.
      </div>
    </div>
  </div>

  <div>
    <label for="email">Email:</label>
    <input type="email" id="email" formControlName="email">
    <div *ngIf="miFormulario.get('email')?.invalid && miFormulario.get('email')?.touched">
      <div *ngIf="miFormulario.get('email')?.errors?.['required']">
        El email es obligatorio.
      </div>
      <div *ngIf="miFormulario.get('email')?.errors?.['email']">
        Formato de email inválido.
      </div>
    </div>-->
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  `,
})
export class FormReactivo {
  miFormulario: FormGroup;

  constructor() {
    this.miFormulario = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      mensaje: new FormControl('', [Validators.maxLength(20)]),
    });
  }

  sendForm() {
    console.log(this.miFormulario.value);
    const isValidForm = this.miFormulario.valid;
    this.miFormulario.markAllAsTouched();
    if (isValidForm) {
      //do something
    }
  }
}

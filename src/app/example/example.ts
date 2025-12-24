import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FieldComponent } from "./field";

@Component({
  imports: [FormsModule, FieldComponent],
  template: `
    <div class="card m-3 p-3">
      <!-- <div>
        <label>nombre</label>
        <input type="text" [(ngModel)]="name" placeholder="ingrese nombre" />
      </div> -->
      <ui-field [(data)]="name" />
      <div>
        <label>Apellidos</label>
        <input
          type="text"
          [ngModel]="lastName()"
          (ngModelChange)="lastName.set($event)"
          placeholder="ingrese nombre"
        />
      </div>

      <div>
        <label>Género</label>

        <select [(ngModel)]="genre">
          <option [value]="null" disabled>-seleccione-</option>
          <option value="m">Masculino</option>
          <option value="f">Femenino</option>
        </select>
      </div>

      <hr />

      <div class="mt-3">Nombre completo: {{ fullName() }}</div>
      <div>{{ genre() == null ? 'sin definir' : genre() == 'f' ? 'Femenino' : 'Masculino' }}</div>
    </div>
  `,
})
export class Example {
  readonly name = signal<string>('name');
  readonly lastName = signal<string>('ape');
  readonly genre = signal<'m' | 'f' | null>(null);

  readonly fullName = computed(() => {
    return `${this.name()} ${this.lastName()}`;
  });
}

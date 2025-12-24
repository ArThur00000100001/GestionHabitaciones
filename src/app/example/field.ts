import { Component, computed, input, model, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ui-field',
  imports: [FormsModule],
  template: `
    <label>{{ label() }}</label>
    <input
      type="text"
      [(ngModel)]="data"
      placeholder="ingrese nombre"
    />

    {{data()}}
  `,
  styles: `:host{
    display: block;
  }`,
})
export class FieldComponent {
  readonly label = input<string>();
  // readonly data = input.required<string>();
  // readonly dataChange = output<string>();

  readonly data = model.required<string>();
}

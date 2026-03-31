import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error',
  standalone: true,
  template: `<p class="error">{{ message }}</p>`
})
export class ErrorComponent {
  @Input() message = '';
}
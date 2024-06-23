import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent {
  @Input() message = ""
  close() {
    // Implement the logic to close the toast
    const toastElement = document.querySelector('app-toast');
    if (toastElement) {
      toastElement.remove();
    }
  }
}

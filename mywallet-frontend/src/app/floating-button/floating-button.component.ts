// floating-button.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseFormComponent } from '../forms/expense-form.component';

@Component({
  selector: 'app-floating-button',
  standalone: true,
  imports: [CommonModule, ExpenseFormComponent],
  templateUrl: './floating-button.component.html',
  styleUrls: ['./floating-button.component.css']
})
export class FloatingButtonComponent {
  isModalOpen = false;

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  onOverlayClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.closeModal();
    }
  }
}
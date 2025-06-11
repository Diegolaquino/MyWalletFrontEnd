import { Component, OnInit } from '@angular/core';
import { Expense } from '../models/expense.model';
import { ExpenseService } from '../services/expense.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-installment-purchases',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './installment-purchases.component.html',
  styleUrl: './installment-purchases.component.css'
})
export class InstallmentPurchasesComponent implements OnInit {
  expenses: Expense[] = [];

  constructor(private expenseService: ExpenseService) {}

  ngOnInit(): void {
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();

    this.expenseService.getExpensesWithInstallments(currentMonth, currentYear)
      .subscribe({
        next: (data) => {
          this.expenses = data;
        },
        error: (err) => {
          console.error('Erro ao carregar despesas:', err);
        }
      });
  }
}

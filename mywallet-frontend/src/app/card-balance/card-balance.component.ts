import { Component } from '@angular/core';
import { ExpenseService } from '../services/expense.service';
import { Balance } from '../models/expense.model';

@Component({
  selector: 'app-card-balance',
  standalone: true,
  imports: [],
  templateUrl: './card-balance.component.html',
  styleUrl: './card-balance.component.css'
})
export class CardBalanceComponent {
  incomeTotal?: number = 0;
  expenseTotal?: number = 0;
  othersTotal?: number = 0;
  total?: number = 0;
  fixedEntries?: number = 0;

  incomeTotalLastMonth?: number = 0;
  expenseTotalLastMonth?: number = 0;
  othersTotalLastMonth?: number = 0;
  totalLastMonth?: number = 0;
  fixedEntriesLastMonth?: number = 0;

  incomeTotalNextMonth?: number = 0;
  expenseTotalNextMonth?: number = 0;
  othersTotalNextMonth?: number = 0;
  totalNextMonth?: number = 0;
  fixedEntriesNextMonth?: number = 0;

  constructor(private expenseService: ExpenseService) { }

  ngOnInit(): void {
    const today = new Date();
    const month = today.getMonth() + 1; 
    const year = today.getFullYear();

    this.expenseService.getBalance(month, year).subscribe(balance => {
      this.incomeTotal = balance.income;
      this.expenseTotal = balance.expense;
      this.othersTotal = balance.others;
      this.fixedEntries = balance.fixedEntries;
      this.total = balance.total;
    });

    this.expenseService.getBalance(month - 1, year).subscribe(balance => {
      this.incomeTotalLastMonth = balance.income;
      this.expenseTotalLastMonth = balance.expense;
      this.othersTotalLastMonth = balance.others;
      this.fixedEntriesLastMonth = balance.fixedEntries;
      this.totalLastMonth = balance.total;
    });

    this.expenseService.getBalance(month + 1, year).subscribe(balance => {
      this.incomeTotalNextMonth = balance.income;
      this.expenseTotalNextMonth = balance.expense;
      this.othersTotalNextMonth = balance.others;
      this.fixedEntriesNextMonth = balance.fixedEntries;
      this.totalNextMonth = balance.total;
    });
  }
}

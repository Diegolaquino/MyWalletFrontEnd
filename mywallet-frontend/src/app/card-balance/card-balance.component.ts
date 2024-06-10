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
  }
}

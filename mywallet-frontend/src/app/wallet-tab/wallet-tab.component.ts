import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseService } from '../services/expense.service';
import { WalletService } from '../services/wallet.service';
import { Expense, Wallet } from '../models/expense.model';

@Component({
  selector: 'app-wallet-tab',
  templateUrl: './wallet-tab.component.html',
  styleUrls: ['./wallet-tab.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class WalletTabComponent implements OnInit {
  wallets: Wallet[] = [];
  currentMonthExpenses: { [walletId: string]: Expense[] } = {};
  currentTotalValue: { [walletId: string] : number } = {};
  currentMonth: number = 0;
  currentYear: number = 0;
  nextMonth: number = 0;
  nextYear: number = 0;

  constructor(private walletService: WalletService, private expenseService: ExpenseService) { }

  ngOnInit(): void {
    const today = new Date();
    this.currentMonth = today.getMonth() + 1;
    this.currentYear = today.getFullYear();
    this.nextMonth = this.currentMonth === 12 ? 1 : this.currentMonth + 1;
    this.nextYear = this.currentMonth === 12 ? this.currentYear + 1 : this.currentYear;

    this.walletService.getWallets().subscribe((wallets: Wallet[]) => {
      this.wallets = wallets;
      this.wallets.forEach(wallet => {
        this.loadCurrentMonthExpenses(wallet);
      });
    });
  }

  loadCurrentMonthExpenses(wallet: Wallet): void {
    const startDate = new Date(this.currentYear, this.currentMonth - 1, 1).toISOString().split('T')[0];
    const endDate = new Date(this.nextYear, this.nextMonth - 1, 5).toISOString().split('T')[0];

    this.expenseService.getExpensesByInterval(startDate, endDate).subscribe((expenses: Expense[]) => {
      const filteredExpenses = expenses.filter(expense => {
        if (!expense.expenseDate) return false;

        const expenseDate = new Date(expense.expenseDate);
        const shoppingDay = wallet.shoppingDay ?? 1;
        const invoiceStartDate = new Date(this.currentYear, this.currentMonth - 1, shoppingDay);
        const invoiceEndDate = new Date(this.nextYear, this.nextMonth - 1, shoppingDay);

        return expenseDate >= invoiceStartDate && expenseDate < invoiceEndDate && expense.walletId === wallet.id;
      });
      this.currentMonthExpenses[wallet.id] = filteredExpenses;
      this.currentTotalValue[wallet.id] = filteredExpenses.reduce((soma, valorAtual) => soma + valorAtual.value, 0);
    });
  }
}

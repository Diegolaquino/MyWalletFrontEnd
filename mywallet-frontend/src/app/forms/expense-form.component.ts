import { Component, OnInit } from '@angular/core';
import { CommonModule} from '@angular/common';
import { EntryExpense, Wallet, Category } from '../models/expense.model';
import { WalletService } from '../services/wallet.service';
import { CategoryService } from '../services/category.service';
import { FormsModule } from '@angular/forms';
import { ExpenseService } from '../services/expense.service';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, NavBarComponent]
})
export class ExpenseFormComponent implements OnInit {
  expense: EntryExpense = {
    expenseDate: '',
    value: 0,
    walletId: '',
    categoryId: '',
    tags: '',
    installmentsQuantity: 1,
    paid: false,
    comments: '',
    name: '',
    isFixed: false,
    type: 1,
  };

  wallets: Wallet[] = [];
  categories: Category[] = [];

  constructor(private walletService: WalletService, private categoryService: CategoryService, private expenseService: ExpenseService) {}

  ngOnInit(): void {
    this.loadWallets();
    this.loadCategories();
  }

  loadWallets(): void {
    this.walletService.getWallets().subscribe(wallets => this.wallets = wallets);
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(categories => this.categories = categories);
  }

  onSubmit(): void {
    // Lógica para salvar o expense
    console.log(this.expense);

    var response = this.expenseService.createExpense(this.expense);

   
  }
}

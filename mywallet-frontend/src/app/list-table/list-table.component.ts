import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../services/expense.service'; 
import { Expense } from '../models/expense.model'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-table',
  templateUrl: './list-table.component.html',
  styleUrls: ['./list-table.component.css'],
  standalone: true,
  imports:[ CommonModule, FormsModule ]
})
export class ListTableComponent implements OnInit {
  expenses: Expense[] = [];
  startDate: string = '';
  endDate: string = '';

  constructor(private expenseService: ExpenseService) { }

  ngOnInit(): void {
    const today = new Date();
    const start = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
    const end = today;

    const startDate = start.toISOString().split('T')[0];
    const endDate = end.toISOString().split('T')[0];

    this.expenseService.getExpensesByInterval(startDate, endDate).subscribe(expenses => {
      this.expenses = expenses;
      console.log(expenses);
    });
  }

  updateTable(): void{
    
  }
}

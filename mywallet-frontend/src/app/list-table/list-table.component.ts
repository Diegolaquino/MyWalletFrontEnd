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
  months: string[] = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  years: number[] = [];
  selectedMonth: number;
  selectedYear: number;

  constructor(private expenseService: ExpenseService) { 

    const currentYear = new Date().getFullYear();
    this.selectedMonth = new Date().getMonth(); // Mês atual
    this.selectedYear = currentYear; // Ano atual

    // Preencher o array de anos com os últimos 10 anos
    for (let i = currentYear + 1; i >= currentYear - 3; i--) {
      this.years.push(i);
    }
  }

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

updateTable(): void {
  if (this.selectedMonth == null || this.selectedYear == null) {
    console.warn('⚠️ Mês ou ano não selecionado.');
    return;
  }

  // 🔹 Limpa a tabela imediatamente (antes da nova busca)
  this.expenses = [];

  // 🔹 Define o primeiro e último dia do mês selecionado
  const start = new Date(this.selectedYear, this.selectedMonth, 1);
  const end = new Date(this.selectedYear, this.selectedMonth + 1, 0);

  // 🔹 Converte para formato yyyy-MM-dd
  const startDate = start.toISOString().split('T')[0];
  const endDate = end.toISOString().split('T')[0];

  console.log(`📅 Atualizando dados de ${startDate} a ${endDate}...`);

  // 🔹 Busca as despesas do novo intervalo
  this.expenseService.getExpensesByInterval(startDate, endDate).subscribe({
    next: (expenses) => {
      this.expenses = expenses ?? []; // substitui completamente os dados
      console.log('✅ Despesas carregadas:', this.expenses);
    },
    error: (err) => {
      console.error('❌ Erro ao buscar despesas:', err);
      this.expenses = []; // garante limpeza em caso de erro
    }
  });
}

}

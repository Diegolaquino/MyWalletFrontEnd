import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ExpenseService } from '../services/expense.service'; 
import { Expense } from '../models/expense.model'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-list-table',
  templateUrl: './list-table.component.html',
  styleUrls: ['./list-table.component.css'],
  standalone: true,
  imports: [ CommonModule, FormsModule ]
})
export class ListTableComponent implements OnInit, AfterViewInit, OnDestroy {
  
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
  dtInstance: any;
  dataTableInitialized = false;

  constructor(private expenseService: ExpenseService) { 
    const currentYear = new Date().getFullYear();
    this.selectedMonth = new Date().getMonth();
    this.selectedYear = currentYear;

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

  ngAfterViewInit(): void {
    // Inicializar DataTable após a view estar pronta
    this.initDataTable();
  }

  initDataTable(): void {
    // Aguardar um pouco para garantir que a tabela está no DOM
    setTimeout(() => {
      // Destruir DataTable anterior se existir
      if (this.dtInstance) {
        this.dtInstance.destroy();
      }

      // Inicializar novo DataTable
      this.dtInstance = $('#list-table').DataTable({
        language: {
  search: "Pesquisar:",
  lengthMenu: "Mostrar _MENU_ registros por página",
  info: "Mostrando _START_ a _END_ de _TOTAL_ registros",
  infoEmpty: "Mostrando 0 a 0 de 0 registros",
  paginate: {
    first: "Primeiro",
    last: "Último",
    next: "Próximo",
    previous: "Anterior"
  },
  emptyTable: "Nenhum dado disponível na tabela"
},
        pageLength: 10,
        lengthMenu: [5, 10, 25, 50],
        responsive: true,
        autoWidth: false,
        paging: true,
        searching: true,
        ordering: true,
        info: true
      });
      
      this.dataTableInitialized = true;
    }, 300);
  }

  updateTable(): void {
    if (this.selectedMonth == null || this.selectedYear == null) {
      console.warn('⚠️ Mês ou ano não selecionado.');
      return;
    }

    this.expenses = [];

    const start = new Date(this.selectedYear, this.selectedMonth, 1);
    const end = new Date(this.selectedYear, this.selectedMonth + 1, 0);

    const startDate = start.toISOString().split('T')[0];
    const endDate = end.toISOString().split('T')[0];

    console.log(`📅 Atualizando dados de ${startDate} a ${endDate}...`);

    this.expenseService.getExpensesByInterval(startDate, endDate).subscribe({
      next: (expenses) => {
        this.expenses = expenses ?? [];
        console.log('✅ Despesas carregadas:', this.expenses);
        
        // Reinicializar DataTable com novos dados
        this.initDataTable();
      },
      error: (err) => {
        console.error('❌ Erro ao buscar despesas:', err);
        this.expenses = [];
      }
    });
  }

  ngOnDestroy(): void {
    // Limpar DataTable quando o componente é destruído
    if (this.dtInstance) {
      this.dtInstance.destroy();
    }
  }
}
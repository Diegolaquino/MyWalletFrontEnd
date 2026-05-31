import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Expense } from '../models/expense.model';
import { ExpenseService } from '../services/expense.service';
import { CommonModule } from '@angular/common';

declare var $: any;

@Component({
  selector: 'app-installment-purchases',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './installment-purchases.component.html',
  styleUrl: './installment-purchases.component.css'
})
export class InstallmentPurchasesComponent implements OnInit, AfterViewInit, OnDestroy {
  expenses: Expense[] = [];
  dtInstance: any;

  constructor(private expenseService: ExpenseService) {}

  ngOnInit(): void {
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();

    this.expenseService.getExpensesWithInstallments(currentMonth, currentYear)
      .subscribe({
        next: (data) => {
          this.expenses = data;
          console.log('✅ Despesas com parcelas carregadas:', this.expenses);
        },
        error: (err) => {
          console.error('❌ Erro ao carregar despesas:', err);
        }
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
      this.dtInstance = $('#table-parcelas').DataTable({
        pageLength: 10,
        lengthMenu: [5, 10, 25, 50],
        responsive: true,
        autoWidth: false,
        paging: true,
        searching: true,
        ordering: true,
        info: true
      });
      
      console.log('✅ DataTable inicializado com sucesso!');
    }, 300);
  }

  ngOnDestroy(): void {
    // Limpar DataTable quando o componente é destruído
    if (this.dtInstance) {
      this.dtInstance.destroy();
    }
  }
}
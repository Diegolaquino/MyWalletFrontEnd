export interface EntryExpense {
  expenseDate?: string;
  value: number;
  walletId?: string;
  categoryId: string;
  tags?: string;
  installmentsQuantity?: number | null;
  paid: boolean;
  comments?: string;
  name?: string;
  isFixed: boolean;
  type: number;
}


export interface Expense {
    id: string;
    expenseDate?: string;
    value: number;
    walletId?: string;
    wallet?: Wallet | null;
    walletName?: string;
    shoppingDay?: number | null;
    walletType?: number;
    categoryId: string;
    category: Category | null;
    categoryName?: string;
    tags?: string;
    installmentsQuantity?: number | null;
    paid: boolean;
    comments?: string;
    name?: string;
    installment: number;
    isFixed: boolean;
    type: number;
    trackingId?: string | null;
  }
  
  export interface Wallet {
    id: string;
    name: string;
    shoppingDay?: number; 
    walletType: number; 
    
  }
  
  export interface Category {
    id: string;
    name: string;
  }

  export interface Balance{
    total?: number;
    income?: number;
    expense?: number;
    others?: number;
    fixedEntries?: number;
  }
  
  export enum EType {
    Expense,
    Income,
    Others
  }
  
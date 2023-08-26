import { TransactionType } from '../values/enums/transactions';

export type Expense = {
  id: number;
  category: string;
  type: string;
  amount: number;
  description: string;
  creationTime: string;
};

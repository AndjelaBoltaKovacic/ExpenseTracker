import { TransactionGroupType, TransactionType } from "../values/enums/transactions";

export type TransactionsDTO<T> = {
  content: T[];
  pageable: {
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
};

export interface Transaction {
  id: string | number;
  name: string;
  amount: number;
  createdDtm: string,
  updatedDtm: string,
  groupName: string,
  groupId: string,
};


export interface TransactionFormData extends Transaction {
  type?: TransactionType
}
export interface Expense extends TransactionFormData {
  expenseGroupId: string,
}

export interface Income extends TransactionFormData {
  IncomeGroupId: string,
}

export type TransactionGroup = {
  id?: string,
  name: string,
  type: TransactionGroupType
}
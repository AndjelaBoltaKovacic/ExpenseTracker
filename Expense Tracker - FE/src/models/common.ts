import { Expense } from './expenses';

export type MenuItem = {
  title: string;
  page: string;
  isPremium?: boolean;
};

export type VoidFn = (arg?: any) => void;

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export type DataEntry = Array<Expense>[number];

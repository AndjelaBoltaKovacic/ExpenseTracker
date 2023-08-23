import { Expense } from './expenses';

export type MenuItem = {
  title: string;
  page: string;
  isPremium?: boolean;
};

export type _void = (arg?: any) => void;

export type DataEntry = Array<Expense>[number];

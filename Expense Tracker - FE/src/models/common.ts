import { Transaction } from './transactions';

export type MenuItem = {
  title: string;
  page: string;
  isPremium?: boolean;
};

export type _void = (arg?: any) => void;

export type DataEntry = Array<Transaction>[number];

import { baseUrl } from '../values/urls';
import { axiosApiCall } from './api/axios-api';
import { HttpMethod } from '../values/enums/service';
import { Transaction, TransactionGroup, TransactionsDTO } from '../models/transactions';

const transactionApiUrl = `${baseUrl}/transaction/`;
const incomeUrl = `${transactionApiUrl}income`;
const expenseUrl = `${transactionApiUrl}expense`;
const incomeGroupUrl = `${transactionApiUrl}income-group`;
const expenseGroupUrl = `${transactionApiUrl}expense-group`;
const totalAmountUrl = `${transactionApiUrl}total-amount`;
const totalIncomeUrl = `${transactionApiUrl}total-income-amount`;
const totalExpenseUrl = `${transactionApiUrl}total-expense-amount`;


const TransactionService = {
  //INCOMES
  getIncomes({ path }: { path: string }) {
    return axiosApiCall<TransactionsDTO<Transaction[]>>(HttpMethod.GET, `${incomeUrl + path}`);
  },

  addIncome({ body }: { body: Transaction }) {
    return axiosApiCall<TransactionsDTO<Transaction>>(HttpMethod.POST, incomeUrl, body);
  },
  editIncome({ body, path }: { body: Transaction; path: string }) {
    return axiosApiCall<TransactionsDTO<Transaction>>(HttpMethod.PUT, `${incomeUrl}/${path}`, body);
  },

  deleteIncome({ path }: { path: string }) {
    return axiosApiCall<TransactionsDTO<Transaction>>(HttpMethod.DELETE, `${incomeUrl}/${path}`);
  },

  //EXPENSES
  getExpenses({ path }: { path: string }) {
    return axiosApiCall<TransactionsDTO<Transaction[]>>(HttpMethod.GET, `${expenseUrl + path}`);
  },

  addExpense({ body }: { body: any }) {
    return axiosApiCall<TransactionsDTO<Transaction>>(HttpMethod.POST, expenseUrl, body);
  },
  editExpense({ body, path }: { body: any; path: string }) {
    return axiosApiCall<TransactionsDTO<Transaction>>(HttpMethod.PUT, `${expenseUrl}/${path}`, body);
  },

  deleteExpense({ path }: { path: string }) {
    return axiosApiCall<TransactionsDTO<Transaction>>(HttpMethod.DELETE, `${expenseUrl}/${path}`);
  },

  //INCOME GROUPS
  getIncomeGroups() {
    return axiosApiCall<TransactionsDTO<TransactionGroup>>(HttpMethod.GET, `${incomeGroupUrl}`);
  },

  addIncomeGroup({ body }: { body: TransactionGroup }) {
    return axiosApiCall<TransactionsDTO<TransactionGroup>>(HttpMethod.POST, incomeGroupUrl, body);
  },
  editIncomeGroup({ body, path }: { body: TransactionGroup; path: string }) {
    return axiosApiCall<TransactionsDTO<TransactionGroup>>(HttpMethod.PUT, `${incomeGroupUrl}/${path}`, body);
  },

  deleteIncomeGroup({ path }: { path: string }) {
    return axiosApiCall<TransactionsDTO<TransactionGroup>>(HttpMethod.DELETE, `${incomeGroupUrl}/${path}`);
  },
  //EXPENSE GROUP
  getExpenseGroups() {
    return axiosApiCall<TransactionsDTO<TransactionGroup>>(HttpMethod.GET, expenseGroupUrl);
  },

  addExpenseGroup({ body }: { body: TransactionGroup }) {
    return axiosApiCall<TransactionsDTO<TransactionGroup>>(HttpMethod.POST, expenseGroupUrl, body);
  },
  editExpenseGroup({ body, path }: { body: TransactionGroup; path: string }) {
    return axiosApiCall<TransactionsDTO<TransactionGroup>>(HttpMethod.PUT, `${expenseGroupUrl}/${path}`, body);
  },

  deleteExpenseGroup({ path }: { path: string }) {
    return axiosApiCall<TransactionsDTO<TransactionGroup>>(HttpMethod.DELETE, `${expenseGroupUrl}/${path}`);
  },

  //TOTAL AMOUNT
  getTotalAmount() {
    return axiosApiCall<{ totalAmount: number }>(HttpMethod.GET, totalAmountUrl);
  },
  getIncomeAmount() {
    return axiosApiCall<{ totalAmount: number }>(HttpMethod.GET, totalIncomeUrl);
  },

  getExpenseAmount() {
    return axiosApiCall<{ totalAmount: number }>(HttpMethod.GET, totalExpenseUrl);
  },
};

export default TransactionService;

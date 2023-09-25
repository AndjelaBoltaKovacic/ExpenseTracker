import { baseUrl } from '../values/urls';
import { axiosApiCall } from './api/axios-api';
import { HttpMethod } from '../values/enums/service';
import { TransactionsDTO } from '../models/transactions';

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
  getIncomes<T>({ path }: { path: string }) {
    return axiosApiCall<TransactionsDTO<T>>(HttpMethod.GET, `${incomeUrl + path}`);
  },

  addIncome<T>({ body }: { body: any }) {
    return axiosApiCall<TransactionsDTO<T>>(HttpMethod.POST, incomeUrl, body);
  },
  editIncome<T>({ body, path }: { body: any; path: string }) {
    return axiosApiCall<TransactionsDTO<T>>(HttpMethod.PUT, `${incomeUrl}/${path}`, body);
  },

  deleteIncome<T>({ path }: { path: string }) {
    return axiosApiCall<TransactionsDTO<T>>(HttpMethod.DELETE, `${incomeUrl}/${path}`);
  },

  //EXPENSES
  getExpenses<T>({ path }: { path: string }) {
    return axiosApiCall<TransactionsDTO<T>>(HttpMethod.GET, `${expenseUrl + path}`);
  },

  addExpense<T>({ body }: { body: any }) {
    return axiosApiCall<TransactionsDTO<T>>(HttpMethod.POST, expenseUrl, body);
  },
  editExpense<T>({ body, path }: { body: any; path: string }) {
    return axiosApiCall<TransactionsDTO<T>>(HttpMethod.PUT, `${expenseUrl}/${path}`, body);
  },

  deleteExpense<T>({ path }: { path: string }) {
    return axiosApiCall<TransactionsDTO<T>>(HttpMethod.DELETE, `${expenseUrl}/${path}`);
  },

  //INCOME GROUPS
  getIncomeGroups<T>() {
    return axiosApiCall<TransactionsDTO<T>>(HttpMethod.GET, `${incomeGroupUrl}`);
  },

  addIncomeGroup<T>({ body }: { body: any }) {
    return axiosApiCall<TransactionsDTO<T>>(HttpMethod.POST, incomeGroupUrl, body);
  },
  editIncomeGroup<T>({ body, path }: { body: any; path: string }) {
    return axiosApiCall<TransactionsDTO<T>>(HttpMethod.PUT, `${incomeGroupUrl}/${path}`, body);
  },

  deleteIncomeGroup<T>({ path }: { path: string }) {
    return axiosApiCall<TransactionsDTO<T>>(HttpMethod.DELETE, `${incomeGroupUrl}/${path}`);
  },
  //EXPENSE GROUP
  getExpenseGroups<T>() {
    return axiosApiCall<TransactionsDTO<T>>(HttpMethod.GET, expenseGroupUrl);
  },

  addExpenseGroup<T>({ body }: { body: any }) {
    return axiosApiCall<TransactionsDTO<T>>(HttpMethod.POST, expenseGroupUrl, body);
  },
  editExpenseGroup<T>({ body, path }: { body: any; path: string }) {
    return axiosApiCall<TransactionsDTO<T>>(HttpMethod.PUT, `${expenseGroupUrl}/${path}`, body);
  },

  deleteExpenseGroup<T>({ path }: { path: string }) {
    return axiosApiCall<TransactionsDTO<T>>(HttpMethod.DELETE, `${expenseGroupUrl}/${path}`);
  },

  //TOTAL AMOUNT
  getTotalAmount<T>() {
    return axiosApiCall<{ totalAmount: number }>(HttpMethod.GET, totalAmountUrl);
  },
  getIncomeAmount<T>() {
    return axiosApiCall<{ totalAmount: number }>(HttpMethod.GET, totalIncomeUrl);
  },

  getExpenseAmount<T>() {
    return axiosApiCall<{ totalAmount: number }>(HttpMethod.GET, totalExpenseUrl);
  },
};

export default TransactionService;

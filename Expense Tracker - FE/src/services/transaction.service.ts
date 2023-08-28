import { baseUrl } from './urls';
import { axiosApiCall } from './axios-api';
import { HttpMethod } from '../values/enums/service';
import { TransactionsDTO } from '../models/transactions';


const transactionApiUrl = `${baseUrl}/transaction/`;
const incomeUrl = transactionApiUrl.concat('income');
const expenseUrl = transactionApiUrl.concat('expense');
const incomeGroupUrl = transactionApiUrl.concat('income-group');
const expenseGroupUrl = transactionApiUrl.concat('expense-group');
const totalAmountUrl = transactionApiUrl.concat('total-amount');

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
    return axiosApiCall<TransactionsDTO<T>>(HttpMethod.DELETE, `${incomeUrl}/${path}`);
  },

  //INCOME GROUPS
  getIncomeGroups<T>() {
    return axiosApiCall<TransactionsDTO<T>>(HttpMethod.GET, `${incomeGroupUrl}`);
  },

  addIncomeGroup<T>({ body }: { body: any }) {
    return axiosApiCall<TransactionsDTO<T>>(HttpMethod.POST, incomeGroupUrl, body);
  },
  editIncomeGroup<T>({ body, path }: { body: any; path: string }) {
    return axiosApiCall<TransactionsDTO<T>>(HttpMethod.PUT, `${incomeGroupUrl + path}`, body);
  },

  deleteIncomeGroup<T>({ path }: { path: string }) {
    return axiosApiCall<TransactionsDTO<T>>(HttpMethod.DELETE, `${incomeGroupUrl + path}`);
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
    return axiosApiCall<TransactionsDTO<T>>(HttpMethod.GET, totalAmountUrl);
  },
};

export default TransactionService;

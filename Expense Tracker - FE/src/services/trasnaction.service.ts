import { baseUrl } from './urls';
import { axiosApiCall } from './helpers/axios-api';
import { HttpMethod } from '../values/enums/service';




const transactionApiUrl = `${baseUrl}/transaction/`;
const incomeUrl = transactionApiUrl.concat('income');
const expenseUrl = transactionApiUrl.concat('expense');
const incomeGroupUrl = transactionApiUrl.concat('income-group');
const expenseGroupUrl = transactionApiUrl.concat('expense-group');

const TransactionService = {
  //INCOMES
  getIncomes({ path }: { path: string }) {
    return axiosApiCall<any>(HttpMethod.GET, `${incomeUrl + path}`);
  },

  addIncome({ body }: { body: any }) {
    return axiosApiCall<any>(HttpMethod.POST, incomeUrl, body);
  },
  editIncome({ body, path }: { body: any; path: string }) {
    return axiosApiCall<any>(HttpMethod.PUT, `${incomeUrl}/${path}`, body);
  },

  deleteIncome({ path }: { path: string }) {
    return axiosApiCall<any>(HttpMethod.DELETE, `${incomeUrl}/${path}`);
  },

  //EXPENSES
  getExpenses({ path }: { path: string }) {
    return axiosApiCall<any>(HttpMethod.GET, `${expenseUrl + path}`);
  },

  addExpense({ body }: { body: any }) {
    return axiosApiCall<any>(HttpMethod.POST, expenseUrl, body);
  },
  editExpense({ body, path }: { body: any; path: string }) {
    return axiosApiCall<any>(HttpMethod.PUT, `${expenseUrl}/${path}`, body);
  },

  deleteExpense({ path }: { path: string }) {
    return axiosApiCall<any>(HttpMethod.DELETE, `${incomeUrl}/${path}`);
  },

  //INCOME GROUPS
  getIncomeGroups({ path }: { path: string }) {
    return axiosApiCall<any>(HttpMethod.GET, `${incomeGroupUrl + path}`);
  },

  addIncomeGroup({ body }: { body: any }) {
    return axiosApiCall<any>(HttpMethod.POST, incomeGroupUrl, body);
  },
  editIncomeGroup({ body, path }: { body: any; path: string }) {
    return axiosApiCall<any>(HttpMethod.PUT, `${incomeGroupUrl + path}`, body);
  },

  deleteIncomeGroup({ path }: { path: string }) {
    return axiosApiCall<any>(HttpMethod.DELETE, `${incomeGroupUrl + path}`);
  },
  //EXPENSE GROUP
  getExpenseGroups() {
    return axiosApiCall<any>(HttpMethod.GET, expenseGroupUrl);
  },

  addExpenseGroup({ body }: { body: any }) {
    return axiosApiCall<any>(HttpMethod.POST, expenseGroupUrl, body);
  },
  editExpenseGroup({ body, path }: { body: any; path: string }) {
    return axiosApiCall<any>(HttpMethod.PUT, `${expenseGroupUrl}/${path}`, body);
  },

  deleteExpenseGroup({ path }: { path: string }) {
    return axiosApiCall<any>(HttpMethod.DELETE, `${expenseGroupUrl}/${path}`);
  },
};

export default TransactionService;

const MENU_ITEMS = [
  { title: 'DASHBOARD', page: '/dashboard' },
  { title: 'TRANSACTIONS', page: '/transactions' },
  { title: 'BLOG', page: '/blog', isPremium: true },
];

const AUTH_MENU_ITEMS = [
  { title: 'LOGIN', page: '/login' },
  { title: 'REGISTER', page: '/register' },
];

const PROFILE_MENU_ITEMS = ['Set Reminder', 'Logout'];


const DAYS_OF_WEEK = [
  { value: 0, label: 'Sunday' },
  { value: 1, label: 'Monday' },
  { value: 2, label: 'Tuesday' },
  { value: 3, label: 'Wednesday' },
  { value: 4, label: 'Thursday' },
  { value: 5, label: 'Friday' },
  { value: 6, label: 'Saturday' },
];

const DAYS_OF_MONTH = [
  { value: 1, label: 'First Day Of The Month' },
  { value: 15, label: 'Middle of the Month' },
  { value: 30, label: 'Last Day Of The Month' },
];

export const transactionGroups = [
  { value: 'groceries', label: 'Groceries' },
  { value: 'transport', label: 'Transport' },
  { value: 'leisure', label: 'Leisure' },
  { value: 'health', label: 'Health' },
  { value: 'utilities', label: 'Utilities' },
  { value: 'shopping', label: 'Shopping' },
  { value: 'education', label: 'Education' },
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'dining', label: 'Dining' },
  // Add more types as needed
];

export { MENU_ITEMS, PROFILE_MENU_ITEMS, AUTH_MENU_ITEMS, DAYS_OF_WEEK, DAYS_OF_MONTH };
  
  

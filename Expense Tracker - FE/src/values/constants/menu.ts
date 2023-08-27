export const MENU_ITEMS = [
  { title: 'DASHBOARD', page: '/dashboard' },
  { title: 'TRANSACTIONS', page: '/transactions' },
  { title: 'BLOG', page: '/blog', isPremium: true },
];

export const AUTH_MENU_ITEMS = [
  { title: 'LOGIN', page: '/login' },
  { title: 'REGISTER', page: '/register' },
];

export const PROFILE_MENU_ITEMS = ['Set Reminder', 'Logout'];

export const DAYS_OF_WEEK = [
  { value: 1, label: 'Monday' },
  { value: 2, label: 'Tuesday' },
  { value: 3, label: 'Wednesday' },
  { value: 4, label: 'Thursday' },
  { value: 5, label: 'Friday' },
  { value: 6, label: 'Saturday' },
  { value: 7, label: 'Sunday' },
];

export const DAYS_OF_MONTH = [
  { value: 1, label: 'First Day Of The Month' },
  { value: 15, label: 'Middle of the Month' },
  { value: 30, label: 'Last Day Of The Month' },
];

export const TRANSACTION_GROUPS = [
  { name: 'Shopping', type: 'PREDEFINED' },
  { name: 'Transport & Car', type: 'PREDEFINED' },
  { name: 'Leisure & Entertainment', type: 'PREDEFINED' },
  { name: 'Food & Groceries', type: 'PREDEFINED' },
  { name: 'Bars & Restaurants', type: 'PREDEFINED' },
];

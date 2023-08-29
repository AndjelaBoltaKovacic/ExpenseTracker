import { DAYS_OF_WEEK } from "../values/constants/menu";
import { ReminderType } from "../values/enums/reminder";

export const getLocationValue = (pathname: string) => {
  switch (pathname) {
    case '/dashboard':
      return 0;
    case '/transactions':
      return 1;
    case '/blog':
      return 2;
    case '/login':
      return 0;
    case '/register':
      return 1;
    default:
      return 0;
  }
};


const getReminderWeekDay = (day: number) => {
  return DAYS_OF_WEEK.find(el => el.value === day)?.label;
}

const getReminderMonthDay = (day: number) => {
  return day > 15 ? 'last day of month' : day <= 1 ? 'first day of  month' : 'middle day of month';

}
export const getReminderText = (reminderType: ReminderType, reminderDay: number) => {
  console.log(reminderType === ReminderType.Weekly)
  return reminderType === ReminderType.Weekly ? getReminderWeekDay(reminderDay) : getReminderMonthDay(reminderDay);
};


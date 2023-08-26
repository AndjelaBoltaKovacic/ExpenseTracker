import { ReminderType } from '../values/enums/reminder';

export type ReminderRequest = {
  reminderDay: number;
  type: ReminderType;
};

export type Reminder = {
  reminderDay: number;
  reminderType: ReminderType;
  username: string;
};

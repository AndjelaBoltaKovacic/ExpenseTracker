import { useEffect, useState } from 'react';
import ReminderService from '../services/reminder.service';
import useFetch from '../hooks/useFetch';
import Loader from '../common/loader';
import NoticeCard from '../common/cards/notice-card';
import { ReminderDTO } from '../models/reminder';
import { ReminderType } from '../values/enums/reminder';
import { getReminderText } from '../helpers/common';
import useReminderContext from '../contexts/reminder.context';

function Reminder() {
  const { reminder } = useReminderContext();

  const { reminderType, reminderDay } = reminder ? reminder : ({} as ReminderDTO);

  return reminder.reminderDay ? (
    <NoticeCard
      title={`You have a ${
        reminderType && reminderType.charAt(0).toUpperCase() + reminderType.slice(1).toLowerCase()
      } reminder.`}
      text={`You are set to get a reminder every ${getReminderText(reminderType, reminderDay)}.`}
    />
  ) : null;
}

export default Reminder;

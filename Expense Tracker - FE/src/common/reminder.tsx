import { useEffect, useState } from 'react';
import ReminderService from '../services/reminder.service';
import useFetch from '../hooks/useFetch';
import Loader from './loader';
import NoticeCard from './notice-card';
import { ReminderDTO } from '../models/reminder';
import { ReminderType } from '../values/enums/reminder';
import { getReminderText } from '../helpers/common';

function Reminder() {
  const [reminder, setReminder] = useState<ReminderDTO>();
  const { data, error, loading, fetchData } = useFetch<ReminderDTO>(ReminderService.getReminder);

  const { reminderType, reminderDay } = reminder ? reminder : ({} as ReminderDTO);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      console.log(data);
      setReminder(data);
    }
  }, [data]);

  return !error ? (
    <Loader isLoading={loading}>
      <NoticeCard
        title={`You have a ${
          reminderType && reminderType.charAt(0).toUpperCase() + reminderType.slice(1).toLowerCase()
        } reminder.`}
        text={`You are set to get a reminder every ${getReminderText(reminderType, reminderDay)}.`}
      />
    </Loader>
  ) : null;
}

export default Reminder;

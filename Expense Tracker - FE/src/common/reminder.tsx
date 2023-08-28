import { useEffect, useState } from 'react';
import ReminderService from '../services/reminder.service';
import useFetch from '../hooks/useFetch';
import Loader from './loader';
import NoticeCard from './notice-card';
import { ReminderDTO } from '../models/reminder';

function Reminder() {
  const [reminder, setReminder] = useState<ReminderDTO>();
  const { data, error, loading, fetchData } = useFetch<ReminderDTO>(ReminderService.getReminder);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      setReminder(data);
    }
  }, [data]);

  return !error ? (
    <Loader isLoading={loading}>
      <NoticeCard
        title={`You have a ${
          reminder?.reminderType &&
          reminder.reminderType.charAt(0).toUpperCase() + reminder.reminderType.slice(1).toLowerCase()
        } reminder.`}
      />
    </Loader>
  ) : null;
}

export default Reminder;

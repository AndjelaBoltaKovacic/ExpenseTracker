import { useEffect, useState } from 'react';
import ReminderService from '../services/reminder.service';
import useFetch from '../hooks/useFetch';
import Loader from './loader';
import NoticeCard from './notice-card';

function Reminder() {
  const [reminder, setReminder] = useState();
  const { data, error, loading, fetchData } = useFetch(ReminderService.getReminder);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      // setReminder(data);
      console.log(data);
    }
  }, [data]);

  return !error ? (
    <Loader isLoading={loading}>
      <NoticeCard title="Weekly reminder" text="some text" />
    </Loader>
  ) : null;
}

export default Reminder;

import { useEffect, useState } from 'react';
import useFetch from '../../hooks/useFetch';
import ReminderService from '../../services/reminder.service';
import { AddReminderSteps, Outcome } from '../../values/enums/form-steps';
import Notice from '../steps/notice';
import { _void } from '../../models/common';
import { AddReminderForm } from './add-reminder-form';

export const AddReminder = ({ handleClose }: { handleClose: _void }) => {
  const [step, setStep] = useState(AddReminderSteps.Add);
  const { data, error, loading, fetchData } = useFetch(ReminderService.setReminder);

  useEffect(() => {
    data && setStep(AddReminderSteps.Success);
    error && setStep(AddReminderSteps.Fail);
  }, [data, error]);

  return {
    [AddReminderSteps.Add]: <AddReminderForm onComplete={fetchData} />,
    [AddReminderSteps.Success]: (
      <Notice outcome={Outcome.Success} text="You have successfully added the reminder" handleClose={handleClose} />
    ),
    [AddReminderSteps.Fail]: (
      <Notice
        outcome={Outcome.Fail}
        text="Oops! Something went wrong. Please try again later"
        handleClose={handleClose}
      />
    ),
  }[step];
};

import { useEffect, useState } from 'react';
import useFetch from '../../hooks/useFetch';
import ReminderService from '../../services/reminder.service';
import { AddReminderSteps, Outcome } from '../../values/enums/form-steps';
import Notice from '../common-steps/notice';
import { _void } from '../../models/common';
import { AddReminderForm } from './add-reminder-form';
import Loader from '../../common/loader';
import useReminderContext from '../../contexts/reminder.context';

export const AddReminder = ({ handleClose }: { handleClose: _void }) => {
  const { getReminder } = useReminderContext();
  const [step, setStep] = useState<AddReminderSteps>(AddReminderSteps.Add);
  const { data, error, loading, fetchData } = useFetch(ReminderService.setReminder);

  useEffect(() => {
    data && setStep(AddReminderSteps.Success);
    error && setStep(AddReminderSteps.Fail);
  }, [data, error]);

  const onSuccess = () => {
    getReminder();
    handleClose();
  };

  return (
    <Loader isLoading={loading}>
      {
        {
          [AddReminderSteps.Add]: <AddReminderForm onComplete={fetchData} />,
          [AddReminderSteps.Success]: (
            <Notice outcome={Outcome.Success} text="You have successfully added the reminder" handleClose={onSuccess} />
          ),
          [AddReminderSteps.Fail]: (
            <Notice
              outcome={Outcome.Fail}
              text="Oops! Something went wrong. Please try again later"
              handleClose={handleClose}
            />
          ),
        }[step]
      }
    </Loader>
  );
};

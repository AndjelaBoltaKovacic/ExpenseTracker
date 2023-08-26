import { useState } from 'react';
import { AddTransactionSteps, Outcome } from '../../../values/enums/form-steps';
import AddTransactionForm from '../add-transaction/add-transaction-form';
import { Expense } from '../../../models/expenses';
import { _void } from '../../../models/common';
import Confirm from '../steps/confirm';
import Notice from '../steps/notice';
import Loader from '../../loader';

function AddTransaction({ handleClose }: { handleClose: _void }) {
  const [step, setStep] = useState<AddTransactionSteps>(AddTransactionSteps.Add);
  const [data, setData] = useState({} as Expense);

  const handleFormConfirm = (data: any) => {
    console.log(data);
    setData(data);
    setStep(AddTransactionSteps.Confirm);
  };
  const handleBack = () => {
    setStep(AddTransactionSteps.Add);
  };

  const handleSubmit = () => {
    console.log('Add post request');
    console.log(data);
  };
  return (
    <Loader isLoading={false} size="8vw">
      {
        {
          [AddTransactionSteps.Add]: <AddTransactionForm handleClose={handleClose} handleConfirm={handleFormConfirm} />,
          [AddTransactionSteps.Confirm]: (
            <Confirm
              text="Are you sure you want to edit this transaction?"
              handleBack={handleBack}
              handleConfirm={handleSubmit}
              data={data}
            />
          ),
          [AddTransactionSteps.Success]: (
            <Notice
              outcome={Outcome.Success}
              text="You have successfully edited the transaction"
              handleClose={handleClose}
            />
          ),
          [AddTransactionSteps.Fail]: (
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
}

export default AddTransaction;

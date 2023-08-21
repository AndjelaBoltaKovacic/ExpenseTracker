import { useState } from 'react';
import { EditTransactionSteps } from '../../../values/enums/steps';
import AddTransactionForm from '../add-transaction/add-transaction-form';
import { Expense } from '../../../models/expenses';
import { _void } from '../../../models/common';
import Confirm from '../steps/confirm';
import Notice from '../steps/notice';
import Loader from '../../loader';

function EditTransaction({ transactionToEdit, handleClose }: { transactionToEdit?: Expense; handleClose: _void }) {
  const [step, setStep] = useState<EditTransactionSteps>(EditTransactionSteps.Edit);
  const [data, setData] = useState({} as Expense);

  const handleFormConfirm = (data: any) => {
    console.log(data);
    setData(data);
    setStep(EditTransactionSteps.Confirm);
  };
  const handleBack = () => {
    setStep(EditTransactionSteps.Edit);
  };

  const handleSubmit = () => {
    console.log('Add post request');
    console.log(data);
  };
  return (
    <Loader isLoading={false} size="8vw">
      {
        {
          [EditTransactionSteps.Edit]: (
            <AddTransactionForm
              handleClose={handleClose}
              handleConfirm={handleFormConfirm}
              transactionToEdit={transactionToEdit as Expense}
            />
          ),
          [EditTransactionSteps.Confirm]: (
            <Confirm
              text="Are you sure you want to edit this transaction?"
              handleBack={handleBack}
              handleConfirm={handleSubmit}
              data={data}
            />
          ),
          [EditTransactionSteps.Success]: (
            <Notice success text="You have successfully edited the transaction" handleClose={handleClose} />
          ),
          [EditTransactionSteps.Fail]: (
            <Notice text="Oops! Something went wrong. Please try again" handleClose={handleClose} />
          ),
        }[step]
      }
    </Loader>
  );
}

export default EditTransaction;

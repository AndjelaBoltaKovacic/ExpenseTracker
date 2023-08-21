import { useState } from 'react';
import { DeleteTransactionSteps, EditTransactionSteps } from '../../../values/enums/steps';
import Loader from '../../loader';
import Confirm from './confirm';
import Notice from './notice';
import { _void } from '../../../models/common';
import { Typography } from '@mui/material';

function DeleteTransaction({ transactionToDelete, handleClose }: { transactionToDelete: any; handleClose: _void }) {
  const [step, setStep] = useState<DeleteTransactionSteps>(DeleteTransactionSteps.Confirm);

  const handleSubmit = () => {
    setStep(DeleteTransactionSteps.Fail);
  };

  return (
    <Loader isLoading={false} size="8vw">
      {
        {
          [DeleteTransactionSteps.Confirm]: (
            <Confirm
              text="Are you sure you want to delete this transaction?"
              handleBack={handleClose}
              handleConfirm={handleSubmit}
              data={transactionToDelete}
            />
          ),
          [DeleteTransactionSteps.Success]: (
            <Notice success text="You have successfully deleted the transaction" handleClose={handleClose} />
          ),
          [DeleteTransactionSteps.Fail]: (
            <Notice text="Oops! Something went wrong. Please try again later" handleClose={handleClose} />
          ),
        }[step]
      }
    </Loader>
  );
}

export default DeleteTransaction;

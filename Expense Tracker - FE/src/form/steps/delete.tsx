import { useEffect, useState } from 'react';
import { DeleteTransactionSteps, Outcome } from '../../values/enums/form-steps';
import Loader from '../../common/loader';
import Confirm from './confirm';
import Notice from './notice';
import { _void } from '../../models/common';
import TransactionService from '../../services/transaction.service';
import { TransactionType } from '../../values/enums/transactions';
import useFetch from '../../hooks/useFetch';

function DeleteTransaction({ transactionToDelete, handleClose }: { transactionToDelete: any; handleClose: _void }) {
  const [step, setStep] = useState<DeleteTransactionSteps>(DeleteTransactionSteps.Confirm);
  const { data, loading, error, fetchData } = useFetch(
    transactionToDelete.type === TransactionType.Expense
      ? TransactionService.deleteExpense
      : TransactionService.deleteIncome,
    transactionToDelete.id
  );

  const handleSubmit = () => {
    fetchData();
  };

  useEffect(() => {
    data === '' && setStep(DeleteTransactionSteps.Success);
    error && setStep(DeleteTransactionSteps.Fail);
  }, [error, data]);

  return (
    <Loader isLoading={loading} size="8vw">
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
            <Notice
              outcome={Outcome.Success}
              text="You have successfully deleted the transaction"
              handleClose={handleClose}
            />
          ),
          [DeleteTransactionSteps.Fail]: (
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

export default DeleteTransaction;
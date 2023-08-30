import { useEffect, useState } from 'react';
import { AddTransactionSteps, Outcome } from '../../../values/enums/form-steps';
import AddTransactionForm from '../add-transaction/add-transaction-form';
import { TransactionFormData } from '../../../models/transactions';
import { _void } from '../../../models/common';
import Confirm from '../steps/confirm';
import Notice from '../steps/notice';
import Loader from '../../loader';
import TransactionService from '../../../services/transaction.service';
import { TransactionType } from '../../../values/enums/transactions';
import useFetch from '../../../hooks/useFetch';

function AddTransaction({ handleClose }: { handleClose: _void }) {
  const [step, setStep] = useState<AddTransactionSteps>(AddTransactionSteps.Add);
  const [transactionData, setTransactionData] = useState({} as TransactionFormData);
  const { data, error, loading, fetchData } = useFetch(
    transactionData.type === TransactionType.Income ? TransactionService.addIncome : TransactionService.addExpense
  );

  const handleFormConfirm = (data: any) => {
    setTransactionData(data);
    setStep(AddTransactionSteps.Confirm);
  };
  const handleBack = () => {
    setStep(AddTransactionSteps.Add);
  };

  const handleSubmit = () => {
    const { groupName, type, ...body } = transactionData;
    fetchData(body);
  };

  const handleCloseAndRefetch = () => {
    handleClose(transactionData.type);
  };

  useEffect(() => {
    data && setStep(AddTransactionSteps.Success);
    error && setStep(AddTransactionSteps.Fail);
  }, [data, error]);

  return (
    <Loader isLoading={loading} size="8vw">
      {
        {
          [AddTransactionSteps.Add]: <AddTransactionForm handleClose={handleClose} handleConfirm={handleFormConfirm} />,
          [AddTransactionSteps.Confirm]: (
            <Confirm
              text="Are you sure you want to add this transaction?"
              handleBack={handleBack}
              handleConfirm={handleSubmit}
              data={transactionData}
            />
          ),
          [AddTransactionSteps.Success]: (
            <Notice
              outcome={Outcome.Success}
              text="Your transaction has been added successfully"
              handleClose={handleCloseAndRefetch}
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

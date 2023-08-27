import { useEffect, useState } from 'react';
import { EditTransactionSteps, Outcome } from '../../../values/enums/form-steps';
import AddTransactionForm from '../add-transaction/add-transaction-form';
import { Expense } from '../../../models/expenses';
import { _void } from '../../../models/common';
import Confirm from '../steps/confirm';
import Notice from '../steps/notice';
import Loader from '../../loader';
import useFetch from '../../../hooks/useFetch';
import TransactionService from '../../../services/transaction.service';
import { TransactionType } from '../../../values/enums/transactions';

function EditTransaction({ transactionToEdit, handleClose }: { transactionToEdit: Expense; handleClose: _void }) {
  const [step, setStep] = useState<EditTransactionSteps>(EditTransactionSteps.Edit);
  const [transactionData, setTransactionData] = useState({} as Expense);
  const { data, error, loading, fetchData } = useFetch(
    transactionData.type === TransactionType.Income ? TransactionService.editIncome : TransactionService.editExpense,
    `${transactionToEdit.id}`
  );

  const body = {
    name: transactionData.description,
    incomeGroupId: transactionData.category,
    amount: transactionData.amount,
  };

  const handleFormConfirm = (data: any) => {
    setTransactionData(data);
    setStep(EditTransactionSteps.Confirm);
  };
  const handleBack = () => {
    setStep(EditTransactionSteps.Edit);
  };

  const handleSubmit = () => {
    fetchData(body);
  };

  useEffect(() => {
    data && setStep(EditTransactionSteps.Success);
    error && setStep(EditTransactionSteps.Fail);
  }, [data, error]);

  return (
    <Loader isLoading={loading} size="8vw">
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
              data={transactionData}
            />
          ),
          [EditTransactionSteps.Success]: (
            <Notice
              outcome={Outcome.Success}
              text="You have successfully edited the transaction"
              handleClose={handleClose}
            />
          ),
          [EditTransactionSteps.Fail]: (
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

export default EditTransaction;

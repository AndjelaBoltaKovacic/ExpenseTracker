import { useEffect, useState } from 'react';
import { DeleteTransactionSteps, Outcome } from '../values/enums/form-steps';
import Loader from '../common/loader';
import Confirm from '../form/manage-transactions/steps/confirm';
import Notice from '../form/common-steps/notice';
import TransactionService from '../services/transaction.service';
import { TransactionType } from '../values/enums/transactions';
import useFetch from '../hooks/useFetch';
import { useModalContext } from '../contexts/modals.context';
import CustomModal from '../common/modal/custom-modal';
import { TransactionFormData } from '../models/transactions';

function DeleteTransactionModal() {
  const { deleteTransactionModalOpen, transactionToModify, closeDeleteTransactionModal } = useModalContext();
  const [step, setStep] = useState<DeleteTransactionSteps>(DeleteTransactionSteps.Confirm);
  const { data, loading, error, fetchData } = useFetch(
    transactionToModify?.type === TransactionType.Expense
      ? TransactionService.deleteExpense
      : TransactionService.deleteIncome,
    transactionToModify?.id
  );

  const handleSubmit = () => {
    fetchData();
  };

  useEffect(() => {
    data === '' && setStep(DeleteTransactionSteps.Success);
    error && setStep(DeleteTransactionSteps.Fail);
  }, [error, data]);

  const handleClose = () => {
    setStep(DeleteTransactionSteps.Confirm);
    closeDeleteTransactionModal();
  };

  return (
    <CustomModal isOpen={deleteTransactionModalOpen} handleClose={handleClose}>
      <Loader isLoading={loading} size='8vw'>
        {
          {
            [DeleteTransactionSteps.Confirm]: (
              <Confirm
                text='Are you sure you want to delete this transaction?'
                handleBack={closeDeleteTransactionModal}
                handleConfirm={handleSubmit}
                data={transactionToModify as TransactionFormData}
              />
            ),
            [DeleteTransactionSteps.Success]: (
              <Notice
                outcome={Outcome.Success}
                text='You have successfully deleted the transaction'
                handleClose={handleClose}
              />
            ),
            [DeleteTransactionSteps.Fail]: (
              <Notice
                outcome={Outcome.Fail}
                text='Oops! Something went wrong. Please try again later'
                handleClose={handleClose}
              />
            ),
          }[step]
        }
      </Loader>
    </CustomModal>
  );
}

export default DeleteTransactionModal;

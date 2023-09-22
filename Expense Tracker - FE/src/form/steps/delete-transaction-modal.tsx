import { useEffect, useState } from 'react';
import { DeleteTransactionSteps, Outcome } from '../../values/enums/form-steps';
import Loader from '../../common/loader';
import Confirm from './confirm';
import Notice from './notice';
import { _void } from '../../models/common';
import TransactionService from '../../services/transaction.service';
import { TransactionType } from '../../values/enums/transactions';
import useFetch from '../../hooks/useFetch';
import { useModalContext } from '../../contexts/modals.context';
import CustomModal from '../../common/modal/custom-modal';

function DeleteTransactionModal() {
  const {
    deleteTransactionModalOpen,
    transactionToModify,
    closeDeleteTransactionModal,
  } = useModalContext();
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

  return (
    <CustomModal isOpen={deleteTransactionModalOpen} handleClose={closeDeleteTransactionModal}>
      <Loader isLoading={loading} size="8vw">
        {
          {
            [DeleteTransactionSteps.Confirm]: (
              <Confirm
                text="Are you sure you want to delete this transaction?"
                handleBack={closeDeleteTransactionModal}
                handleConfirm={handleSubmit}
                data={transactionToModify}
              />
            ),
            [DeleteTransactionSteps.Success]: (
              <Notice
                outcome={Outcome.Success}
                text="You have successfully deleted the transaction"
                handleClose={closeDeleteTransactionModal}
              />
            ),
            [DeleteTransactionSteps.Fail]: (
              <Notice
                outcome={Outcome.Fail}
                text="Oops! Something went wrong. Please try again later"
                handleClose={closeDeleteTransactionModal}
              />
            ),
          }[step]
        }
      </Loader>
    </CustomModal>
  );
}

export default DeleteTransactionModal;

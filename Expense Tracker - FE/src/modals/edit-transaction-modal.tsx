import { useEffect, useState } from 'react';
import { EditTransactionSteps, Outcome } from '../values/enums/form-steps';
import TransactionForm from '../form/manage-transactions/steps/transaction-form';
import { Expense, Transaction } from '../models/transactions';
import { _void } from '../models/common';
import Confirm from '../form/manage-transactions/steps/confirm';
import Notice from '../form/common-steps/notice';
import Loader from '../common/loader';
import useFetch from '../hooks/useFetch';
import TransactionService from '../services/transaction.service';
import { TransactionType } from '../values/enums/transactions';
import CustomModal from '../common/modal/custom-modal';
import { useModalContext } from '../contexts/modals.context';

function EditTransactionModal() {

  const { editTransactionModalOpen, transactionToModify, closeEditTransactionModal } = useModalContext();
  const [step, setStep] = useState<EditTransactionSteps>(EditTransactionSteps.Edit);
  const [transactionData, setTransactionData] = useState({} as Expense);
  const { data, error, loading, fetchData } = useFetch(
    transactionData.type === TransactionType.Income ? TransactionService.editIncome : TransactionService.editExpense,
    `${transactionToModify?.id}`
  );

  const handleFormConfirm = (data: any) => {
    setTransactionData(data);
    setStep(EditTransactionSteps.Confirm);
  };
  const handleBack = () => {
    setStep(EditTransactionSteps.Edit);
  };

  const handleSubmit = () => {
    fetchData({ name: transactionData.name, amount: transactionData.amount, groupId: transactionData.groupId });
  };

  useEffect(() => {
    if (data || error) {
      data && setStep(EditTransactionSteps.Success);
      error && setStep(EditTransactionSteps.Fail);
    }

  }, [data, error]);


  const handleClose = () => {
    setStep(EditTransactionSteps.Edit)
    closeEditTransactionModal()
  }

  return (
    <CustomModal isOpen={editTransactionModalOpen} handleClose={handleClose}>
      <Loader isLoading={loading} size="8vw">
        {
          {
            [EditTransactionSteps.Edit]: (
              <TransactionForm
                disableType
                handleClose={closeEditTransactionModal}
                handleConfirm={handleFormConfirm}
                transactionToEdit={transactionToModify as Transaction}
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
    </CustomModal>
  );
}

export default EditTransactionModal;

import { useEffect, useState } from 'react';
import { AddTransactionSteps, Outcome } from '../values/enums/form-steps';
import TransactionForm from '../form/manage-transactions/steps/transaction-form';
import { Transaction, TransactionFormData } from '../models/transactions';
import { _void } from '../models/common';
import Confirm from '../form/manage-transactions/steps/confirm';

import Loader from '../common/loader';
import TransactionService from '../services/transaction.service';
import { TransactionType } from '../values/enums/transactions';
import useFetch from '../hooks/useFetch';
import CustomModal from '../common/modal/custom-modal';
import { useModalContext } from '../contexts/modals.context';
import Notice from '../form/common-steps/notice';

function AddTransactionModal() {
  const { addTransactionModalOpen, closeAddTransactionModal } = useModalContext();
  const [step, setStep] = useState<AddTransactionSteps>(AddTransactionSteps.Add);
  const [transactionData, setTransactionData] = useState({} as TransactionFormData);
  const { data, error, loading, fetchData } = useFetch(
    transactionData.type === TransactionType.Income ? TransactionService.addIncome : TransactionService.addExpense
  );


  const handleFormConfirm = (data: Transaction) => {
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

  useEffect(() => {
    data && setStep(AddTransactionSteps.Success);
    error && setStep(AddTransactionSteps.Fail);
  }, [data, error]);


  const handleClose = () => {
    setStep(AddTransactionSteps.Add)
    closeAddTransactionModal()
  }

  return (
    <CustomModal title="Add Transaction" isOpen={addTransactionModalOpen} handleClose={closeAddTransactionModal}>
      <Loader isLoading={loading} size="8vw">
        {
          {
            [AddTransactionSteps.Add]: (
              <TransactionForm handleClose={closeAddTransactionModal} handleConfirm={handleFormConfirm} />
            ),
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
                handleClose={() => handleClose()}
              />
            ),
            [AddTransactionSteps.Fail]: (
              <Notice
                outcome={Outcome.Fail}
                text="Oops! Something went wrong. Please try again later"
                handleClose={() => handleClose()}
              />
            ),
          }[step]
        }
      </Loader>
    </CustomModal>
  );
}

export default AddTransactionModal;

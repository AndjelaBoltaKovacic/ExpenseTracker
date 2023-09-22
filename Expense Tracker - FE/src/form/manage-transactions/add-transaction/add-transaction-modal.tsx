import { useEffect, useState } from 'react';
import { AddTransactionSteps, Outcome } from '../../../values/enums/form-steps';
import TransactionForm from './transaction-form';
import { Transaction, TransactionFormData } from '../../../models/transactions';
import { _void } from '../../../models/common';
import Confirm from '../../steps/confirm';
import Notice from '../../steps/notice';
import Loader from '../../../common/loader';
import TransactionService from '../../../services/transaction.service';
import { TransactionType } from '../../../values/enums/transactions';
import useFetch from '../../../hooks/useFetch';
import cashRegisterSound from '../../../assets/audio/cash-register-purchase-87313.mp3';
import CustomModal from '../../../common/modal/custom-modal';
import { useModalContext } from '../../../contexts/modals.context';

function AddTransactionModal() {
  const { addTransactionModalOpen, closeAddTransactionModal } = useModalContext();
  const [step, setStep] = useState<AddTransactionSteps>(AddTransactionSteps.Add);
  const [transactionData, setTransactionData] = useState({} as TransactionFormData);
  const { data, error, loading, fetchData } = useFetch(
    transactionData.type === TransactionType.Income ? TransactionService.addIncome : TransactionService.addExpense
  );
  const audio = new Audio(cashRegisterSound);

  const handleFormConfirm = (data: Transaction) => {
    setTransactionData(data);
    setStep(AddTransactionSteps.Confirm);
  };
  const handleBack = () => {
    setStep(AddTransactionSteps.Add);
  };

  const handleSubmit = () => {
    const { groupName, type, ...body } = transactionData;
    audio.play();
    setTimeout(() => {
      fetchData(body);
    }, 500);
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

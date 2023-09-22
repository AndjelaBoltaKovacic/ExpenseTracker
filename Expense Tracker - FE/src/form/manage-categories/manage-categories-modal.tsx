import { useEffect, useState } from 'react';
import { ManageCategoriesSteps, Outcome } from '../../values/enums/form-steps';
import Manage from './steps/categories-display';
import { _void } from '../../models/common';
import { Box } from '@mui/material';
import { TransactionGroup } from '../../models/transactions';
import Notice from '../steps/notice';
import Confirm from './steps/confirm-categories';
import useFetch from '../../hooks/useFetch';
import CategoriesForm from './steps/categories-form';
import { Action } from '../../values/enums/service';
import { TransactionType } from '../../values/enums/transactions';
import { getApiCall, getReqBody } from '../../helpers/common';
import { useModalContext } from '../../contexts/modals.context';
import CustomModal from '../../common/modal/custom-modal';
import Loader from '../../common/loader';

function ManageCategoriesModal() {
  const {
    manageGroupModalOpen,
    closeManageGroupModal
  } = useModalContext();
  const [step, setStep] = useState(ManageCategoriesSteps.Manage);
  const [method, setMethod] = useState<any>(null);
  const [isExpense, setIsExpense] = useState<boolean>(true);
  const [group, setGroup] = useState<TransactionGroup>({} as TransactionGroup);
  const isEdit = method === Action.Edit;
  const { data, error, loading, fetchData } = useFetch(
    getApiCall(isExpense, method),
    method !== Action.Add ? `${group.id}` : ''
  );

  const categoryType = isExpense ? TransactionType.Expense : TransactionType.Income;

  const handleBack = () => {
    isEdit ? setStep(ManageCategoriesSteps.Edit) : setStep(ManageCategoriesSteps.Manage);
  };

  const handleProceed = (group: TransactionGroup, type?: Action) => {
    setGroup(group);
    setStep(ManageCategoriesSteps.Confirm);
    setMethod(type);
  };
  const handleEdit = (group: TransactionGroup) => {
    setGroup(group);
    setStep(ManageCategoriesSteps.Edit);
  };

  const handleConfirm = () => {
    fetchData(getReqBody(group, method));
  };

  useEffect(() => {
    console.log('called')
    console.log(error)
    data !== null && setStep(ManageCategoriesSteps.Success);
    error && setStep(ManageCategoriesSteps.Fail);
  }, [data, error]);

  const handleClose = () => {
    closeManageGroupModal();
  }

  return (
    <CustomModal isOpen={manageGroupModalOpen} handleClose={() => handleClose()}>
      <Box>
        <Loader isLoading={loading}>
          {
            {
              [ManageCategoriesSteps.Manage]: (
                <Manage
                  isExpense={isExpense}
                  setIsExpense={setIsExpense}
                  onEdit={handleEdit}
                  onDelete={handleProceed}
                  onAdd={() => setStep(ManageCategoriesSteps.Add)}
                />
              ),
              [ManageCategoriesSteps.Add]: (
                <CategoriesForm
                  title={`Add ${categoryType} Category`}
                  handleConfirm={handleProceed}
                  handleBack={handleBack}
                />
              ),
              [ManageCategoriesSteps.Edit]: (
                <CategoriesForm
                  title={`Edit ${categoryType} Category`}
                  group={group}
                  handleConfirm={handleProceed}
                  handleBack={handleBack}
                />
              ),
              [ManageCategoriesSteps.Confirm]: (
                <Confirm
                  isExpense={isExpense}
                  group={group}
                  text={`Are you sure you want to ${method} this ${isExpense ? 'expense' : 'income'} category?`}
                  handleBack={handleBack}
                  handleConfirm={handleConfirm}
                />
              ),
              [ManageCategoriesSteps.Success]: (
                <Notice
                  outcome={Outcome.Success}
                  text={`Your ${method} request has been completed successfully`}
                  handleClose={() => handleClose()}
                />
              ),
              [ManageCategoriesSteps.Fail]: (
                <Notice
                  outcome={Outcome.Fail}
                  text='Oops! Something went wrong. Please try again later'
                  handleClose={() => handleClose()}
                />
              ),
            }[step]
          }
        </Loader>
      </Box>
    </CustomModal>
  );
}

export default ManageCategoriesModal;

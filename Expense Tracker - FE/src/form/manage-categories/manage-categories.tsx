import { useEffect, useState } from 'react';
import { ManageCategoriesSteps, Outcome } from '../../values/enums/form-steps';
import Manage from './steps/categories-display';
import { _void } from '../../models/common';
import { Box } from '@mui/material';
import { TransactionGroup } from '../../models/transactions';
import Notice from '../steps/notice';
import Confirm from './steps/confirm-categories';
import useFetch from '../../hooks/useFetch';
import TransactionService from '../../services/transaction.service';
import CategoriesForm from './steps/categories-form';
import { Action } from '../../values/enums/service';
import { TransactionType } from '../../values/enums/transactions';
import { getApiCall } from '../../helpers/common';

function ManageCategories({ handleClose }: { handleClose: _void }) {
  const [step, setStep] = useState(ManageCategoriesSteps.Manage);
  const [method, setMethod] = useState<any>(null);
  const [isExpense, setIsExpense] = useState<boolean>(true);
  const [group, setGroup] = useState<TransactionGroup>({} as TransactionGroup);
  const isEdit = method === Action.Edit;
  const {
    data: add,
    error: errorAdd,
    loading: loadingAdd,
    fetchData: addData,
  } = useFetch(isExpense ? TransactionService.addExpenseGroup : TransactionService.addIncomeGroup);
  const { data, error, loading, fetchData } = useFetch(getApiCall(isExpense, isEdit), `${group.id}`);
  const categoryType = isExpense ? TransactionType.Expense : TransactionType.Expense;

  const handleEdit = (group: TransactionGroup) => {
    setGroup(group);
    setStep(ManageCategoriesSteps.Edit);
  };

  const handleBack = () => {
    isEdit ? setStep(ManageCategoriesSteps.Edit) : setStep(ManageCategoriesSteps.Manage);
  };

  const handleProceed = (group: TransactionGroup, type?: Action) => {
    setGroup(group);
    setStep(ManageCategoriesSteps.Confirm);
    setMethod(type);
  };

  const handleConfirm = () => {
    fetchData(isEdit && { ...group, type: 'USER_DEFINED' });
  };
  const handleAdd = () => {
    addData({ ...group, type: 'USER_DEFINED' });
  };

  useEffect(() => {
    add && setStep(ManageCategoriesSteps.Success);
    errorAdd && setStep(ManageCategoriesSteps.Fail);
  }, [add, errorAdd]);

  useEffect(() => {
    data !== null && setStep(ManageCategoriesSteps.Success);
    error && setStep(ManageCategoriesSteps.Fail);
  }, [data, error]);

  return (
    <Box>
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
              handleBack={() => {
                setStep(ManageCategoriesSteps.Manage);
              }}
            />
          ),
          [ManageCategoriesSteps.Edit]: (
            <CategoriesForm
              title={`Edit ${categoryType} Category`}
              group={group}
              handleConfirm={handleProceed}
              handleBack={() => {
                setStep(ManageCategoriesSteps.Manage);
              }}
            />
          ),
          [ManageCategoriesSteps.Confirm]: (
            <Confirm
              isExpense={isExpense}
              group={group}
              text={`Are you sure you wan't to ${method} this ${isExpense ? 'expense' : 'income'} category?`}
              handleBack={handleBack}
              handleConfirm={method === Action.Add ? handleAdd : handleConfirm}
            />
          ),
          [ManageCategoriesSteps.Success]: (
            <Notice
              outcome={Outcome.Success}
              text={`Your ${method} request has been completed successfully`}
              handleClose={handleClose}
            />
          ),
          [ManageCategoriesSteps.Fail]: (
            <Notice
              outcome={Outcome.Fail}
              text="Oops! Something went wrong. Please try again later"
              handleClose={handleClose}
            />
          ),
        }[step]
      }
    </Box>
  );
}

export default ManageCategories;

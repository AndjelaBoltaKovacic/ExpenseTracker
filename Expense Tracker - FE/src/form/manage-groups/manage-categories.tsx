import { useEffect, useState } from 'react';
import { ManageCategoriesSteps, Outcome } from '../../values/enums/form-steps';
import Manage from './steps/manage';
import { _void } from '../../models/common';
import { Box } from '@mui/material';
import { TransactionGroup } from '../../models/transactions';
import Edit from './steps/edit';
import Notice from '../steps/notice';
import Confirm from './steps/confirm';
import useFetch from '../../hooks/useFetch';
import TransactionService from '../../services/transaction.service';

function ManageCategories({ handleClose }: { handleClose: _void }) {
  const [step, setStep] = useState(ManageCategoriesSteps.Manage);
  const [method, setMethod] = useState<any>(null);
  const [isExpense, setIsExpense] = useState<boolean>(true);
  const [group, setGroup] = useState<TransactionGroup>({} as TransactionGroup);
  const isEdit = method === 'edit';
  const [path, setPath] = useState();

  const apiCall = isExpense
    ? isEdit
      ? TransactionService.editExpenseGroup
      : TransactionService.deleteExpenseGroup
    : isEdit
    ? TransactionService.editIncomeGroup
    : TransactionService.deleteExpenseGroup;

  const {
    data: add,
    error: errorAdd,
    loading: loadingadd,
    fetchData: addData,
  } = useFetch(isExpense ? TransactionService.addExpenseGroup : TransactionService.addIncomeGroup, path);
  const { data, error, loading, fetchData } = useFetch(apiCall, path);
  console.log(group);

  const handleEdit = (group: TransactionGroup) => {
    setGroup(group);
    setStep(ManageCategoriesSteps.Edit);
  };

  const handleBack = () => {
    isEdit ? setStep(ManageCategoriesSteps.Edit) : setStep(ManageCategoriesSteps.Manage);
  };

  const handleConfirm = (group: TransactionGroup, type?: 'delete' | 'edit' | 'add') => {
    setGroup(group);
    setStep(ManageCategoriesSteps.Confirm);
    setMethod(type);
  };

  useEffect(() => {
    add && setStep(ManageCategoriesSteps.Success);
    errorAdd && setStep(ManageCategoriesSteps.Fail);
  }, [add, errorAdd]);

  useEffect(() => {
    data && setStep(ManageCategoriesSteps.Success);
    error && setStep(ManageCategoriesSteps.Fail);
  }, [data, error]);

  return (
    <Box minHeight={'450px'}>
      {
        {
          [ManageCategoriesSteps.Manage]: (
            <Manage
              isExpense={isExpense}
              setIsExpense={setIsExpense}
              onEdit={handleEdit}
              onDelete={handleConfirm}
              onAdd={() => setStep(ManageCategoriesSteps.Add)}
            />
          ),
          [ManageCategoriesSteps.Add]: (
            <Edit
              title="Add Transaction Category"
              handleConfirm={handleConfirm}
              handleBack={() => {
                setStep(ManageCategoriesSteps.Manage);
              }}
            />
          ),
          [ManageCategoriesSteps.Edit]: (
            <Edit
              title="Edit Transaction Category"
              group={group}
              handleConfirm={handleConfirm}
              handleBack={() => {
                setStep(ManageCategoriesSteps.Manage);
              }}
            />
          ),
          [ManageCategoriesSteps.Confirm]: (
            <Confirm
              isExpense={isExpense}
              group={group}
              text={`Are you sure you wan't to ${method} this transaction category?`}
              handleBack={handleBack}
              handleConfirm={method === 'add' ? () => addData({ ...group, type: 'USER_DEFINED' }) : () => fetchData()}
            />
          ),
          [ManageCategoriesSteps.Success]: (
            <Notice
              outcome={Outcome.Success}
              text={`You have successfully ${method}ed transaction group`}
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

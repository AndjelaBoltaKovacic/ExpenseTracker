import { ReactNode, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { _void } from '../../models/common';
import CurrencyInput from './currency-input';
import { Box, FormHelperText } from '@mui/material';
import ModalButtons from '../../common/modal/modal-buttons';
import TransactionService from '../../services/transaction.service';
import useFetch from '../../hooks/useFetch';
import Loader from '../../common/loader';
import Notice from '../steps/notice';
import { Outcome } from '../../values/enums/form-steps';
import { Expense, Income, TransactionGroup } from '../../models/transactions';
import { TransactionType } from '../../values/enums/transactions';
import { Settings } from '@mui/icons-material';
import CategoryIcon from '../../common/category-icon';

function TransactionForm({
  transactionToEdit,
  handleClose,
  handleConfirm,
  disableType,
}: {
  transactionToEdit?: Expense | Income;
  handleClose: _void;
  handleConfirm: _void;
  disableType?: boolean;
}) {
  const [transactionGroups, setTransactionGroups] = useState<TransactionGroup[]>([] as TransactionGroup[]);
  const transactionTypes = ['Income', 'Expense'];
  //FORM VALUES
  const {
    handleSubmit,
    register,
    control,
    watch,
    formState: { errors },
  } = useForm();

  const transactionType = watch('type');
  const groupId = watch('groupId');
  const name = watch('name');
  const amount = watch('amount');
  const [notChanged, setNotChanged] = useState(true);

  //API VALUES
  const {
    data: transGroups,
    error: tgError,
    loading: tgLoading,
    fetchData: fetchTransGroups,
  } = useFetch<TransactionGroup[]>(
    transactionType === TransactionType.Income
      ? TransactionService.getIncomeGroups
      : TransactionService.getExpenseGroups
  );
  const {
    type,
    groupId: groupID,
    name: transactionToEditName,
    amount: transactionToEditAmount,
  } = transactionToEdit ? transactionToEdit : ({} as any);

  useEffect(() => {
    transactionType && fetchTransGroups();
  }, [transactionType]);

  useEffect(() => {
    if (transGroups?.length) {
      setTransactionGroups(transGroups);
    }
  }, [transGroups]);

  useEffect(() => {
    setNotChanged(
      type === transactionType &&
        groupId?.includes(groupID) &&
        name === transactionToEditName &&
        amount === transactionToEditAmount
    );
  }, [amount, groupId, transactionType, name]);

  const onSubmit = (data: any) => {
    const groupName = transactionGroups.find((group) => group.id === data.groupId)?.name;
    handleConfirm({ ...data, groupName });
  };

  return tgError ? (
    <Notice
      outcome={Outcome.Fail}
      text="Oops! Something went wrong. Please try again later"
      handleClose={handleClose}
    />
  ) : (
    <Loader isLoading={tgLoading}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl fullWidth variant="outlined" error={!!errors.type} margin="normal" disabled={disableType}>
          <InputLabel>Transaction Type</InputLabel>
          <Controller
            name="type"
            control={control}
            defaultValue={type || undefined}
            rules={{ required: 'This field is required' }}
            render={({ field }) => (
              <>
                <Select {...field} label="Transaction Type">
                  {transactionTypes.map((type, index) => (
                    <MenuItem key={index} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
                {errors?.type && <FormHelperText>{errors?.type?.message as string}</FormHelperText>}
              </>
            )}
          />
        </FormControl>
        <FormControl fullWidth variant="outlined" error={!!errors.groupId} margin="normal">
          <InputLabel>Transaction Category</InputLabel>
          <Controller
            name="groupId"
            control={control}
            defaultValue={groupID || undefined}
            rules={{ required: 'This field is required' }}
            render={({ field }) => (
              <>
                <Select {...field} label="Transaction Category">
                  {transactionGroups?.map(({ name, id }) => (
                    <MenuItem key={id} value={id}>
                      <Box display="flex" alignItems="end">
                        <CategoryIcon name={name} /> &nbsp;{name}
                      </Box>
                    </MenuItem>
                  ))}
                  <MenuItem value={'settings'}>
                    <Settings color="primary" />
                    &nbsp; Manage Categories
                  </MenuItem>
                </Select>
                {errors?.groupId && <FormHelperText>{errors?.groupId?.message as string}</FormHelperText>}
              </>
            )}
          />
        </FormControl>

        <TextField
          label="Transaction Description"
          fullWidth
          defaultValue={transactionToEditName || undefined}
          variant="outlined"
          margin="normal"
          {...register('name', {
            required: 'This field is required',
            minLength: { value: 5, message: 'Description must have at least 5 characters' },
          })}
          error={!!errors.name}
          helperText={errors?.name?.message as ReactNode}
        />
        <FormControl fullWidth variant="outlined" error={!!errors.amount} margin="normal">
          <Controller
            defaultValue={transactionToEditAmount || undefined}
            name="amount"
            control={control}
            rules={{
              required: 'This field is required',
            }}
            render={({ field }) => (
              <>
                <CurrencyInput {...field} label="Amount" name="amount" fullWidth />
                {errors?.amount && <FormHelperText>{errors?.amount?.message as string}</FormHelperText>}
              </>
            )}
          />
        </FormControl>
        <ModalButtons handleClose={handleClose} handleSubmit={handleSubmit} disableSubmit={notChanged} />
      </form>
    </Loader>
  );
}

export default TransactionForm;

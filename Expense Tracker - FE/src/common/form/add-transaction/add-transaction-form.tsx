import { ReactNode, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { _void } from '../../../models/common';
import CurrencyInput from './currency-input';
import { FormHelperText } from '@mui/material';
import ModalButtons from '../../modal/modal-buttons';
import TransactionService from '../../../services/transaction.service';
import useFetch from '../../../hooks/useFetch';
import Loader from '../../loader';
import Notice from '../steps/notice';
import { Outcome } from '../../../values/enums/form-steps';
import { Expense, Income, TransactionGroup } from '../../../models/transactions';
import { TransactionType } from '../../../values/enums/transactions';

function AddTransactionForm({
  transactionToEdit,
  handleClose,
  handleConfirm,
}: {
  transactionToEdit?: Expense | Income;
  handleClose: _void;
  handleConfirm: _void;
}) {
  //FORM VALUES
  const {
    handleSubmit,
    register,
    control,
    watch,
    formState: { errors },
  } = useForm();

  const transactionType = watch('type');
  const categoryType = watch('category');
  const formName = watch('name');
  const transactionAmount = watch('amount');
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

  const [transactionGroups, setTransactionGroups] = useState<TransactionGroup[]>([] as TransactionGroup[]);
  const transactionTypes = ['Income', 'Expense'];
  const { type, category, name, amount } = transactionToEdit ? transactionToEdit : ({} as any);

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
      type === transactionType && categoryType === category && formName === name && amount === transactionAmount
    );
  }, [transactionAmount, categoryType, transactionType, formName]);

  const onSubmit = (data: any) => {
    handleConfirm(data);
  };

  return tgError ? (
    <Notice
      outcome={Outcome.Fail}
      text='Oops! Something went wrong. Please try again later'
      handleClose={handleClose}
    />
  ) : (
    <Loader isLoading={tgLoading}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl fullWidth variant='outlined' error={!!errors.type} margin='normal'>
          <InputLabel>Transaction Type</InputLabel>
          <Controller
            name='type'
            control={control}
            defaultValue={type || undefined}
            rules={{ required: 'This field is required' }}
            render={({ field }) => (
              <>
                <Select {...field} label='Transaction Type'>
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
        <FormControl fullWidth variant='outlined' error={!!errors.category} margin='normal'>
          <InputLabel>Transaction Category</InputLabel>
          <Controller
            name='category'
            control={control}
            defaultValue={category || undefined}
            rules={{ required: 'This field is required' }}
            render={({ field }) => (
              <>
                <Select {...field} label='Transaction Category'>
                  {transactionGroups?.map(({ name }, index) => (
                    <MenuItem key={index} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                  <MenuItem value={''}>Add custom category</MenuItem>
                </Select>
                {errors?.category && <FormHelperText>{errors?.category?.message as string}</FormHelperText>}
              </>
            )}
          />
        </FormControl>

        <TextField
          label='Transaction Description'
          fullWidth
          defaultValue={formName || undefined}
          variant='outlined'
          margin='normal'
          {...register('formName', {
            required: 'This field is required',
            minLength: { value: 5, message: 'Description must have at least 5 characters' },
          })}
          error={!!errors.formName}
          helperText={errors?.formName?.message as ReactNode}
        />
        <FormControl fullWidth variant='outlined' error={!!errors.amount} margin='normal'>
          <Controller
            defaultValue={amount || undefined}
            name='amount'
            control={control}
            rules={{
              required: 'This field is required',
            }}
            render={({ field }) => (
              <>
                <CurrencyInput {...field} label='Amount' name='amount' fullWidth />
                {errors?.amount && <FormHelperText>{errors?.amount?.message as string}</FormHelperText>}
              </>
            )}
          />
        </FormControl>
        <ModalButtons handleClose={handleClose} handleSubmit={handleSubmit} disableSubmit={notChanged} />
      </form>
    </Loader>
  );
};

export default AddTransactionForm;

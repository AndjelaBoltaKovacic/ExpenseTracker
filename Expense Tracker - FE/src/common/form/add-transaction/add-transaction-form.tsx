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
import { Expense } from '../../../models/expenses';

const AddTransactionForm = ({
  transactionToEdit,
  handleClose,
  handleConfirm,
}: {
  transactionToEdit?: Expense;
  handleClose: _void;
  handleConfirm: _void;
}) => {
  const {
    handleSubmit,
    register,
    control,
    watch,
    formState: { errors },
  } = useForm();
  const [notChanged, setNotChanged] = useState(true);
  const transactionTypes = ['Income', 'Expense'];
  const transactionCategories = ['category A', 'category B', 'category C', 'category D', 'category E'];
  const { type, category, description, amount } = transactionToEdit ? (transactionToEdit as Expense) : ({} as Expense);

  const transactionType = watch('type');
  const categoryType = watch('category');
  const descriptionType = watch('description');
  const transactionAmount = watch('amount');

  useEffect(() => {
    setNotChanged(
      type === transactionType &&
        categoryType === category &&
        descriptionType === description &&
        amount === transactionAmount
    );
  }, [transactionAmount, categoryType, transactionType, descriptionType]);

  const onSubmit = (data: any) => {
    handleConfirm(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl fullWidth variant="outlined" error={!!errors.type} margin="normal">
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
      <FormControl fullWidth variant="outlined" error={!!errors.category} margin="normal">
        <InputLabel>Transaction Category</InputLabel>
        <Controller
          name="category"
          control={control}
          defaultValue={category || undefined}
          rules={{ required: 'This field is required' }}
          render={({ field }) => (
            <>
              <Select {...field} label="Transaction Category">
                {transactionCategories.map((type, index) => (
                  <MenuItem key={index} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
              {errors?.category && <FormHelperText>{errors?.category?.message as string}</FormHelperText>}
            </>
          )}
        />
      </FormControl>
      <TextField
        label="Transaction Description"
        fullWidth
        defaultValue={description || undefined}
        variant="outlined"
        margin="normal"
        {...register('description', {
          required: 'This field is required',
          minLength: { value: 5, message: 'Description must have at least 5 characters' },
        })}
        error={!!errors.description}
        helperText={errors?.description?.message as ReactNode}
      />
      <FormControl fullWidth variant="outlined" error={!!errors.amount} margin="normal">
        <Controller
          defaultValue={amount || undefined}
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
  );
};

export default AddTransactionForm;

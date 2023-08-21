import { ReactNode, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { VoidFn } from '../../../models/common';
import CurrencyInput from './currency-input';
import { FormHelperText } from '@mui/material';
import ModalButtons from '../../modal/modal-buttons';
import { Expense } from '../../../models/expenses';
import Loader from '../../loader';

const AddTransactionForm = ({
  transactionToEdit,
  handleClose,
}: {
  transactionToEdit?: Expense;
  handleClose: VoidFn;
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

  const transactionType = watch('transactionType');
  const transactionCategory = watch('transactionCategory');
  const transactionDescription = watch('transactionDescription');
  const transactionAmount = watch('amount');

  useEffect(() => {
    setNotChanged(
      type === transactionType &&
        category === transactionCategory &&
        description === transactionDescription &&
        amount === transactionAmount
    );
  }, [transactionAmount, transactionCategory, transactionType, transactionDescription]);

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Loader isLoading={true} size="8vw">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl fullWidth variant="outlined" error={!!errors.transactionType} margin="normal">
          <InputLabel>Transaction Type</InputLabel>
          <Controller
            name="transactionType"
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
                {errors?.transactionType && (
                  <FormHelperText>{errors?.transactionType?.message as string}</FormHelperText>
                )}
              </>
            )}
          />
        </FormControl>
        <FormControl fullWidth variant="outlined" error={!!errors.transactionCategory} margin="normal">
          <InputLabel>Transaction Category</InputLabel>
          <Controller
            name="transactionCategory"
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
                {errors?.transactionCategory && (
                  <FormHelperText>{errors?.transactionCategory?.message as string}</FormHelperText>
                )}
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
          {...register('transactionDescription', {
            required: 'This field is required',
            minLength: { value: 5, message: 'Description must have at least 5 characters' },
          })}
          error={!!errors.transactionDescription}
          helperText={errors?.transactionDescription?.message as ReactNode}
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
        <ModalButtons handleClose={handleClose} handleSubmit={onSubmit} disableSubmit={notChanged} />
      </form>
    </Loader>
  );
};

export default AddTransactionForm;

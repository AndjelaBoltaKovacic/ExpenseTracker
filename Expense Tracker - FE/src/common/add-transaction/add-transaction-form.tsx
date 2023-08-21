import { ReactNode } from 'react';
import { Controller, useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import { VoidFn } from '../../models/common';
import CurrencyInput from './currency-input';
import { FormHelperText } from '@mui/material';

const AddTransactionForm = ({ handleClose }: { handleClose: VoidFn }) => {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm();
  const transactionTypes = ['Income', 'Expense'];
  const transactionCategories = ['Category A', 'Category B', 'Category C'];

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl fullWidth variant='outlined' error={!!errors.transactionType} margin='normal'>
        <InputLabel>Transaction Type</InputLabel>
        <Controller
          name='transactionType'
          control={control}
          defaultValue=''
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
              {errors?.transactionType && <FormHelperText>{errors?.transactionType?.message as string}</FormHelperText>}
            </>
          )}
        />
      </FormControl>
      <FormControl fullWidth variant='outlined' error={!!errors.transactionCategory} margin='normal'>
        <InputLabel>Transaction Category</InputLabel>
        <Controller
          name='transactionCategory'
          control={control}
          defaultValue=''
          rules={{ required: 'This field is required' }}
          render={({ field }) => (
            <>
              <Select {...field} label='Transaction Category'>
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
        label='Transaction Description'
        fullWidth
        variant='outlined'
        margin='normal'
        {...register('transactionDescription', {
          required: 'This field is required',
          minLength: { value: 5, message: 'Description must have at least 5 characters' },
        })}
        error={!!errors.transactionDescription}
        helperText={errors?.transactionDescription?.message as ReactNode}
      />
      <FormControl fullWidth variant='outlined' error={!!errors.amount} margin='normal'>
        <Controller
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

      <Box display='flex' justifyContent='center' gap={3} mt={3}>
        <Button variant='contained' color='primary' onClick={handleClose}>
          Close
        </Button>
        <Button variant='contained' color='secondary' type='submit'>
          Confirm
        </Button>
      </Box>
    </form>
  );
};

export default AddTransactionForm;

import { TextField, Typography } from '@mui/material';
import { useEffect, ReactNode, useState } from 'react';
import { useForm } from 'react-hook-form';
import { _void } from '../../../../models/common';
import { TransactionGroup } from '../../../../models/transactions';
import ModalButtons from '../../../modal/modal-buttons';
import CategoryIcon from '../../../category-icon';

function Edit({
  group,
  handleConfirm,
  handleBack,
  title,
}: {
  group?: TransactionGroup;
  handleConfirm: any;
  handleBack: any;
  title: string;
}) {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm();

  const name = watch('name');

  const [notChanged, setNotChanged] = useState(true);

  const { name: oldName } = group ? group : ({} as TransactionGroup);

  useEffect(() => {
    setNotChanged(name === oldName);
  }, [name]);

  const onSubmit = (data: any) => {
    handleConfirm({ ...group, ...data }, oldName ? 'edit' : 'add');
  };

  return (
    <>
      <Typography fontSize={20} textAlign='center' padding={2}>
        {title}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label='Transaction Description'
          fullWidth
          defaultValue={oldName || undefined}
          variant='outlined'
          margin='normal'
          {...register('name', {
            required: 'This field is required',
            minLength: { value: 5, message: 'Description must have at least 5 characters' },
          })}
          error={!!errors.name}
          helperText={errors?.name?.message as ReactNode}
          InputProps={{
            startAdornment: <CategoryIcon name={name || oldName || ''} />,
          }}
        />

        <ModalButtons
          handleClose={handleBack}
          cancelButtonText='Back'
          handleSubmit={handleSubmit}
          disableSubmit={notChanged}
        />
      </form>
    </>
  );
}

export default Edit;

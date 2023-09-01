import { Box, TextField, Typography } from '@mui/material';
import { useEffect, ReactNode, useState } from 'react';
import { useForm } from 'react-hook-form';
import { _void } from '../../../models/common';
import { TransactionGroup } from '../../../models/transactions';
import ModalButtons from '../../../common/modal/modal-buttons';
import CategoryIcon from '../../../common/category-icon';
import { Action } from '../../../values/enums/service';

function CategoriesForm({
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
  const [notChanged, setNotChanged] = useState<boolean>(true);
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm();

  const name = watch('name');
    const { name: oldName } = group ? group : ({} as TransactionGroup);

    useEffect(() => {
      setNotChanged(name === oldName);
    }, [name]);

    const onSubmit = (data: any) => {
      handleConfirm({ ...group, ...data }, oldName ? Action.Edit : Action.Add);
    };

    return (
      <>
        <Typography fontSize={20} textAlign="center" padding={2}>
          {title}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Transaction Description"
            fullWidth
            defaultValue={oldName || undefined}
            variant="outlined"
            margin="normal"
            {...register('name', {
              required: 'This field is required',
              minLength: { value: 5, message: 'Description must have at least 5 characters' },
            })}
            error={!!errors.name}
            helperText={errors?.name?.message as ReactNode}
            InputProps={{
              startAdornment: (
                <Box mr={1}>
                  <CategoryIcon name={name || oldName || ''} />
                </Box>
              ),
            }}
          />
          <ModalButtons
            handleClose={handleBack}
            cancelButtonText="Back"
            handleSubmit={handleSubmit}
            disableSubmit={notChanged}
          />
        </form>
      </>
    );
}

export default CategoriesForm;

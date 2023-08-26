import { useForm, Controller, SubmitHandler, FieldValues } from 'react-hook-form';
import { FormControl, InputLabel, Select, MenuItem, Button, FormHelperText, Typography, Box } from '@mui/material';
import { _void } from '../../../models/common';
import { DAYS_OF_MONTH, DAYS_OF_WEEK } from '../../../values/constants/menu';
import { ReminderType } from '../../../values/enums/reminder';
import { ReminderRequest } from '../../../models/reminder';

export const AddReminderForm = ({ onComplete }: { onComplete: _void }) => {
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const type = watch('type');
  const reminderDay = watch('reminderDay');

  const onSubmit = (data: any) => {
    onComplete(data);
  };

  const selectLabel = !type
    ? 'Select Option'
    : type === ReminderType.Weekly
    ? 'Select Day of Week'
    : 'Select Day of Month';

  return (
    <>
      <Typography
        variant="h5"
        textAlign="center"
        sx={{ fontSize: '2rem', '@media (min-width:600px)': { fontSize: '2.5rem' } }}
      >
        Set Reminder
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl fullWidth variant="outlined" error={!!errors.option} margin="normal">
          <InputLabel>Select Interval</InputLabel>
          <Controller
            defaultValue=""
            name="type"
            control={control}
            render={({ field }) => (
              <Select {...field} value={type} label="Select Option">
                <MenuItem value={ReminderType.Weekly}>Weekly</MenuItem>
                <MenuItem value={ReminderType.Monthly}>Monthly</MenuItem>
              </Select>
            )}
          />
          {errors?.option && <FormHelperText>{errors?.option?.message as string}</FormHelperText>}
        </FormControl>

        <FormControl disabled={!type} fullWidth variant="outlined" error={!!errors.reminderDay} margin="normal">
          <InputLabel>{selectLabel}</InputLabel>
          <Controller
            name="reminderDay"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Select {...field} label={selectLabel}>
                {type === ReminderType.Weekly
                  ? DAYS_OF_WEEK.map((reminderDay, index) => (
                      <MenuItem key={index} value={reminderDay.value}>
                        {reminderDay.label}
                      </MenuItem>
                    ))
                  : DAYS_OF_MONTH.map((reminderDay, index) => (
                      <MenuItem key={index} value={reminderDay.value}>
                        {reminderDay.label}
                      </MenuItem>
                    ))}
              </Select>
            )}
          />
          {errors?.reminderDay && <FormHelperText>{errors?.reminderDay?.message as string}</FormHelperText>}
        </FormControl>
        <Box display="flex" justifyContent="center" gap={3} mt={3}>
          <Button
            variant="contained"
            color="secondary"
            type="submit"
            onClick={onSubmit}
            disabled={!type || !reminderDay}
          >
            Confirm
          </Button>
        </Box>
      </form>
    </>
  );
};

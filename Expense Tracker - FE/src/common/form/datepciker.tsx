import { StaticDateRangePicker } from '@mui/lab';
import { pickersLayoutClasses } from '@mui/x-date-pickers/PickersLayout';

export default function SingleInputDateRangePicker() {
  return (
    <StaticDateRangePicker
      defaultValue={[new Date('2022-04-17'), new Date('2022-04-21')]}
      sx={{
        [`.${pickersLayoutClasses.contentWrapper}`]: {
          alignItems: 'center',
        },
      }}
    />
  );
}

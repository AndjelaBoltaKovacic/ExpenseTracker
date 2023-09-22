import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRange, DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';


export default function BasicDateRangePicker({ dateRange, setDateRange }: { dateRange: DateRange<string>, setDateRange: (el: DateRange<string>) => void }) {


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} localeText={{ start: 'Start Date', end: 'End Date' }}>
      <DateRangePicker
        value={dateRange}
        onChange={(newValue) => {
          setDateRange(newValue);
        }}
        renderInput={(startProps, endProps) => (
          <>
            <TextField {...startProps} />
            <Box sx={{ mx: 2 }}> to </Box>
            <TextField {...endProps} />
          </>
        )}
      />
    </LocalizationProvider>
  );
}

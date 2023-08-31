import { Box, Button, Slider, Tooltip } from '@mui/material';
import BasicDateRangePicker from './datepciker';
import { DateRange } from '@mui/x-date-pickers-pro';
import { Dayjs } from 'dayjs';

interface FilterBoxProps {
  amountFrom: number;
  amountTo: number;
  handleAmountChange: (event: Event, value: number | number[], activeThumb: number) => void;
  dateRange: DateRange<Dayjs>;
  setDateRange: (dateRange: DateRange<Dayjs>) => void;
  handleSubmit: () => void;
  minMax: number[];
}
export function FilterBox({
  amountFrom,
  amountTo,
  handleAmountChange,
  dateRange,
  setDateRange,
  handleSubmit,
  minMax,
}: FilterBoxProps) {
  return (
    <>
      <fieldset
        style={{
          borderWidth: '1px',
          borderRadius: '7px',
          borderColor: '#66A182',
          padding: '20px',
        }}
      >
        <legend
          style={{
            fontSize: '16px',
            color: '#66A182',
          }}
        >
          Filters
        </legend>
        <Box display="flex" justifyContent="space-between" gap={2} width="100%">
          <Tooltip title="Filter by amount">
            <Box display="flex" alignItems="center" width={{ xs: '100%', md: '50%' }} gap={2}>
              <span>${minMax[0]}</span>
              <Slider
                value={[amountFrom, amountTo]}
                onChange={handleAmountChange}
                min={minMax[0]}
                max={minMax[1]}
                size="small"
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
              />
              <span>${minMax[1]}</span>
            </Box>
          </Tooltip>
          <BasicDateRangePicker dateRange={dateRange} setDateRange={setDateRange} />
          <Button variant="contained" color="primary" onClick={() => handleSubmit()}>
            Find
          </Button>
        </Box>
      </fieldset>
    </>
  );
}

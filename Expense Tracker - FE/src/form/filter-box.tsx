import { Box, Button, Slider, Tooltip } from '@mui/material';
import BasicDateRangePicker from './datepciker';
import { DateRange } from '@mui/x-date-pickers-pro';
import { Dayjs } from 'dayjs';

interface FilterBoxProps {
  priceRange: { from: number, to: number }
  handleAmountChange: (event: Event, value: number | number[], activeThumb: number) => void;
  dateRange: DateRange<Dayjs>;
  setDateRange: (dateRange: DateRange<Dayjs>) => void;
  handleSubmit: () => void;
  minMax: number[];
}
export function FilterBox({
  priceRange,
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
        <Box display="flex" justifyContent="space-between" gap={{ xs: 3, md: 2 }} width="100%" flexWrap="wrap-reverse">
          <Tooltip title="Filter by amount">
            <Box display="flex" alignItems="center" width={{ xs: '100%', md: '48%' }} gap={2}>
              <span>${minMax[0]}</span>
              <Slider
                value={[priceRange.from, priceRange.to]}
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
          <Box
            display="flex"
            alignItems="center"
            width={{ xs: '100%', md: '48%' }}
            gap={2}
            justifyContent={{ xs: 'space-between' }}
          >
            <BasicDateRangePicker dateRange={dateRange} setDateRange={setDateRange} />
            <Box width={'20%'}>
              <Button fullWidth variant="contained" color="primary" onClick={() => handleSubmit()}>
                Find
              </Button>
            </Box>
          </Box>
        </Box>
      </fieldset>
    </>
  );
}

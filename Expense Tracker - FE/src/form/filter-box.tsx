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
  params,
  setParams,
  handleSubmit,
}: any) {

  const handleAmountChange = (event: any, newValue: any) => {
    setParams({ ...params, priceRange: { from: newValue[0], to: newValue[1] } });
  };

  const handleSetDateRange = (dateValues: any) => {
    console.log(dateValues)
    setParams({
      ...params, dateRange: dateValues.map((value: any) => value ? value.
        format('YYYY-MM-DD') : value)
    });
  };


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
              <span>${params.minMax[0]}</span>
              <Slider
                value={[params.priceRange.from, params.priceRange.to]}
                onChange={handleAmountChange}
                min={params.minMax[0]}
                max={params.minMax[1]}
                size="small"
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
              />
              <span>${params.minMax[1]}</span>
            </Box>
          </Tooltip>
          <Box
            display="flex"
            alignItems="center"
            width={{ xs: '100%', md: '48%' }}
            gap={2}
            justifyContent={{ xs: 'space-between' }}
          >
            <BasicDateRangePicker dateRange={params.dateRange} setDateRange={handleSetDateRange} />
            <Box width={'20%'}>
              <Button fullWidth variant="contained" color="primary" onClick={handleSubmit}>
                Find
              </Button>
            </Box>
          </Box>
        </Box>
      </fieldset>
    </>
  );
}

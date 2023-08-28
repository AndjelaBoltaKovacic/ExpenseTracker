import { Box, Button, Slider } from '@mui/material';
import BasicDateRangePicker from './datepciker';

export function FilterBox({ amountFrom, amountTo, handleAmountChange, dateRange, setDateRange, handleSubmit }: any) {
  return (
    <>
      <fieldset
        style={{
          borderWidth: '1px',
          borderRadius: '7px',
          borderColor: '#66A182',
          padding: '20px',
          display: 'flex',
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
        <Box display='flex' justifyContent='space-around' width='100%'>
          <Box display='flex' alignItems='center' width='50%' gap={3}>
            <span>0</span>
            <Slider
              value={[amountFrom, amountTo]}
              onChange={handleAmountChange}
              min={0}
              max={1000}
              valueLabelDisplay='auto'
              aria-labelledby='range-slider'
            />
            <span>1000</span>
          </Box>
          <BasicDateRangePicker dateRange={dateRange} setDateRange={setDateRange} />
          <Button variant='contained' color='primary' onClick={() => handleSubmit()}>
            Find
          </Button>
        </Box>
      </fieldset>
    </>
  );
}

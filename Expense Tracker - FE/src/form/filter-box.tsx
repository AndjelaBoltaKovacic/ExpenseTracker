import { Box, Button, Slider, Toolbar, Tooltip } from '@mui/material';
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
              <span>$0</span>
              <Slider
                value={[amountFrom, amountTo]}
                onChange={handleAmountChange}
                min={0}
                max={1000}
                size="small"
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
              />
              <span>$1000</span>
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

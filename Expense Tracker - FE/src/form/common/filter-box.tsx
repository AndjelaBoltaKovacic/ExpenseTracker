import { Box, Button, Slider, Tooltip } from '@mui/material';
import BasicDateRangePicker from './datepicker';
import { _void } from '../../models/common';

export function FilterBox({
  maxFilterAmount,
  params,
  handleChangeParams,
  handleSubmit,
}: {
  maxFilterAmount: number;
  params: any;
  handleChangeParams: _void;
  handleSubmit: any;
}) {
  const handleAmountChange = (_: any, newValue: any) => {
    handleChangeParams({ ...params, priceRange: { from: newValue[0], to: newValue[1] } });
  };

  const handleSetDateRange = (dateValues: any) => {
    handleChangeParams({
      ...params,
      dateRange: dateValues.map((value: any) => (value ? value.format('YYYY-MM-DD') : null)),
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
        <Box display='flex' justifyContent='space-between' gap={{ xs: 3, md: 2 }} width='100%' flexWrap='wrap-reverse'>
          <Tooltip title='Filter by amount'>
            <Box display='flex' alignItems='center' width={{ xs: '100%', md: '48%' }} gap={2}>
              <span>${0}</span>
              <Slider
                value={[params.priceRange.from, params.priceRange.to]}
                onChange={handleAmountChange}
                min={0}
                max={maxFilterAmount}
                size='small'
                valueLabelDisplay='auto'
                aria-labelledby='range-slider'
              />
              <span>${maxFilterAmount}</span>
            </Box>
          </Tooltip>
          <Box
            display='flex'
            alignItems='center'
            width={{ xs: '100%', md: '48%' }}
            gap={2}
            justifyContent={{ xs: 'space-between' }}
          >
            <BasicDateRangePicker dateRange={params.dateRange} setDateRange={handleSetDateRange} />
            <Box width={'20%'}>
              <Button fullWidth variant='contained' color='primary' onClick={handleSubmit}>
                Find
              </Button>
            </Box>
          </Box>
        </Box>
      </fieldset>
    </>
  );
}

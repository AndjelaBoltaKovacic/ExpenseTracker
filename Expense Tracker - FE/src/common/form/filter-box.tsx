import { Box, Slider } from '@mui/material';

export function FilterBox({ amountFrom, amountTo, handleAmountChange }: any) {
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
        <Box display='flex' alignItems='center' width='50%' gap={3}>
          <span>0</span>
          <Slider
            value={[amountFrom, amountTo]}
            onChange={handleAmountChange}
            min={0}
            max={10000}
            valueLabelDisplay='auto'
            aria-labelledby='range-slider'
          />
          <span>10000</span>
        </Box>
      </fieldset>
    </>
  );
}

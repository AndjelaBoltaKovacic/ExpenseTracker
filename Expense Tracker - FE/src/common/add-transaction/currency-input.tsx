import MoneyInput from '@rschpdr/react-money-input';
import TextField from '@mui/material/TextField';

const CurrencyInput = ({ ...props }) => (
  <MoneyInput
    width='100%'
    customInput={TextField}
    variant='outlined'
    currencyConfig={{
      locale: 'en-US',
      currencyCode: 'USD',
      currencyDisplay: 'symbol',
    }}
    {...props}
  />
);

export default CurrencyInput;

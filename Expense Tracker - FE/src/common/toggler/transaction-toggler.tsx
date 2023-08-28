import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import React from 'react';
import { _void } from '../../models/common';

function TransactionToggler({ value, onChange }: { value: boolean; onChange: _void }) {
  return (
    <ToggleButtonGroup value={value} exclusive onChange={() => onChange()} aria-label='transaction-type'>
      <ToggleButton
        value={false}
        aria-label='income'
        sx={{
          height: '40px',
          backgroundColor: 'secondary.main',
          '&:hover': {
            backgroundColor: 'secondary.main',
          },
        }}
      >
        Expenses
      </ToggleButton>
      <ToggleButton
        value={true}
        aria-label='expense'
        sx={{
          height: '40px',
          backgroundColor: 'secondary.main',
          '&:hover': {
            backgroundColor: 'secondary.main',
          },
        }}
      >
        Incomes
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

export default TransactionToggler;

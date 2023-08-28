import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import React from 'react';
import { _void } from '../../models/common';

function TransactionToggler({ value, onChange }: { value: boolean; onChange: _void }) {
  return (
    <ToggleButtonGroup value={value} exclusive onChange={() => onChange()} aria-label="transaction-type">
      <ToggleButton
        value={false}
        aria-label="income"
        sx={{
          height: '40px',
          backgroundColor: 'rgba(102, 161, 130, 0.6)',
          '&:hover': {
            backgroundColor: 'rgba(102, 161, 130, 0.3)',
          },
        }}
      >
        Expenses
      </ToggleButton>
      <ToggleButton
        value={true}
        aria-label="expense"
        sx={{
          height: '40px',
          backgroundColor: 'rgba(102, 161, 130, 0.6)',
          '&:hover': {
            backgroundColor: 'rgba(102, 161, 130, 0.3)',
          },
        }}
      >
        Incomes
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

export default TransactionToggler;

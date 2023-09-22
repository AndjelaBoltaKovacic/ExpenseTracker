import { Button } from '@mui/material';
import SmallTableCell from './small-table-cell';
import { _void } from '../../models/common';

function TableButtonCell({
  color,
  onClick,
  disabled,
  text,
}: {
  color: 'primary' | 'secondary';
  onClick: _void;
  disabled?: boolean;
  text: string;
}) {
  return (
    <SmallTableCell
      content={
        <Button variant="outlined" color={color} onClick={onClick} disabled={disabled}>
          {text}
        </Button>
      }
    />
  );
}

export default TableButtonCell;

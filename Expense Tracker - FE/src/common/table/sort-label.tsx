import { TableSortLabel, Typography } from '@mui/material';
import { _void } from '../../models/common';

function SortLabel({
  disabled,
  title,
  propertyName,
  orderBy,
  order,
  handleSort,
}: {
  disabled?: boolean;
  title: string;
  propertyName: string;
  orderBy: string;
  order: 'asc' | 'desc';
  handleSort: _void;
}) {
  return (
    <>
      {disabled ? (
        <Typography component='span' sx={{ color: 'primary.main' }}>
          {title}
        </Typography>
      ) : (
        <TableSortLabel
          active={orderBy === propertyName}
          direction={orderBy === propertyName ? order : 'asc'}
          onClick={() => handleSort(propertyName)}
        >
          <Typography component='span' sx={{ color: 'primary.main' }}>
            {title}
          </Typography>
        </TableSortLabel>
      )}
    </>
  );
}

export default SortLabel;

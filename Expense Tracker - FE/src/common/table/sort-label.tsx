import { TableSortLabel } from '@mui/material';
import { VoidFn } from '../../models/common';

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
  handleSort: VoidFn;
}) {
  return (
    <>
      {disabled ? (
        title
      ) : (
        <TableSortLabel
          active={orderBy === propertyName}
          direction={orderBy === propertyName ? order : 'asc'}
          onClick={() => handleSort(propertyName)}
        >
          {title}
        </TableSortLabel>
      )}
    </>
  );
}

export default SortLabel;

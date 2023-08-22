import { ReactNode } from 'react';
import TableCell from '@mui/material/TableCell';

function SmallTableCell({ children }: { children?: ReactNode }) {
  return <TableCell size="small">{children}</TableCell>;
}

export default SmallTableCell;

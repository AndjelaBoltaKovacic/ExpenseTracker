import { ReactNode } from 'react';
import { Typography, TableCell } from '@mui/material';

function SmallTableCell({
  children,
  width,
  color,
  content,
}: {
  children?: ReactNode;
  width?: string;
  color?: string;
  content?: string | number | ReactNode;
}) {
  return (
    <TableCell size="small" width={width}>
      <Typography component="span" color={color}>
        {content}
      </Typography>
    </TableCell>
  );
}

export default SmallTableCell;

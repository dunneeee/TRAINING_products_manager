import clsx from 'clsx';
import { TableBody } from './TableBody';
import { TableCell } from './TableCell';
import { TableHead } from './TableHead';
import { TableHeadCell } from './TableHeadCell';
import { TableRow } from './TableRow';
import { TableRowPulse } from './TableRowPulse';

type TableProps = React.HTMLAttributes<HTMLTableElement>;

const TableComponent = ({ children, className, ...props }: TableProps) => {
  return (
    <table
      className={clsx('w-full border-collapse text-left text-sm', className)}
      {...props}
    >
      {children}
    </table>
  );
};

export const Table = Object.assign(TableComponent, {
  Cell: TableCell,
  Head: TableHead,
  HeadCell: TableHeadCell,
  Row: TableRow,
  Body: TableBody,
  RowPulse: TableRowPulse,
});

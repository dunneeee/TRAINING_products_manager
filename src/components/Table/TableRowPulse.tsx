import { ComponentProps, PropsWithChildren } from 'react';
import { TableRow } from './TableRow';
import clsx from 'clsx';

type TableRowPulseProps = PropsWithChildren &
  ComponentProps<'tr'> & {
    colSpan?: number;
  };

export const TableRowPulse = ({
  colSpan,
  className,
  ...props
}: TableRowPulseProps) => {
  return (
    <TableRow {...props} className={clsx('space-y-2', className)}>
      <td className="animate-pulse rounded-md px-1 py-2" colSpan={colSpan}>
        <div className="mb-1 grid grid-cols-3 gap-4">
          <div className="col-span-2 h-2 rounded bg-slate-200"></div>
          <div className="col-span-1 h-2 rounded bg-slate-200"></div>
        </div>
        <div className="h-2 rounded bg-slate-200"></div>
      </td>
    </TableRow>
  );
};

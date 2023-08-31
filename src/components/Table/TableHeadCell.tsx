import clsx from 'clsx';
import { ComponentProps, PropsWithChildren } from 'react';

type TableHeadCellProps = ComponentProps<'th'> & PropsWithChildren;

export const TableHeadCell = ({
  className,
  children,
  ...props
}: TableHeadCellProps) => {
  return (
    <th className={clsx('px-6 py-3', className)} {...props}>
      {children}
    </th>
  );
};

import clsx from 'clsx';
import { PropsWithChildren, ComponentProps } from 'react';

type TableRow = PropsWithChildren & ComponentProps<'tr'>;

export const TableRow = ({ children, className, ...props }: TableRow) => {
  return (
    <tr className={clsx('border-lightGray', className)} {...props}>
      {children}
    </tr>
  );
};

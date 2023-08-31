import clsx from 'clsx';
import { ComponentProps, PropsWithChildren } from 'react';

type TableHead = PropsWithChildren & ComponentProps<'thead'>;

export const TableHead = ({ children, className, ...props }: TableHead) => {
  return (
    <thead
      className={clsx('text-xs uppercase text-black', className)}
      {...props}
    >
      {children}
    </thead>
  );
};

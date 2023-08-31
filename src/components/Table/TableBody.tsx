import { ComponentProps, PropsWithChildren } from 'react';

type TableBody = PropsWithChildren & ComponentProps<'tbody'>;

export const TableBody = ({ children, className, ...props }: TableBody) => {
  return (
    <tbody className={className} {...props}>
      {children}
    </tbody>
  );
};

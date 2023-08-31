import clsx from 'clsx';
import { useMemo } from 'react';

const TYPES = {
  available: 'border-green text-green',
  sold_out: 'border-red text-red',
};

type StatusProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> & {
  status?: keyof typeof TYPES;
};

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const convertCapitalized = (str: string) => {
  const words = str.split('_');
  return words.map((word) => capitalize(word)).join(' ');
};

export const Status = ({
  status = 'available',
  className,
  ...props
}: StatusProps) => {
  const statusText = useMemo(() => {
    return convertCapitalized(status);
  }, [status]);

  const commonClasses = 'rounded-md text-center text-sm border px-6';

  return (
    <div className={clsx(commonClasses, TYPES[status], className)} {...props}>
      {statusText}
    </div>
  );
};

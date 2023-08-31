import clsx from 'clsx';

type QuantityProps = React.HTMLAttributes<HTMLDivElement>;

export const Quantity = ({ className, children, ...props }: QuantityProps) => {
  return (
    <div
      className={clsx(
        'rounded-md border border-lightGray bg-white px-3 py-0.5 text-center text-black',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

import clsx from 'clsx';

type TypeProps = React.HTMLAttributes<HTMLDivElement>;

export const Type = ({ className, ...props }: TypeProps) => {
  return (
    <div
      className={clsx('text-sm font-normal leading-5 text-black', className)}
    >
      {props.children}
    </div>
  );
};

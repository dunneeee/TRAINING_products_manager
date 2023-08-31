import clsx from 'clsx';

type DropDownHeaderProps = React.HTMLAttributes<HTMLDivElement>;

export const DropDownHeader = ({
  className,
  ...props
}: DropDownHeaderProps) => {
  return (
    <div
      className={clsx('border-b border-lightGray pb-2', className)}
      {...props}
    >
      {props.children}
    </div>
  );
};

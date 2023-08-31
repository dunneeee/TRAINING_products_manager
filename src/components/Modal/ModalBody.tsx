import clsx from 'clsx';

type ModalBodyProps = React.HTMLAttributes<HTMLDivElement>;

export const ModalBody = ({ className, ...props }: ModalBodyProps) => {
  return (
    <div className={clsx('py-2', className)} {...props}>
      {props.children}
    </div>
  );
};

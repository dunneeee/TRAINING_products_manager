import clsx from 'clsx';

type ModalFooter = React.HTMLAttributes<HTMLDivElement>;

export const ModalFooter = ({ className, ...props }: ModalFooter) => {
  return (
    <div
      className={clsx('mt-2 border-t border-lightGray pt-2', className)}
      {...props}
    >
      {props.children}
    </div>
  );
};

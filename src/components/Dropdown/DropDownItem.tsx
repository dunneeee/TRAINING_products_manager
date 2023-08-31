import clsx from 'clsx';
import { useDropDownContext } from './DropDownContext';

type DropDownItemProps = React.HTMLAttributes<HTMLDivElement>;

export const DropDownItem = ({
  className,
  onClick,
  ...props
}: DropDownItemProps) => {
  const { onClose } = useDropDownContext();
  return (
    <div
      className={clsx(
        'cursor-pointer px-4 py-2 text-sm font-semibold hover:bg-gray-100',
        className
      )}
      {...props}
      onClick={(e) => {
        onClose && onClose();
        onClick && onClick(e);
      }}
    >
      {props.children}
    </div>
  );
};

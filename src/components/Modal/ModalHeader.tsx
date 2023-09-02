import clsx from 'clsx';

import { Icons } from '@/constants';
import { useModalContext } from './ModalContext';

type ModalHeaderProps = React.HTMLAttributes<HTMLDivElement> & {
  divider?: boolean;
};

export const ModalHeader = ({
  className,
  divider = true,
  ...props
}: ModalHeaderProps) => {
  const { onClose } = useModalContext();

  return (
    <div
      className={clsx(
        className,
        ' flex flex-wrap pb-2',
        ((props.children && divider) || divider) &&
          'mb-2 border-b border-lightGray'
      )}
      {...props}
    >
      {props.children}
      <button className="ml-auto" onClick={onClose}>
        <Icons.Close />
      </button>
    </div>
  );
};

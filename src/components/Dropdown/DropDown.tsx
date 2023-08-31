import { useRef, useState } from 'react';
import { DropDownContext } from './DropDownContext';
import { Button, ButtonProps } from '..';
import clsx from 'clsx';
import { DropDownItem } from './DropDownItem';
import { DropDownHeader } from './DropDownHeader';
import { useClickOutside } from '@/hooks';

const POSITIONS = {
  top: 'bottom-full left-0 mb-1',
  bottom: 'top-full left-0 mt-1',
  left: 'right-0 top-0 mr-1',
  right: 'left-full top-0 ml-1',
  rightCenter: 'left-1/2 top-full mt-1',
  leftCenter: 'right-1/2 top-full mt-1',
};

type DropDownProps = React.HTMLAttributes<HTMLDivElement> & {
  label?: React.ReactNode;
  variant?: ButtonProps['variant'];
  position?: keyof typeof POSITIONS;
  buttonClasses?: string;
};

const DropDownComponent = ({
  className,
  children,
  label,
  variant = 'primary',
  position = 'bottom',
  buttonClasses = '',
  ...props
}: DropDownProps) => {
  const [active, setActive] = useState(false);

  const onClose = () => {
    setActive(false);
  };

  const onOpen = () => {
    setActive(true);
  };

  const dropListRef = useRef<HTMLDivElement>(null);
  useClickOutside(dropListRef, onClose);

  return (
    <DropDownContext.Provider
      value={{
        active,
        onClose,
      }}
    >
      <div className={clsx('relative inline-block', className)} {...props}>
        <Button
          variant={variant}
          className={clsx('block w-full', buttonClasses)}
          onClick={onOpen}
        >
          {label}
        </Button>
        <div
          ref={dropListRef}
          className={clsx(
            'z[-1] invisible absolute w-fit rounded-md border border-lightGray bg-white py-2 opacity-0 shadow transition duration-200',
            active && '!visible !z-[10] !opacity-100',
            POSITIONS[position]
          )}
        >
          {children}
        </div>
      </div>
    </DropDownContext.Provider>
  );
};

export const Divider = () => {
  return <div className="my-2 border-t border-lightGray" />;
};

export const DropDown = Object.assign(DropDownComponent, {
  Item: DropDownItem,
  Header: DropDownHeader,
  Divider,
});

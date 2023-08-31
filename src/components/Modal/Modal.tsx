import clsx from 'clsx';
import { ModalContext } from './ModalContext';
import { ModalHeader } from './ModalHeader';
import { ModalBody } from './ModalBody';
import { ModalFooter } from './ModalFooter';

const SIZES = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
  '5xl': 'max-w-5xl',
  '6xl': 'max-w-6xl',
  '7xl': 'max-w-7xl',
};

type ModalProps = React.HtmlHTMLAttributes<HTMLDivElement> & {
  show?: boolean;
  onClose?: () => void;
  className?: string;
  size?: keyof typeof SIZES;
};

export const ModalComponent = ({
  show = false,
  className = '',
  onClose,
  size = 'md',
  ...props
}: ModalProps) => {
  if (!show) return null;

  return (
    <ModalContext.Provider
      value={{
        isOpen: show,
        onClose: onClose,
      }}
    >
      <div
        aria-label="overlay"
        className="fixed right-0 top-0 z-[9999] flex h-full w-full items-center justify-center bg-black/50"
      >
        <div
          aria-label="main"
          className={clsx(
            'w-full rounded-md bg-white p-4',
            SIZES[size],
            className
          )}
          {...props}
        >
          {props.children}
        </div>
      </div>
    </ModalContext.Provider>
  );
};

export const Modal = Object.assign(ModalComponent, {
  Header: ModalHeader,
  Body: ModalBody,
  Footer: ModalFooter,
});

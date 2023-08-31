import clsx from 'clsx';
import { Spinner } from './Spinner';

const VARIANTS = {
  primary: 'bg-green text-white border border-green',
  outline: 'border border-lightGray text-black bg-white',
  reverse: 'text-green bg-white border border-green',
  ghost: 'text-black bg-transparent border border-transparent !p-0',
  danger: 'bg-red text-white border border-red',
};

const SIZES = {
  sm: 'py-1 px-2 text-sm',
  md: 'py-2 px-4 text-md',
  lg: 'py-3 px-6 text-lg',
};

export type ButtonProps = {
  variant?: keyof typeof VARIANTS;
  size?: keyof typeof SIZES;
  disabled?: boolean;
  loading?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  className = '',
  children,
  ...buttonProps
}: ButtonProps) => {
  const commonClasses = 'outline-none relative rounded-md';
  const spinnerVariant = variant === 'ghost' ? 'primary' : variant;
  return (
    <button
      className={clsx(
        commonClasses,
        VARIANTS[variant],
        SIZES[size],
        disabled && 'cursor-not-allowed opacity-50',
        !disabled &&
          variant !== 'ghost' &&
          'flex items-center justify-center transition duration-200 hover:border-green hover:opacity-80',
        className
      )}
      {...buttonProps}
    >
      {loading ? (
        <div className="flex w-full items-center justify-center">
          <Spinner size={size} variant={spinnerVariant} />
        </div>
      ) : (
        children
      )}
    </button>
  );
};

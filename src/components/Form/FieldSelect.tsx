import clsx from 'clsx';
import { FieldWrapper, FieldWrapperPassThroughProps } from '.';

type FieldSelectProps = FieldWrapperPassThroughProps &
  React.SelectHTMLAttributes<HTMLSelectElement>;

export const FieldSelect = ({
  label,
  error,
  children,
  className,
  ...selectProps
}: FieldSelectProps) => {
  return (
    <FieldWrapper label={label} error={error}>
      <select
        className={clsx(
          'w-full rounded-md border border-lightGray px-3 py-2 font-medium outline-none transition duration-200 focus:border-green',
          className
        )}
        {...selectProps}
      >
        {children}
      </select>
    </FieldWrapper>
  );
};

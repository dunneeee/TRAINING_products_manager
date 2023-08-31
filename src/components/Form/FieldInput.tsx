import clsx from 'clsx';
import { FieldWrapper, FieldWrapperPassThroughProps } from './FieldWrapper';

export type FieldInputProps = FieldWrapperPassThroughProps &
  React.InputHTMLAttributes<HTMLInputElement>;

export const FieldInput = ({
  label,
  error,
  ...inputProps
}: FieldInputProps) => {
  return (
    <FieldWrapper label={label} error={error}>
      <input
        className={clsx(
          'w-full rounded-md border border-lightGray px-3 py-2 font-medium outline-none transition duration-200 focus:border-green focus:text-black',
          error && 'border-red text-red'
        )}
        {...inputProps}
      />
    </FieldWrapper>
  );
};

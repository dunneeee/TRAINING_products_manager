import clsx from 'clsx';

export type FieldWrapperProps = {
  children: React.ReactNode;
  error?: string | null;
  label?: string;
  className?: string;
};

export type FieldWrapperPassThroughProps = Omit<
  FieldWrapperProps,
  'children' | 'className'
>;

export const FieldWrapper = ({
  children,
  error,
  label,
  className,
}: FieldWrapperProps) => {
  return (
    <div>
      <label className={clsx('block text-sm font-semibold', className)}>
        <span className="mb-1 block">{label}</span>
        {children}
      </label>
      {error && <div className="text-sm text-red">{error}</div>}
    </div>
  );
};

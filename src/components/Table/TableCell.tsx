import clsx from 'clsx';

type TableCell = React.HTMLAttributes<HTMLTableCellElement> & {
  truncate?: boolean;
};

export const TableCell = ({ className, truncate, ...props }: TableCell) => {
  return (
    <td
      className={clsx(
        'max-w-xs text-ellipsis px-6 py-3',
        truncate && 'truncate',
        className
      )}
      {...props}
    >
      {props.children}
    </td>
  );
};

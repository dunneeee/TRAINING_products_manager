import clsx from 'clsx';

type TableCell = React.HTMLAttributes<HTMLTableCellElement>;

export const TableCell = ({ className, ...props }: TableCell) => {
  return (
    <td className={clsx('whitespace-nowrap px-6 py-3', className)} {...props}>
      {props.children}
    </td>
  );
};

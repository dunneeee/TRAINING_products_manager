import clsx from 'clsx';

type PriceProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> & {
  price: number;
};

const converMoneyToUSD = (money: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(money);

export const Price = ({ className, price, ...props }: PriceProps) => {
  return (
    <div className={clsx('text-sm leading-5 text-black', className)} {...props}>
      {converMoneyToUSD(price)}
    </div>
  );
};

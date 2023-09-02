import { Type } from './Type';
import { Price } from './Price';
import { AvatarText } from '..';
import { Status } from './Status';
import { Quantity } from './Quantity';

type ProductProps = React.HTMLAttributes<HTMLDivElement> & {
  image: string;
  name: string;
  href?: string;
};

const ProductComponent = ({ image, name, ...props }: ProductProps) => {
  return <AvatarText src={image} shape="square" text={name} {...props} />;
};

export const Product = Object.assign(ProductComponent, {
  Price: Price,
  Quantity: Quantity,
  Status: Status,
  Type: Type,
});

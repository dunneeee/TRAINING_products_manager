import { AvatarText } from '..';
import { Price } from './Price';
import { Quantity } from './Quantity';
import { Status } from './Status';
import { Type } from './Type';

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

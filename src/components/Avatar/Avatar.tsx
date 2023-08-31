import clsx from 'clsx';
import { PropsWithChildren, ComponentProps } from 'react';

const SIZES = {
  xs: 'w-6 h-6',
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-20 h-20',
  xl: 'w-36 h-36',
};

const SHAPES = {
  circle: 'rounded-full',
  square: 'rounded',
  unset: '',
};

type AvatarThroughProps = PropsWithChildren &
  ComponentProps<'img'> & {
    size?: keyof typeof SIZES;
    shape?: keyof typeof SHAPES;
    hidden?: boolean;
  };

export type AvatarProps = {
  size?: keyof typeof SIZES;
  shape?: keyof typeof SHAPES;
  hidden?: boolean;
};

export const Avatar = ({
  className,
  size = 'md',
  shape = 'circle',
  hidden,
  ...props
}: AvatarThroughProps) => {
  return (
    <img
      className={clsx(
        SIZES[size],
        SHAPES[shape],
        className,
        'object-cover',
        hidden && 'invisible'
      )}
      {...props}
    />
  );
};

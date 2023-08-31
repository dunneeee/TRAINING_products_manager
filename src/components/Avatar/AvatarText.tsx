import clsx from 'clsx';
import { Avatar, AvatarProps } from '.';
import { Link } from 'react-router-dom';

type AvatarTextProps = React.HTMLAttributes<HTMLDivElement> &
  AvatarProps & {
    text: string;
    src: string;
    alt?: string;
    href?: string;
  };

export const AvatarText = ({
  className,
  text,
  src,
  alt,
  size,
  shape,
  href,
  ...props
}: AvatarTextProps) => {
  return (
    <div className={clsx('flex items-center', className)} {...props}>
      <Avatar size={size} shape={shape} src={src} alt={alt} />
      <div className="ml-2 text-ellipsis text-sm font-normal leading-5 text-black">
        {href ? <Link to={href}>{text}</Link> : text}
      </div>
    </div>
  );
};

import { AvatarText } from '.';

type UserProps = React.HTMLAttributes<HTMLDivElement> & {
  name: string;
  src: string;
};

export const User = ({ name, src, ...props }: UserProps) => {
  return <AvatarText size="sm" text={name} src={src} {...props} />;
};

import { Button, ButtonProps, MantineRadius } from '@mantine/core';

type CommonButtonProps = Omit<ButtonProps, 'radius'> &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    r?: MantineRadius;
  };

export const CommonButton = ({ r = 'md', ...props }: CommonButtonProps) => {
  return <Button radius={r} {...props} />;
};

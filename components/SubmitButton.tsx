'use client';

import { Button, ButtonProps } from '@nextui-org/react';
import { FC } from 'react';
import { useFormStatus } from 'react-dom';

const SubmitButton: FC<{ label: string } & ButtonProps> = ({
  label,
  ...btnProps
}) => {
  const { pending } = useFormStatus();

  return (
    <Button {...btnProps} type="submit" isLoading={pending}>
      {label}
    </Button>
  );
};

export default SubmitButton;

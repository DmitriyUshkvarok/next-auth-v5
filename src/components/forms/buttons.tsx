'use client';
import { ReloadIcon } from '@radix-ui/react-icons';
import { Button } from '../ui/button';

type btnSize = 'default' | 'lg' | 'sm';

type SubmitButtonProps = {
  className?: string;
  text?: string;
  size?: btnSize;
  isLoading?: boolean;
};

export function SubmitButton({
  className = '',
  text = 'submit',
  size = 'lg',
  isLoading = false,
}: SubmitButtonProps) {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      className={`capitalize ${className} `}
      size={size}
    >
      {isLoading ? (
        <>
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          Pleas wait...
        </>
      ) : (
        text
      )}
    </Button>
  );
}

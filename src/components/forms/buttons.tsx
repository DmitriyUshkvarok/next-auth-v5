'use client';
import { ReloadIcon } from '@radix-ui/react-icons';
import { Button } from '../ui/button';
import { FcGoogle } from 'react-icons/fc';
import { signIn } from 'next-auth/react';

type btnSize = 'default' | 'lg' | 'sm';

type SubmitButtonProps = {
  className?: string;
  text?: string;
  size?: btnSize;
  isLoading?: boolean;
  isDisabled?: boolean;
};

export function SubmitButton({
  className = '',
  text = 'submit',
  size = 'lg',
  isLoading = false,
  isDisabled = false,
}: SubmitButtonProps) {
  return (
    <Button
      type="submit"
      disabled={isLoading || isDisabled}
      className={`capitalize ${className}`}
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

export default function SignInProviderButton({
  className = '',
}: SubmitButtonProps) {
  return (
    <form
      action={() => {
        signIn('google');
      }}
    >
      <Button
        type="submit"
        size="lg"
        className={`capitalize mt-2 w-full ${className}`}
      >
        <FcGoogle size={20} />
        <span> to continue with google</span>
      </Button>
    </form>
  );
}

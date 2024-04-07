'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '../api/action';

export default function Page() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <form action={dispatch}>
      <h1 className="mb-3 text-2xl">Please log in to continue.</h1>
      <LoginButton />
      <div
        className="flex h-8 items-end space-x-1"
        aria-live="polite"
        aria-atomic="true"
      >
        {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
      </div>
    </form>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button className="mt-4 w-full" aria-disabled={pending}>
      Log in
    </button>
  );
}

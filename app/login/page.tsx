'use client';

import { useFormStatus } from 'react-dom';

export default function Page() {
  return (
    <>
      <h1 className="mb-3 text-2xl">Please log in to continue.</h1>
      <LoginButton />
      <div
        className="flex h-8 items-end space-x-1"
        aria-live="polite"
        aria-atomic="true"
      ></div>
    </>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <a href="/api/auth/login" className="mt-4 w-full" aria-disabled={pending}>
      Log in
    </a>
  );
}

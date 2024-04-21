'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { ExecuteResponse } from './response';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('Github');
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

const RUST_PLAYGROUND_BASE_URL = 'https://play.rust-lang.org';
export async function evaluate(code: string): Promise<ExecuteResponse> {
  const res = await fetch(`${RUST_PLAYGROUND_BASE_URL}/evaluate.json`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      version: 'stable',
      optimize: '0',
      code: code,
      edition: '2021',
    }),
  });

  return res.json();
}

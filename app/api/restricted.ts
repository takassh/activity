import { auth } from '@/auth';

export async function checkRestricted() {
  const session = await auth();
  if (session) {
    return 'This is protected content. You can access this content because you are signed in.';
  } else {
    return 'You must be signed in to view the protected content on this page.';
  }
}

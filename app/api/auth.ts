import { auth } from '@/auth';

export async function isLoggedInAdmin() {
  const session = await auth();
  const isLoggedInAdmin =
    !!session?.user && session.user.email == 'takassh23@gmail.com';
  return isLoggedInAdmin;
}

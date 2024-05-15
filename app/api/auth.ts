import { getSession } from '@auth0/nextjs-auth0';

export async function isLoggedInAdmin() {
  const session = await getSession();
  const isLoggedInAdmin =
    !!session?.user && session.user.email == process.env.ADMIN_EMAIL;
  return isLoggedInAdmin;
}

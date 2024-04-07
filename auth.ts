import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import { authConfig } from './auth.config';

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [GitHub],
});

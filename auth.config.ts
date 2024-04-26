import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  session: { strategy: 'jwt' },
  callbacks: {
    authorized: async ({ auth, request: { nextUrl } }) => {
      const isAuthenticated = !!auth?.user;

      return isAuthenticated;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;

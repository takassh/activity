import { NextResponse } from 'next/server';
import { auth } from './auth';

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$|.*\\.jpg$).*)'],
};

export default auth((request) => {
  let { nextUrl } = request;

  const isLoggedIn = !!request.auth?.user;

  // login access when already logged in
  if (isLoggedIn && nextUrl.pathname == '/login') {
    return NextResponse.redirect(new URL('/', nextUrl));
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-url', request.url);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
});

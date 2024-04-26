import { NextResponse } from 'next/server';
import { auth } from './auth';
import { PUBLIC_ROUTES } from './routes';

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$|.*\\.jpg$).*)'],
};

export default auth((request) => {
  let { nextUrl } = request;

  const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);
  const isLoggedIn =
    !!request.auth?.user && request.auth.user.email == 'takassh23@gmail.com';

  // private access without login
  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL('/login', nextUrl));
  }

  // login access when already logged in
  if (isLoggedIn && nextUrl.pathname == '/login') {
    return NextResponse.redirect(new URL('/dashboard', nextUrl));
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-url', request.url);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
});

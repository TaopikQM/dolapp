import { NextResponse } from 'next/server';

export function middleware(req) {
  const url = req.nextUrl.clone();
  const user = JSON.parse(localStorage.getItem('user'));
  const lastActivity = localStorage.getItem('lastActivity');
  const currentTime = Date.now();

  if (lastActivity && currentTime - lastActivity > 30 * 60 * 1000) {
    localStorage.removeItem('user');
    localStorage.removeItem('lastActivity');
  }

  if (!user && !url.pathname.startsWith('/auth')) {
    url.pathname = '/auth/login';
    return NextResponse.redirect(url);
  }

  if (user) {
    localStorage.setItem('lastActivity', Date.now());
  }

  return NextResponse.next();
}

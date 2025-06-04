import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { COMMON_ROUTES, AUTH_ROUTES , USER_ROUTES, SALESMAN_ROUTES, ADMIN_ROUTES } from "@/lib/constants/routes";

// Danh sách các route có thể truy cập mà không cần token
const publicRoutes = [
  ...Object.values(COMMON_ROUTES),
  ...Object.values(AUTH_ROUTES),
  USER_ROUTES.login,
  USER_ROUTES.register,
  SALESMAN_ROUTES.login,
  SALESMAN_ROUTES.register,
  ADMIN_ROUTES.login,
];

export function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value;
  const { pathname } = request.nextUrl;

  // Nếu đang ở trang login và đã đăng nhập, chuyển hướng về trang chủ
  if (pathname === '/login' && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Kiểm tra xem route hiện tại có nằm trong danh sách public routes không
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

  // Nếu không phải public route và chưa đăng nhập, chuyển hướng về trang login
  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}; 
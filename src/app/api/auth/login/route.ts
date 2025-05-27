import { NextResponse } from 'next/server';
import { LoginFormData } from '@/types/auth';

export async function POST(request: Request) {
  try {
    const body: LoginFormData = await request.json();
    
    // TODO: Thay thế bằng logic xác thực thực tế
    if (body.email === 'admin@example.com' && body.password === 'password') {
      const token = 'dummy-token';
      const user = {
        id: '1',
        email: body.email,
        name: 'Admin User'
      };

      const response = NextResponse.json({ user });
      
      // Set cookie
      response.cookies.set('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7 // 1 week
      });

      return response;
    }

    return NextResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 
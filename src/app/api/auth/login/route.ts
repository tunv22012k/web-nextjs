import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import { getMessages } from "@/lib/messages";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;
    const messages = getMessages();

    // Call Laravel API
    const response = await fetch(API_ENDPOINTS.auth.login, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // Create Next.js response
      const nextResponse = NextResponse.json(
        { message: messages.auth.login.success },
        { status: 200 }
      );

      // Set Laravel auth token from response
      if (data.token) {
        nextResponse.cookies.set("auth-token", data.token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 60 * 60 * 24 * 7, // 1 week
        });
      }

      return nextResponse;
    }

    // Return Laravel error message
    return NextResponse.json(
      { 
        message: data.message || messages.auth.login.error,
        status: messages.http.status[response.status as keyof typeof messages.http.status] || messages.common.error
      },
      { status: response.status }
    );
  } catch {
    const messages = getMessages();
    return NextResponse.json(
      { 
        message: messages.auth.login.server_error,
        status: messages.http.status[500]
      },
      { status: 500 }
    );
  }
} 
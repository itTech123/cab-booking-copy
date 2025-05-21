import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refreshToken')?.value;
    const redirectTo = req.nextUrl.searchParams.get('redirect') || '/';

    if (!refreshToken) {
      return NextResponse.redirect(new URL('/signup', req.url));
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_baseURL}/api/user/refreshAccessToken`, {
      method: 'GET',
      headers: {
        Cookie: `refreshToken=${refreshToken}`,
      },
    });

    const data = await response.json();
    const newAccessToken = data.accessToken;

    if (!newAccessToken) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    const res = NextResponse.redirect(new URL(redirectTo, req.url));

    
    const domain = process.env.NODE_ENV === 'production' ? 'txigo.com' : 'localhost';

    res.cookies.set('accessToken', newAccessToken, {
      httpOnly: true,
      secure: true, 
      sameSite: 'none',  
      maxAge: 15 * 60 * 1000,
      domain: domain, 
    });

    return res;
  } catch (err) {
    console.error("Error refreshing access token:", err);
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

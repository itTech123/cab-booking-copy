// app/api/verifyOtp/route.ts
import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(request: Request) {
  try {
    const { otp: userOtp } = await request.json()
    const cookieStore = await cookies()
    const storedOtp = cookieStore.get("otp")?.value

    if (!storedOtp) {
      return NextResponse.json(
        { message: "OTP not found or expired" },
        { status: 401 }
      )
    }

    if (storedOtp === userOtp) {
      // Set "verified" cookie for 30 days
      const response = NextResponse.json(
        { message: "OTP verified" },
        { status: 200 }
      )
      
      response.cookies.set({
        name: "verified",
        value: "true",
        secure: true,
        maxAge: 60 * 60 * 24 * 365 ,
        path: "/",
      })

      return response
    }

    return NextResponse.json(
      { message: "Invalid OTP" },
      { status: 401 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}
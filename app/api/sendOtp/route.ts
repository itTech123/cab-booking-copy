import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(req: Request) {
    const body = await req.json()
    const { phone } = body

    if (!phone) {
        return NextResponse.json(
            { message: "Phone number is required" },
            { status: 400 }
        )
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    const smsMessage = `${otp} is the OTP to validate your phone number with the BroomBoom Cabs App. Please do not share the OTP with anyone. BroomBoom Cabs Thanks.`

    const url = `${process.env.SMS_API_BASE_URL}?user=${process.env.SMS_API_USER}&password=${process.env.SMS_API_PASSWORD}&senderid=${process.env.SMS_API_SENDER_ID}&mobiles=+91${phone}&tempid=${process.env.SMS_API_TEMPLATE_ID}&sms=${encodeURIComponent(smsMessage)}`;

    try {
        // Send OTP via NeoDove
        const response = await fetch(url)
        const result = await response.text()

        // Correct way to set cookies
        const cookieStore = await cookies()
        cookieStore.set({
            name: "otp",
            value: otp,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 600, // 10 minutes in seconds
            path: "/",
        })

        return NextResponse.json({ message: "OTP sent successfully" })
    } catch (error) {
        console.error("OTP Send Error", error)
        return NextResponse.json(
            { message: "Failed to send OTP" },
            { status: 500 }
        )
    }
}
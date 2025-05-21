'use client'

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function SignupPage() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" })
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const router = useRouter()
  const searchParams = useSearchParams()


  const [redirect, setRedirect] = useState("/")

  useEffect(() => {
    const savedRedirect = localStorage.getItem("redirectPath")
    if (savedRedirect) {
      const redirectData = JSON.parse(savedRedirect)
      const currentTime = new Date().getTime()

      // Check if the saved redirect has expired
      if (currentTime <= redirectData.expiresAt) {
        setRedirect(redirectData.path)
      } else {
        localStorage.removeItem("redirectPath")
      }
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleGoToOtpPage = async () => {
    const { name, email, phone } = formData

    if (!name || !email || !phone) {
      setMessage("Please fill all the fields")
      return
    }

    setLoading(true)
    setMessage("")

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_baseURL}/api/otp/get-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to send OTP")
      }

      const params = new URLSearchParams({ name, email, phone, redirect })
      router.push(`/verify-otp?${params.toString()}`)
    } catch (err: any) {
      setMessage(err.message || "Error sending OTP")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/banner.jpg')" }}>
      <Card className="w-full max-w-md bg-white/90 backdrop-blur-md shadow-xl rounded-xl p-6">
        <CardContent className="space-y-4">
          <h2 className="text-2xl font-bold text-center text-blue-900">Create Account</h2>
          <Input name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} />
          <Input name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />
          <Input name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} />

          <Button
            type="button"
            onClick={handleGoToOtpPage}
            className="w-full"
            disabled={loading}
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </Button>

          {message && <p className="text-center text-sm text-red-600">{message}</p>}
        </CardContent>
      </Card>
    </div>
  )
}

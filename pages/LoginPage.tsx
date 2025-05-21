'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"


export default function LoginPage() {
    const router = useRouter()
    const [formData, setFormData] = useState({ name: "", email: "", phone: "" })
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async () => {
        setLoading(true)
        setMessage("")

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_baseURL}/api/user/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...formData, verified: true }),
            })

            const result = await response.json()


            if (response.ok) {
                setMessage("Login successful! Redirecting...")

                // Get redirect path from cookie or fallback to "/"
                const redirectPath = localStorage.getItem("redirectPath")


                localStorage.removeItem("redirectPath")

                const decoded = decodeURIComponent(redirectPath || "")

                // Step 2: Parse the JSON
                const parsed = JSON.parse(decoded)

                // Step 3: Get the path
                const path = parsed.path

                // Redirect
                router.push(path || "/")
            } else {
                setMessage(result.message || "Something went wrong.")
            }
        } catch (error) {
            setMessage("An error occurred. Please try again.")
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
                    <Input type="number" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />
                    <Input name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} />

                    <Button
                        type="button"
                        className="w-full"
                        disabled={loading}
                        onClick={handleSubmit}
                    >
                        {loading ? "Loading..." : "Continue"}
                    </Button>

                   
                </CardContent>
            </Card>
        </div>
    )
}

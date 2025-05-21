'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

export default function TravelAgentPage() {
  const [loginOpen, setLoginOpen] = useState(false)
  const [registerOpen, setRegisterOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter();

  const switchToRegister = () => {
    setLoginOpen(false)
    setRegisterOpen(true)
  }

  const handleLogin = async (formData: FormData) => {
    const email = formData.get("email")?.toString().trim() || "";
    const password = formData.get("password")?.toString() || "";

    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_baseURL}/api/travelAgent/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
      
        router.push('/travel-agent/thank-you');
      } else {
        const errorData = await res.json();
        toast.error(errorData.message || "Login failed. Please check your credentials.");
      }
    } catch (err) {
      console.error("Error during login:", err);
      toast.error("Something went wrong during login.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (formData: FormData) => {
    const first_name = formData.get("first_name")?.toString().trim() || "";
    const last_name = formData.get("last_name")?.toString().trim() || "";
    const email = formData.get("email")?.toString().trim() || "";
    const phone = formData.get("phone")?.toString().trim() || "";
    const company_name = formData.get("company_name")?.toString().trim() || "";
    const company_city = formData.get("company_city")?.toString().trim() || "";
    const password = formData.get("password")?.toString() || "";
    const confirmPassword = formData.get("confirmPassword")?.toString() || "";

    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_baseURL}/api/travelAgent/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name,
          last_name,
          email,
          password,
          confirmPassword,
          phone,
          company_city,
          company_name,
        }),
      });

      if (res.ok) {
        router.push('/travel-agent/thank-you')
      } else {
        const errorData = await res.json();
        console.error("Failed to submit:", errorData);
        toast.error(errorData.message || "Failed to register.");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      toast.error("Something went wrong while submitting the form.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen">
      {/* Image Section */}
      <div
        className="w-full h-[60vh] bg-cover bg-center"
        style={{ backgroundImage: "url('/travelAgent.png')" }}
      ></div>

      {/* Buttons */}
      <div className="flex gap-4 mt-6">
        <Button onClick={() => setLoginOpen(true)}>Login</Button>
        <Button onClick={() => setRegisterOpen(true)}>Register</Button>
      </div>

      {/* Login Modal */}
      <Dialog open={loginOpen} onOpenChange={setLoginOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Login</DialogTitle>
          </DialogHeader>
          <form className="grid gap-4 py-4" action={handleLogin}>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="Enter your email" required />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" placeholder="Enter your password" required />
            </div>
            <Button type="submit" className="mt-2 w-full" disabled={isLoading}>
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </div>
              ) : "Login"}
            </Button>
            <p className="text-sm text-center mt-2">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={switchToRegister}
                className="text-blue-600 underline hover:text-blue-800"
              >
                Register
              </button>
            </p>
          </form>
        </DialogContent>
      </Dialog>

      {/* Register Modal */}
      <Dialog open={registerOpen} onOpenChange={setRegisterOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Register</DialogTitle>
          </DialogHeader>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4" action={handleRegister}>
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" name="first_name" placeholder="Please enter first name" required />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" name="last_name" placeholder="Last Name" required />
            </div>
            <div>
              <Label htmlFor="emailId">Email Id</Label>
              <Input id="emailId" name="email" type="email" placeholder="Email" required />
            </div>
            <div>
              <Label htmlFor="phone">Mobile Phone</Label>
              <div className="flex gap-2">
                <span className="px-3 py-2 border border-input rounded-md">+91</span>
                <Input id="phone" name="phone" type="tel" placeholder="Phone number" required />
              </div>
            </div>
            <div>
              <Label htmlFor="companyName">Company Name</Label>
              <Input id="companyName" name="company_name"  placeholder="Company Name" required />
            </div>
            <div>
              <Label htmlFor="companyCity">Company City</Label>
              <Input id="companyCity" name="company_city" placeholder="e.g. Bangalore" required />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" placeholder="Password" required />
            </div>
            <div>
              <Label htmlFor="confirmPassword">Re-enter Password</Label>
              <Input id="confirmPassword" name="confirmPassword" type="password" placeholder="Confirm Password" required />
            </div>
            <div className="col-span-full">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Registering...
                  </div>
                ) : "Register"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
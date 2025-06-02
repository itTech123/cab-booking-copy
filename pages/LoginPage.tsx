"use client"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function LoginPage() {
    const [step, setStep] = useState<"enter" | "verify">("enter")
    const [formData, setFormData] = useState({ name: "", email: "", phone: "", otp: "" })
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)
    const [redirectPath, setRedirectPath] = useState("/") // Default to home

    const handleCreateSearch = async () => {
        try {
            const searchPathData = JSON.parse(localStorage.getItem('searchPath') || '{}');
            
            if (!searchPathData.path) {
                console.log('No search path data found');
                return;
            }

            const url = new URL(`http://dummy.com${searchPathData.path}`);
            const params = new URLSearchParams(url.search);

            // Extract all parameters from the URL
            const fromCity = params.get('fromCity');
            const toCity = params.get('toCity');
            const dateParam = params.get('date');
            const timeParam = params.get('time');
            const packageParam = params.get('packageItem') || "";
            const returnDate = params.get('returnDate') || "";

            const pathParts = url.pathname.split('/').filter(Boolean);
            const bookingType = pathParts[0] || 'one-way';
            const rawData = {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                pickup: fromCity,
                drop: toCity,
                bookingType: bookingType,
                pickupDate: dateParam,
                returnDate: returnDate,
                pickupTime: timeParam,
                package: packageParam,
            };

            // Filter out empty or undefined values
            const filteredData = Object.fromEntries(
                Object.entries(rawData).filter(([_, value]) =>
                    value !== undefined && value !== null && value !== ''
                )
            );

            const response = await fetch(`${process.env.NEXT_PUBLIC_baseURL}/api/search/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(filteredData),
            });

            if (!response.ok) {
                throw new Error('Failed to save search');
            }

            console.log('Search saved successfully');
        } catch (error) {
            console.error('Error creating search:', error);
        }
    };

   const handleCreatePromotionalEmail = async () => {
    try {
        const searchPathData = JSON.parse(localStorage.getItem('searchPath') || '{}');

        if (!searchPathData.path) {
            console.log('No search path data found');
            return;
        }

        const url = new URL(`http://dummy.com${searchPathData.path}`);
        const params = new URLSearchParams(url.search);

        const fromCity = params.get('fromCity');
        const toCity = params.get('toCity');
        const dateParam = params.get('date');
        const timeParam = params.get('time');
        const packageParam = params.get('packageItem');

        const pathParts = url.pathname.split('/').filter(Boolean);
        const bookingType = pathParts[0] || 'one-way';

        const pickupDate = dateParam ? new Date(dateParam) : null;
        const formattedDate = pickupDate ? pickupDate.toISOString().split('T')[0] : null;

        // Construct raw data with optional 'drop'
        const rawData = {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            pickup: fromCity,
            bookingType: bookingType,
            pickupDate: formattedDate,
            pickupTime: timeParam,
            redirectPath: searchPathData.path,
            ...(toCity && { drop: toCity }) // Include 'drop' only if toCity exists
        };

        // Filter out undefined, null, and empty string values
        const filteredData = Object.fromEntries(
            Object.entries(rawData).filter(([_, value]) =>
                value !== undefined && value !== null && value !== ''
            )
        );

        // Adjusted required fields: drop is not required anymore
        const requiredFields = ['name', 'email', 'phone', 'pickup', 'bookingType', 'redirectPath'];
        const missingFields = requiredFields.filter(key => !filteredData[key]);

        if (missingFields.length > 0) {
            console.error("Missing required fields:", missingFields);
            return;
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_baseURL}/api/promotional/promotional-emails`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(filteredData),
        });

        if (!response.ok) {
            throw new Error('Failed to save promotional email');
        }

        const responseData = await response.json();

        localStorage.setItem('promoEmailId', responseData._id || responseData.id);

        console.log('Promotional email saved successfully');
    } catch (error) {
        console.error('Error creating promotional email:', error);
    }
};


    // Check for redirectPath in localStorage on component mount
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem('redirectPath')
            if (stored) {
                try {
                    const parsed = JSON.parse(stored)
                    if (parsed?.path) {
                        setRedirectPath(parsed.path)
                    }
                } catch (err) {
                    console.error("Invalid redirectPath format in localStorage", err)
                }
            }
        }
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const sendOtp = async () => {
        setLoading(true)
        setMessage("")
        try {
            const res = await fetch("/api/sendOtp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phone: formData.phone }),
            })

            const data = await res.json()
            if (res.ok) {
                setMessage("OTP sent to your phone")
                setStep("verify")
            } else {
                setMessage(data.message)
            }
        } catch {
            setMessage("Error sending OTP")
        } finally {
            setLoading(false)
        }
    }

    const verifyOtp = async () => {
        setLoading(true);
        setMessage("");
        try {
            const res = await fetch("/api/verifyOtp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ otp: formData.otp }),
            });

            const data = await res.json();
            if (res.ok) {
                setMessage("OTP verified! Logging in...");

                // Continue login after verification
                const loginRes = await fetch(`${process.env.NEXT_PUBLIC_baseURL}/api/user/login`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ ...formData, verified: true }),
                });

                const loginData = await loginRes.json();

                if (loginRes.ok) {
                    // Save user details as one object to localStorage
                    if (typeof window !== "undefined") {
                        const userData = {
                            name: formData.name,
                            email: formData.email,
                            phone: formData.phone,
                        };

                        localStorage.setItem("userDetails", JSON.stringify(userData));

                        // Call the two functions after successful login
                       
                            handleCreateSearch(),
                            handleCreatePromotionalEmail()
                      

                        // Clear the redirectPath after using it
                        localStorage.removeItem("redirectPath");

                        // Redirect to the stored path or home
                        window.location.href = redirectPath;
                    }
                } else {
                    setMessage(loginData.message || "Login failed after verification.");
                }
            } else {
                setMessage(data.message);
            }
        } catch {
            setMessage("Verification error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/banner.jpg')" }}>
            <Card className="w-full max-w-md bg-white/90 backdrop-blur-md shadow-xl rounded-xl p-6">
                <CardContent className="space-y-4">
                    <h2 className="text-2xl font-bold text-center text-blue-900">Login with OTP</h2>
                    {step === "enter" ? (
                        <>
                            <Input name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} />
                            <Input type="number" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />
                            <Input name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} />

                            <Button className="w-full" onClick={sendOtp} disabled={loading}>
                                {loading ? "Sending..." : "Send OTP"}
                            </Button>
                        </>
                    ) : (
                        <>
                            <Input type="text" name="otp" placeholder="Enter OTP" value={formData.otp} onChange={handleChange} />
                            <Button className="w-full" onClick={verifyOtp} disabled={loading}>
                                {loading ? "Verifying..." : "Verify & Login"}
                            </Button>
                        </>
                    )}
                    {message && <p className="text-sm text-red-600">{message}</p>}
                </CardContent>
            </Card>
        </div>
    )
}
"use client"

import Image from 'next/image';
import { useState } from 'react';
import Logo from "@/public/txigo-logo.jpg";
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import axios from "axios";

export default function VendorLoginPage() {
  const [activeTab, setActiveTab] = useState('username');
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false,
    mobile: '',
    otp: ''
  });
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_baseURL}/api/vendor/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
        credentials: "include", // important for cookies to be sent back
      });


      const data = await res.json();
      if (!res.ok) {

        toast.error(data.message || "Login failed");
        return;
      }
       console.log(!data.data.isVerified)
      if(!data.data.isVerified) {
        router.push(`vendor-details?id=${data.data.id}`)
      }else {
        router.push("/vendor");
      }

      
    } catch (err) {
      toast.error("Something Went Wrong");
      console.error(err);
    }
  };

  const handleSendOTP = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!/^[0-9]{10,15}$/.test(formData.mobile)) {
        toast.error('Please enter a valid mobile number');
      }

      // Call your backend API to send OTP
      const response = await axios.post(`${process.env.NEXT_PUBLIC_baseURL}/api/vendor/send-otp`, {
        phone: formData.mobile
      });

      if (response.data.success) {
        setStep(2); // Move to OTP verification step
      } else {
        toast.error(response.data.message || 'Failed to send OTP');
      }
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || err.message);
      } else if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Call your backend API to verify OTP
      const response = await axios.post(`${process.env.NEXT_PUBLIC_baseURL}/api/vendor/verify-otp`, {
        phone: formData.mobile,
        otp: formData.otp
      }, {
        withCredentials: true
      });
      
      if (response.data.success) {
       if(!response.data.data.isVerified){
           router.push("/vendor/vendor-details")
           return
       }
        router.push("/vendor")
      } else {
        throw new Error(response.data.message || 'OTP verification failed');
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {/* Logo inside the form */}
          <div className="flex justify-center mb-6">
            <Image
              src={Logo}
              alt="txigo Logo"
              width={200}
              height={200}
            />
          </div>

          {/* Tabs styled like the image */}
          <div className="flex mb-6 rounded-md overflow-hidden border border-gray-300">
            <button
              className={`flex-1 py-2 px-4 font-medium text-sm transition ${activeTab === 'username'
                ? 'bg-sky-500 text-white'
                : 'bg-[#b6b6bf] text-white'
                }`}
              onClick={() => setActiveTab('username')}
            >
              Login via Username
            </button>
            <button
              className={`flex-1 py-2 px-4 font-medium text-sm transition ${activeTab === 'otp'
                ? 'bg-sky-500 text-white'
                : 'bg-[#b6b6bf] text-white'
                }`}
              onClick={() => setActiveTab('otp')}
            >
              Login via OTP
            </button>
          </div>


          {activeTab === 'username' ? (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <div className="mt-1">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={formData.username}
                    onChange={handleInputChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              {/* Added back the password field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  LOGIN
                </button>
              </div>

              <div className="flex justify-center space-x-4 text-sm">
                <Link href="forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                  Forgot Password?
                </Link>

              </div>
            </form>
          ) : (
            <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Vendor Login</h2>

              {step === 1 ? (
                <form onSubmit={handleSendOTP} className="space-y-6">
                  <div>
                    <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
                      Mobile Number
                    </label>
                    <div className="mt-1">
                      <input
                        id="mobile"
                        name="mobile"
                        type="tel"
                        required
                        pattern="[0-9]{10,15}"
                        value={formData.mobile}
                        onChange={handleInputChange}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Enter 10 digit mobile number"
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? 'Sending OTP...' : 'Login with OTP'}
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleVerifyOTP} className="space-y-6">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">
                      OTP sent to {formData.mobile}
                    </p>
                    <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                      Enter OTP
                    </label>
                    <div className="mt-1">
                      <input
                        id="otp"
                        name="otp"
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]{6}"
                        required
                        value={formData.otp}
                        onChange={handleInputChange}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Enter 6-digit OTP"
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Didn't receive OTP?{' '}
                      <button
                        type="button"
                        onClick={async () => {
                          setIsLoading(true);
                          try {
                            if (!/^[0-9]{10,15}$/.test(formData.mobile)) {
                              toast.error('Please enter a valid mobile number');
                              return;
                            }
                            const response = await axios.post(`${process.env.NEXT_PUBLIC_baseURL}/api/vendor/send-otp`, {
                              phone: formData.mobile
                            });
                            if (response.data.success) {
                              toast.success('OTP resent successfully');
                            } else {
                              toast.error(response.data.message || 'Failed to resend OTP');
                            }
                          } catch (err: any) {
                            if (axios.isAxiosError(err)) {
                              toast.error(err.response?.data?.message || err.message);
                            } else if (err instanceof Error) {
                              toast.error(err.message);
                            } else {
                              toast.error("An unknown error occurred");
                            }
                          } finally {
                            setIsLoading(false);
                          }
                        }}
                        className="text-blue-600 hover:text-blue-500"
                      >
                        Resend OTP
                      </button>
                    </p>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="w-1/3 flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-2/3 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? 'Verifying...' : 'Verify OTP'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
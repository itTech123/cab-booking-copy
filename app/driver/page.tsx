"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import toast from "react-hot-toast"

const testimonials = [
  {
    image: '/manpreet.jpg',
    alt: 'Manpreet Singh',
    text:
      '"Manpreet used his life savings to buy an auto and become an Txigo driver-partner. With Txigo, he gets more bookings than regular auto drivers."',
    name: 'Manpreet Singh, Ludhiana',
  },
  {
    image: '/ganga.jpg',
    alt: 'Ganga Reddy',
    text:
      '"After 15 years of teaching, Ganga quit her job to work on her own terms at Txigo. She now earns more while spending time with family."',
    name: 'Ganga Reddy, Bengaluru',
  },
  {
    image: '/zameer.png',
    alt: 'Zameer',
    text:
      '"Zameer has been with Txigo since 2015. His earnings educated his 3 children and provided his family a comfortable living."',
    name: 'Zameer, Bengaluru',
  },
];


export default function PartnerPage() {
  const [formData, setFormData] = useState({
    driverName: "",
    driverNumber: "",
    driverCity: "",
    selectedCar: "",
    driverEmail : ""
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };



  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => {
      resetTimeout();
    };
  }, [currentIndex]);

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_baseURL}/api/driver/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.driverName,
          phone: formData.driverNumber,
          city: formData.driverCity,
          carType: formData.selectedCar,
          email : formData.driverEmail
        })
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || 'Failed to submit form');
        throw new Error(data.error || 'Failed to submit form');
      }

    

      // Clear form data
      setFormData({
        driverName: '',
        driverNumber: '',
        driverCity: '',
        selectedCar: '',
        driverEmail: ""
      });

      // Redirect to thank you page
     router.push('/driver/thank-you'); // or use Next.js router if you're using it

    } catch (error : any) {
      console.error('Error submitting form:', error);
 
     
    }
  };
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[500px]">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-[url('/driver.jpg')] bg-cover bg-center bg-no-repeat"

        />

        {/* Txigo Logo */}
        <div className="absolute top-6 left-6 z-20">
          <Link href="/">
            <Image

              src="/txigo-logo.jpg"
              alt="Txigo Logo"
              className="h-10"
              width={100}
              height={100}
            />
          </Link>

        </div>

        {/* Content */}
        <div className="container mx-auto  px-4 py-16 md:py-24 relative z-10">
          <div className="flex flex-col md:flex-row items-start gap-12">
            {/* White Card Form */}
            <div className="md:w-1/2 mt-4 bg-white bg-opacity-95 p-8 rounded-2xl shadow-lg">
              <h1 className="text-4xl md:text-4xl font-bold mb-6 text-gray-900">
                Welcome to Txigo!<br />
                Start driving today.
              </h1>

              <div className="space-y-4 max-w-md">
                <div>
                  <label htmlFor="driverName" className="block text-sm font-medium mb-1 text-gray-800">
                    Full Name
                  </label>
                  <Input
                    id="driverName"
                    type="text"
                    value={formData.driverName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="bg-white focus:bg-white h-12"
                  />
                </div>

                <div>
                  <label htmlFor="driverNumber" className="block text-sm font-medium mb-1 text-gray-800">
                    Phone Number
                  </label>
                  <Input
                    id="driverNumber"
                    type="tel"
                    value={formData.driverNumber}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className="bg-white focus:bg-white h-12"
                  />
                </div>
                <div>
                  <label htmlFor="DriverEmail" className="block text-sm font-medium mb-1 text-gray-800">
                    Email
                  </label>
                  <Input
                    id="driverEmail"
                    type="email"
                    value={formData.driverEmail}
                    onChange={handleChange}
                    placeholder="Enter Email"
                    className="bg-white focus:bg-white h-12"
                  />
                </div>

                <div>
                  <label htmlFor="driverCity" className="block text-sm font-medium mb-1 text-gray-800">
                    City
                  </label>
                  <Input
                    id="driverCity"
                    type="text"
                    value={formData.driverCity}
                    onChange={handleChange}
                    placeholder="Enter your city"
                    className="bg-white focus:bg-white h-12"
                  />
                </div>

                <div>
                  <label htmlFor="selectedCar" className="block text-sm font-medium mb-1 text-gray-800">
                    Select Car
                  </label>
                  <select
                    id="selectedCar"
                    value={formData.selectedCar}
                    onChange={handleChange}
                    className="bg-white focus:bg-white h-12 w-full border rounded-md px-3 text-sm text-gray-700"
                  >
                    <option value="">Choose a car</option>
                    <option value="MINI/HATCHBACK">MINI/HATCHBACK</option>
                    <option value="SEDAN">SEDAN</option>
                    <option value="SUV">SUV</option>
                    <option value="SUV+">SUV+</option>
                    <option value="13 SEATER TRAVELLER">13 SEATER TRAVELLER</option>
                    <option value="17 SEATER TRAVELLER">17 SEATER TRAVELLER</option>
                    <option value="24 SEATER TRAVELLER">24 SEATER TRAVELLER</option>
                  </select>
                </div>

                <Button type="submit" className="justify-start bg-black hover:bg-gray-900 text-white h-14 text-base font-semibold gap-2" onClick={handleSubmit}>
                  <ArrowRight className="w-4 h-4" />
                  Sign up now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-left mb-12">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              High earnings<br />
              Non-stop bookings
            </h2>
            <p className="text-lg text-gray-600 mt-4">India's favourite driver app</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-24 h-24 relative mb-4">
                <Image src="/icons/customer.svg" alt="Customers" layout="fill" objectFit="contain" />
              </div>
              <div className="text-gray-800 text-left text-2xl font-medium">
                Crores of customers on the platform
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-24 h-24 relative mb-4">
                <Image src="/icons/earn.svg" alt="Earnings" layout="fill" objectFit="contain" />
              </div>
              <div className="text-gray-800 text-left text-2xl font-medium">
                Earn more than any other app
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-24 h-24 relative mb-4">
                <Image src="/icons/clock.svg" alt="Clock" layout="fill" objectFit="contain" />
              </div>
              <div className="text-gray-800 text-left text-2xl font-medium">
                Choose your own working hours
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-24 h-24 relative mb-4">
                <Image src="/icons/map.svg" alt="Location" layout="fill" objectFit="contain" />
              </div>
              <div className="text-gray-800 text-left text-2xl font-medium">
                Choose from 100+ cities to work in
              </div>
            </div>

            {/* Card 5 */}
            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-24 h-24 relative mb-4">
                <Image src="/icons/home.png" alt="Car" layout="fill" objectFit="contain" />
              </div>
              <div className="text-gray-800 mb-9 text-left text-2xl font-medium">
                Get a booking on your way home
              </div>
            </div>

            {/* Card 6 */}
            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-24 h-24 relative mb-4">
                <Image src="/icons/tick.svg" alt="Shield" layout="fill" objectFit="contain" />
              </div>
              <div className="text-gray-800 text-left text-2xl font-medium">
                Trusted by lakhs of partners daily
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Registration Steps */}
      <section className=" bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-left mb-4">
            Registration is<br />super simple.
          </h2>
          <p className="text-xl text-gray-600 text-left mb-25">
            Upload your documents to begin. Earnings are just a few steps away.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Owner Documents */}
            <div className="bg-white mt-8 md:mt-0 rounded-xl shadow-md pt-20 pb-6 px-6 relative text-left">
              <div className="absolute -top-16 left-6">
                <Image
                  src="icons/owner.svg"
                  alt="Owner Documents"
                  width={120}
                  height={120}
                  className="shadow-none"
                />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Owner Documents</h3>
              <ul className="space-y-3 text-lg">
                <li className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-gray-500" />
                  <span>PAN Card</span>
                </li>
                <li className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-gray-500" />
                  <span>Cancelled Cheque or Passbook</span>
                </li>
                <li className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-gray-500" />
                  <span>Aadhaar Card</span>
                </li>
                <li className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-gray-500" />
                  <span>Address Proof</span>
                </li>
              </ul>
            </div>

            {/* Vehicle Documents */}
            <div className="bg-white rounded-xl mt-8 md:mt-0 shadow-md pt-20 pb-6 px-6 relative text-left">
              <div className="absolute -top-16 left-6">
                <Image
                  src="icons/driverDoc.svg"
                  alt="Vehicle Documents"
                  width={120}
                  height={120}
                  className="shadow-none"
                />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Vehicle Documents</h3>
              <ul className="space-y-3 text-lg">
                <li className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-gray-500" />
                  <span>Registration certificate</span>
                </li>
                <li className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-gray-500" />
                  <span>Insurance document</span>
                </li>
                <li className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-gray-500" />
                  <span>Vehicle Permit</span>
                </li>
                <li className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-gray-500" />
                  <span>Pollution certificate</span>
                </li>
              </ul>
            </div>

            {/* Driver Documents */}
            <div className="bg-white mt-8 md:mt-0 rounded-xl shadow-md pt-20 pb-6 px-6 relative text-left">
              <div className="absolute -top-16 left-6">
                <Image
                  src="icons/driver.svg"
                  alt="Driver Documents"
                  width={120}
                  height={120}
                  className="shadow-none"
                />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Driver Documents</h3>
              <ul className="space-y-3 text-lg">
                <li className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-gray-500" />
                  <span>Driving Licence</span>
                </li>
                <li className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-gray-500" />
                  <span>Aadhaar Card</span>
                </li>
                <li className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-gray-500" />
                  <span>Address Proof</span>
                </li>
                <li className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-gray-500" />
                  <span>Profile Photo</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>


      {/* Testimonials */}
      <section className="w-full mt-16 bg-black text-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-left mb-6">
            Lakhs of driver-partners have fulfilled their dreams with Txigo
          </h2>
          <p className="text-xl text-gray-300 text-left mb-12">
            Read all about their journeys.
          </p>

          <div className="relative w-full overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-[40%] rounded-xl overflow-hidden">
                      <img
                        src={testimonial.image}
                        className="w-full h-96 object-cover"
                        alt={testimonial.alt}
                      />
                    </div>

                    <div className="md:w-[60%] bg-gray-900 p-8 rounded-xl flex flex-col justify-center">
                      <blockquote className="text-xl md:text-2xl mb-8">
                        {testimonial.text}
                      </blockquote>
                      <div className="bg-orange-500 px-4 py-2 rounded-md w-max">
                        <p className="font-bold">{testimonial.name}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Dots Navigation */}
            <div className="flex justify-center mt-8 gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${currentIndex === i ? 'bg-orange-500' : 'bg-gray-600'
                    }`}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* extra section */}
      <section className="mt-15 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            {/* Left side - Content */}
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Download Our Driver App Today
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Join thousands of drivers who are already earning with our platform.
                Get real-time ride requests, navigation support, and easy earnings tracking.
              </p>

            </div>

            {/* Right side - Image */}
            <div className="md:w-1/2 flex justify-center">
              <Image
                src="/banner.jpg" // Update with your image path
                alt="Driver using app"
                width={500}
                height={500}
                className="rounded-lg shadow-xl w-full max-w-md"
                priority // Optional: if this image is above the fold
              />
            </div>
          </div>
        </div>
      </section>


      {/* Download App */}
      <section className="py-16 bg-[#f1f5ec]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Text Content - Left Side */}
            <div className="flex flex-col md:w-1/2 space-y-6">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold leading-tight">Download Driver App</h2>
                <p className="text-xl md:text-2xl text-gray-600">
                  Take rides, track your earnings, get regular updates and more.
                </p>
              </div>



              <div className="md:flex items-center flex-col gap-3 group cursor-pointer w-fit">
                <span className="text-xl font-medium group-hover:text-green-600 transition-colors">
                  Download Driver App
                </span>
                <div className="flex gap-4 mt-2">
                  <Link href="#">
                    <img
                      src="/play-store-button.png"
                      alt="Download on Play Store"
                      width="110"
                      height="40"
                      className="hover:scale-105 transition-transform duration-200"
                    />
                  </Link>
                  <Link href="#">
                    <img
                      src="/app-store-button.png"
                      alt="Download on App Store"
                      width="100"
                      height="30"
                      className="hover:scale-105 transition-transform duration-200"
                    />
                  </Link>
                </div>
              </div>

            </div>

            {/* Image and QR Code - Right Side */}
            <div className="md:w-1/2 flex flex-col items-center md:items-end space-y-6">
              <img src="/phone.svg" className="h-100 md:h-[32rem] w-auto" />


            </div>
          </div>

          {/* Mobile Download Button */}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <img src="txigo-logo.jpg" alt="txigo" className="h-8" />
              <div className="h-8 w-px bg-gray-600"></div>
              <div className="flex gap-4">
                <a href="#">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="#">
                  <Youtube className="w-6 h-6" />
                </a>
                <a href="#">
                  <Twitter className="w-6 h-6" />
                </a>
                <a href="#">
                  <Facebook className="w-6 h-6" />
                </a>
              </div>
            </div>

            <div className="text-sm text-gray-400">
              Copyright © {new Date().getFullYear()} ANI Technologies Pvt. Ltd. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}

// Icons (you would import these from lucide-react or similar)
function ArrowRight(props: any) { return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg> }
function Users(props: any) { return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg> }
function IndianRupee(props: any) { return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 10h16"></path><path d="M4 14h16"></path><path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"></path><path d="M8 12h8"></path></svg> }
function Clock(props: any) { return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg> }
function MapPin(props: any) { return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg> }
function Car(props: any) { return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.1l-.8 1.63A6 6 0 0 0 2 12.42V16h2"></path><circle cx="6.5" cy="16.5" r="2.5"></circle><circle cx="16.5" cy="16.5" r="2.5"></circle></svg> }
function ShieldCheck(props: any) { return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M9 12l2 2 4-4"></path></svg> }
function FileText(props: any) { return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg> }
function User(props: any) { return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> }
function UserCircle(props: any) { return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3"></path><circle cx="12" cy="10" r="3"></circle><circle cx="12" cy="12" r="10"></circle></svg> }
function Download(props: any) { return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg> }
function Instagram(props: any) { return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg> }
function Youtube(props: any) { return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg> }
function Twitter(props: any) { return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg> }
function Facebook(props: any) { return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg> }
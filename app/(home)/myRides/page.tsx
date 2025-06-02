"use client"

import OrderHistory from "@/components/OrderHistory";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function MyRides() {
  const [userDetails, setUserDetails] = useState<any>(null);

  useEffect(() => {
    const storedDetails = localStorage.getItem('userDetails');
    if (storedDetails) {
      setUserDetails(JSON.parse(storedDetails));
    }
  }, []);

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Sidebar with Home option - appears first on mobile, then left on desktop */}
      <div className="w-full lg:w-72 p-4 bg-white">
        <div className="card rounded-lg shadow-md overflow-hidden">
          <img
            src="book-now.jpg"
            className="w-full h-auto"
            alt="BroomBoom Cars"
          />
          <div className="p-4">
            <h5 className="text-lg font-semibold mb-2">Book A Ride Now</h5>
            <p className="text-gray-600 mb-4">Book Txigo Cabs For New Trips</p>
            <Link
              href="/"
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md inline-block transition-colors w-full text-center"
            >
              Request a Ride
            </Link>
          </div>
        </div>
      </div>

      {/* Main content - full width on mobile, remaining space on desktop */}
      <div className="flex-1 p-4 lg:p-0">
        <OrderHistory phone={userDetails?.phone} />
      </div>
    </div>
  )
}
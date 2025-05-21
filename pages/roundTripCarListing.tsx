"use client"

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { roundTripRates } from '@/data';
import { useRouter } from 'next/navigation';
import { BookingForm } from '@/components/BookingForm';
import CarCard from '@/components/carSelect';
import Image from 'next/image';

const NIGHT_ALLOWANCE = 500;

const RoundTripCarListing = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fromCity = searchParams?.get('fromCity') || '';
  const toCity = searchParams?.get('toCity') || '';
  const date = searchParams?.get('date') || new Date().toISOString();
  const returnDate = searchParams?.get('returnDate') || new Date(Date.now() + 86400000).toISOString();
  const time = searchParams?.get('time') || '';

  const [distance, setDistance] = useState<string | number>("Calculating...");
  const [duration, setDuration] = useState<string | number>("Calculating...");
  const [loading, setLoading] = useState(true);

  const [openDetails, setOpenDetails] = useState<number | null>(null); // State for toggling the details section
  const [isLoggedin,setIsLoggedIn] = useState(false)

  const [isModalOpen, setIsModalOpen] = useState(false); // State for controlling the Modify Details modal


  useEffect(() => {
    const startDateTime = new Date(date);
    const [startHours, startMinutes] = time.split(':').map(Number);
    startDateTime.setHours(startHours, startMinutes, 0, 0);

    const endDateTime = new Date(returnDate);
    endDateTime.setHours(24, 0, 0, 0);
    // Calculate the duration in milliseconds
    const durationInMilliseconds = endDateTime.getTime() - startDateTime.getTime();

    // Convert the duration into hours
    const hoursDuration = Math.floor(durationInMilliseconds / 3600000); // Convert milliseconds to hours

    // Set the duration state
    setDuration(hoursDuration);
  }, []);

  useEffect(() => {
    const calculateDistance = async () => {
      if (!fromCity || !toCity) return;

      setLoading(true);
      try {
        const response = await fetch(
          `/api/distance?origin=${encodeURIComponent(fromCity)}&destination=${encodeURIComponent(toCity)}`
        );
        const data = await response.json();

        if (!response.ok || data.error) {
          throw new Error(data.error || 'Failed to calculate distance');
        }

        setDistance(data.distance || "Distance not available");

      } catch (error) {
        console.error('Distance calculation error:', error);
        setDistance("Distance not available");
      } finally {
        setLoading(false);
      }
    };

    calculateDistance();

  }, [fromCity, toCity]);

  const calculateCarPrice = (car: typeof roundTripRates[0]) => {
    let newDistance: any = typeof distance === 'string' ? distance.replace(' km', '') : distance.toString();
    newDistance = Number(newDistance)
    const distanceKm = newDistance;
    const durationHours = typeof duration === 'number' ? Math.ceil(duration) : 8;

    const kmPrice = car.perKm * distanceKm;

    const hourPrice = car.perHour * durationHours;
    const isKmHigher = kmPrice >= hourPrice;
    const totalPrice = Math.round((isKmHigher ? kmPrice : hourPrice));
    const savings = Math.round(Math.abs(kmPrice - hourPrice));

    return {
      kmPrice,
      hourPrice,
      isKmHigher,
      totalPrice,
      savings,
      pricingMethod: isKmHigher ? 'Per Km' : 'Per Hour',
      distanceKm,
      durationHours
    };
  };

  const handleBookNow = (price: string | number, type: string) => {
    const queryObject: Record<string, string> = {
      fromCity: fromCity,
      toCity: toCity,
      date: date ? date : "",
      price: price.toString(),
      type: type,
      tripType: "Round-Trip",
      returnDate: returnDate,
      distance: distance.toString()
    };

    if (time) {
      queryObject.time = time.toString();
    }

    const query = new URLSearchParams(queryObject).toString();
    router.push(`/booking?${query}`);
  }

  const toggleDetails = (index: number) => {
    setOpenDetails(prevIndex => (prevIndex === index ? null : index));
  };
   const handleModelOpen = () => {
     setIsModalOpen(true)
     setIsLoggedIn(true)
 }
  return (
    <div className=" bg-[#e3fcde] container mx-auto px-4 py-8">
      {/* Trip Details Header */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Trip Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm border mb-6">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Trip Details
            </h1>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">From</p>
                <p className="font-medium">{fromCity}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">To</p>
                <p className="font-medium">{toCity}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Departure</p>
                <p className="font-medium">
                  {format(new Date(date), 'dd MMM yyyy')} at {time}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Return</p>
                <p className="font-medium">
                  {format(new Date(returnDate), 'dd MMM yyyy')}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Distance</p>
                <p className="font-medium">
                  {loading ? 'Calculating...' : distance}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Duration</p>
                <p className="font-medium">
                  {loading ? 'Calculating...' : duration + 'hr'}
                </p>
              </div>
            </div>

            {/* Optional Modify Button */}
            <div className="mt-4">
              <button
                onClick={handleModelOpen}
                className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Modify Details
              </button>
            </div>
          </div>
          {isModalOpen && (
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="bg-white dark:bg-gray-900 p-6 rounded-lg relative shadow-lg w-fit h-fit max-w-full">
                <button
                  className="absolute top-2 right-2 text-gray-600 dark:text-white text-xl"
                  onClick={() => setIsModalOpen(false)}
                >
                  ✕
                </button>
                <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  Modify Trip Details
                </h2>
                <BookingForm
                   isLoggedIn={isLoggedin}
                />
              </div>
            </div>
          )}

        </CardContent>
      </Card>

      {/* Car List - Simplified Full Width Cards */}
      {loading ? (
        <div className="text-center py-8">
          <p>Loading available cars...</p>
        </div>
      ) : (
        <div className="space-y-6">

          <div className="text-center mb-4">
            <Image
              src="/cabHeading.jpg" // Replace this with your actual image path
              alt="Top Rated Cabs & Chauffeurs"
              width={1000} // Adjust width as needed
              height={600} // Adjust height as needed
              className="mx-auto rounded-lg shadow-lg"
            />
          </div>
          {roundTripRates.map((car, index) => {
            const { totalPrice, pricingMethod, savings } = calculateCarPrice(car);

            return (
              <div key={index}>
                <CarCard
                  discountedPrice={totalPrice + 1000}
                  finalPrice={totalPrice}
                  carName={car?.fleet}
                  carImage={car?.image}
                  details={{
                    baseFareKm: String(distance),
                    driverAllowance: true,
                    stateTaxAndToll: false,
                    gstPercentage: 5
                  }}
                  onBookNow={handleBookNow}
                />
              </div>

            );
          })}
        </div>


      )}
    </div>


  );
};

export default RoundTripCarListing;
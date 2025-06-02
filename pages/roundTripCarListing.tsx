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
import { Button } from '@/components/ui/button';
import { Badge } from 'lucide-react';

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
  const [isLoggedin, setIsLoggedIn] = useState(false)

  const [isModalOpen, setIsModalOpen] = useState(false); // State for controlling the Modify Details modal
  const [showInclusions, setShowInclusions] = useState(true); // State for inclusions/exclusions toggle
  const [selectedCarIndex, setSelectedCarIndex] = useState(0); // State for selected car in mobile view


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

  const carsWithPrices = roundTripRates.map(car => ({
    ...car,
    totalPrice: Math.round(parseFloat(distance.toString()) * car.perKm),
    type: car.fleet// Ensure 'type' is included
  }));

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
    <>
      <div className="hidden md:block container mx-auto px-4 py-8">
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


      {/* For small devices */}
      <div className="md:hidden container mx-auto px-4 py-4">
        {/* Header section with trip details */}
        <div className="bg-white dark:bg-gray-900 p-3 rounded-lg shadow-sm border mb-4">
          <h1 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            Round-Trip Trip Rates
          </h1>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="space-y-0.5">
              <p className="text-gray-500 dark:text-gray-400">From City</p>
              <p className="font-medium">{fromCity}</p>
            </div>
            <div className="space-y-0.5">
              <p className="text-gray-500 dark:text-gray-400">To City</p>
              <p className="font-medium">{toCity}</p>
            </div>
            <div className="space-y-0.5">
              <p className="text-gray-500 dark:text-gray-400">Date</p>
              <p className="font-medium">{format(new Date(date), 'dd MMM yyyy')}</p>
            </div>
            <div className="space-y-0.5">
              <p className="text-gray-500 dark:text-gray-400">return Date</p>
              <p className="font-medium">{format(new Date(returnDate), 'dd MMM yyyy')}</p>
            </div>
            <div className="space-y-0.5">
              <p className="text-gray-500 dark:text-gray-400">Distance</p>
              <p className="font-medium">
                {loading ? "Calculating..." : `${distance} km`}
              </p>
            </div>
          </div>
          {/* ✅ Modify button */}
          <div className="mt-4">
            <button
              onClick={handleModelOpen}
              className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Modify Details
            </button>
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg relative shadow-lg max-w-full w-fit h-fit">
              <button
                className="absolute top-2 right-2 text-gray-600 dark:text-white text-xl"
                onClick={() => setIsModalOpen(false)}
              >
                ✕
              </button>
              <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                Modify Trip Details
              </h2>

              <BookingForm isLoggedIn={isLoggedin} />
            </div>
          </div>
        )}
                 {/* Header */}
                       <div className="text-center">
                         <Image
                           src="/cabHeading.jpg" // Replace this with your actual image path
                           alt="Top Rated Cabs & Chauffeurs"
                           width={1000} // Adjust width as needed
                           height={600} // Adjust height as needed
                           className="mx-auto rounded-lg shadow-lg"
                         />
                       </div>
        {/* Horizontal Car Selector */}
        <div className="mb-4">
          <div className="flex overflow-x-auto gap-3 pb-2 no-scrollbar">
            {carsWithPrices.map((car, index) => {
              const { totalPrice, pricingMethod, savings } = calculateCarPrice(car);
              return (
                <button
                  key={index}
                  onClick={() => setSelectedCarIndex(index)}
                  className={`flex flex-col items-center shrink-0 ${selectedCarIndex === index ? 'opacity-100' : 'opacity-60'
                    }`}
                >
                  <div className="relative">
                    <img
                      src={car?.image}
                      alt={car?.fleet}
                      className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
                    />
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full whitespace-nowrap">
                      ₹{totalPrice}
                    </div>
                  </div>
                  <span className="text-xs mt-1 font-medium truncate max-w-[80px]">
                    {car?.fleet}
                  </span>
                </button>
              );

            })}
          </div>
        </div>

        {/* Selected Car Details */}
        <div className="space-y-4">
          {carsWithPrices.slice(selectedCarIndex, selectedCarIndex + 1).map((car, index) => {
            const { totalPrice, pricingMethod, savings } = calculateCarPrice(car);
            return (
              <Card key={index} className="shadow-sm">
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={car?.image}
                  alt={car?.fleet}
                  className="w-full h-full object-cover rounded-t-lg"
                />
              </div>

              <CardContent className="p-3 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                     <div className="flex gap-1">
                    <Badge className="text-xs">₹{car?.perKm}/km</Badge>
                  </div>
                    <div className="text-md font-bold">{car?.fleet}</div>
                  </div>
                 
                </div>

                <div className="text-xs mt-2 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Distance:</span>
                    <span>{distance} </span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-0.5 rounded mb-1">
                      Lowest Price
                    </span>
                    <div className="flex justify-between font-semibold w-full">
                      <span className="text-gray-500 text-2xl">Fare:</span>
                      <span className='font-bold text-2xl'>₹{totalPrice}</span>
                    </div>
                  </div>

                </div>

                <Button
                  variant="outline"
                  className="w-full text-sm mt-2"
                  onClick={() => setOpenDetails(openDetails === selectedCarIndex ? null : selectedCarIndex)}
                >
                  {openDetails === selectedCarIndex ? "Hide Details" : "Show Details"}
                </Button>

                {/* Details section for mobile */}
                {openDetails === selectedCarIndex && (
                  <div className="mt-4 space-y-4">
                    {/* Inclusions/Exclusions Buttons */}
                    <div className="flex space-x-4">
                      <Button
                        variant={showInclusions ? 'default' : 'outline'}
                        className={`text-xs ${showInclusions ? 'bg-blue-600 text-white' : 'text-gray-600'}`}
                        onClick={() => setShowInclusions(true)}
                      >
                        Inclusions
                      </Button>
                      <Button
                        variant={!showInclusions ? 'default' : 'outline'}
                        className={`text-xs ${!showInclusions ? 'bg-blue-600 text-white' : 'text-gray-600'}`}
                        onClick={() => setShowInclusions(false)}
                      >
                        Exclusions
                      </Button>
                    </div>

                    {/* Inclusions or Exclusions Content */}
                    <div className="space-y-2">
                      {showInclusions ? (
                        <>
                          <div className="flex justify-between">
                            <p className="text-xs text-muted-foreground">Driver Allowance</p>
                            <p className="text-xs font-medium">Included</p>
                          </div>
                          <div className="flex justify-between">
                            <p className="text-xs text-muted-foreground">Fuel Charges</p>
                            <p className="text-xs font-medium">Included</p>
                          </div>
                          <div className="flex justify-between">
                            <p className="text-xs text-muted-foreground">Basic Insurance</p>
                            <p className="text-xs font-medium">Included</p>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex justify-between">
                            <p className="text-xs text-muted-foreground">Night Allowance</p>
                            <p className="text-xs font-medium">₹200 per night</p>
                          </div>
                          <div className="flex justify-between">
                            <p className="text-xs text-muted-foreground">Toll Charges</p>
                            <p className="text-xs font-medium">Extra</p>
                          </div>
                          <div className="flex justify-between">
                            <p className="text-xs text-muted-foreground">Parking Charges</p>
                            <p className="text-xs font-medium">Extra</p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}

                <Button className="w-full mt-3 text-sm" onClick={() => handleBookNow(totalPrice, car?.fleet)}>Book Now</Button>
              </CardContent>
            </Card>
            )
})}
        </div>
      </div>
    </>


  );
};

export default RoundTripCarListing;
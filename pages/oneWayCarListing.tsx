"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { oneWayRates } from "@/data"
import { useRouter } from "next/navigation"
import { Clock, ShieldCheck, Star } from "lucide-react"
import { BookingForm } from "@/components/BookingForm"
import CarCard from "@/components/carSelect"
import Image from "next/image"

const OneWayCarListing = () => {
  const searchParams = useSearchParams();
  const fromCityOg = searchParams?.get("fromCity") || "";
  const toCityOg = searchParams?.get("toCity") || "";
  const date = searchParams?.get("date");
  const time = searchParams?.get("time");

  const [distance, setDistance] = useState("0");
  const [duration, setDuration] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedCarIndex, setSelectedCarIndex] = useState(0);
  const [openDetails, setOpenDetails] = useState<number | null>(null);
  const [showInclusions, setShowInclusions] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const [isLoggedin, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const calculateDistance = async () => {
      if (!fromCityOg || !toCityOg) return;

      setLoading(true);
      try {
        const response = await fetch(
          `/api/distance?origin=${encodeURIComponent(fromCityOg)}&destination=${encodeURIComponent(toCityOg)}`
        );

        const data = await response.json();

        if (!response.ok || data.error) {
          throw new Error(data.error || 'Failed to calculate distance');
        }

        setDistance(data.distance || "0");
        setDuration(data.duration || "Duration not available");
      } catch (error) {
        console.error('Distance calculation error:', error);
        setDistance("0");
        setDuration("Duration not available");
      } finally {
        setLoading(false);
      }
    };

    calculateDistance();
  }, [fromCityOg, toCityOg]);

  // Calculate total price for each car type
  const carsWithPrices = oneWayRates.map(car => ({
    ...car,
    totalPrice: Math.round(parseFloat(distance) * car.ratePerKm)
  }));

  const formattedDate = date ? format(new Date(date), "dd MMM yyyy") : "Not specified";

  const toggleDetails = (index: number) => {
    setOpenDetails(openDetails === index ? null : index);
  };



  const handleBookNow = (price: string | number, type: string) => {
    const queryObject: Record<string, string> = {
      fromCity: fromCityOg,
      toCity: toCityOg,
      date: date ? date : "",
      price: price.toString(),
      type: type,
      tripType: "One-Way",
      distance: distance
    };

    if (time) {
      queryObject.time = time.toString();
    }

    const query = new URLSearchParams(queryObject).toString();
    router.push(`/booking?${query}`);
  }
  const handleModelOpen = () => {
    setIsModalOpen(true)
    setIsLoggedIn(true)
  }
  return (
    <>
      {/* For large devices */}
      <div className=" hidden md:block container mx-auto px-4 py-6 max-w-6xl">
        {/* Header section with trip details */}
        <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm border mb-6">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
            One Way Trip Rates
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-sm">
            <div className="space-y-1">
              <p className="text-gray-500 dark:text-gray-400">From City</p>
              <p className="font-medium">{fromCityOg || "Not specified"}</p>
            </div>
            <div className="space-y-1">
              <p className="text-gray-500 dark:text-gray-400">To City</p>
              <p className="font-medium">{toCityOg || "Not specified"}</p>
            </div>
            <div className="space-y-1">
              <p className="text-gray-500 dark:text-gray-400">Date</p>
              <p className="font-medium">{formattedDate}</p>
            </div>
            <div className="space-y-1">
              <p className="text-gray-500 dark:text-gray-400">Distance</p>
              <p className="font-medium">
                {loading ? "Calculating..." : `${distance}`}
              </p>
            </div>
          </div>

          {/* Modify Button AFTER details */}
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


        {/* Car list */}
        {loading ? "Loading.." :
          <div className="space-y-4 max-w-6xl mx-auto px-4">
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

            {/* Cards */}
            <div className="container mx-auto px-6 py-8 max-w-screen-xl">
              <div className="space-y-6">
                {carsWithPrices.length > 0 ? (
                  carsWithPrices.map((car, index) => (

                    <div key={index}>
                      <CarCard
                        discountedPrice={car?.totalPrice + 1000}
                        finalPrice={car?.totalPrice}
                        carName={car?.type}
                        carImage={car?.image}
                        details={{
                          baseFareKm: distance,
                          driverAllowance: true,
                          stateTaxAndToll: false,
                          gstPercentage: 5
                        }}
                        onBookNow={handleBookNow}
                      />
                    </div>

                  ))
                ) : (
                  <div className="text-center py-16 bg-white rounded-xl shadow-md border border-gray-300">
                    <div className="mx-auto w-32 h-32 mb-6 text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">No cars available</h3>
                    <p className="text-base text-gray-600 mt-3">
                      Try selecting a different option or check back later.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>



        }
      </div>

      {/* For small devices */}
      <div className="md:hidden container mx-auto px-4 py-4">
        {/* Header section with trip details */}
        <div className="bg-white dark:bg-gray-900 p-3 rounded-lg shadow-sm border mb-4">
          <h1 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            One Way Trip Rates
          </h1>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="space-y-0.5">
              <p className="text-gray-500 dark:text-gray-400">From City</p>
              <p className="font-medium">{fromCityOg || "Not specified"}</p>
            </div>
            <div className="space-y-0.5">
              <p className="text-gray-500 dark:text-gray-400">To City</p>
              <p className="font-medium">{toCityOg || "Not specified"}</p>
            </div>
            <div className="space-y-0.5">
              <p className="text-gray-500 dark:text-gray-400">Date</p>
              <p className="font-medium">{formattedDate}</p>
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
            {carsWithPrices.map((car, index) => (
              <button
                key={index}
                onClick={() => setSelectedCarIndex(index)}
                className={`flex flex-col items-center shrink-0 ${selectedCarIndex === index ? 'opacity-100' : 'opacity-60'
                  }`}
              >
                <div className="relative">
                  <img
                    src={car?.image}
                    alt={car?.type}
                    className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
                  />
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full whitespace-nowrap">
                    ₹{car?.totalPrice}
                  </div>
                </div>
                <span className="text-xs mt-1 font-medium truncate max-w-[80px]">
                  {car?.type}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Car Details */}
        <div className="space-y-4">
          {carsWithPrices.slice(selectedCarIndex, selectedCarIndex + 1).map((car, index) => (
            <Card key={index} className="shadow-sm">
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={car?.image}
                  alt={car?.type}
                  className="w-full h-full object-cover rounded-t-lg"
                />
              </div>

              <CardContent className="p-3 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                      <div className="flex gap-1">
                    <Badge className="text-xs">₹{car?.ratePerKm}/km</Badge>
                  </div>
                    <div className="text-md font-bold">{car?.type}</div>
                    
                  </div>
                
                </div>

                <div className="text-xs mt-2 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Distance:</span>
                    <span>{distance}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-0.5 rounded mb-1">
                      Lowest Price
                    </span>
                    <div className="flex justify-between font-semibold w-full">
                      <span className="text-gray-500 text-2xl">Fare:</span>
                      <span className="font-bold text-2xl">₹{car?.totalPrice}</span>
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

                <Button className="w-full mt-3 text-sm" disabled={distance === "0"} onClick={() => handleBookNow(car?.totalPrice, car?.type)}>Book Now</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  )
}

export default OneWayCarListing
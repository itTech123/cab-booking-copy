"use client";

import { Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from 'next/navigation';
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { BookingForm } from "@/components/BookingForm";
import CarCard from "@/components/carSelect";

interface Car {
  id: number;
  name: string;
  type: string;
  rating: string;
  price: number;
  discount: number;
  finalPrice: number;
  distance: string;
  image: string;
}

interface CarData {
  name: string;
  pricePerKm: number;
}

export default function AirportCarListingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [carsData, setCarsData] = useState<CarData[]>([])
  const [distance, setDistance] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const fromCityOg = searchParams?.get('fromCity') || '';
  const toCityOg = searchParams?.get('toCity') || '';
  const fromCity = fromCityOg.split(' ').slice(0, 2).join(' ');
  const toCity = toCityOg.split(' ').slice(0, 2).join(' ');
  const dateParam = searchParams?.get('date');
  const time = searchParams?.get('time') || '';
 
  const [isLoggedin,setIsLoggedIn] = useState(false)

  const date = dateParam ? new Date(dateParam) : new Date();
  const formattedDate = format(date, "dd-MM-yyyy");

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_baseURL}/api/cars/get-cars`);
        if (!response.ok) {
          throw new Error('Failed to fetch cars');
        }
        const data = await response.json();
        setCarsData(data)
        return data;
      } catch (error) {
        console.error('Error fetching cars:', error);
        throw error;
      }
    };


    fetchCars();
  }, []);

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

        setDistance(data.distance || "Distance not available");
        setDuration(data.duration || "Duration not available");
      } catch (error) {
        console.error('Distance calculation error:', error);
        setDistance("Distance not available");
        setDuration("Duration not available");
      } finally {
        setLoading(false);
      }
    };

    calculateDistance();
  }, [fromCityOg, toCityOg]);

  // Create a price map using pricePerKm instead of price
  const priceMap: Record<string, number> = carsData?.reduce((map: Record<string, number>, item: CarData) => {
    const key = item.name.toLowerCase().replace(/\s/g, '');
    map[key] = item.pricePerKm; // Using pricePerKm directly
    return map;
  }, {});

  const getPriceDetails = (name: string) => {
    const key = name.toLowerCase().replace(/\s/g, '');
    const perKm = priceMap[key] || 0;
    const price = perKm * parseFloat(distance || "0");
    const discount = price * 0.1;
    const finalPrice = price;

    return {
      price: Math.round(price),
      discount: Math.round(discount),
      finalPrice: Math.round(finalPrice)
    };
  };

  const cars = [
    {
      id: 1,
      name: "Hatchback Mini",
      type: "or equivalent",
      rating: "Top Rated Cabs & Chauffeurs",
      ...getPriceDetails("Hatchback Mini"),
      distance: `up to ${distance} km`,
      image: "/etios-cab.jpg"
    },
    {
      id: 2,
      name: "Sedan",
      type: "or equivalent",
      rating: "Top Rated Cabs & Chauffeurs",
      ...getPriceDetails("Sedan"),
      distance: `up to ${distance} km`,
      image: "/inova-crysta.jpg"
    },
    {
      id: 3,
      name: "Ertiga",
      type: "or equivalent",
      rating: "Top Rated Cabs & Chauffeurs",
      ...getPriceDetails("Ertiga"),
      distance: `up to ${distance} km`,
      image: "/inova-crysta.jpg"
    },
    {
      id: 4,
      name: "Innova",
      type: "",
      rating: "Top Rated Cabs & Chauffeurs",
      ...getPriceDetails("Innova"),
      distance: `up to ${distance} km`,
      image: "/toyota-inova.jpg"
    },
    {
      id: 5,
      name: "Crysta",
      type: "",
      rating: "Top Rated Cabs & Chauffeurs",
      ...getPriceDetails("Crysta"),
      distance: `up to ${distance} km`,
      image: "/inova-crysta.jpg"
    },
    {
      id: 6,
      name: "13 Seater Traveller",
      type: "",
      rating: "Top Rated Cabs & Chauffeurs",
      ...getPriceDetails("13 Seater Traveller"),
      distance: `up to ${distance} km`,
      image: "/tempo-1.jpg"
    },
    {
      id: 7,
      name: "17 Seater Traveller",
      type: "",
      rating: "Top Rated Cabs & Chauffeurs",
      ...getPriceDetails("17 Seater Traveller"),
      distance: `up to ${distance} km`,
      image: "/tempo-2.jpg"
    },
    {
      id: 8,
      name: "24 Seater Traveller",
      type: "",
      rating: "Top Rated Cabs & Chauffeurs",
      ...getPriceDetails("24 Seater Traveller"),
      distance: `up to ${distance} km`,
      image: "/tempo-2.jpg"
    }
  ];

  const handleBookNow = (price: string | number, type: string) => {
    const queryObject: Record<string, string> = {
      fromCity: fromCityOg,
      toCity: toCityOg,
      date: date ? date.toISOString() : "",
      price: price.toString(),
      type: type,
      tripType: "Airport",
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
console.log(isLoggedin)
  return (
    <div className="min-h-screen bg-[#e3fcde]">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4 flex items-center text-sm">
        <Link href="/" className="text-blue-600 hover:underline">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-600">Select Car</span>
      </div>

      {/* Trip Summary */}
      <div className="container mx-auto px-4 py-6 bg-white shadow-md rounded-lg mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          {/* Left side - Route info */}
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {fromCity} &gt; {toCity}{' '}
              <span className="text-sm font-medium text-gray-600">(Airport)</span>
            </h1>
            {loading ? (
              <p className="text-sm text-gray-500 mt-1">Calculating distance...</p>
            ) : (
              distance && (
                <p className="text-sm text-gray-500 mt-1">
                  {distance} • {duration}
                </p>
              )
            )}
          </div>

          {/* Right side - Pickup date and time + Modify button */}
          <div className="mt-4 md:mt-0 flex flex-col md:items-end gap-4 text-sm text-gray-700">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2 text-blue-500" />
              <span>
                Pick up: <span className="font-semibold">{formattedDate}</span>
              </span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2 text-blue-500" />
              <span>
                Time: <span className="font-semibold">{time}</span>
              </span>
            </div>

            {/* ✅ Modify Button */}
            <button
              onClick={ handleModelOpen}
              className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-fit"
            >
              Modify Details
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Modal */}
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


      {/* Our Promise */}

      <div className="text-center mb-4">
        <Image
          src="/cabHeading.jpg" // Replace this with your actual image path
          alt="Top Rated Cabs & Chauffeurs"
          width={1000} // Adjust width as needed
          height={600} // Adjust height as needed
          className="mx-auto rounded-lg shadow-lg"
        />
      </div>

      {/* Car Options */}
      {distance ? <div className="container mx-auto px-4 space-y-4 mb-12">
        {cars.map((car, index) => (

          <div key={index}>
            <CarCard
              discountedPrice={car.finalPrice + 1000}
              finalPrice={car.finalPrice}
              carName={car?.name}
              carImage={car?.image}
              details={{
                baseFareKm: String(car?.distance),
                driverAllowance: true,
                stateTaxAndToll: false,
                gstPercentage: 5
              }}
              onBookNow={handleBookNow}
            />
          </div>
        ))}
      </div> : "Loading"}
    </div>
  );
}
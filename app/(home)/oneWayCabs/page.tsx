"use client";

import { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";

import { ArrowRight, Car, CheckCircle, Dog, Languages, Luggage } from "lucide-react";
import Link from "next/link";
import Image from 'next/image';


const routes = [
  {
    from: "Bangalore",
    to: "Coorg",
    label: "Bangalore to Coorg road trip",
    distance: "254 km",
    time: "6 hours",
    bookText: "Bangalore to Coorg cabs",
  },
  {
    from: "Pune",
    to: "Bhimashankar",
    label: "Pune to Bhimashankar by road",
    distance: "124 km",
    time: "4 hours",
    bookText: "Pune to Bhimashankar cabs",
  },
  {
    from: "Dehradun",
    to: "Delhi",
    label: "Dehradun to Delhi road trip",
    distance: "239 km",
    time: "6 hours",
    bookText: "Dehradun to Delhi cabs",
  },
  {
    from: "Bangalore",
    to: "Mysore",
    label: "Bangalore to Mysore cab fares",
    distance: "282 km",
    time: "7 hours",
    bookText: "Bangalore to Mysore cab fares",
  },
  {
    from: "Jammu",
    to: "Srinagar",
    label: "Jammu to Srinagar road trip",
    distance: "244 km",
    time: "6 hours",
    bookText: "Jammu to Srinagar cabs",
  },
  {
    from: "Hyderabad",
    to: "Goa",
    label: "Hyderabad to Goa road trip",
    distance: "667 km",
    time: "15 hours",
    bookText: "Hyderabad to Goa cabs",
  },
];
type Route = {
  route: string;
  price: string;
  routeSlug: string;
};

type RegionRoutes = {
  [city: string]: Route[];
};

type OneWayRoutes = {
  [region: string]: RegionRoutes;
};

type ApiResponse = {
  message: string;
  data: Array<{
    city: {
      cityName: string;
      title: string;
      price: string;
    };
    _id: string;
    zone: string;
    __v: number;
  }>;
};

const OneWayCabPage = () => {
  const [oneWayRoutes, setOneWayRoutes] = useState<OneWayRoutes>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const topRoutes = [
    { route: "Mumbai to Pune", sedan: "₹1865", suv: "₹2368" },
    { route: "Pune to Mumbai", sedan: "₹2545", suv: "₹2597" },
    { route: "Dehradun to Delhi", sedan: "₹3188", suv: "₹4048" }
  ];

  const features = [
    { icon: <CheckCircle className="w-5 h-5" />, title: "Service Guaranteed", description: "Seamless travel experience from booking to drop" },
    { icon: <Car className="w-5 h-5" />, title: "Well-maintained Cars", description: "Regularly serviced vehicles for your safety" },
    { icon: <Languages className="w-5 h-5" />, title: "Language-fluent Chauffeurs", description: "Drivers who speak your preferred language" },
    { icon: <Luggage className="w-5 h-5" />, title: "Luggage Carriers", description: "Dedicated space for your belongings" },
    { icon: <Dog className="w-5 h-5" />, title: "Pet-friendly Cabs", description: "Travel comfortably with your furry friends" }
  ];

  const regionPairs = [
    ["North India", "South India"],
    ["West India", "East India"],
    ["Central India", ""]
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_baseURL}/api/oneWayCabs/get-city`);

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data: ApiResponse = await response.json();

        // Transform the API data into the required format
        const transformedData: OneWayRoutes = {};

        data.data.forEach(item => {
          let region = "";
          // Determine the region based on zone
          switch (item?.zone?.toLowerCase()) {
            case 'north':
              region = "North India";
              break;
            case 'south':
              region = "South India";
              break;
            case 'east':
              region = "East India";
              break;
            case 'west':
              region = "West India";
              break;
            case 'central':
              region = "Central India";
              break;
            default:
              region = "Other Regions";
          }

          const cityName = item?.city?.cityName;
          const route = {
            route: item?.city?.title,
            price: `₹${item?.city?.price}`,
            routeSlug: item?.city?.title?.toLowerCase().replace(/\s+/g, '-')
          };

          if (!transformedData[region]) {
            transformedData[region] = {};
          }

          if (!transformedData[region][cityName]) {
            transformedData[region][cityName] = [];
          }

          transformedData[region][cityName].push(route);
        });

        setOneWayRoutes(transformedData);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="p-6 max-w-6xl mx-auto flex justify-center items-center h-64">
        <p>Loading routes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-6xl mx-auto flex justify-center items-center h-64">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Top Banner */}
      <Card className="p-6 shadow-lg mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-gray-100 transition-all hover:shadow-xl hover:-translate-y-0.5">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-800 bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            Explore One-Way Cab Routes
          </h1>
          <p className="text-indigo-500/90 font-medium">
            Click on a route to view more details.
          </p>
        </div>
        <div className="mt-4 flex justify-end">
          <ArrowRight className="w-5 h-5 text-indigo-500" />
        </div>
      </Card>

      {/* Regional Pairs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {regionPairs.map((pair, index) => (
          <div key={index} className="flex flex-col gap-8">
            {pair.map((region) => (
              region && ( // Only render if region is not empty
                <div key={region}>
                  <h2 className="text-xl font-semibold mb-4">{region}</h2>
                  {oneWayRoutes[region] ? (
                    <Accordion type="single" collapsible>
                      {Object.entries(oneWayRoutes[region]).map(([city, routes]) => (
                        <AccordionItem key={city} value={city}>
                          <AccordionTrigger>{city}</AccordionTrigger>
                          <AccordionContent>
                            <ul className="space-y-2">
                              {routes.map((route, i) => (
                                <li
                                  key={i}
                                  className="border rounded hover:bg-gray-100 transition-colors duration-200"
                                >
                                  <Link href={`/bookOneWayCab/bookOneWayCab/${route.routeSlug}`} className="flex justify-between p-2">
                                    <span>{route.route}</span>
                                    <span className="font-medium">{route.price}</span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  ) : (
                    <p className="text-gray-500">No routes available for this region</p>
                  )}
                </div>
              )
            ))}
          </div>
        ))}
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Budget Section */}
        <section className="bg-white py-10 px-4 md:px-10 lg:px-20 text-gray-800">
          <div className="max-w-5xl mx-auto text-start">
               <p className="mb-3 text-sm md:text-base leading-relaxed">
            Experience convenience and affordability with Txigo’s one-way cab service, with the freedom of choosing the perfect cab that fits your travel requirements and budget.
          </p>
            <h2 className="text-xl md:text-2xl font-bold mb-4">
              Book one-way cabs for one-way journeys
            </h2>

            <p className="mb-3 text-sm md:text-base leading-relaxed">
              One-way cabs are best for customers seeking a point-to-point drop without a return trip, especially if they are unsure of the return journey. Whether you require a one-way drop taxi to the airport, railway station, nearby city, hill station, or beach destination, Txigo’s one-way car rental guarantees a safe, secure, and hassle-free travel experience.
            </p>
            <h2 className="text-xl md:text-2xl font-bold mb-4">
              Txigo's one-way cab fares for top routes
            </h2>
            <p className="mb-5 text-sm md:text-base leading-relaxed">
              Txigo offers a one-way taxi tariff for its one-way car rental service, ensuring customers pay for only what their trip entails rather than a hefty roundtrip fee for a point-to-point journey. This renders us one of the cheapest one-way car rental providers in the country, making our services quite pocket-friendly for travelers. Here is the list of our one-way taxi fares for top destinations.
            </p>

            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border border-gray-200 text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="text-left py-2 px-3 font-semibold border-b">Cab Type</th>
                    <th className="text-left py-2 px-3 font-semibold border-b">Price Starting From</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 px-3">AC Hatchbacks</td>
                    <td className="py-2 px-3">₹12/km</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-3">AC Sedans</td>
                    <td className="py-2 px-3">₹13.5/km</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-3">AC Premium SUVs</td>
                    <td className="py-2 px-3">₹16/km</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3">AC Tempo Travellers</td>
                    <td className="py-2 px-3">₹26/km</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border border-gray-200 text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="text-left py-2 px-3 font-semibold border-b">Top Routes (starting from)</th>
                    <th className="text-left py-2 px-3 font-semibold border-b">Sedan</th>
                    <th className="text-left py-2 px-3 font-semibold border-b">SUV</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 px-3">Mumbai to Pune one-way cab fares</td>
                    <td className="py-2 px-3">₹1865</td>
                    <td className="py-2 px-3">₹2368</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-3">Pune to Mumbai one-way cab fares</td>
                    <td className="py-2 px-3">₹2545</td>
                    <td className="py-2 px-3">₹2597</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3">Dehradun to Delhi one-way cab fares</td>
                    <td className="py-2 px-3">₹3188</td>
                    <td className="py-2 px-3">₹4048</td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>
        </section>

        {/* Cab Options */}
        <section className="flex flex-col justify-center items-center py-10">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2 text-center">
            Wide range of one-way cab options with Txigo
          </h2>
          <p className="mb-6 text-gray-600 px-4 text-center max-w-2xl text-sm">
            Txigo provides multiple options for one-way taxis to suit travelers' different needs and preferences. From compact cars suitable for solo or couple journeys to spacious SUVs ideal for groups of up to eight members, Txigo's fleet has the perfect vehicle to make your journey comfortable and convenient.
          </p>

          <div className="w-full bg-blue-300 shadow-lg rounded-xl p-4 mx-2">
            <h2 className="text-xl md:text-2xl font-bold text-white border-b border-white pb-2 mb-4 text-center">
              Our Car Options
            </h2>

            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 md:gap-6">
              {[
                { src: "/inova-crysta.jpg", title: "Hatchback", seats: "4 Seater" },
                { src: "/etios-cab.jpg", title: "Sedan", seats: "4 Seater" },
                { src: "/suv.jpg", title: "SUV Large", seats: "7 Seater" },
                { src: "/tempo-1.jpg", title: "Full Size Van", seats: "12 Seater" },
              ].map((car, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 sm:gap-4 p-2 shrink-0"
                >
                  <div className="rounded-full border-2 border-black p-1 sm:p-2">
                    <Image
                      src={car.src}
                      alt={car.title}
                      width={40}
                      height={40}
                      className="rounded-full object-cover sm:w-[70px] sm:h-[70px]"
                    />
                  </div>
                  <div className="text-[10px] sm:text-sm">
                    <h3 className="font-semibold text-gray-800">{car.title}</h3>
                    <p className="text-gray-700">{car.seats}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* Fleet Options */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-200 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left py-2 px-3 font-semibold border-b">Popular Routes</th>
                <th className="text-left py-2 px-3 font-semibold border-b">Total Distance</th>
                <th className="text-left py-2 px-3 font-semibold border-b">Time Taken</th>
                <th className="text-left py-2 px-3 font-semibold border-b">Book an Outstation Roundtrip Cab</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2 px-3">Bangalore to Coorg road trip</td>
                <td className="py-2 px-3">254 km</td>
                <td className="py-2 px-3">6 hours</td>
                <td className="py-2 px-3 text-blue-600 cursor-pointer hover:underline">Bangalore to Coorg cabs</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-3">Pune to Bhimashankar by road</td>
                <td className="py-2 px-3">124 km</td>
                <td className="py-2 px-3">4 hours</td>
                <td className="py-2 px-3 text-blue-600 cursor-pointer hover:underline">Pune to Bhimashankar cabs</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-3">Dehradun to Delhi road trip</td>
                <td className="py-2 px-3">239 km</td>
                <td className="py-2 px-3">6 hours</td>
                <td className="py-2 px-3 text-blue-600 cursor-pointer hover:underline">Dehradun to Delhi cabs</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-3">Bangalore to Mysore cab fares</td>
                <td className="py-2 px-3">282 km</td>
                <td className="py-2 px-3">7 hours</td>
                <td className="py-2 px-3 text-blue-600 cursor-pointer hover:underline">Bangalore to Mysore cab fares</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-3">Jammu to Srinagar road trip</td>
                <td className="py-2 px-3">244 km</td>
                <td className="py-2 px-3">6 hours</td>
                <td className="py-2 px-3 text-blue-600 cursor-pointer hover:underline">Jammu to Srinagar cabs</td>
              </tr>
              <tr>
                <td className="py-2 px-3">Hyderabad to Goa road trip</td>
                <td className="py-2 px-3">667 km</td>
                <td className="py-2 px-3">15 hours</td>
                <td className="py-2 px-3 text-blue-600 cursor-pointer hover:underline">Hyderabad to Goa cabs</td>
              </tr>
            </tbody>
          </table>
        </div>


        <div className="max-w-4xl mx-auto p-6 font-sans">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">one-way taxi services by Txigo</h1>
          <p className="text-gray-600 mb-6">Txigo offers one-way taxi services for local, outstation, and airport transfers, allowing customers to choose any service based on their travel requirements and preferences.</p>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Outstation one-way cabs</h2>
            <p className="text-gray-600 mb-4">Txigo extends one-way taxi services to outstation and airport transfers, allowing customers to choose any service based on their travel requirements and budget.</p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Outstation one-way cabs</h2>
            <p className="text-gray-600 mb-4">Txigo's outstation one-way cabs are perfect for point-to-point trips, offering customers the freedom to choose any one-way car rental based on their travel itinerary and group size. We are also flexible with multiple stops, short detours, and breaks at popular destinations or eateries en route during the journey, guaranteeing a wholesome road trip experience combined with utmost safety and complete customer satisfaction.</p>
          </div>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">One-way airport taxi service</h2>
            <p className="text-gray-600 mb-4">Txigo's one-way airport taxi service is ideal for airport pickup and drop-off from any outstation destination to the airport and vice versa. With a promise of on-time arrival and the guarantee of never missing a flight, Txigo's chauffeur-driven one-way airport cabs make airport transfers smooth and stress-free.</p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">How to book a one-way taxi with Txigo?</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium text-gray-800 mb-2">Book your ride on our website:</h3>
                <p className="text-gray-600">Visit Txigo's official website to hire one-way cabs, choose your preferred car type, enter your details, and get instant confirmation. Our user-friendly website provides a streamlined booking experience, allowing you to complete your one-way cab booking with ease.</p>
              </div>
              <div>
                <h3 className="text-xl font-medium text-gray-800 mb-2">Download the app:</h3>
                <p className="text-gray-600">Txigo's Android and iOS cab booking application is a handy app that allows you to book, manage, and engage with just a few clicks. By downloading the Txigo cab booking app, you can enjoy exclusive app-only deals and stay updated on current trends.</p>
              </div>
              <div>
                <h3 className="text-xl font-medium text-gray-800 mb-2">Call center:</h3>
                <p className="text-gray-600">Experience the personal touch added by Txigo's dedicated call center, offering the best solutions and support for all travel queries. Give us a call at <span className="font-semibold">9045450000</span> for 24x7 support.</p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Why choose Txigo's one-way car rental?</h2>
            <p className="text-gray-600 mb-4">As India's top-rated car rental company, Txigo Car Rentals offers the best cab service, promising comfort, safety, and convenience in every ride. Renowned for exceptional service, Txigo stands out for customers seeking reliable one-way cab solutions. Txigo's commitment to quality, combined with nearly 20 years of experience in the industry, ensures that every ride in our well-maintained cabs driven by expert chauffeurs is a delightful and memorable experience.</p>

            <div className="grid grid-cols-1 gap-6 mt-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-800 mb-2">Safety first:</h3>
                <p className="text-gray-600">Safety is our top priority. We adhere to strict safety protocols, including regular vehicle inspections and driver training, to guarantee a secure journey for every passenger. On Tripadvisor, we have a score of 4.2 for safety.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-800 mb-2">Well-maintained cars:</h3>
                <p className="text-gray-600">We understand the importance of a reliable vehicle for a smooth journey. That's why our cars are rigorously maintained to the highest standards, ensuring not only comfort but also reliability on the road.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-800 mb-2">Service guaranteed:</h3>
                <p className="text-gray-600">At Txigo, we pride ourselves on our commitment to exceptional service. From the moment you book with us, every detail is handled with utmost care to ensure a seamless and satisfying travel experience.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-800 mb-2">Expert chauffeurs:</h3>
                <p className="text-gray-600">Our chauffeurs are more than drivers; they are seasoned professionals. Skilled in navigation and customer service, they are equipped to make your journey comfortable and efficient.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-800 mb-2">All-inclusive fares:</h3>
                <p className="text-gray-600">Txigo's all-inclusive fares comprise driver allowance, GST, toll taxes, and fuel charges. Our transparent pricing policy ensures no hidden costs are added to the final bill.</p>
              </div>
            </div>

          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Txigo's exclusive cab services for an upgraded travel experience</h2>
            <p className="text-gray-600 mb-4">Txigo sets a new standard in transportation with its specialized cab services, available across 20+ major Indian cities. These services transcend traditional travel, offering journeys defined by exceptional comfort and personalized attention. At Txigo, travel is not just about reaching a destination—it's about curating a seamless, enjoyable road trip experience tailored to each passenger's unique needs, turning every journey into a cherished memory.</p>

            <div className="grid grid-cols-1 gap-6 mt-6">
              <div className="border border-gray-200 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-800 mb-2">Cabs equipped with luggage carriers</h3>
                <p className="text-gray-600">We recognize the importance of hassle-free travel, especially when it comes to managing luggage. Therefore, our vehicles come with dedicated luggage carriers, ensuring your belongings are transported securely and conveniently. This thoughtful feature underscores our commitment to delivering a seamless, stress-free travel experience.</p>
              </div>
              <div className="border border-gray-200 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-800 mb-2">Language-fluent chauffeurs</h3>
                <p className="text-gray-600">We enhance your travel experience by providing a driver fluent in your preferred language, ensuring a truly personalized journey. This service not only eliminates language barriers but also fosters a comfortable and engaging environment where you feel understood and at ease throughout your trip.</p>
              </div>
              <div className="border border-gray-200 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-800 mb-2">VIP-assisted pickup</h3>
                <p className="text-gray-600">Txigo's VIP-assisted pickup service offers a seamless blend of luxury and convenience, ensuring a smooth journey from your doorstep to any destination. From the moment you step outside, you are greeted with a personalized welcome, setting the stage for an exceptional travel experience. With a focus on delivering unparalleled comfort and className, Txigo redefines hassle-free travel with its commitment to excellence.</p>
              </div>
              <div className="border border-gray-200 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-800 mb-2">New car promise</h3>
                <p className="text-gray-600">Travel in style with our modern fleet of brand-new vehicles with the best features and amenities. We regularly update our fleet to offer the latest car models, ensuring you enjoy a ride with great convenience and elegance. Our dedication to providing a "new car" experience guarantees an unparalleled journey every time.</p>
              </div>
              <div className="border border-gray-200 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-800 mb-2">Pet-friendly cabs</h3>
                <p className="text-gray-600">Distressed about finding reliable caretakers for your furry friends? Not anymore. Embark on an unforgettable road trip to your favorite destination with Txigo's pet-friendly cabs—the ideal choice for pet parents and their furry companions. With a pet-friendly chauffeur at the helm, every journey is designed to be smooth, safe, and truly memorable.</p>
              </div>
            </div>

          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">About Txigo Car Rentals</h2>
            <p className="text-gray-600">Txigo Car Rentals, established in 2006, is India's leading chauffeur-driven car rental service provider. Demonstrating an unwavering commitment to reliability, safety, and affordability, Txigo has a presence in over 2,000 cities across the country, creating the most extensive geographical network of cab services.</p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Frequently asked questions by Txigo customers</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-medium text-gray-800 mb-2">How to book a one-way taxi with Txigo?</h3>
                <p className="text-gray-600">You can create a one-way cab booking with Txigo by visiting our website, downloading our car rental app, or calling our customer care team at 9045450000.</p>
              </div>
              <div>
                <h3 className="text-xl font-medium text-gray-800 mb-2">Can I make stops during my one-way journey with Txigo?</h3>
                <p className="text-gray-600">Yes. With Txigo, your one-way journey is completely customizable. You can make multiple stops, take short detours, or visit popular tourist sites en route to your destination. Our courteous chauffeurs are flexible with your itineraries, ensuring an enhanced travel experience and complete customer satisfaction.</p>
              </div>
              <div>
                <h3 className="text-xl font-medium text-gray-800 mb-2">Are there any hidden charges for one-way cab services?</h3>
                <p className="text-gray-600">No. Txigo follows a transparent pricing policy and all-inclusive fares for a one-way taxi, where the ride price includes the driver charges, fuel charges, tolls and taxes, and GST, with no hidden or additional prices added to the final bill. What you see at the end of the trip is what you pay.</p>
              </div>
              <div>
                <h3 className="text-xl font-medium text-gray-800 mb-2">Are one-way cabs suitable for airport transfers?</h3>
                <p className="text-gray-600">Certainly! Booking a one-way taxi is perfect for airport transfers, as you can enjoy door-to-door service and the promise of reaching the airport on time. Whether you have to pick up your guests from the airport or drop them off, a one-way cab service eliminates the hassle of booking separate cabs for a return journey, saving you time and money.</p>
              </div>
              <div>
                <h3 className="text-xl font-medium text-gray-800 mb-2">Does Txigo provide doorstep pickup and drop-off for one-way cabs?</h3>
                <p className="text-gray-600">Yes. Txigo offers doorstep pickup and drop-off for one-way cabs to customers making a one-way cab booking with us. Whether you require cabs for outstation trips, running local errands, or airport transfers, Txigo offers a dedicated cab and a professional chauffeur until your trip is completed.</p>
              </div>
              <div>
                <h3 className="text-xl font-medium text-gray-800 mb-2">Are Txigo's one-way cabs available for all routes?</h3>
                <p className="text-gray-600">Txigo offers one-way cab service across more than 2000 cities in India. You can book a one-way car rental from top cities like Delhi, Bangalore, Mumbai, Chennai, Pune, Kolkata, Mysore, etc., and travel to popular destinations like Shimla, Manali, Pondicherry, Coorg, Varkala, and more conveniently. We also offer services in tier-three cities and remote towns, ensuring the availability of cabs for all your travel needs.</p>
              </div>
              <div>
                <h3 className="text-xl font-medium text-gray-800 mb-2">What types of vehicles do you offer for one-way rides?</h3>
                <p className="text-gray-600">Txigo has an extensive fleet with multiple cab options, including compact hatchbacks (Tata Indica), comfortable sedans (Swift Dzire, Toyota Etios, Tata Indigo), SUVs (Mahindra Xylo, Maruti Ertiga), and Toyota Innova and Innova Crysta cabs. For groups larger than 8, you can also hire a tempo traveller or a minibus.</p>
              </div>
              <div>
                <h3 className="text-xl font-medium text-gray-800 mb-2">What is Txigo's cancellation policy?</h3>
                <p className="text-gray-600">You may cancel the booking 24 hours before the journey time without any cancellation charges for all services. In case cancellation or shorting of the trip is requested within 24 hours of the pick-up time, then the following rules will apply:</p>
                <ul className="list-disc pl-5 mt-2 text-gray-600">
                  <li className="mb-1">Multi-day trip: The charge for the first day will be deducted from the total amount, and the user will receive a refund.</li>
                  <li className="mb-1">Single Day trip/ Airport transfer: No Refund will be issued to the user.</li>
                  <li>Airport transfer: No cancellation charges apply if cancelled at least 2 hours before pickup time.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <section className=" py-10">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-semibold mb-6 border-t border-b border-gray-300 py-4">
              Popular Cab Services by Txigo
            </h2>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-blue-600 font-medium">
              <li>
                <a href="/" className="hover:underline">Homepage</a>
              </li>
              <li>
                <a href="/oneWayCabs" className="hover:underline">One Way Cabs</a>
              </li>
              <li>
                <a href="/services/airport" className="hover:underline">Airport Taxi</a>
              </li>
              <li>
                <a href="/services/corporate" className="hover:underline">Corporate Car Rental</a>
              </li>
              <li>
                <a href="/" className="hover:underline">Roundtrip Cabs</a>
              </li>
              <li>
                <a href="/services/tempo-travellers" className="hover:underline">Tempo Travellers and Minibuses</a>
              </li>
            </ul>
          </div>
        </section>
      </div>

    </div>
  );
};

export default OneWayCabPage;
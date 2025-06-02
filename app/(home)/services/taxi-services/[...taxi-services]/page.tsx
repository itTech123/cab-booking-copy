"use client"

import { BookingForm } from "@/components/BookingForm";
import { CustomerReviewSlider } from "@/components/customer-review";
import StatsSection from "@/components/StatasSection";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type CityPrice = {
    _id: string;
    name: string;
    price: {
        acSedans: string;
        acSUVsAndMUVs: string;
        premiumSUVs: string;
        acTempoTravellers: string;
    };
};

export default function TaxiServicesPage() {

    const params = useParams()
    const rawCity = params?.["taxi-services"];
    const [cityData, setCityData] = useState<CityPrice | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const city =
        typeof rawCity === "string"
            ? rawCity
            : Array.isArray(rawCity) && rawCity.length > 0
                ? rawCity[0]
                : "";
    const cityName = city ? city.charAt(0).toUpperCase() + city.slice(1) : "";

    useEffect(() => {
        const fetchCityData = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch(`${process.env.NEXT_PUBLIC_baseURL}/api/city/cities`);
                if (!response.ok) {
                    throw new Error("Failed to fetch city data");
                }

                const data: CityPrice[] = await response.json();

                // Find the city that matches (could be "Kolkata" or "Kolkata West Bengal")
                const matchedCity = data.find((c) =>
                    c.name.toLowerCase().includes(city.toLowerCase())
                );

                if (!matchedCity) {
                    throw new Error(`No pricing data found for ${cityName}`);
                }

                setCityData(matchedCity);
            } catch (err) {
                console.error("Error fetching city data:", err);
                setError(err instanceof Error ? err.message : "Failed to load pricing data");
            } finally {
                setLoading(false);
            }
        };

        if (city) {
            fetchCityData();
        }
    }, [city, cityName]);

    console.log(cityData)
    return (
        <>
            <div className="relative  md:min-h-[100vh] ">

                {/* Full-screen background image */}
                <div className=" absolute inset-0 -z-10">
                    <Image
                        src="/banner.jpg"
                        alt="Travel Background"
                        fill
                        className="object-cover"
                        priority
                        quality={100}
                    />
                    <div className="absolute inset-0 bg-black/30" /> {/* Overlay */}
                </div>

                {/* Centered booking card */}
                <div className="flex flex-col items-center justify-center p-4 space-y-8 text-center min-h-[70vh]">
                    {/* Enhanced Heading Text */}
                    <div className="space-y-4">
                        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-xl">
                            <span className="bg-clip-text ">
                                Taxi Services in  {cityName}
                            </span>
                        </h1>

                    </div>

                    {/* Booking Form Card */}
                    <div className="w-full max-w-6xl rounded-xl ">
                        <div className="w-full">
                            <BookingForm />
                        </div>
                    </div>
                </div>

                <section className="rounded-xl my-3 p-2  md:my-6 shadow-md max-w-3xl mx-auto  text-center flex items-center justify-center gap-4">
                    {/* Left leaf image */}
                    <Image src="/rightLeaf.png" alt="Left Leaf" height={20} width={20} className=" object-contain" />

                    {/* Text with responsive sizing */}
                    <h2 className="text-[12px] sm:text-sm md:text-lg lg:text-2xl font-extrabold tracking-wide text-white whitespace-nowrap overflow-hidden text-ellipsis">
                        India's Top Rated Car Rental Service
                    </h2>

                    {/* Right leaf image */}
                    <Image src="/leftLeaf.png" alt="Right Leaf" height={20} width={20} className=" object-contain" />
                </section>


            </div>

            <StatsSection />

            <CustomerReviewSlider />

            <section className="w-full mt-12">
                <div className="w-[70%] max-w-screen-xl mx-auto text-center rounded-xl px-4 py-6 bg-white border border-blue-500 shadow-[0_0_35px_8px_rgba(59,130,246,0.6)]">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-6 pb-2 border-t-4 border-b-4 border-blue-500 inline-block px-6">
                        Featured In
                    </h2>

                    <div className="flex flex-wrap justify-center items-center gap-6 mt-4">
                        <img
                            src="/business-standred.png"
                            alt="Featured in Business Standard"
                            className="h-24 md:h-28 object-contain px-2"
                        />
                        <img
                            src="/mint.png"
                            alt="Featured in Mint"
                            className="h-20 md:h-24 object-contain px-2"
                        />
                        <img
                            src="/hindustan-times.png"
                            alt="Featured in Hindustan Times"
                            className="h-24 md:h-28 object-contain px-2"
                        />
                    </div>
                </div>
            </section>


            {/* Price Chart Section */}
            <section className="w-full py-12 bg-gray-50 px-4 md:px-8">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
                        Taxi Prices in {cityName}
                    </h2>

                    {loading ? (
                        <div className="text-center py-8">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                            <p className="mt-2 text-gray-600">Loading pricing information...</p>
                        </div>
                    ) : error ? (
                        <div className="text-center py-8 text-red-500">
                            <p>{error}</p>
                        </div>
                    ) : cityData ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                                <thead className="bg-blue-100 text-gray-700 text-sm uppercase">
                                    <tr>
                                        <th className="py-3 px-6 text-left">Vehicle Type</th>
                                        <th className="py-3 px-6 text-left">Fare</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-700 text-sm divide-y divide-gray-200">
                                    <tr className="hover:bg-gray-50">
                                        <td className="py-3 px-6">AC Sedans</td>
                                        <td className="py-3 px-6">{cityData.price.acSedans}</td>
                                    </tr>
                                    <tr className="hover:bg-gray-50">
                                        <td className="py-3 px-6">AC SUVs & MUVs</td>
                                        <td className="py-3 px-6">{cityData.price.acSUVsAndMUVs}</td>
                                    </tr>
                                    <tr className="hover:bg-gray-50">
                                        <td className="py-3 px-6">Premium SUVs</td>
                                        <td className="py-3 px-6">{cityData.price.premiumSUVs}</td>
                                    </tr>
                                    <tr className="hover:bg-gray-50">
                                        <td className="py-3 px-6">AC Tempo Travellers</td>
                                        <td className="py-3 px-6">{cityData.price.acTempoTravellers}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="bg-blue-50 mt-4 px-4 py-3 text-sm text-blue-700 border-t border-blue-100 rounded-b-md">
                                <p>Prices are indicative and may vary based on distance and time</p>
                            </div>
                        </div>
                    ) : null}
                </div>
            </section>


            <section className="bg-white py-10">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-2xl font-semibold mb-6 border-t border-b border-gray-300 py-4">
                        Book the Best Taxi Service in {cityName}
                    </h2>

                    <p className="mb-4">
                        Our Company has been a trusted name in taxi services in {cityName} for over 12 years, offering safe, comfortable, and on-time rides. Whether you’re heading across the city or planning a long-distance trip, we have a fleet of well-maintained vehicles — from sedans and hatchbacks to MUVs and SUVs — to suit your travel needs. Booking a taxi is easy with our 24/7 service and user-friendly online platform.
                    </p>

                    <p className="mb-4">
                        Choose our cab service in {cityName} for a reliable and smooth travel experience. Our professional drivers, clean cars, and timely service make every ride comfortable and worry-free.
                    </p>

                    <p className="mb-4">
                        Whether it’s for daily commutes, airport transfers, business meetings, or weekend getaways, Our Company offers flexible taxi services across {cityName}. Book in just a few clicks and enjoy hassle-free travel.
                    </p>

                    <p className="mb-4">
                        With competitive pricing and a decade of experience in the industry, Our Company is proud to be one of the most trusted taxi service providers in {cityName}.
                    </p>

                    <h3 className="text-xl font-medium mt-8 mb-4">Travel by Car in {cityName}</h3>

                    <p className="mb-4">
                        Getting around {cityName} by car is the most convenient way to explore. Whether you're heading to work or out for a day trip, our taxis ensure a comfortable ride with the flexibility to take breaks along the way.
                    </p>

                    <p className="mb-4">
                        Enjoy seasonal discounts and holiday offers while traveling in and around {cityName}. We make quality travel affordable for everyone.
                    </p>

                    <p className="mb-6">
                        Use our simple online booking system to reserve your ride in {cityName} within minutes. Experience top-notch service with no stress.
                    </p>

                    <h3 className="text-xl font-medium mb-4">Car Rental Options</h3>

                    <p className="mb-6">
                        We offer a variety of cars to choose from in {cityName} — including Indica, Etios, Innova, and luxury vehicles. Select the perfect car based on your preferences and budget.
                    </p>

                    <h3 className="text-xl font-medium mb-4">FAQs</h3>

                    <div className="space-y-4">
                        <Card>
                            <CardContent className="p-4">
                                <p className="font-medium mb-1">How can I book a cab in {cityName}?</p>
                                <p>You can easily book online through our website or mobile app. You can also call us directly at 9045450000 to book your taxi in {cityName}.</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-4">
                                <p className="font-medium mb-1">Do you offer one-way taxi services in {cityName}?</p>
                                <p>Yes, we provide one-way and round-trip taxi services. You only pay for what you use — no hidden charges.</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-4">
                                <p className="font-medium mb-1">Can I choose a specific car model?</p>
                                <p>Yes, you can choose from our wide range of cars while booking your ride in {cityName}.</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-4">
                                <p className="font-medium mb-1">How do I get a taxi from {cityName} airport?</p>
                                <p>We offer airport pickup and drop services in {cityName}. Just call 9045450000 or book online to schedule your ride.</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>



            <section className=" py-10">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-2xl font-semibold mb-6 border-t border-b border-gray-300 py-4">
                        Useful Links for Cab Booking
                    </h2>

                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-blue-600 font-medium">
                        <li>
                            <a href="/services/taxi-services/ranchi" className="hover:underline">Taxi Servics Ranchi</a>
                        </li>
                        <li>
                            <a href="/services/taxi-services/howrah" className="hover:underline">Taxi Servics howrah</a>
                        </li>
                        <li>
                            <a href="/services/taxi-services/jamshedpur" className="hover:underline">Taxi Servics Jamshedpur</a>
                        </li>
                        <li>
                            <a href="/services/taxi-services/nagpur" className="hover:underline">Taxi Services Nagpur</a>
                        </li>
                        <li>
                            <a href="/services/taxi-services/kanpur" className="hover:underline">Taxi Services Kanpur</a>
                        </li>
                        <li>
                            <a href="/services/taxi-services/pune" className="hover:underline">Taxi Services Pune</a>
                        </li>
                    </ul>
                </div>
            </section>

        </>
    )
}

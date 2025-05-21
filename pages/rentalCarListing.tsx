"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { fleetData } from "@/data"
import { ChevronUp, ChevronDown, X, ShieldCheck, XCircle, User, Users, Snowflake, Sun } from 'lucide-react';
import { BookingForm } from "@/components/BookingForm"
import Image from "next/image"

export default function CarListingPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const fromCity = searchParams?.get("fromCity") || "Not specified";
    const date = searchParams?.get("date");
    const time = searchParams?.get("time") || "Not specified";
    const packageItem = searchParams?.get("package") || "";
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activePackageTab, setActivePackageTab] = useState(packageItem.toLowerCase());
    const [selectedCarIndex, setSelectedCarIndex] = useState(0);

    const [showDetails, setShowDetails] = useState(false);
    const [activeTab, setActiveTab] = useState('inclusions');

    const formattedDate = date ? format(new Date(date), "dd MMM yyyy") : "Not specified";
    const [isLoggedin, setIsLoggedIn] = useState(false)

    const allPackageNames = Array.from(
        new Set(
            fleetData.flatMap((car) =>
                car.packages.map((pkg) => pkg.name.toLowerCase())
            )
        )
    );

    const filteredCars = fleetData
        .map((car) => {
            if (activePackageTab === "all") {
                return car;
            }

            const hasSelectedPackage = car.packages.some(
                (pkg) => pkg.name.toLowerCase() === activePackageTab
            );

            if (hasSelectedPackage) {
                const selectedPackage = car.packages.find(
                    (pkg) => pkg.name.toLowerCase() === activePackageTab
                );
                return {
                    ...car,
                    packages: [selectedPackage],
                };
            }
            return null;
        })
        .filter(Boolean);


    const handleBookNow = (price: string | number, type: string) => {
        const queryObject: Record<string, string> = {
            fromCity: fromCity,
            date: date ? date : "",
            price: price.toString(),
            time: time,
            type: type,
            tripType: "Rental"
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
            {/* for large devices */}
            <div className=" bg-[#e3fcde] hidden md:block container mx-auto px-4 py-6 max-w-6xl">
                {/* Header section with trip details */}
                <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm border mb-6">
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                        {activePackageTab === "all"
                            ? "Available Cars"
                            : `Available Cars (${activePackageTab})`}
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-sm">
                        <div className="space-y-1">
                            <p className="text-gray-500 dark:text-gray-400">From City</p>
                            <p className="font-medium">{fromCity}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-gray-500 dark:text-gray-400">Date</p>
                            <p className="font-medium">{formattedDate}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-gray-500 dark:text-gray-400">Time</p>
                            <p className="font-medium">{time}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-gray-500 dark:text-gray-400">Package</p>
                            <p className="font-medium">
                                {activePackageTab === "all" ? "All Packages" : activePackageTab}
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

                <div className="text-center mb-4">
                    <Image
                        src="/cabHeading.jpg" // Replace this with your actual image path
                        alt="Top Rated Cabs & Chauffeurs"
                        width={1000} // Adjust width as needed
                        height={600} // Adjust height as needed
                        className="mx-auto rounded-lg shadow-lg"
                    />
                </div>

                {/* Package Tabs */}
                <div className="flex overflow-x-auto gap-2 mb-4 pb-2">

                    <button
                        className={`px-3 py-1.5 rounded-md text-sm font-medium whitespace-nowrap ${activePackageTab === "all"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-100 hover:bg-gray-200"
                            }`}
                        onClick={() => setActivePackageTab("all")}
                    >
                        All Packages
                    </button>
                    {allPackageNames.map((pkgName) => (
                        <button
                            key={pkgName}
                            className={`px-3 py-1.5 rounded-md text-sm font-medium whitespace-nowrap ${activePackageTab === pkgName
                                ? "bg-blue-500 text-white"
                                : "bg-gray-100 hover:bg-gray-200"
                                }`}
                            onClick={() => setActivePackageTab(pkgName)}
                        >
                            {pkgName.charAt(0).toUpperCase() + pkgName.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Car list */}
                <div className="space-y-4">
                    {filteredCars.length > 0 ? (
                        filteredCars.map((car, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-md border border-gray-200 mb-6 overflow-hidden">
                                <div className="flex flex-col md:flex-row">
                                    {/* Left Column - Car Image and Info */}
                                    <div className="md:w-1/3 p-4 flex items-center">
                                        <div className="flex w-full">
                                            <div className="w-5/12 pr-3">
                                                <img
                                                    src={car?.image}
                                                    alt={car?.type}
                                                    className="w-full h-auto rounded"
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).src = '/default-car-image.jpg';
                                                    }}
                                                />
                                            </div>
                                            <div className="w-7/12 pl-2">
                                                <h3 className="font-bold text-lg">{car?.type}</h3>
                                                <div className="flex items-center gap-1 text-sm">
                                                    ⭐ {car?.rating} <span className="text-gray-600">({car?.reviews})</span>
                                                </div>
                                                <div className="flex gap-2 mt-1">
                                                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">{car?.ac ? "AC" : "NON AC"}</span>
                                                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">🧍‍♂️ {car?.seats} seats</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Middle Column - Certification Badges */}
                                    <div className="md:w-1/3 p-4 border-t md:border-t-0 md:border-l border-gray-200 flex items-center">
                                        <div className="w-full">
                                            <div className="flex justify-around text-center text-xs font-bold">
                                                <div className="flex flex-col items-center">
                                                    <img
                                                        src="/icons/toll.png"
                                                        alt="Tax Included"
                                                        className="h-10 w-10 mb-1"
                                                        onError={(e) => {
                                                            (e.target as HTMLImageElement).src = '/default-badge.png';
                                                        }}
                                                    />
                                                    <span className="text-xs">Includes Toll, State Tax & GST</span>
                                                </div>
                                                <div className="flex flex-col items-center">
                                                    <img
                                                        src="/icons/toll.png"
                                                        alt="Exclusions"
                                                        className="h-10 w-10 mb-1"
                                                        onError={(e) => {
                                                            (e.target as HTMLImageElement).src = '/default-badge.png';
                                                        }}
                                                    />
                                                    <span className="text-xs">₹480 Toll included </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Column - Pricing and Action */}
                                    <div className="md:w-1/3 p-4 border-t md:border-t-0 md:border-l border-gray-200 flex items-center">
                                        <div className="w-full flex justify-between items-center">
                                            {/* Price Section */}
                                            <div className="flex flex-col items-end">
                                                {/* Lowest Price badge */}
                                                <div className="bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-1">
                                                    Lowest Price
                                                </div>

                                                {/* Package Name */}
                                                <div className="text-sm font-medium">{car?.packages[0]?.name}</div>

                                                {/* Final Price */}
                                                <div className="text-right">
                                                    <span className="text-2xl font-bold text-gray-900">₹{car?.packages[0]?.price}</span>
                                                </div>

                                                {/* Details Toggle */}
                                                <button
                                                    onClick={() => setShowDetails(!showDetails)}
                                                    className="text-sm text-blue-600 hover:text-blue-800 flex items-center justify-end mt-1"
                                                >
                                                    {showDetails ? 'Hide Details' : 'Details'}
                                                    {showDetails ? (
                                                        <ChevronUp className="w-4 h-4 ml-1" />
                                                    ) : (
                                                        <ChevronDown className="w-4 h-4 ml-1" />
                                                    )}
                                                </button>
                                            </div>

                                            {/* Select Button */}
                                            <button
                                                onClick={() => car?.packages[0]?.price !== undefined && handleBookNow(car.packages[0].price, car?.type)}
                                                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded h-fit"
                                            >
                                                Book Now
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Details Section */}
                                {showDetails && (
                                    <div className="border-t border-gray-200 bg-gray-50 p-4">
                                        <div className="flex justify-between items-center mb-4">
                                            <div className="flex border rounded-lg overflow-hidden">
                                                <button
                                                    onClick={() => setActiveTab('inclusions')}
                                                    className={`px-4 py-2 text-sm font-medium ${activeTab === 'inclusions' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
                                                >
                                                    Inclusions
                                                </button>
                                                <button
                                                    onClick={() => setActiveTab('exclusions')}
                                                    className={`px-4 py-2 text-sm font-medium ${activeTab === 'exclusions' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
                                                >
                                                    Exclusions
                                                </button>
                                                <button
                                                    onClick={() => setActiveTab('facilities')}
                                                    className={`px-4 py-2 text-sm font-medium ${activeTab === 'facilities' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
                                                >
                                                    Facilities
                                                </button>
                                                <button
                                                    onClick={() => setActiveTab('terms')}
                                                    className={`px-4 py-2 text-sm font-medium ${activeTab === 'terms' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
                                                >
                                                    T&C
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => setShowDetails(false)}
                                                className="text-gray-500 hover:text-gray-700"
                                            >
                                                <X className="w-5 h-5" />
                                            </button>
                                        </div>

                                        {/* Tab Content */}
                                        <div className="p-2">
                                            {activeTab === 'inclusions' && (
                                                <div className="flex flex-wrap gap-6">
                                                    <div className="flex items-center gap-2">
                                                        <img
                                                            src="/icons/petrol.png"
                                                            alt="Included"
                                                            className="w-6 h-6"
                                                            onError={(e) => {
                                                                (e.target as HTMLImageElement).src = '/default-icon.png';
                                                            }}
                                                        />
                                                        <span className="text-sm">Base Fare for {activePackageTab} </span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <img
                                                            src="/icons/driver.png"
                                                            alt="Included"
                                                            className="w-6 h-6"
                                                            onError={(e) => {
                                                                (e.target as HTMLImageElement).src = '/default-icon.png';
                                                            }}
                                                        />
                                                        <span className="text-sm">Driver Allowance</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <img
                                                            src="/icons/money.png"
                                                            alt="Included"
                                                            className="w-6 h-6"
                                                            onError={(e) => {
                                                                (e.target as HTMLImageElement).src = '/default-icon.png';
                                                            }}
                                                        />
                                                        <span className="text-sm">State Tax & Toll</span>
                                                    </div>
                                                </div>
                                            )}

                                            {activeTab === 'exclusions' && (
                                                <div className="flex items-center gap-2">
                                                    <img
                                                        src="/icons/pickups.png"
                                                        alt="Excluded"
                                                        className="w-6 h-6"
                                                        onError={(e) => {
                                                            (e.target as HTMLImageElement).src = '/default-icon.png';
                                                        }}
                                                    />
                                                    <span className="text-sm">Night Driving Allowence ₹ 200</span>
                                                </div>
                                            )}

                                            {activeTab === 'facilities' && (
                                                <div className="flex flex-wrap gap-6">
                                                    <div className="flex items-center gap-2">
                                                        <img
                                                            src="/icons/seater.png"
                                                            alt="Facility"
                                                            className="w-6 h-6"
                                                            onError={(e) => {
                                                                (e.target as HTMLImageElement).src = '/default-icon.png';
                                                            }}
                                                        />
                                                        <span className="text-sm">{car?.seats} Seater</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <img
                                                            src="/icons/bags.png"
                                                            alt="Facility"
                                                            className="w-6 h-6"
                                                            onError={(e) => {
                                                                (e.target as HTMLImageElement).src = '/default-icon.png';
                                                            }}
                                                        />
                                                        <span className="text-sm">1 bag</span>
                                                    </div>
                                                    {car?.ac && (
                                                        <div className="flex items-center gap-2">
                                                            <img
                                                                src="/icons/ac.png"
                                                                alt="Facility"
                                                                className="w-6 h-6"
                                                                onError={(e) => {
                                                                    (e.target as HTMLImageElement).src = '/default-icon.png';
                                                                }}
                                                            />
                                                            <span className="text-sm">AC</span>
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                            {activeTab === 'terms' && (
                                                <ul className="space-y-2 list-disc pl-5 text-sm text-gray-700">
                                                    <li>Your Trip has a KM limit. If your usage exceeds this limit, you will be charged for the excess KM used.</li>
                                                    <li>Your trip includes one pick up in Pick-up city and one drop to destination city.</li>
                                                    <li>If your Trip has Hill climbs, cab AC may be switched off during such climbs.</li>
                                                </ul>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-8">
                            <h3 className="text-md font-medium">
                                No cars available for the selected package
                            </h3>
                            <p className="text-muted-foreground mt-1 text-sm">
                                Try selecting a different package or check back later
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* for small devices */}
            <div className="md:hidden container mx-auto px-4 py-4">
                {/* Header section with trip details */}
                <div className="bg-white dark:bg-gray-900 p-3 rounded-lg shadow-sm border mb-4">
                    <h1 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                        {activePackageTab === "all" ? "Available Cars" : `Available Cars (${activePackageTab})`}
                    </h1>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="space-y-0.5">
                            <p className="text-gray-500 dark:text-gray-400">From City</p>
                            <p className="font-medium">{fromCity}</p>
                        </div>
                        <div className="space-y-0.5">
                            <p className="text-gray-500 dark:text-gray-400">Date</p>
                            <p className="font-medium">{formattedDate}</p>
                        </div>
                        <div className="space-y-0.5">
                            <p className="text-gray-500 dark:text-gray-400">Time</p>
                            <p className="font-medium">{time}</p>
                        </div>
                        <div className="space-y-0.5">
                            <p className="text-gray-500 dark:text-gray-400">Package</p>
                            <p className="font-medium">
                                {activePackageTab === "all" ? "All Packages" : activePackageTab}
                            </p>
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
                 
                {/* Package Tabs - Horizontal Scroll */}
                <div className="flex overflow-x-auto gap-2 mb-3 pb-2 no-scrollbar">
                    <button
                        className={`px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap ${activePackageTab === "all"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-100 hover:bg-gray-200"
                            }`}
                        onClick={() => setActivePackageTab("all")}
                    >
                        All
                    </button>
                    {allPackageNames.map((pkgName) => (
                        <button
                            key={pkgName}
                            className={`px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap ${activePackageTab === pkgName
                                ? "bg-blue-500 text-white"
                                : "bg-gray-100 hover:bg-gray-200"
                                }`}
                            onClick={() => setActivePackageTab(pkgName)}
                        >
                            {pkgName.charAt(0).toUpperCase() + pkgName.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Horizontal Car Selector */}
                {filteredCars.length > 0 && (
                    <div className="mb-4">
                        <div className="flex overflow-x-auto gap-3 pb-2 no-scrollbar">
                            {filteredCars.map((car, index) => (
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
                                            ₹{car?.packages[0]?.price}
                                        </div>
                                    </div>
                                    <span className="text-xs mt-1 font-medium truncate max-w-[80px]">
                                        {car?.type}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Selected Car Details */}
                {filteredCars.length > 0 ? (
                    <div className="space-y-4">
                        {filteredCars.slice(selectedCarIndex, selectedCarIndex + 1).map((car, index) => (
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
                                            <div className="text-md font-bold">{car?.type}</div>
                                            <div className="flex items-center gap-1 text-xs mt-0.5">
                                                ⭐ {car?.rating} <span className="text-muted-foreground">({car?.reviews})</span>
                                            </div>
                                        </div>
                                        <div className="flex gap-1">
                                            <Badge className="text-xs">{car?.ac ? "AC" : "NON AC"}</Badge>
                                            <Badge className="text-xs">{car?.seats} seats</Badge>
                                        </div>
                                    </div>

                                    <div className="text-xs mt-2 space-y-1">
                                        {/* <div className="flex justify-between">
                                            <span className="text-gray-500">Extra km:</span>
                                            <span>₹{car?.packages[0]?.extraKm}/km</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Extra hour:</span>
                                            <span>₹{car?.packages[0]?.extraHour}/hour</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Night allowance:</span>
                                            <span>₹{car?.nightAllowance}</span>
                                        </div> */}
                                        <div className="flex items-center text-sm text-gray-500 mt-2">
                                            <ShieldCheck className="h-4 w-4 mr-2 text-green-500" />
                                            <span>Includes Toll, State Tax & GST</span>
                                        </div>
                                        <div className="flex items-center text-sm text-gray-500 mt-2">
                                            <XCircle className="h-4 w-4 mr-2 text-red-500" />
                                            <span>Exclusions: Night Driving Allowance ₹200</span>
                                        </div>
                                    </div>

                                    <div className="mt-3">
                                        <div className="text-xs font-semibold mb-1">Selected Package:</div>

                                        <div className="border rounded p-2 bg-gray-50 relative">
                                            <div className="text-sm font-medium text-center">{car?.packages[0]?.name}</div>
                                            <div className="text-lg font-bold text-center mt-1">₹{car?.packages[0]?.price}</div>
                                            <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-green-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                                Lowest Price
                                            </div>
                                        </div>
                                    </div>

                                    <Button className="w-full mt-3 text-sm" onClick={() => handleBookNow(car?.packages[0]?.price ?? 0, car?.type ?? "")}>Book Now</Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <h3 className="text-sm font-medium">
                            No cars available for the selected package
                        </h3>
                        <p className="text-muted-foreground mt-1 text-xs">
                            Try selecting a different package or check back later
                        </p>
                    </div>
                )}
            </div>
        </>

    );
}
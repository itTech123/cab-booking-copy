"use client"

import {
    Search,
    Clock,
    Plane,
    Car,
    Navigation,
    ArrowLeftRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from 'next/navigation'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
} from "@/components/ui/tabs";
import { format } from "date-fns";
import AirportSearch from "./SearchAirport";
import SearchAddress from "./SearchAddress";
import { popularLocations } from "@/data";
import { PopoverClose } from "@radix-ui/react-popover";
import { getAuthCookies } from "@/lib/cookies";


export const BookingForm = ({ defaultForm, defaultType, isLoggedIn }: { defaultForm?: string | undefined; defaultType?: string | undefined; isLoggedIn?: Boolean }) => {

    const [activeTab, setActiveTab] = useState(defaultType || "one-way");
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [returnDate, setReturnDate] = useState<Date | undefined>();
    const [time, setTime] = useState("");
    const [fromCity, setFromCity] = useState(defaultForm || "");
    const [toCity, setToCity] = useState("");
    const [trip, setTrip] = useState("");
    const [packageItem, setPackageItem] = useState("");

    const isVerified = getAuthCookies();

    const router = useRouter();
    const [selectedState, setSelectedState] = useState('');

    const handleFromCitySelect = (value: string) => {
        setFromCity(value);
        const matchedState = popularLocations.find(loc =>
            value.includes(loc.state) ||
            loc.popularDistricts.some(district => value.includes(district.district))
        )?.state;
        setSelectedState(matchedState || '');
    };
    const filteredPopularDistricts = selectedState
        ? popularLocations.find(loc => loc.state === selectedState)?.popularDistricts || []
        : [];

    const handleTabChange = (value: string) => {
        setActiveTab(value)
    }

    const handleCreateSearch = async () => {
        try {

            const userDetails = JSON.parse(localStorage.getItem('userDetails') || '{}');

            const rawData = {
                name: userDetails.name,
                email: userDetails.email,
                phone: userDetails.phone,
                pickup: fromCity,
                drop: toCity || "",
                bookingType: activeTab,
                pickupDate: date,
                returnDate: returnDate,
                pickupTime: time,
                package: packageItem,
            };

            // Filter out empty or undefined values
            const filteredData = Object.fromEntries(
                Object.entries(rawData).filter(([_, value]) =>
                    value !== undefined && value !== null && value !== ''
                )
            );

            const response = await fetch(`${process.env.NEXT_PUBLIC_baseURL}/api/search/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(filteredData),
            });

            if (!response.ok) {
                throw new Error('Failed to save search');
            }

            console.log('Search saved successfully');
        } catch (error) {
            console.error('Error creating search:', error);
        }
    };

    const handleCreatePromotionalEmail = async (redirectPath: string) => {
        try {
            const userDetails = JSON.parse(localStorage.getItem('userDetails') || '{}');

            const rawData = {
                name: userDetails.name,
                email: userDetails.email,
                phone: userDetails.phone,
                pickup: fromCity,
                bookingType: activeTab,
                redirectPath: redirectPath,
                ...(toCity && { drop: toCity }) // Add 'drop' only if toCity is available
            };

            // Filter out empty or undefined values
            const filteredData = Object.fromEntries(
                Object.entries(rawData).filter(([_, value]) =>
                    value !== undefined && value !== null && value !== ''
                )
            );

            // drop is now optional, so it's removed from required fields
            const requiredFields = ['name', 'email', 'phone', 'pickup', 'bookingType', 'redirectPath'];
            const missingFields = requiredFields.filter(key => !filteredData[key]);

            if (missingFields.length > 0) {
                console.error("Missing required fields:", missingFields);
                return;
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_baseURL}/api/promotional/promotional-emails`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(filteredData),
            });

            if (!response.ok) {
                throw new Error('Failed to save promotional email');
            }

            const responseData = await response.json();

            localStorage.setItem('promoEmailId', responseData._id || responseData.id);

            console.log('Promotional email saved successfully');
        } catch (error) {
            console.error('Error creating promotional email:', error);
        }
    };


    const handleSubmit = () => {
        let redirectPath = "";

        // Check if fromCity and toCity are the same for applicable trip types
        if (
            (activeTab === "airport" || activeTab === "round-trip" || activeTab === "one-way") &&
            fromCity &&
            toCity &&
            fromCity === toCity
        ) {
            // Set default package if not already set
            if (!packageItem) {
                setPackageItem("08 HOUR 80 KMS");
            }

            // Validate required fields
            if (!date || !time) {
                alert("Please select Date and Time.");
                return;
            }

            // Prepare rental query
            const query = new URLSearchParams({
                fromCity: fromCity,
                date: date.toISOString(),
                time: time,
                package: packageItem || "08 HOUR 80 KMS" // fallback
            }).toString();

            redirectPath = `/rental?${query}`;
        }
        else {
            // Continue with normal switch logic for different cases
            switch (activeTab) {
                case "airport": {
                    if (!fromCity || !toCity) {
                        alert("Please select both From and To cities.");
                        return;
                    }
                    const query = new URLSearchParams({
                        fromCity,
                        toCity,
                        date: date?.toISOString() || "",
                        time,
                        tripType: "One-Way"
                    }).toString();
                    redirectPath = `/airport?${query}`;
                    break;
                }

                case "rental": {
                    if (!fromCity || !date || !time) {
                        alert("Please select all required fields.");
                        return;
                    }
                    const query = new URLSearchParams({
                        fromCity,
                        date: date.toISOString(),
                        time,
                        package: packageItem || "08 HOUR 80 KMS"
                    }).toString();
                    redirectPath = `/rental?${query}`;
                    break;
                }

                case "round-trip": {
                    if (!fromCity || !toCity || !date || !time || !returnDate) {
                        alert("Please select all required fields.");
                        return;
                    }
                    const query = new URLSearchParams({
                        fromCity,
                        toCity,
                        date: date.toISOString(),
                        time,
                        returnDate: returnDate.toISOString()
                    }).toString();
                    redirectPath = `/roundTrip?${query}`;
                    break;
                }

                case "one-way": {
                    if (!fromCity || !toCity || !date || !time) {
                        alert("Please select all required fields.");
                        return;
                    }
                    const query = new URLSearchParams({
                        fromCity,
                        toCity,
                        date: date.toISOString(),
                        time
                    }).toString();
                    redirectPath = `/oneWay?${query}`;
                    break;
                }

                default:
                    return;
            }
        }


        if (isLoggedIn || isVerified?.isVerified) {
            handleCreateSearch()
            handleCreatePromotionalEmail(redirectPath)
            const redirectData = {
                path: redirectPath
            };
            localStorage.setItem("searchPath", JSON.stringify(redirectData));
            router.push(redirectPath);
        } else {

            // If user is not logged in, store the redirect path with expiration
            const expirationTime = new Date().getTime() + 5 * 60 * 1000;
            const redirectData = {
                path: redirectPath,
                expiresAt: expirationTime,
            };

            localStorage.setItem("redirectPath", JSON.stringify(redirectData));
            localStorage.setItem("searchPath", JSON.stringify(redirectData));

            router.push("/login");
        }
    };



    const handleSwapCities = () => {
        const currentFrom = fromCity;
        const currentTo = toCity;

        setFromCity(currentTo);
        setToCity(currentFrom);
    };
    return (
        <div className="relative max-w-4xl mx-auto">

            <div className="block md:hidden ">
                <Card className="w-full mx-auto py-0 shadow-xl rounded-xl border">
                    <Tabs defaultValue="one-way">
                        <div className="">
                            <TabsList className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full px-2  bg-gray-50 rounded-lg">
                                <TabsTrigger
                                    value="one-way"
                                    className="text-sm sm:text-base font-semibold  px-2 rounded-md transition-all
              data-[state=active]:text-white data-[state=active]:bg-blue-600
              data-[state=inactive]:text-gray-700 data-[state=inactive]:bg-white
              data-[state=inactive]:hover:bg-gray-100 shadow-sm border border-gray-200"
                                    onClick={() => handleTabChange("one-way")}
                                >
                                    <Navigation className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                                    ONE WAY
                                </TabsTrigger>
                                <TabsTrigger
                                    value="round-trip"
                                    className="text-sm sm:text-base font-semibold py-3 px-2 rounded-md transition-all
              data-[state=active]:text-white data-[state=active]:bg-blue-600
              data-[state=inactive]:text-gray-700 data-[state=inactive]:bg-white
              data-[state=inactive]:hover:bg-gray-100 shadow-sm border border-gray-200"
                                    onClick={() => handleTabChange("round-trip")}
                                >
                                    <Navigation className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                                    ROUND TRIP
                                </TabsTrigger>
                                <TabsTrigger
                                    value="rental"
                                    className="text-sm sm:text-base font-semibold py-3 px-2 rounded-md transition-all
              data-[state=active]:text-white data-[state=active]:bg-blue-600
              data-[state=inactive]:text-gray-700 data-[state=inactive]:bg-white
              data-[state=inactive]:hover:bg-gray-100 shadow-sm border border-gray-200"
                                    onClick={() => handleTabChange("rental")}
                                >
                                    <Car className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                                    RENTAL
                                </TabsTrigger>
                                <TabsTrigger
                                    value="airport"
                                    className="text-sm sm:text-base font-semibold py-3 px-2 rounded-md transition-all
              data-[state=active]:text-white data-[state=active]:bg-blue-600
              data-[state=inactive]:text-gray-700 data-[state=inactive]:bg-white
              data-[state=inactive]:hover:bg-gray-100 shadow-sm border border-gray-200"
                                    onClick={() => handleTabChange("airport")}
                                >
                                    <Plane className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                                    AIRPORT
                                </TabsTrigger>
                            </TabsList>
                        </div>

                        {/* One Way */}
                        <TabsContent value="one-way" className="mt-20">
                            <div className="space-y-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100 relative">
                                {/* Pickup Row */}
                                <div className="flex items-center gap-2">
                                    <Label className="text-sm font-bold uppercase w-20 text-left">Pickup</Label>
                                    <div className="flex-1">
                                        <SearchAddress
                                            placeholder="Enter Address"
                                            onSelect={handleFromCitySelect}
                                            value={fromCity}
                                            showPopular={!fromCity}
                                            searchResultWidth="w-full"
                                        />
                                    </div>
                                </div>

                                {/* Swap Button – Right Side, Vertically Centered */}
                                <div className="absolute right-[10px] top-[60px] -translate-y-1/2 z-10 pr-4">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={handleSwapCities}
                                        className="h-10 w-10 rounded-full border-gray-300 hover:bg-gray-50 hover:border-blue-500 shadow-md bg-white"
                                    >
                                        <ArrowLeftRight className="h-5 w-5 rotate-90 text-gray-600" />
                                    </Button>
                                </div>

                                {/* Drop Row */}
                                <div className="flex items-center gap-2">
                                    <Label className="text-sm font-bold uppercase w-20 text-left">Drop</Label>
                                    <div className="flex-1">
                                        <SearchAddress
                                            placeholder="Enter Address"
                                            onSelect={(value) => setToCity(value)}
                                            value={toCity}
                                            showPopular={!toCity}
                                            popularDistricts={filteredPopularDistricts}
                                            searchResultWidth="w-full"
                                            popularTitle={selectedState ? `Popular in ${selectedState}` : 'Popular Locations'}
                                        />
                                    </div>
                                </div>

                                {/* Date Row */}
                                <div className="flex items-center gap-2">
                                    <Label className="text-sm font-bold uppercase w-20 text-left">Date</Label>
                                    <div className="flex-1">
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    className="w-full h-12 justify-start text-left font-bold px-4 border-gray-300 hover:border-blue-500"
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {date ? format(date, "dd MMM yyyy") : "SELECT DATE"}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0 shadow-lg rounded-lg">
                                                <div className="flex flex-col p-3">
                                                    <Calendar
                                                        mode="single"
                                                        selected={date}
                                                        onSelect={setDate}
                                                        disabled={(date) => date.getTime() < new Date().setHours(0, 0, 0, 0)}
                                                        initialFocus
                                                        className="border-0"
                                                    />
                                                    <PopoverClose asChild>
                                                        <Button className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold">OK</Button>
                                                    </PopoverClose>
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                </div>

                                {/* Time Row */}
                                <div className="flex items-center gap-2">
                                    <Label className="text-sm font-bold uppercase w-20 text-left">Time</Label>
                                    <Input
                                        type="time"
                                        className="flex-1 h-12 px-4 font-bold border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                        value={time}
                                        onChange={(e) => setTime(e.target.value)}
                                    />
                                </div>
                            </div>
                        </TabsContent>



                        {/* Round Trip */}
                        <TabsContent value="round-trip" className="mt-20">
                            <div className="space-y-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100 relative">
                                {/* Pickup Row */}
                                <div className="flex items-center gap-2">
                                    <Label className="text-sm font-bold uppercase w-20 text-left">Pickup</Label>
                                    <div className="flex-1">
                                        <SearchAddress
                                            placeholder="Enter Address"
                                            onSelect={handleFromCitySelect}
                                            value={fromCity}
                                            showPopular={!fromCity}
                                            searchResultWidth="w-full"
                                        />
                                    </div>
                                </div>

                                {/* Swap Button – Right Side, Vertically Centered */}
                                <div className="absolute right-[10px] top-[60px] -translate-y-1/2 z-10 pr-4">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={handleSwapCities}
                                        className="h-10 w-10 rounded-full border-gray-300 hover:bg-gray-50 hover:border-blue-500 shadow-md bg-white"
                                    >
                                        <ArrowLeftRight className="h-5 w-5 rotate-90 text-gray-600" />
                                    </Button>
                                </div>

                                {/* Drop Row */}
                                <div className="flex items-center gap-2">
                                    <Label className="text-sm font-bold uppercase w-20 text-left">Drop</Label>
                                    <div className="flex-1">
                                        <SearchAddress
                                            placeholder="Enter Address"
                                            onSelect={(value) => setToCity(value)}
                                            value={toCity}
                                            showPopular={!toCity}
                                            popularDistricts={filteredPopularDistricts}
                                            searchResultWidth="w-full"
                                            popularTitle={selectedState ? `Popular in ${selectedState}` : 'Popular Locations'}
                                        />
                                    </div>
                                </div>

                                {/* Combined Pickup Date & Time Row */}
                                <div className="flex items-center gap-2">
                                    <Label className="text-sm font-bold uppercase w-20 text-left">Pickup Date</Label>
                                    <div className="flex-1 flex gap-2">
                                        <div className="flex-1">
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        className="w-full h-12 justify-start text-left font-bold px-4 border-gray-300 hover:border-blue-500"
                                                    >
                                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                                        {date ? format(date, "dd MMM yyyy") : "SELECT DATE"}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0 shadow-lg rounded-lg">
                                                    <div className="flex flex-col p-3">
                                                        <Calendar
                                                            mode="single"
                                                            selected={date}
                                                            onSelect={setDate}
                                                            disabled={(date) => date.getTime() < new Date().setHours(0, 0, 0, 0)}
                                                            initialFocus
                                                            className="border-0"
                                                        />
                                                        <PopoverClose asChild>
                                                            <Button className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold">OK</Button>
                                                        </PopoverClose>
                                                    </div>
                                                </PopoverContent>
                                            </Popover>
                                        </div>
                                        <div className="flex-1">
                                            <Input
                                                type="time"
                                                className="h-12 px-4 font-bold border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                                value={time}
                                                onChange={(e) => setTime(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Return Date Row */}
                                <div className="flex items-center gap-2">
                                    <Label className="text-sm font-bold uppercase w-20 text-left">Return Date</Label>
                                    <div className="flex-1">
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    className="w-full h-12 justify-start text-left font-bold px-4 border-gray-300 hover:border-blue-500"
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {returnDate ? format(returnDate, "dd MMM yyyy") : "SELECT DATE"}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0 shadow-lg rounded-lg">
                                                <div className="flex flex-col p-3">
                                                    <Calendar
                                                        mode="single"
                                                        selected={returnDate}
                                                        onSelect={setReturnDate}
                                                        disabled={(returnDate) => returnDate.getTime() < new Date().setHours(0, 0, 0, 0)}
                                                        initialFocus
                                                        className="border-0"
                                                    />
                                                    <PopoverClose asChild>
                                                        <Button className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold">OK</Button>
                                                    </PopoverClose>
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        {/* rental */}
                        <TabsContent value="rental" className="mt-20">
                            <div className="space-y-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                                {/* Pickup Location row */}
                                <div className="flex items-center gap-2">
                                    <Label className="text-sm font-bold uppercase w-20 text-left">Pickup</Label>
                                    <div className="flex-1">
                                        <SearchAddress
                                            placeholder="Enter Address"
                                            onSelect={(value) => setFromCity(value)}
                                            searchResultWidth="w-full"
                                        />
                                    </div>
                                </div>

                                {/* Date row */}
                                <div className="flex items-center gap-2">
                                    <Label className="text-sm font-bold uppercase w-20 text-left">Date</Label>
                                    <div className="flex-1">
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    className="w-full h-12 justify-start text-left font-bold px-4 border-gray-300 hover:border-blue-500"
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {date ? format(date, "dd MMM yyyy") : "SELECT DATE"}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0 shadow-lg rounded-lg">
                                                <div className="flex flex-col p-3">
                                                    <Calendar
                                                        mode="single"
                                                        selected={date}
                                                        onSelect={setDate}
                                                        disabled={(date) => date.getTime() < new Date().setHours(0, 0, 0, 0)}
                                                        initialFocus
                                                        className="border-0"
                                                    />
                                                    <PopoverClose asChild>
                                                        <Button className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold">OK</Button>
                                                    </PopoverClose>
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                </div>

                                {/* Time row */}
                                <div className="flex items-center gap-2">
                                    <Label className="text-sm font-bold uppercase w-20 text-left">Time</Label>
                                    <Input
                                        type="time"
                                        className="flex-1 h-12 px-4 font-bold border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                        value={time}
                                        onChange={(e) => setTime(e.target.value)}
                                    />
                                </div>

                                {/* Package row */}
                                <div className="flex items-center gap-2">
                                    <Label className="text-sm font-bold uppercase w-20 text-left">Package</Label>
                                    <div className="flex-1">
                                        <Select value={packageItem} onValueChange={setPackageItem}>
                                            <SelectTrigger className="h-12 px-4 font-bold border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200">
                                                <SelectValue placeholder="SELECT PACKAGE" />
                                            </SelectTrigger>
                                            <SelectContent className="border-gray-300 shadow-lg">
                                                <SelectItem value="01 HOUR 15 KMS" className="font-medium hover:bg-blue-50">1HR 15KM</SelectItem>
                                                <SelectItem value="03 HOUR 30 KMS" className="font-medium hover:bg-blue-50">3HR 30KM</SelectItem>
                                                <SelectItem value="05 HOUR 50 KMS" className="font-medium hover:bg-blue-50">5HR 50KM</SelectItem>
                                                <SelectItem value="08 HOUR 80 KMS" className="font-medium hover:bg-blue-50">8HR 80KM</SelectItem>
                                                <SelectItem value="10 HOUR 100 KMS" className="font-medium hover:bg-blue-50">10HR 100KM</SelectItem>
                                                <SelectItem value="12 HOUR 120 KMS" className="font-medium hover:bg-blue-50">12HR 120KM</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        {/* Airport */}
                        <TabsContent value="airport" className="mt-20">
                            <div className="space-y-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                                {/* Trip Type row */}
                                <div className="flex items-center gap-2">
                                    <Label className="text-sm font-bold uppercase w-20 text-left">Trip</Label>
                                    <div className="flex-1">
                                        <Select value={trip} onValueChange={setTrip}>
                                            <SelectTrigger className="h-12 px-4 font-bold border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200">
                                                <SelectValue placeholder="SELECT TRIP TYPE" />
                                            </SelectTrigger>
                                            <SelectContent className="border-gray-300 shadow-lg">
                                                <SelectItem value="drop" className="font-medium hover:bg-blue-50">Pickup From Airport</SelectItem>
                                                <SelectItem value="pickup" className="font-medium hover:bg-blue-50">Drop To Airport</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                {/* Pickup/Airport row */}
                                {trip === "pickup" ? (
                                    <div className="flex items-center gap-2">
                                        <Label className="text-sm font-bold uppercase w-20 text-left">Pickup</Label>
                                        <div className="flex-1">
                                            <SearchAddress
                                                placeholder="Enter Address"
                                                onSelect={(value) => setFromCity(value)}
                                                searchResultWidth="w-full"
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <Label className="text-sm font-bold uppercase w-20 text-left">Airport</Label>
                                        <div className="flex-1">
                                            <AirportSearch
                                                placeholder="Select Airport"
                                                onSelect={(value) => setFromCity(value)}
                                                searchResultWidth="w-full"
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Drop row */}
                                {trip === "drop" ? (
                                    <div className="flex items-center gap-2">
                                        <Label className="text-sm font-bold uppercase w-20 text-left">Drop</Label>
                                        <div className="flex-1">
                                            <SearchAddress
                                                placeholder="Enter Address"
                                                onSelect={(value) => setToCity(value)}
                                                searchResultWidth="w-full"
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <Label className="text-sm font-bold uppercase w-20 text-left">Drop</Label>
                                        <div className="flex-1">
                                            <AirportSearch
                                                placeholder="Select Airport"
                                                onSelect={(value) => setToCity(value)}
                                                searchResultWidth="w-full"
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Date row */}
                                <div className="flex items-center gap-2">
                                    <Label className="text-sm font-bold uppercase w-20 text-left">Date</Label>
                                    <div className="flex-1">
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    className="w-full h-12 justify-start text-left font-bold px-4 border-gray-300 hover:border-blue-500"
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {date ? format(date, "dd MMM yyyy") : "SELECT DATE"}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0 shadow-lg rounded-lg">
                                                <div className="flex flex-col p-3">
                                                    <Calendar
                                                        mode="single"
                                                        selected={date}
                                                        onSelect={setDate}
                                                        disabled={(date) => date.getTime() < new Date().setHours(0, 0, 0, 0)}
                                                        initialFocus
                                                        className="border-0"
                                                    />
                                                    <PopoverClose asChild>
                                                        <Button className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold">OK</Button>
                                                    </PopoverClose>
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                </div>

                                {/* Time row */}
                                <div className="flex items-center gap-2">
                                    <Label className="text-sm font-bold uppercase w-20 text-left">Time</Label>
                                    <Input
                                        type="time"
                                        className="flex-1 h-12 px-4 font-bold border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                        value={time}
                                        onChange={(e) => setTime(e.target.value)}
                                    />
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>

                    <div className="mb-1 px-4">
                        <Button className="w-full h-12 text-sm font-bold shadow-lg bg-blue-600 hover:bg-blue-700 cursor-pointer" onClick={handleSubmit}>
                            <Search className="h-4 w-4 mr-2" />
                            Explore Cabs
                        </Button>
                    </div>
                </Card>
            </div>

            {/* for larger screen size */}
            <div className="hidden md:block">
                <Card className="w-full max-w-4xl mx-auto bg-background/90 backdrop-blur-sm p-6 shadow-xl rounded-xl border">
                    <Tabs defaultValue={defaultType || "one-way"} className="space-y-6">
                        <TabsList className="flex mx-auto p-0 h-10 bg-gray-100 border border-gray-300">
                            <TabsTrigger
                                value="one-way"
                                className="flex-1 flex items-center justify-center gap-2 py-2 px-3 text-sm font-bold transition-all
              text-gray-700 hover:bg-gray-200 border-r border-gray-300
              data-[state=active]:bg-sky-500 data-[state=active]:text-white
              data-[state=active]:font-semibold cursor-pointer rounded-none"
                                onClick={() => setActiveTab("one-way")}
                            >
                                <Navigation className="h-4 w-4" />
                                ONE WAY
                            </TabsTrigger>
                            <TabsTrigger
                                value="round-trip"
                                className="flex-1 flex items-center justify-center gap-2 py-2 px-3 text-sm font-bold transition-all
              text-gray-700 hover:bg-gray-200 border-r border-gray-300
              data-[state=active]:bg-sky-500 data-[state=active]:text-white
              data-[state=active]:font-semibold cursor-pointer rounded-none"
                                onClick={() => setActiveTab("round-trip")}
                            >
                                <Navigation className="h-4 w-4" />
                                ROUND TRIP
                            </TabsTrigger>
                            <TabsTrigger
                                value="rental"
                                className="flex-1 flex items-center justify-center gap-2 py-2 px-3 text-sm font-bold transition-all
              text-gray-700 hover:bg-gray-200 border-r border-gray-300
              data-[state=active]:bg-sky-500 data-[state=active]:text-white
              data-[state=active]:font-semibold cursor-pointer rounded-none"
                                onClick={() => setActiveTab("rental")}
                            >
                                <Car className="h-4 w-4" />
                                RENTAL
                            </TabsTrigger>
                            <TabsTrigger
                                value="airport"
                                className="flex-1 flex items-center justify-center gap-2 py-2 px-3 text-sm font-bold transition-all
              text-gray-700 hover:bg-gray-200
              data-[state=active]:bg-sky-500 data-[state=active]:text-white
              data-[state=active]:font-semibold cursor-pointer rounded-none"
                                onClick={() => setActiveTab("airport")}
                            >
                                <Plane className="h-4 w-4" />
                                AIRPORT
                            </TabsTrigger>
                        </TabsList>

                        {/* One Way */}
                        <TabsContent value="one-way">
                            <div className="grid grid-cols-1 md:grid-cols-[8fr_1fr_1fr_1fr] gap-4 items-ends">
                                <div className="flex justify-between space-x-2">
                                    <div className="space-y-2">
                                        <div className="space-y-2">
                                            <Label className="font-semibold">FROM</Label>
                                            <SearchAddress
                                                placeholder="Enter Address"
                                                onSelect={handleFromCitySelect}
                                                value={fromCity}
                                                showPopular={!fromCity}
                                            />
                                        </div>
                                    </div>

                                    {/* Swap Button */}
                                    <div className="flex justify-center mt-auto">
                                        <Button
                                            variant="outline"
                                            onClick={() => handleSwapCities()}
                                            className="rounded-full p-2 cursor-pointer"
                                        >
                                            <ArrowLeftRight />
                                        </Button>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="space-y-2">
                                            <Label className="font-semibold">TO</Label>
                                            <SearchAddress
                                                placeholder="Enter Address"
                                                onSelect={(value) => setToCity(value)}
                                                value={toCity}
                                                showPopular={!toCity}
                                                popularDistricts={filteredPopularDistricts}
                                                popularTitle={selectedState ? `Popular in ${selectedState}` : 'Popular Locations'}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label className="font-semibold">PICKUP DATE</Label>

                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className="w-full justify-start text-left font-normal"
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {date ? format(date, "PPP") : <span>Pick a date</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <div className="flex flex-col p-3">
                                                <Calendar
                                                    mode="single"
                                                    selected={date}
                                                    onSelect={setDate}
                                                    disabled={(date) => date.getTime() < new Date().setHours(0, 0, 0, 0)}
                                                    initialFocus
                                                />
                                                <PopoverClose asChild>
                                                    <Button className="mt-2">OK</Button>
                                                </PopoverClose>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </div>

                                <div className="space-y-2">
                                    <Label className="font-semibold">PICKUP TIME</Label>
                                    <div className="relative">
                                        {/* Clickable Clock Icon - now using shadcn's Lucide icon */}
                                        <div
                                            className="absolute left-3 top-3 h-4 w-4 text-muted-foreground cursor-pointer"
                                            onClick={() => (document.getElementById('time-input') as HTMLInputElement | null)?.showPicker()}
                                        >
                                            <Clock className="h-4 w-4" />
                                        </div>

                                        {/* Original shadcn Input with added functionality */}
                                        <Input
                                            id="time-input"
                                            type="time"
                                            className="pl-10"
                                            value={time}
                                            onChange={(e) => setTime(e.target.value)}
                                            onClick={(e) => (e.target as HTMLInputElement).showPicker()}
                                        />
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        {/* Round Trip */}
                        <TabsContent value="round-trip">
                            <div className="grid grid-cols-1 md:grid-cols-[3fr_1fr_1fr_1fr] gap-4 items-end ">
                                <div className="flex justify-between space-x-2">
                                    <div className="space-y-2">
                                        <div className="space-y-2">
                                            <Label className="font-semibold">FROM</Label>
                                            <SearchAddress
                                                placeholder="Enter Address"
                                                onSelect={handleFromCitySelect}
                                                value={fromCity}
                                                showPopular={!fromCity}
                                            />

                                        </div>
                                    </div>

                                    {/* Swap Button */}
                                    <div className="flex justify-center mt-auto">
                                        <Button
                                            variant="outline"
                                            onClick={() => handleSwapCities()}
                                            className="rounded-full p-2 cursor-pointer"
                                        >
                                            <ArrowLeftRight />
                                        </Button>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="space-y-2">
                                            <Label className="font-semibold">TO</Label>
                                            <SearchAddress
                                                placeholder="Enter Address"
                                                onSelect={(value) => setToCity(value)}
                                                value={toCity}
                                                showPopular={!toCity}
                                                popularDistricts={filteredPopularDistricts}
                                                popularTitle={selectedState ? `Popular in ${selectedState}` : 'Popular Locations'}
                                            />

                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label className="font-semibold">PICKUP DATE</Label>

                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className="w-full justify-start text-left font-normal"
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {date ? format(date, "PPP") : <span>Pick a date</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <div className="flex flex-col p-3">
                                                <Calendar
                                                    mode="single"
                                                    selected={date}
                                                    onSelect={setDate}
                                                    disabled={(date) => date.getTime() < new Date().setHours(0, 0, 0, 0)}
                                                    initialFocus
                                                />
                                                <PopoverClose asChild>
                                                    <Button className="mt-2">OK</Button>
                                                </PopoverClose>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </div>

                                <div className="space-y-2">
                                    <Label className="font-semibold">RETURN DATE</Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className="w-full justify-start text-left font-normal"
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {returnDate ? format(returnDate, "PPP") : <span>Pick a date</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <div className="flex flex-col p-3">
                                                <Calendar
                                                    mode="single"
                                                    selected={returnDate}
                                                    onSelect={setReturnDate}
                                                    disabled={(date) => date.getTime() < new Date().setHours(0, 0, 0, 0)}
                                                    initialFocus
                                                />
                                                <PopoverClose asChild>
                                                    <Button className="mt-2">OK</Button>
                                                </PopoverClose>
                                            </div>
                                        </PopoverContent>
                                    </Popover>

                                </div>

                                <div className="space-y-2">
                                    <Label className="font-semibold">PICKUP TIME</Label>
                                    <div
                                        className="relative"
                                        onClick={(e) => {
                                            // Find the input element inside this div
                                            const input = e.currentTarget.querySelector('input[type="time"]');
                                            if (input) (input as HTMLInputElement).showPicker();
                                        }}
                                    >
                                        <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground cursor-pointer" />
                                        <Input
                                            type="time"
                                            className="pl-10"
                                            value={time}
                                            onChange={(e) => setTime(e.target.value)}
                                            onClick={(e) => {
                                                e.stopPropagation(); // Prevent parent onClick from firing twice
                                                e.currentTarget.showPicker();
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        {/* rental Trip */}
                        <TabsContent value="rental" className="px-0">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                                <div className="space-y-1">
                                    <Label htmlFor="drop-address" className="font-semibold text-sm">
                                        CITY
                                    </Label>
                                    <SearchAddress
                                        placeholder="Search City"
                                        onSelect={(value) => setFromCity(value)}
                                        value={defaultForm || ""}
                                    />
                                </div>

                                <div className="space-y-1">
                                    <Label className="font-semibold text-sm">PICKUP DATE</Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className="w-full justify-start text-left font-normal px-3"
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {date ? format(date, "PPP") : <span>Pick a date</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <div className="flex flex-col p-2">
                                                <Calendar
                                                    mode="single"
                                                    selected={date}
                                                    onSelect={setDate}
                                                    disabled={(date) => date.getTime() < new Date().setHours(0, 0, 0, 0)}
                                                    initialFocus
                                                />
                                                <PopoverClose asChild>
                                                    <Button className="mt-2">OK</Button>
                                                </PopoverClose>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </div>

                                <div className="space-y-2">
                                    <Label className="font-semibold">PICKUP TIME</Label>
                                    <div
                                        className="relative"
                                        onClick={(e) => {
                                            // Find the input element inside this div
                                            const input = e.currentTarget.querySelector('input[type="time"]');
                                            if (input) (input as HTMLInputElement).showPicker();
                                        }}
                                    >
                                        <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground cursor-pointer" />
                                        <Input
                                            type="time"
                                            className="pl-10"
                                            value={time}
                                            onChange={(e) => setTime(e.target.value)}
                                            onClick={(e) => {
                                                e.stopPropagation(); // Prevent parent onClick from firing twice
                                                e.currentTarget.showPicker();
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label className="font-medium text-sm text-gray-700">PACKAGE</Label>
                                    <Select value={packageItem} onValueChange={setPackageItem}>
                                        <SelectTrigger className="w-full h-10 rounded-md border-gray-300 bg-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition-colors">
                                            <SelectValue placeholder="Select package" className="placeholder:text-gray-400" />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-md border-gray-300 shadow-md mt-1">
                                            <SelectItem
                                                value="01 HOUR 15 KMS"
                                                className="text-sm px-4 py-2 hover:bg-gray-50 focus:bg-blue-50"
                                            >
                                                1HR 15KM
                                            </SelectItem>
                                            <SelectItem
                                                value="03 HOUR 30 KMS"
                                                className="text-sm px-4 py-2 hover:bg-gray-50 focus:bg-blue-50"
                                            >
                                                3HR 30KM
                                            </SelectItem>
                                            <SelectItem
                                                value="05 HOUR 50 KMS"
                                                className="text-sm px-4 py-2 hover:bg-gray-50 focus:bg-blue-50"
                                            >
                                                5HR 50KM
                                            </SelectItem>
                                            <SelectItem
                                                value="08 HOUR 80 KMS"
                                                className="text-sm px-4 py-2 hover:bg-gray-50 focus:bg-blue-50"
                                            >
                                                8HR 80KM
                                            </SelectItem>
                                            <SelectItem
                                                value="10 HOUR 100 KMS"
                                                className="text-sm px-4 py-2 hover:bg-gray-50 focus:bg-blue-50"
                                            >
                                                10HR 100KM
                                            </SelectItem>
                                            <SelectItem
                                                value="12 HOUR 120 KMS"
                                                className="text-sm px-4 py-2 hover:bg-gray-50 focus:bg-blue-50"
                                            >
                                                12HR 120KM
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </TabsContent>

                        {/* Airport Trip */}
                        <TabsContent value="airport" className=" pb-4">
                            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                                {/* Trip Name Select */}
                                <div className="space-y-2">
                                    <Label className="font-semibold">TRIP NAME</Label>
                                    <Select value={trip} onValueChange={setTrip}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="SELECT TRIP TYPE" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="pickup">Pickup from Airport</SelectItem>
                                            <SelectItem value="drop">Drop to Airport</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Pickup Address */}
                                {trip === "pickup" ? <div className="space-y-2">
                                    <Label className="font-semibold">PICKUP AIRPORT</Label>
                                    <AirportSearch
                                        placeholder="Enter pickup airport"
                                        onSelect={(value) => setFromCity(value)}
                                    />

                                </div> :
                                    <div className="space-y-2">
                                        <Label htmlFor="drop-address" className="font-semibold">
                                            PICKUP ADDRESS
                                        </Label>
                                        <SearchAddress placeholder="Search Address" onSelect={(value) => setFromCity(value)} />
                                    </div>
                                }

                                {/* Drop Address*/}
                                {trip === "drop" ? <div className="space-y-2">
                                    <Label htmlFor="drop-airport-input" className="font-semibold">
                                        DROP AIRPORT
                                    </Label>
                                    <AirportSearch
                                        placeholder="Enter drop airport"
                                        onSelect={(value) => setToCity(value)}
                                    />
                                </div>
                                    : <div className="space-y-2">
                                        <Label className="font-semibold">DROP ADDRESS</Label>
                                        <SearchAddress
                                            placeholder="Enter Drop Address"
                                            onSelect={(value) => setToCity(value)}
                                        />

                                    </div>
                                }

                                {/* Pickup Date */}
                                <div className="space-y-2">
                                    <Label className="font-semibold">PICKUP DATE</Label>

                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className="w-full justify-start text-left font-normal"
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {date ? format(date, "PPP") : <span>Pick a date</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <div className="flex flex-col p-3">
                                                <Calendar
                                                    mode="single"
                                                    selected={date}
                                                    onSelect={setDate}
                                                    disabled={(date) => date.getTime() < new Date().setHours(0, 0, 0, 0)}
                                                    initialFocus
                                                />
                                                <PopoverClose asChild>
                                                    <Button className="mt-2">OK</Button>
                                                </PopoverClose>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </div>

                                {/* Pickup Time */}
                                <div className="space-y-2">
                                    <Label className="font-semibold">PICKUP TIME</Label>
                                    <div
                                        className="relative"
                                        onClick={(e) => {
                                            // Find the input element inside this div
                                            const input = e.currentTarget.querySelector('input[type="time"]');
                                            if (input) (input as HTMLInputElement).showPicker();
                                        }}
                                    >
                                        <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground cursor-pointer" />
                                        <Input
                                            type="time"
                                            className="pl-10"
                                            value={time}
                                            onChange={(e) => setTime(e.target.value)}
                                            onClick={(e) => {
                                                e.stopPropagation(); // Prevent parent onClick from firing twice
                                                e.currentTarget.showPicker();
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>

                        </TabsContent>
                        <div className="absolute -bottom-5 sm:-bottom-6 left-0 right-0 px-4 sm:px-0 -z-0"> {/* Full width container with padding */}
                            <div className="mx-auto w-full sm:w-2/3 md:w-1/2 lg:w-2/5 xl:w-1/3"> {/* Responsive width container */}
                                <Button className="w-full h-12 sm:h-14 text-sm sm:text-base md:text-lg gap-2 font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] -z-10" onClick={handleSubmit}>
                                    <Search className="h-4 w-4 sm:h-5 sm:w-5" />
                                    Explore Cabs
                                </Button>
                            </div>
                        </div>
                    </Tabs>

                </Card>
            </div>

        </div>

    );
};
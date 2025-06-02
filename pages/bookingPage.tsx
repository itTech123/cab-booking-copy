'use client'

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useSearchParams } from "next/navigation";
import { useRouter } from 'next/navigation';

const BookingPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [showSection, setShowSection] = useState<'form' | 'offers' | 'payment'>('form');
    const [activePayment, setActivePayment] = useState('25%');
    const [hasGST, setHasGST] = useState(false);
    const searchParams = useSearchParams();
    const fromCity = searchParams?.get("fromCity") || "";
    const toCity = searchParams?.get("toCity") || "";
    const date = searchParams?.get("date");
    const time = searchParams?.get("time");
    const tripType = searchParams?.get("tripType");
    const price = searchParams?.get("price");
    const type = searchParams?.get("type");
    const returndate = searchParams?.get("returnDate");
    const distance = searchParams?.get("distance");

    const router = useRouter();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        countryCode: "+91",
        mobile: "",
    });

    const [showOffers, setShowOffers] = useState(false);
    const [selectedOffers, setSelectedOffers] = useState<Record<string, boolean>>({
        luggageSpace: false,
        carModel: false,
        petAllowance: false,
        refundable: false,
        languagePreference: false,
    });
    const luggageOffer = selectedOffers.luggageSpace ? 750 : 0;
    const carModelOffer = selectedOffers.carModel ? 500 : 0;
    const petAllowanceOffer = selectedOffers.petAllowance ? 750 : 0;
    const refundableOffer = selectedOffers.refundable ? 595 : 0;
    const languagePrefOffer = selectedOffers.languagePreference ? 249 : 0;

    const finalPrice = (Number(price) || 0) + (luggageOffer + carModelOffer + petAllowanceOffer + refundableOffer + languagePrefOffer);

    const calculateAdvancePayment = () => {

        const percentage = parseFloat(activePayment.replace('%', ''));

        // Calculate the advance payment
        const advancePayment = (finalPrice * percentage) / 100;

        return advancePayment;
    };


    const calculatePercentAdvancePayment = (percentage: number) => {


        // Calculate the advance payment
        const advancePayment = Math.ceil((finalPrice * percentage) / 100);

        return advancePayment;
    };
    const advancePayment = calculateAdvancePayment();
    const twentyFivePercent = calculatePercentAdvancePayment(25)
    const fiftyPercent = calculatePercentAdvancePayment(50)

    const [language, setLanguage] = useState("");
    const handleLanguageChange = (value: string) => {
        setLanguage(value);
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSelectChange = (value: string) => {
        setFormData(prev => ({
            ...prev,
            countryCode: value
        }));
    };

    const handleOfferToggle = (offerId: string) => {
        setSelectedOffers(prev => ({
            ...prev,
            [offerId]: !prev[offerId]
        }));
    };

    const handleProceed = () => {
        setShowOffers(true);
    };

    const handleBack = () => {
        setShowOffers(false);
    };

    const deletePromotionalEmail = async () => {
        const promoEmailId = localStorage.getItem("promoEmailId");

        if (!promoEmailId) {
            console.error("promoEmailId not found in localStorage");
            return;
        }

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_baseURL}/api/promotional/promotional-emails/${promoEmailId}`,
                {
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to delete promotional email');
            }

            console.log(data.message);
            localStorage.removeItem("promoEmailId");
            return data;
        } catch (error) {
            console.error("Error deleting promotional email:");
            throw error;
        }
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_baseURL}/api/orders/createOrder`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.mobile,
                    pickup: fromCity,
                    drop: toCity,
                    pickupDate: date ? new Date(date).toISOString() : null,
                    pickupTime: time,
                    ridefare: finalPrice,
                    returnDate: returndate,
                    orderType: tripType,
                    advancePayment: advancePayment,
                    distance: distance,
                    carType: type,
                    luggage : selectedOffers.luggageSpace ? "750" : "0",
                    carModel : selectedOffers.carModel ? "500" : "0" ,
                    petAllowance : selectedOffers.petAllowance ? "750" : "0" ,
                    refundable : selectedOffers.refundable ? "595" : "0",
                    chauffeurs: selectedOffers.languagePreference ? "249" : "0",
                })
            });

            const data = await res.json();
            if (data?.order?.bookingId) {
                deletePromotionalEmail()
                localStorage.removeItem("searchPath")
                router.push(`/payment/${data.order.bookingId}`);
            }
            setIsLoading(false)

        } catch (error) {
            console.error('Fetch error:', error);
        }
    };




    const isFormInvalid =
        !formData.name ||
        !formData.email ||
        !formData.mobile ||
        !formData.countryCode;

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Side - Form or Offers */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg font-bold">
                                {showSection === 'form' ? "SPECIAL OFFERS" :
                                    showSection === 'offers' ? "CONTACT DETAILS" : "PAYMENT DETAILS"}
                            </CardTitle>
                        </CardHeader>

                        {showSection === 'form' ? (
                            <>
                                <CardContent className="space-y-6">


                                    <div className="space-y-4">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="luggageSpace"
                                                checked={selectedOffers.luggageSpace}
                                                onCheckedChange={() => handleOfferToggle("luggageSpace")}
                                            />
                                            <label htmlFor="luggageSpace" className="text-sm leading-none">
                                                Assured luggage space (either carrier or boot space) for Rs. 750
                                            </label>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="carModel"
                                                checked={selectedOffers.carModel}
                                                onCheckedChange={() => handleOfferToggle("carModel")}
                                            />
                                            <label htmlFor="carModel" className="text-sm leading-none">
                                                Confirm Car Model 2022 or above for Rs. 500
                                            </label>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="petAllowance"
                                                checked={selectedOffers.petAllowance}
                                                onCheckedChange={() => handleOfferToggle("petAllowance")}
                                            />
                                            <label htmlFor="petAllowance" className="text-sm leading-none">
                                                Pet Allowance for Rs. 750
                                            </label>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="refundable"
                                                checked={selectedOffers.refundable}
                                                onCheckedChange={() => handleOfferToggle("refundable")}
                                            />
                                            <label htmlFor="refundable" className="text-sm leading-none">
                                                Upgrade to Refundable booking (100% refund for cancellation before 3 hours of departure time) for Rs.595
                                            </label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="languagePreference"
                                                checked={selectedOffers.languagePreference}
                                                onCheckedChange={() => handleOfferToggle("languagePreference")}
                                            />
                                            <div className="flex flex-col">
                                                <label htmlFor="languagePreference" className="text-sm leading-none">
                                                    Chauffeurs who know your language (+₹249)
                                                </label>
                                                {selectedOffers.languagePreference && (
                                                    <RadioGroup
                                                        defaultValue="hindi"
                                                        className="mt-2 space-y-2"
                                                        onValueChange={handleLanguageChange}
                                                    >
                                                        <div className="flex items-center space-x-2">
                                                            <RadioGroupItem value="hindi" id="hindi" />
                                                            <Label htmlFor="hindi">Hindi</Label>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <RadioGroupItem value="english" id="english" />
                                                            <Label htmlFor="english">English</Label>
                                                        </div>
                                                    </RadioGroup>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex justify-center">
                                    <Button
                                        className="bg-blue-600 w-full hover:bg-blue-700"
                                        onClick={() => setShowSection('offers')}

                                    >
                                        Confirm Booking
                                    </Button>
                                </CardFooter>
                            </>
                        ) : showSection === 'offers' ? (
                            <>
                                <CardContent>
                                    <Button
                                        variant="ghost"
                                        className="text-blue-600 gap-1 pl-0"
                                        onClick={() => setShowSection('form')}
                                    >
                                        <ArrowLeft className="h-4 w-4" />
                                        Back to offers
                                    </Button>
                                    <form className="space-y-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">NAME</Label>
                                            <Input
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="email">EMAIL</Label>
                                            <Input
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="mobile">MOBILE</Label>
                                            <div className="flex gap-2">
                                                <Select
                                                    value={formData.countryCode}
                                                    onValueChange={handleSelectChange}
                                                    required // Add required for accessibility, though HTML native validation doesn't trigger on <Select>
                                                >
                                                    <SelectTrigger className="w-[180px]">
                                                        <SelectValue placeholder="Country" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="+91">India (+91)</SelectItem>
                                                        <SelectItem value="+1">USA (+1)</SelectItem>
                                                        <SelectItem value="+44">UK (+44)</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <Input
                                                    id="mobile"
                                                    name="mobile"
                                                    type="number"
                                                    value={formData.mobile}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </form>

                                </CardContent>
                                <CardFooter className="flex justify-center">
                                    <Button
                                        className="bg-blue-600 hover:bg-blue-700 w-full cursor-pointer"
                                        onClick={() => setShowSection('payment')}
                                        disabled={isFormInvalid}
                                    >
                                        Proceed
                                    </Button>
                                </CardFooter>

                            </>
                        ) : (
                            <>
                                <CardContent className="space-y-6">
                                    <Button
                                        variant="ghost"
                                        className="text-blue-600 gap-1 pl-0"
                                        onClick={() => setShowSection('offers')}
                                    >
                                        <ArrowLeft className="h-4 w-4" />
                                        Back to form
                                    </Button>

                                    <div className="space-y-4">
                                        <div className="flex flex-col space-y-2">
                                            <h3 className="font-medium">Payment Options</h3>
                                            <div className="grid grid-cols-3 gap-3">
                                                <Button
                                                    variant="outline"
                                                    className={`h-20 flex flex-col items-center justify-center border-2 ${activePayment === '25%' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                                                    onClick={() => setActivePayment('25%')}
                                                >
                                                    <span className="text-2xl font-bold">25%</span>
                                                    <span className="text-sm text-gray-600">₹{twentyFivePercent} </span>
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    className={`h-20 flex flex-col items-center justify-center border-2 ${activePayment === '50%' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                                                    onClick={() => setActivePayment('50%')}
                                                >
                                                    <span className="text-2xl font-bold">50%</span>
                                                    <span className="text-sm text-gray-600">₹{fiftyPercent}</span>
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    className={`h-20 flex flex-col items-center justify-center border-2 ${activePayment === '100%' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                                                    onClick={() => setActivePayment('100%')}
                                                >
                                                    <span className="text-2xl font-bold">100%</span>
                                                    <span className="text-sm text-gray-600">₹{finalPrice} </span>
                                                </Button>
                                            </div>
                                        </div>

                                        <div className="pt-4">
                                            <p className="text-sm text-center text-gray-600">
                                                You are one step away from booking a reliable cab
                                            </p>
                                        </div>

                                        <div className="space-y-2">
                                            <Label>Coupon Code</Label>
                                            <div className="flex gap-2">
                                                <Input placeholder="Enter coupon code" />
                                                <Button variant="outline">Apply</Button>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <div className="flex items-center space-x-2">
                                                <Checkbox
                                                    id="gst"
                                                    checked={hasGST}
                                                    onCheckedChange={() => setHasGST(!hasGST)}
                                                />
                                                <label htmlFor="gst" className="text-sm leading-none">
                                                    I have a GST Number (Optional)
                                                </label>
                                            </div>

                                            {hasGST && (
                                                <div className="space-y-2 pl-6">
                                                    <div className="space-y-1">
                                                        <Label>Company Name</Label>
                                                        <Input placeholder="Enter company name" />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <Label>GST No.</Label>
                                                        <Input placeholder="Enter GST number" />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex justify-center">
                                    <Button disabled={isLoading} className="bg-blue-600 hover:bg-blue-700 w-full" onClick={handleSubmit}>

                                        {isLoading ? "Loading..." : "Complete Payment"}

                                    </Button>
                                </CardFooter>
                            </>
                        )}
                    </Card>

                    {/* Right Side - Booking Details remains the same */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg font-bold">Your Booking Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Pickup  :</span>
                                    <span className="font-medium">{fromCity}</span>
                                </div>
                                {toCity && <div className="flex justify-between">
                                    <span className="text-gray-600">Drop  :</span>
                                    <span className="font-medium">{toCity}</span>
                                </div>}
                                {returndate && <div className="flex justify-between">
                                    <span className="text-gray-600">return Date  :</span>
                                    <span className="font-medium">{returndate?.split("T")[0]}</span>
                                </div>}
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Trip Type :</span>
                                    <span className="font-medium">{tripType}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Pickup Date :</span>
                                    <span className="font-medium">{date?.split("T")[0]} At {time}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Car Type :</span>
                                    <span className="font-medium">{type}</span>
                                </div>
                            </div>

                            <Separator />

                            <div className="flex justify-between items-center py-2">
                                <span className="text-gray-600">Total Fare :</span>
                                <span className="text-2xl font-bold text-blue-600">₹ {showSection === 'payment' ? advancePayment : finalPrice}</span>
                            </div>

                            <Separator />

                            <div className="space-y-4">
                                <div className="flex flex-col md:flex-row gap-4">
                                    {/* Inclusions Column */}
                                    <div className="flex-1">
                                        <h3 className="font-medium mb-2">Inclusions</h3>
                                        <ul className="text-sm text-gray-600 space-y-1">
                                            <li>• Base Fare and Fuel Charges</li>
                                            <li>• Driver Allowance</li>
                                            <li>• GST (5%)</li>
                                        </ul>
                                    </div>

                                    {/* Add-ons Column (only shown if any selected) */}
                                    {(selectedOffers.luggageSpace || selectedOffers.carModel || selectedOffers.petAllowance ||
                                        selectedOffers.refundable || selectedOffers.languagePreference) && (
                                            <div className="flex-1">
                                                <h3 className="font-medium mb-2 text-blue-600">Add-ons</h3>
                                                <ul className="text-sm text-gray-600 space-y-1">
                                                    {selectedOffers.luggageSpace && <li>• Luggage Space <span className="float-right">₹750</span></li>}
                                                    {selectedOffers.carModel && <li>• Car Model 2022 <span className="float-right">₹500</span></li>}
                                                    {selectedOffers.petAllowance && <li>• Pet Allowance <span className="float-right">₹750</span></li>}
                                                    {selectedOffers.refundable && <li>• 100% Refund <span className="float-right">₹595</span></li>}
                                                    {selectedOffers.languagePreference && <li>• Language Preference <span className="float-right">₹249</span></li>}
                                                </ul>
                                            </div>
                                        )}
                                </div>

                                <div>
                                    <h3 className="font-medium mb-2">Exclusions</h3>
                                    <p className="text-sm text-gray-600">Toll, Parking, State Tax etc.</p>
                                </div>

                                <div>
                                    <h3 className="font-medium mb-2">T&C</h3>
                                    <p className="text-sm text-gray-600">Cancellation policy and other terms apply.</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                </div>
            </div>
        </div>
    )
}

export default BookingPage
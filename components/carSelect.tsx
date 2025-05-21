import { useState } from 'react';
import { ChevronDown, ChevronUp, X } from 'lucide-react';

interface CarDetails {
    baseFareKm: string;
    driverAllowance: boolean;
    stateTaxAndToll: boolean;
    gstPercentage: number;
    distanceLimit?: string;
    savings?: number;
}

interface CarCardProps {
    carName: string;
    carImage: string;
    discountedPrice: number;
    finalPrice: number;
    details: CarDetails;
    onBookNow: (price: number, type: string) => void;
}

export default function CarCard({
    carName,
    carImage,
    discountedPrice,
    finalPrice,
    details,
    onBookNow
}: CarCardProps) {
    const [showDetails, setShowDetails] = useState(false);
    const [activeTab, setActiveTab] = useState('inclusions');

    return (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 mb-6 overflow-hidden">
            <div className="flex flex-col md:flex-row">
                {/* Left Column - Car Image and Name */}
                <div className="md:w-1/3 p-4 flex items-center">
                    <div className="flex w-full">
                        <div className="w-5/12 pr-3">
                            <img
                                src={carImage}
                                alt={carName}
                                className="w-full h-auto rounded"
                                width={113}
                                height={75}
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = '/default-car-image.jpg';
                                }}
                            />
                        </div>
                        <div className="w-7/12 pl-2">
                            <h3 className="font-bold text-lg">{carName}</h3>
                            <p className="text-sm text-gray-600">or equivalent</p>
                        </div>
                    </div>
                </div>

                {/* Middle Column - Certification Badges */}
                <div className="md:w-1/3 p-4 border-t md:border-t-0 md:border-l border-gray-200 flex items-center">
                    <div className="w-full">
                        <div className="flex justify-around text-center text-xs font-bold">
                            <div className="flex flex-col items-center">
                                <img 
                                    src="/icons/chauffeurs.png" 
                                    alt="Top Rated" 
                                    className="h-10 w-10 mb-1"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = '/default-badge.png';
                                    }}
                                />
                                <span>Top Rated Cabs & Chauffeurs</span>
                            </div>
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
                        </div>
                    </div>
                </div>

                {/* Right Column - Pricing and Action */}
                <div className="md:w-1/3 p-4 border-t md:border-t-0 md:border-l border-gray-200 flex items-center">
                    <div className="w-full flex justify-between items-center">
                        {/* Price Section */}
                        <div className="flex flex-col items-end">
                            {/* Discounted Price */}
                            <div className="flex items-center mb-1">
                                <span className="text-sm text-gray-500 line-through">₹{discountedPrice}</span>
                                {details.savings && (
                                    <span className="text-xs text-green-600 font-medium ml-2">Save ₹{details.savings}</span>
                                )}
                            </div>
                            {/* Lowest Price badge */}
                            <div className="bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full mt-1">
                                Lowest Price
                            </div>
                            {/* Final Price */}
                            <div className="text-right">
                                <span className="text-2xl font-bold text-gray-900">₹{finalPrice}</span>
                                {details.distanceLimit && (
                                    <div className="text-sm font-medium text-gray-700">up to {details.distanceLimit} km</div>
                                )}
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
                            onClick={() => onBookNow(finalPrice, carName)}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded h-fit"
                        >
                            BOOK
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
                                    <span className="text-sm">Base Fare for {details.baseFareKm} km</span>
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
                                <div className="flex items-center gap-2">
                                    <img 
                                        src="/icons/gst.png" 
                                        alt="Included" 
                                        className="w-6 h-6"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = '/default-icon.png';
                                        }}
                                    />
                                    <span className="text-sm">GST ({details.gstPercentage}%)</span>
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
                                    <span className="text-sm">
                                        {carName === "13 SEATER TRAVELLER" ? 13 :
                                            carName === "17 SEATER TRAVELLER" ? 17 :
                                                carName === "24 SEATER TRAVELLER" ? 24 : 4} Seater
                                    </span>
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
    );
}
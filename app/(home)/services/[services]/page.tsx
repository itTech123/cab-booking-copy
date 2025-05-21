'use client'

import { fetchHeading } from "@/actions";
import { BookingForm } from "@/components/BookingForm";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { CustomerReviewSlider } from "@/components/customer-review";
import StatsSection from "@/components/StatasSection";
import TempoTravellers from "@/components/services/TempoTravellers";
import AirportTaxi from "@/components/services/AirportTaxi";
import CorporateRental from "@/components/services/CorporateRental";
import OutstationTaxi from "@/components/services/OutstationTaxi";
import LocalRentals from "@/components/services/LocalRentals";

type Heading = {
  title: string;
  description: string;
  headingType: string;
};


export default function ServicesPage() {
  const [heading, setHeading] = useState<Heading | null>(null);
  const params = useParams();
  const serviceName = params?.services;
  console.log(serviceName)
  useEffect(() => {
    const fetchData = async () => {
      const data: Heading = await fetchHeading("homeHeading");
      setHeading(data);
    };

    fetchData();
  }, []);


  const renderServiceComponent = () => {
    switch (serviceName) {
      case 'local-rentals':
        return <LocalRentals />;
      case 'outstation':
        return <OutstationTaxi />;
      case 'corporate':
        return <CorporateRental />;
      case 'airport':
        return <AirportTaxi />;
      case 'tempo-travellers':
        return <TempoTravellers />;
      default:
        return <div>Service not found</div>;
    }
  };
  return (
    <>
     {serviceName !== "corporate" && ( 
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
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
                {heading?.title}
              </span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-white/90 drop-shadow-lg">
              <span className="text-yellow-300 font-bold">     {heading?.description}</span>
            </h2>

          </div>

          {/* Booking Form Card */}
          <div className="w-full max-w-6xl rounded-xl shadow-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/20">
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

      <section className="w-full py-12 ">
        <div className="w-[80%] max-w-6xl mx-auto px-4 text-center shadow-md border border-gray-300">
          <h2 className="text-3xl font-bold mb-12 text-gray-800 border-t border-b text-undeline py-4">
            Featured In
          </h2>

          <div className="flex flex-wrap justify-center items-center gap-12 bg-white rounded-xl p-10 ">
            <img
              src="/business-standred.png"
              alt="Featured in Business Standard"
              className="h-24 md:h-28 object-contain"
            />
            <img
              src="/hindustan-times.png"
              alt="Featured in Hindustan Times"
              className="h-24 md:h-28 object-contain"
            />
            <img
              src="/mint.png"
              alt="Featured in Mint"
              className="h-14 md:h-14 object-contain"
            />
          </div>
        </div>
      </section> 
       </>
      )}


       {renderServiceComponent()}
    </>
  )
}

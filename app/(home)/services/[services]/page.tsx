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

  const defaultType =
    serviceName === "local-rentals"
      ? "rental"
      : serviceName === "airport"
        ? "airport"
        : "one-way";
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
                <h1 className="text-md md:text-6xl font-extrabold text-white mb-4 drop-shadow-xl">
                  <span className="bg-clip-text ">
                    {heading?.title}
                  </span>
                </h1>


              </div>

              {/* Booking Form Card */}
              <div className="w-full max-w-6xl rounded-xl ">
                <div className="w-full">
                  <BookingForm defaultType={defaultType} />
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

        </>
      )}


      {renderServiceComponent()}
    </>
  )
}

'use client'

import { fetchHeading } from "@/actions"
import { AppReviews } from "@/components/AppReviews"
import BlogGallery from "@/components/BlogGallery"
import { BlogSection } from "@/components/BlogSection"
import { BookingForm } from "@/components/BookingForm"
import { OurServices } from "@/components/OurServices"
import Image from "next/image"
import { useEffect, useState } from "react"

type Heading = {
  title: string;
  description: string;
  headingType: string;
};

export default function Home() {
  const [heading, setHeading] = useState<Heading | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data: Heading = await fetchHeading("homeHeading");
      setHeading(data);
    };

    fetchData();
  }, []);


  return (
    <>
    <div className="relative min-h-[75vh] md:min-h-[90vh]">

  {/* Full-screen background image */}
  <div className="absolute inset-0 -z-10">
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
  <div className="flex flex-col items-center justify-center p-4 space-y-4 md:space-y-8 text-center min-h-[50vh] md:min-h-[70vh]">
    {/* Enhanced Heading Text */}
    <div className="mt-8 md:mt-0">
      <h1 className="text-sm md:text-5xl font-extrabold text-white drop-shadow-xl">
        <span className="bg-clip-text text-white">
          {heading?.title}
        </span>
      </h1>
    </div>

    {/* Booking Form Card */}
    <div className="w-full max-w-md sm:max-w-xl md:max-w-4xl lg:max-w-6xl rounded-xl shadow-lg md:shadow-2xl transition-all duration-300  ">
      <div className="w-full">
        <BookingForm />
      </div>
    </div>
  </div>

  {/* Leaf section with responsive adjustments */}
  <section className="rounded-xl relative  md:static p-2 shadow-md max-w-xs sm:max-w-md md:max-w-3xl mx-auto text-center flex items-center justify-center gap-2 md:gap-4 ">
    {/* Left leaf image */}
    <Image 
      src="/rightLeaf.png" 
      alt="Left Leaf" 
      height={16} 
      width={16} 
      className="object-contain w-4 h-4 md:w-5 md:h-5" 
    />

    {/* Text with responsive sizing */}
    <h2 className="text-xs sm:text-sm md:text-lg lg:text-xl font-extrabold tracking-wide text-white whitespace-nowrap overflow-hidden text-ellipsis">
      India's Top Rated Car Rental Service
    </h2>

    {/* Right leaf image */}
    <Image 
      src="/leftLeaf.png" 
      alt="Right Leaf" 
      height={16} 
      width={16} 
      className="object-contain w-4 h-4 md:w-5 md:h-5" 
    />
  </section>

  {/* Floating Review Section - adjusted positioning */}
  <div className="block absolute bottom-[-5rem] sm:bottom-[-5rem] md:bottom-[-3rem] left-1/2 transform -translate-x-1/2 w-full max-w-[90vw] md:max-w-2xl lg:max-w-4xl">
    <AppReviews />
  </div>

</div>
      {/* Other sections */}
      {/* <div className="md:hidden z-20 w-full p-2">
        <AppReviews />
      </div> */}
     <div className="mt-20">
       <BlogGallery />
      <OurServices />
      <BlogSection />
     </div>
    </>
  )
}

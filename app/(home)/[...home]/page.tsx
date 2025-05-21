'use client'

import { fetchHeading } from "@/actions"
import { AppReviews } from "@/components/AppReviews"
import BlogGallery from "@/components/BlogGallery"
import { BlogSection } from "@/components/BlogSection"
import { BookingForm } from "@/components/BookingForm"
import { OurServices } from "@/components/OurServices"
import Image from "next/image"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

type Heading = {
  title: string;
  description: string;
  headingType: string;
};

export default function HomeSeacPage() {
  const [heading, setHeading] = useState<Heading | null>(null);
  const params = useParams()
  const paramArray = params?.home || [];

  const defaultFrom = paramArray[0] || '';
  const defaultType = paramArray[1] || '';
  useEffect(() => {
    const fetchData = async () => {
      const data: Heading = await fetchHeading("homeHeading");
      setHeading(data);
    };

    fetchData();
  }, []);


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
              <BookingForm defaultType={defaultType} defaultForm={defaultFrom} />
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

        {/* Floating Review Section */}
        <div className="hidden md:block absolute bottom-[-3rem] left-1/2 transform -translate-x-1/2 -z-10 w-100">
          <AppReviews />
        </div>

      </div>

      {/* Other sections */}
      <div className="md:hidden z-20 w-full p-2">
        <AppReviews />
      </div>
      <BlogGallery />
      <OurServices />
      <BlogSection />
    </>
  )
}

// app/gallery/page.tsx
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Car,
  UserCheck,
  CreditCard,
  Smile,
} from "lucide-react";

export default function BlogGallery() {
  return (
    <div className="p-4 sm:p-8 space-y-12 mt-2 md:mt-9">
      {/* Top 3 Blog Images */}
      <div>
        {/* Mobile View - Stacked Images on Small Screens */}
        <div className="md:hidden grid grid-cols-3 gap-2"> {/* Using grid to arrange images */}
          <div className="relative w-full h-48 sm:h-56 overflow-hidden rounded-xl"> {/* Reduced height */}
            <Image
              src="/banner.jpg"
              alt="small.png"
              layout="fill"
              objectFit="cover"
              className="rounded-xl"
            />
          </div>
          <div className="relative w-full h-48 sm:h-56 overflow-hidden rounded-xl">
            <Image
              src="/banner.jpg"
              alt="Mobile Cab Image 2"
              layout="fill"
              objectFit="cover"
              className="rounded-xl"
            />
          </div>
          <div className="relative w-full h-48 sm:h-56 overflow-hidden rounded-xl">
            <Image
              src="/banner.jpg"
              alt="Mobile Cab Image 3"
              layout="fill"
              objectFit="cover"
              className="rounded-xl"
            />
          </div>
        </div>

        {/* Desktop View - Grid layout */}
        <div className="hidden sm:grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-6">
          <Image
            src="/showImg-1.png"
            alt="Cab Image 1"
            width={600}
            height={400}
            className="rounded-xl object-cover w-full h-64"
          />
          <Image
            src="/showImg-2.png"
            alt="Cab Image 2"
            width={600}
            height={400}
            className="rounded-xl object-cover w-full h-64"
          />
          <Image
            src="/showImg-3.png"
            alt="Cab Image 3"
            width={600}
            height={400}
            className="rounded-xl object-cover w-full h-64"
          />
        </div>
      </div>

      {/* Why Choose Our Cabs */}
      <div className="text-center bg-[#fee9e6] p-6 rounded-lg">
        <h2 className="text-3xl font-bold mb-6">Why Choose Our Cabs?</h2>
        <div className="flex justify-between gap-1 px-2 w-full overflow-hidden">
          {/* Clean & Hygienic Cars */}
          <div className="flex flex-col items-center flex-1 min-w-0">
            <div className="w-8 h-8 md:h-20 md:w-20 bg-white rounded-full flex items-center justify-center shadow-md mb-1">
              <Car className="w-4 h-4 text-[#FF671F] md:h-14 md:w-14" />
            </div>
            <p className="text-[10px] font-medium text-center leading-tight truncate px-0.5 md:text-lg">Clean and</p>
            <p className="text-[10px] font-medium text-center leading-tight truncate px-0.5 md:text-lg">Hygienic Car</p>
          </div>

          {/* Expert Chauffeurs */}
          <div className="flex flex-col items-center flex-1 min-w-0">
            <div className="w-8 h-8 md:h-20 md:w-20 bg-white rounded-full flex items-center justify-center shadow-md mb-1">
              <UserCheck className="w-4 h-4 text-[#FF671F] md:h-14 md:w-14" />
            </div>
            <p className="text-[10px] font-medium text-center leading-tight truncate px-0.5 md:text-lg">
              Transparent </p>
            <p className="text-[10px] font-medium text-center leading-tight truncate px-0.5 md:text-lg">
              Billing</p>
          </div>

          {/* Transparent Billing */}
          <div className="flex flex-col items-center flex-1 min-w-0">
            <div className="w-8 h-8 md:h-20 md:w-20 bg-white rounded-full flex items-center justify-center shadow-md mb-1">
              <CreditCard className="w-4 h-4 text-[#FF671F] md:h-14 md:w-14" />
            </div>
            <p className="text-[10px] font-medium text-center leading-tight truncate px-0.5 md:text-lg">Expert </p>
            <p className="text-[10px] font-medium text-center leading-tight truncate px-0.5 md:text-lg">Chauffeurs</p>
          </div>

          {/* 2,000+ Happy Clients */}
          <div className="flex flex-col items-center flex-1 min-w-0">
            <div className="w-8 h-8 md:h-20 md:w-20 bg-white rounded-full flex items-center justify-center shadow-md mb-1">
              <Smile className="w-4 h-4 md:h-14 md:w-14 text-[#FF671F]" />
            </div>
            <p className="text-[10px] md:text-lg font-medium text-center leading-tight truncate px-0.5">2000+</p>
            <p className="text-[10px] md:text-lg font-medium text-center leading-tight truncate px-0.5"> Cities </p>
          </div>
        </div>
      </div>

    </div>
  );
}

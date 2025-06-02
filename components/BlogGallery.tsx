// app/gallery/page.tsx
import Image from "next/image";

export default function BlogGallery() {
  return (
    <div className="p-4 sm:p-8 space-y-12 mt-2 md:mt-9">
      {/* Top 3 Blog Images */}
      <div>
        {/* Mobile View - Stacked Images on Small Screens */}
        <div className="md:hidden grid grid-cols-3 gap-2">
          <div className="relative w-full h-48 sm:h-56 overflow-hidden rounded-xl">
            <Image
              src="/showImg-1.png"
              alt="small.png"
              layout="fill"
              objectFit="cover"
              className="rounded-xl"
            />
          </div>
          <div className="relative w-full h-48 sm:h-56 overflow-hidden rounded-xl">
            <Image
              src="/showImg-2.png"
              alt="Mobile Cab Image 2"
              layout="fill"
              objectFit="cover"
              className="rounded-xl"
            />
          </div>
          <div className="relative w-full h-48 sm:h-56 overflow-hidden rounded-xl">
            <Image
              src="/showImg-3.png"
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
      <div className="text-center bg-[#fee9e6] rounded-lg">
        <h2 className="text:md md:text-3xl font-bold md:mb-6">WHY TXIGO STANDS OUT?</h2>
        <div className="flex justify-between gap-1 px-2 w-full overflow-hidden">
          {/* Clean & Hygienic Cars */}
          <div className="flex flex-col items-center flex-1 min-w-0">
            <div className="w-8 h-8 md:h-20 md:w-20 bg-white rounded-full flex items-center justify-center shadow-md mb-1 overflow-hidden p-0">
              <Image
                src="/icons/pickups.png"
                alt="Clean Cars"
                width={32}
                height={32}
                className="w-full h-full object-cover" // Changed to cover and full dimensions
              />
            </div>
            <p className="text-[10px] font-medium text-center leading-tight truncate px-0.5 md:text-lg">Clean and</p>
            <p className="text-[10px] font-medium text-center leading-tight truncate px-0.5 md:text-lg">Hygienic Car</p>
          </div>

          {/* Expert Chauffeurs */}
          <div className="flex flex-col items-center flex-1 min-w-0">
            <div className="w-8 h-8 md:h-20 md:w-20 bg-white rounded-full flex items-center justify-center shadow-md mb-1 overflow-hidden p-0">
              <Image
                src="/icons/money.png"
                alt="Clean Cars"
                width={32}
                height={32}
                className="w-full h-full object-cover" // Changed to cover and full dimensions
              />
            </div>
            <p className="text-[10px] font-medium text-center leading-tight truncate px-0.5 md:text-lg">Clean and</p>
            <p className="text-[10px] font-medium text-center leading-tight truncate px-0.5 md:text-lg">Hygienic Car</p>
          </div>


          {/* Transparent Billing */}
          <div className="flex flex-col items-center flex-1 min-w-0">
            <div className="w-8 h-8 md:h-20 md:w-20 bg-white rounded-full flex items-center justify-center shadow-md mb-1 overflow-hidden p-0">
              <Image
                src="/icons/1.png"
                alt="Clean Cars"
                width={32}
                height={32}
                className="w-full h-full object-cover" // Changed to cover and full dimensions
              />
            </div>
            <p className="text-[10px] font-medium text-center leading-tight truncate px-0.5 md:text-lg">Clean and</p>
            <p className="text-[10px] font-medium text-center leading-tight truncate px-0.5 md:text-lg">Hygienic Car</p>
          </div>

          {/* 2,000+ Happy Clients */}
          <div className="flex flex-col items-center flex-1 min-w-0">
            <div className="w-8 h-8 md:h-20 md:w-20 bg-white rounded-full flex items-center justify-center shadow-md mb-1 overflow-hidden p-0">
              <Image
                src="/icons/map.png"
                alt="Clean Cars"
                width={32}
                height={32}
                className="w-full h-full object-cover" // Changed to cover and full dimensions
              />
            </div>
            <p className="text-[8px] font-medium text-center leading-tight truncate px-0.5 md:text-lg">Clean and</p>
            <p className="text-[8px] font-medium text-center leading-tight truncate px-0.5 md:text-lg">Hygienic Car</p>
          </div>
        </div>
      </div>
    </div>
  );
}
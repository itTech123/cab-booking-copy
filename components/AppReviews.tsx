import Image from 'next/image';
import { IoStar, IoStarHalf } from "react-icons/io5";

export function AppReviews() {
  return (
    <div className="flex flex-col items-center gap-4 w-full md:w-120 max-w-5xl mx-auto">
      <div className="rounded-full bg-white px-2 py-3 flex justify-around items-center w-full border border-gray-200 gap-2 sm:gap-6 shadow-[0_0_15px_5px_rgba(0,0,0,0.1),0_0_30px_10px_rgba(0,0,0,0.08)]">

            {/* App Store */}
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="relative h-8 w-8 md:h-12 md:w-12">
            <Image
              src="/icons/app-store.webp"
              alt="App Store"
              fill
              className="object-contain"
            />
          </div>
          <div className="text-left">
            <p className="font-semibold text-[9px] sm:text-sm text-gray-600">App Store</p>
            <div className="flex">
              {[...Array(4)].map((_, i) => (
                <IoStar key={i} className="text-yellow-400 text-[8px] sm:text-sm" />
              ))}
              <IoStarHalf className="text-yellow-400 text-[6px] sm:text-sm" />
            </div>
            <p className="text-[8px] sm:text-xs text-gray-500">4.5 (8.2k)</p>
          </div>
        </div>

             {/* Google */}
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="relative h-8 w-8 md:h-12 md:w-12">
            <Image
              src="/icons/google-logo.webp"
              alt="Google"
              fill
              className="object-contain"
            />
          </div>
          <div className="text-left">
            <p className="font-semibold text-[9px] sm:text-sm text-gray-600">Google</p>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <IoStar key={i} className="text-yellow-400 text-[8px] sm:text-sm" />
              ))}
            </div>
            <p className="text-[8px] sm:text-xs text-gray-500">4.8 (10k)</p>
          </div>
        </div>

        {/* Google Play */}
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="relative h-8 w-8 md:h-12 md:w-12">
            <Image
              src="/icons/play-store.webp"
              alt="Google Play"
              fill
              className="object-contain"
            />
          </div>
          <div className="text-left">
            <p className="font-semibold text-[9px] sm:text-sm text-gray-600">Google Play</p>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <IoStar key={i} className="text-yellow-400 text-[9px] sm:text-sm" />
              ))}
            </div>
            <p className="text-[8px] sm:text-xs text-gray-500">4.9 (12.5k)</p>
          </div>
        </div>

  

   
      </div>

      {/* Download Button */}
      <button className="md:hidden bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-full text-sm sm:text-base transition-colors duration-200 shadow-lg">
        Download the Txigo App
      </button>
    </div>
  );
}
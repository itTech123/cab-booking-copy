'use client'

import { BookingForm } from "@/components/BookingForm";
import { CustomerReviewSlider } from "@/components/customer-review";
import StatsSection from "@/components/StatasSection";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useParams } from 'next/navigation';

export default function OneWayCabBookingPage() {
  const params = useParams();
  const routeSlug = params?.bookOneWayCab;
  const title = routeSlug && routeSlug[1];
  let [currentCity, rest] = title?.split("-to-") || ["", ""];
  let travelCity = rest?.split("-")[0];

  const formatCityName = (city: string) => {
    return city ? city.charAt(0).toUpperCase() + city.slice(1) : '';
  };
  currentCity = formatCityName(currentCity)
  travelCity = formatCityName(travelCity)

  return (
    <>
      <div className="relative min-h-screen">
        {/* Full-screen background image */}
        <div className="inset-0 -z-10">
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
        <div className="flex flex-col items-center justify-center p-4 text-center min-h-[70vh]">
          {/* Dynamic Heading Text */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-xl">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
                {formatCityName(currentCity)} to {formatCityName(travelCity)}
              </span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-white/90 drop-shadow-lg">
              Premium <span className="text-yellow-300 font-bold">Cab Service</span>
            </h2>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mt-4">
              Safe, reliable, and comfortable rides at your fingertips
            </p>
          </div>

          {/* Booking Form Card */}
          <div className="w-full max-w-6xl rounded-xl shadow-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/20">
            <div className="w-full">
              <BookingForm />
            </div>
          </div>
        </div>


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

      <section className="bg-white py-10">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-6 border-t border-b border-gray-300 py-4">
            Book {currentCity} to {travelCity} Taxi with Our Company
          </h2>

          <p className="mb-4">
            Our Company has had its presence in chauffeur-driven car rental sector for more than 12 years. We continuously strive to ensure that we provide reliable, quality and timely cab services. We have a wide range of car options right from sedans to hatchbacks and MUVs to SUVs. You can book any type of car for your {currentCity} to {travelCity} taxi service depending on your requirement. You can easily book cabs at Our Company 24/7 without any hassle with our easy-to-use booking interface.
          </p>

          <p className="mb-4">
            Book our {currentCity} to {travelCity} cab service and rest assured you will get quality & reliable services for your Car Rental.
          </p>

          <p className="mb-4">
            With our wide range of services, you can now book your {currentCity} to {travelCity} taxi in the easiest way with just a few clicks. Avail car hire services at Our Company and enjoy a great trip with family and friends.
          </p>

          <p className="mb-4">
            Make the best use of the services offered by Our Company at the best rates & experience a relaxing and trouble-free journey. With over a decade of experience in car rental services, Our Company is one of the best cab service providers in the industry.
          </p>

          <h3 className="text-xl font-medium mt-8 mb-4">{currentCity} to {travelCity} by Car</h3>

          <p className="mb-4">
            The distance from {currentCity} to {travelCity} can be covered in optimal time with the help of a taxi service. Your journey will be comfortable, and you can take short breaks anytime along the way.
          </p>

          <p className="mb-4">
            We also offer seasonal and holiday discounts. Enjoy excellent deals and travel at the most affordable fares.
          </p>

          <p className="mb-6">
            With our user-friendly website, you can book your taxi online in a few simple steps and enjoy hassle-free service.
          </p>

          <h3 className="text-xl font-medium mt-8 mb-4">Car Rental Options</h3>

          <p className="mb-6">
            At Our Company, you can choose from a variety of car types including Indica, Etios, Innova, and many luxury options based on your preferences for the {currentCity} to {travelCity} journey.
          </p>

          <h3 className="text-xl font-medium mb-4">FAQs</h3>

          <div className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <p className="font-medium mb-1">How can I book a cab from {currentCity} to {travelCity}?</p>
                <p>You can book online through the website or the Our Company app. You can also call us at 9045450000.</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <p className="font-medium mb-1">Do I have to pay full charges or is one-way available?</p>
                <p>Yes, we offer one-way cab bookings. You only pay for the one-side journey.</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <p className="font-medium mb-1">Can I pick a specific car model?</p>
                <p>Yes, you can choose the type of car that suits your needs.</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <p className="font-medium mb-1">How do I get from {currentCity} airport to {travelCity}?</p>
                <p>You can book a cab from the airport directly to {travelCity}. Just call 9045450000.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className=" py-10">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-6 border-t border-b border-gray-300 py-4">
            Useful Links for Cab Booking
          </h2>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-blue-600 font-medium">
            <li>
              <a href="/" className="hover:underline">Homepage</a>
            </li>
            <li>
              <a href="/book-outstation-cab" className="hover:underline">Book an Outstation Cab</a>
            </li>
            <li>
              <a href="/book-local-rental" className="hover:underline">Book a Local Hourly Rental</a>
            </li>
            <li>
              <a href="/reviews" className="hover:underline">Reviews & Testimonials</a>
            </li>
            <li>
              <a href="/oneway-cabs" className="hover:underline">Book Oneway Cabs</a>
            </li>
            <li>
              <a href="/about-us" className="hover:underline">Our Company</a>
            </li>
          </ul>
        </div>
      </section>


    </>
  )
}
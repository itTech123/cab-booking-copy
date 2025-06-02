import { Card } from "@/components/ui/card";
import { Car, MapPin, Clock, ShieldCheck, CircleDollarSign, CalendarCheck, Navigation, Plane, Smile, Route, BadgeCheck } from 'lucide-react';

export function OurServices() {
  const services = [
    {
      title: "Oneway Cabs",
      description: "With access to over 1.5 million one-way routes across the country, Txigo makes sure no destination is out of reach. Pay only for the one-way cab services when you travel, no return fare and no hidden charges. Just reliable rides at unbeatable rates. Wherever you need to be, Txigo will take you there.",
      image: "/one-way.png",
      icon: <Route className="w-5 h-5 text-white" />,
      features: [
        { image: "/icons/1.png", text: "15 Lakh Routes" },
        { image: "/icons/2.png", text: "Lowest Fares" },
        { image: "/icons/3.png", text: "All Inclusive Prices" }
      ]
    },
    {
      title: "Roundtrip Cabs",
      description: "Embark on a seamless journey with Txigo's premium roundtrip services, crafted to offer unmatched comfort right from your doorstep to your destination and back. Our professional chauffeurs are more than just drivers; they're thoughtful travel companions committed to making .",
      image: "/round-trip.png",
      icon: <Car className="w-5 h-5 text-white" />,
      features: [
        { image: "/icons/5.png", text: "Expert Chauffeurs" },
        { image: "/icons/6.png", text: "Safety Certified" },
        { image: "/icons/money.png", text: "Multiple Stops" }
      ]
    },
    {
      title: "Hourly Rentals",
      description: "Whether it's a back-to-back business meeting or a day of shopping and errands, Txigo's flexible hourly rental cabs are at your service. Choose from 4 hours rentals to 8 hours or 12 hours rental packages to match your pace. With a professional chauffeur at the wheel, explore your city with ease.",
      image: "/local.png",
      icon: <Clock className="w-5 h-5 text-white" />,
      features: [
        { image: "/icons/6.png", text: "Flexible Packages" },
        { image: "/icons/10.png", text: "Cab At Your Disposal" },
        { image: "/icons/3.png", text: "Multiple Stops" }
      ]
    },
    {
      title: "Airport Transfers",
      description: "At Txigo, we care about your journey as much as you do. Whether you're catching a flight or boarding a train, our dependable airport and station transfer services ensure you're always on time. Available across major hubs in the country, our professional chauffeurs offer seamless pickups and drops.",
      image: "/airport.png",
      icon: <Plane className="w-5 h-5 text-white" />,
      features: [
        { image: "/icons/13.png", text: "Reliability Guaranteed" },
        { image: "/icons/6.png", text: "Lowest Fares" },
        { image: "/icons/1.png", text: "Courteous Chauffeurs" }
      ]
    }
  ];

  return (
    <section className="container mx-auto px-4">
      {/* Heading */}
      <div className="text-center mb-8">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold uppercase whitespace-nowrap">
          OUR SERVICES
        </h2>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {services.map((service, index) => (
          <Card
            key={index}
            className="group relative overflow-hidden py-0 hover:shadow-lg transition-all duration-300 flex flex-col h-full"
          >
            {/* Image */}
            <div className="h-40 relative overflow-hidden pb-0">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute bottom-2 right-2 w-9 h-9 rounded-full bg-sky-500 shadow-sm flex items-center justify-center z-10">
                {service.icon}
              </div>
            </div>

            {/* Content */}
            <div className="px-4 flex flex-col flex-grow">
              {/* Title */}
              <h2 className="text-md sm:text-base font-bold text-center -mt-6 md:mt-0 mb-2 whitespace-nowrap">
                {service.title}
              </h2>

              {/* Description */}
              <p className="text-[10px] md:text-sm text-gray-600 mb-4 text-justify min-h-[72px]">
                {service.description}
              </p>

              {/* Feature Images */}
              <div className="mt-auto flex justify-between items-start border-t border-gray-200 pt-3 gap-2">
                {service.features.map((feature, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center justify-start flex-1 text-center min-h-[60px]"
                  >
                    {/* Image */}
                    <div className="w-10 h-10 flex items-center justify-center mb-1 shrink-0">
                      <img 
                        src={feature.image} 
                        alt={feature.text} 
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Text */}
                    <span className="text-[6px] md:text-[11px]  font-bold leading-tight text-center break-words max-w-[60px] line-clamp-2">
                      {feature.text.length > 20
                        ? feature.text.slice(0, 20) + "..."
                        : feature.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
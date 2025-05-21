import { Card } from "@/components/ui/card";
import { Car, MapPin, Clock, ShieldCheck, CircleDollarSign, CalendarCheck, Navigation, Plane, Smile, Route, BadgeCheck } from 'lucide-react';

export function OurServices() {
  const services = [
    {
      title: "Roundtrip Cabs",
      description: "Our premium roundtrip services will pamper you with an absolutely comfortable drive from your doorstep & back. Our chauffeurs are not only courteous but are also expert travel companions that will make your road travel memorable. Affordable Luxury, as we'd like to call it.",
      image: "/round-trip.png",
      icon: <Car className="w-5 h-5 text-white" />,
      features: [
        { icon: <BadgeCheck className="w-5 h-5 text-sky-500" />, text: "Expert Chauffeurs" },
        { icon: <ShieldCheck className="w-5 h-5 text-sky-500" />, text: "Safety Certified" },
        { icon: <MapPin className="w-5 h-5 text-sky-500" />, text: "Multiple Stops" }
      ]
    },
    {
      title: "Oneway Drops",
      description: "Our network of over 15 lakh one way routes ensures that there is no corner of the country that you can't travel with us. Pay only one side charge at rock bottom rates. If you need to be somewhere, we'll get you there.",
      image: "/one-way.png",
      icon: <Route className="w-5 h-5 text-white" />,
      features: [
        { icon: <Route className="w-5 h-5 text-sky-500" />, text: "15 Lakh Routes" },
        { icon: <CircleDollarSign className="w-5 h-5 text-sky-500" />, text: "Lowest Fares" },
        { icon: <CalendarCheck className="w-5 h-5 text-sky-500" />, text: "All Inclusive Prices" }
      ]
    },
    {
      title: "Local Rentals",
      description: "Book our flexible hourly rental cabs and get chauffeured within the city for your business meetings or shopping chores. Our local rentals are available for 4 hours, 8 hours or 12 hours, based on your needs. Explore your city like a local.",
      image: "/local.png",
      icon: <Clock className="w-5 h-5 text-white" />,
      features: [
        { icon: <Clock className="w-5 h-5 text-sky-500" />, text: "Flexible Packages" },
        { icon: <Navigation className="w-5 h-5 text-sky-500" />, text: "Cab At Your Disposal" },
        { icon: <MapPin className="w-5 h-5 text-sky-500" />, text: "Multiple Stops" }
      ]
    },
    {
      title: "Airport Transfers",
      description: "We care about your flight as much as you do. Our airport transfer services across airports in the country offer pickups and drops with complete reliability. Book in advance and rest easy - we will take care of the rest.",
      image: "/airport.png",
      icon: <Plane className="w-5 h-5 text-white" />,
      features: [
        { icon: <ShieldCheck className="w-5 h-5 text-sky-500" />, text: "Reliability Guaranteed" },
        { icon: <CircleDollarSign className="w-5 h-5 text-sky-500" />, text: "Lowest Fares" },
        { icon: <Smile className="w-5 h-5 text-sky-500" />, text: "Courteous Chauffeurs" }
      ]
    }
  ];

  return (
    <section className="container mx-auto px-4 py-8">
      {/* Heading */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold uppercase">OUR SERVICES</h2>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {services.map((service, index) => (
          <Card
            key={index}
            className="group relative overflow-hidden p-0 hover:shadow-lg transition-all duration-300 flex flex-col h-full"
          >
            {/* Image with no top gap */}
            <div className="h-40 overflow-hidden">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Card Content - now with tighter bottom spacing */}
            <div className="p-3 pb-0 relative flex flex-col flex-grow"> {/* Changed pb-3 to pb-0 */}

              {/* Floating icon */}
              <div className="absolute -top-5 right-3 w-9 h-9 rounded-full bg-sky-500 shadow-sm flex items-center justify-center z-10">
                {service.icon}
              </div>

              {/* Title and description */}
              <div className="flex-grow">
                <h3 className="text-lg font-bold uppercase pr-6">{service.title}</h3>
                <p className="text-sm text-gray-600 mt-1 mb-2">{service.description}</p>
              </div>

              {/* Features Grid - now flush with bottom */}
              <div className="grid grid-cols-3 gap-0 border-t"> {/* Removed gap-1, added border-t */}
                {service.features.map((feature, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center text-center p-2 border-gray-200"
                    style={i < 2 ? { borderRight: '1px solid #e5e7eb' } : {}} // Add right border except last item
                  >
                    {feature.icon}
                    <span className="text-xs font-medium mt-0.5">{feature.text}</span>
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
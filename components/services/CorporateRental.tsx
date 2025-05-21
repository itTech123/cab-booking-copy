'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function CorporateRental() {
  const router = useRouter()
  const [loading, setLoading] = useState(false);

const handleSubmit = async (formData: FormData) => {
  setLoading(true)
    const name = formData.get("name")
    const email = formData.get("email")
    const contact = formData.get("contact")
    const business_volumes = formData.get("Business Volume")
    const company = formData.get('company')


    try {
      
      const res = await fetch(`${process.env.NEXT_PUBLIC_baseURL}/api/corporate/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name , email, contact,business_volumes,company
        }),
      });

      if (res.ok) {
        router.push('/services/thank-you');
      } else {
        console.error('Failed to submit:', await res.text());
      }

      setLoading(false)
    } catch (err) {
      console.error('Error submitting form:', err);
    }
  };
  return (
    <>
      <div className="w-full">
        {/* Image container with 60vh height */}
        <div className="relative h-[60vh] w-full">
          {/* Background image */}
          <div
            className="absolute inset-0 bg-[url('/corporate.jpg')] bg-cover bg-center"
            aria-hidden="true"
          />

          {/* Dark overlay */}
          <div className="absolute inset-0" />

          {/* Form positioned on the left side */}
          <div className="relative z-10 h-full flex items-center">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-xl p-4 w-80 ml-8">
              <h2 className="text-lg font-bold text-gray-800 mb-3">Help us with your requirements</h2>

              <form className="space-y-3" action={handleSubmit}>
                {/* Name Row */}
                <div className="flex items-center gap-2">
                  <label className="w-20 text-xs font-medium text-gray-700">
                    Name<span className="text-red-500">*</span>
                  </label>
                  <Input className="flex-1 h-8 text-xs" name="name" placeholder="Your Name" required />
                </div>

                {/* Company Row */}
                <div className="flex items-center gap-2">
                  <label className="w-20 text-xs font-medium text-gray-700">
                    Company<span className="text-red-500">*</span>
                  </label>
                  <Input className="flex-1 h-8 text-xs" name="company" placeholder="Company Name" required />
                </div>

                {/* Email Row */}
                <div className="flex items-center gap-2">
                  <label className="w-20 text-xs font-medium text-gray-700">
                    Email<span className="text-red-500">*</span>
                  </label>
                  <Input className="flex-1 h-8 text-xs" name="email" type="email" placeholder="Email Address" required />
                </div>

                {/* Contact No Row */}
                <div className="flex items-center gap-2">
                  <label className="w-20 text-xs font-medium text-gray-700">
                    Contact No<span className="text-red-500">*</span>
                  </label>
                  <Input className="flex-1 h-8 text-xs" name="contact" type="tel" placeholder="Phone Number" required />
                </div>

                {/* Business Volume Row */}
                <div className="flex items-center gap-2">
                  <label className="w-20 text-xs font-medium text-gray-700">
                    Business Volume
                  </label>
                  <Select name="Business Volume">
                    <SelectTrigger className="flex-1 h-8 text-xs">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem className="text-xs" value="Less Then ₹50,000">Less Then ₹50,000</SelectItem>
                      <SelectItem className="text-xs" value="₹1,00,000 to ₹5,00,000">₹1,00,000 to ₹5,00,000</SelectItem>
                      <SelectItem className="text-xs" value="Greater Then ₹5,00,000">Greater Then ₹5,00,000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Buttons Row */}
                <div className="flex gap-2 pt-1">
                  <Button type="submit" className="h-8 text-xs flex-1" disabled={loading}>
                    {loading ? "loading" : "Submit"}
                  </Button>
                  <Button variant="outline" className="h-8 text-xs flex-1">

                    Download Brochure
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>


        <div className="container mx-auto py-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">70+ CORPORATE CLIENTS</h2>
          </div>
          <div className="flex justify-center">
            {/* Replace with your actual client logos image */}
            <Image
              src="/corporate-logos.jpg"
              alt="Our Corporate Clients"
              width={800} // Adjust as needed
              height={200} // Adjust as needed
              className="rounded-lg"
            />
          </div>

          <div className="max-w-4xl mx-auto px-4">
            {/* Introduction */}
            <section className="mb-12">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">Txigo's Corporate Program - A Cab for all your Transport needs</h1>
              <h2 className="text-2xl font-semibold text-gray-700 mb-6">Txigo's Corporate Car Rentals - Backed by a 12 year Track Record</h2>
              <div className="space-y-4 text-gray-600">
                <p>Txigo has been at the forefront of organizing the car rental industry and has built a strong brand over the last decade. We are now India's largest cab service spanning across 2000 cities with over 12 years of experience in providing road-transport solutions.</p>
                <p>We take great pride in our exceptional customer service delivery supported by courteous driver partners and an efficient technology back-end that is being constantly refined. Our corporate cab services come closely on the heels of our successes within the retail sector and we have seen already some great results here as well.</p>
                <p>Because of Txigo's PAN India presence, you don't ever need to worry about managing a roster of local vendors- we are your one stop shop for all you employee transportation cab requirements. There are 70+ satisfied corporate clients on our roster and they are guaranteed our reliable services, with an exemplary 24x7 support.</p>
              </div>
            </section>

            {/* Products & Services */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Our roster of Products & Services - A cab for all your organization's needs</h2>
              <p className="text-gray-600 mb-4">Our Corporate car rental program offers:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-6">
                <li><strong>Hourly Rentals:</strong> Pickup and drop services within city limits.</li>
                <li><strong>Outstation Cabs:</strong> This includes intercity round trips.</li>
                <li><strong>Airport Transfers:</strong> Pickups from the airport as well as drops to the airport.</li>
              </ul>
              <p className="text-gray-600 mb-4">All 3 services pertain to both spot rentals as well as monthly car hires.</p>
              <p className="text-gray-600">Our reliable corporate services cover 79 cities, across 29 states. Additionally, our fleet of vehicles comprises of hatchbacks, premium sedans, Innovas and even Tempo Travellers, making Txigo the most convenient and hassle-free choice for employee transportation. Our corporate offering includes, but is not limited to:</p>

              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">MICE</h3>
                  <p className="text-gray-600">We provide end-to-end transportation for meetings, conferences, exhibitions and team-related activities. Due to our extensive inventory of drivers across India, our cabs for MICE events are a popular offering.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">Holidays</h3>
                  <p className="text-gray-600">Whether official team holidays or personal vacations, we are the no. 1 outstation and local cab service and will handle all your cab requirements.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">Monthly Car Rental Requirements</h3>
                  <p className="text-gray-600">We will ensure that you get the best corporate cab prices along with excellent quality vehicles and experienced drivers for your monthly car rental requirements. The services will be provided at bulk discounted rates.</p>
                </div>
              </div>
            </section>

            {/* Why Choose Us */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Why choose Txigo - What we bring to the table</h2>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Affordable Rates</h3>
                  <p className="text-gray-600">Savings on business travel through special customized fares.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Round the clock customer service</h3>
                  <p className="text-gray-600">24x7 employee helpline and booking support.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Transparent Billing</h3>
                  <p className="text-gray-600">Paperless & GST compliant seamless billing process.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Largest verified driver network</h3>
                  <p className="text-gray-600">Well trained and experienced driver partners at disposal.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">PAN India presence</h3>
                  <p className="text-gray-600">Be it metro cities like Bangalore, Mumbai or Delhi, or smaller cities like Ranchi, Ludhiana or Rameshwaram, we are just a call or a click away.</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
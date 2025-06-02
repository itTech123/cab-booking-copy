import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import { ArrowRight, Globe, Mail, Share2 } from "lucide-react"

export default function AboutPage() {
  const citiesCovered = [
    { region: "North India", cities: ["Delhi NCR", "Chandigarh", "Jaipur", "Amritsar", "Dehradun"] },
    { region: "West India", cities: ["Mumbai", "Pune", "Nashik", "Ahmedabad", "Vadodara", "Surat", "Goa"] },
    { region: "South India", cities: ["Bangalore", "Mysore", "Chennai", "Hyderabad", "Coimbatore", "Kochi"] },
    { region: "East India", cities: ["Kolkata", "Siliguri", "Darjeeling", "Guwahati", "Shillong", "Bhubaneswar"] },
  ]

  return (
    <div className="min-h-screen bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('/banner.jpg')" }}>
      <div className="backdrop-blur-sm bg-black/50 min-h-screen">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-center text-white mb-12">About Txigo</h1>

          <Tabs defaultValue="difference" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-white/20 backdrop-blur-md rounded-lg p-1 gap-1">
              <TabsTrigger
                value="difference"
                className="data-[state=active]:bg-indigo-600 text-white data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200 rounded-md py-2"
              >
                The Txigo Difference
              </TabsTrigger>
              <TabsTrigger
                value="mission"
                className="data-[state=active]:bg-indigo-600 text-white data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200 rounded-md py-2"
              >
                Vision & Mission
              </TabsTrigger>
              <TabsTrigger
                value="network"
                className="data-[state=active]:bg-indigo-600 text-white data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200 rounded-md py-2"
              >
                Network & Coverage
              </TabsTrigger>
            </TabsList>

            {/* The Txigo Difference */}
            <TabsContent value="difference" className="mt-8">
              <Card className="p-8 bg-white/90 backdrop-blur-sm">
                <h2 className="text-2xl font-bold mb-6">The Txigo Difference</h2>
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Txigo is India's new-age intercity taxi service transforming how people travel between cities. We make intercity travel more accessible, affordable, and seamless with reliable one-way and round-trip taxis across hundreds of routes.
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-6">
                      What sets Txigo apart is our sharp focus on customer comfort, transparent pricing, and reliability. Unlike traditional operators, we specialize in intercity travel with a no-surge, no-hidden-fee promise.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="text-indigo-600 mr-2">✓</span>
                        <span>Private, chauffeur-driven cabs (no ride-sharing)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-indigo-600 mr-2">✓</span>
                        <span>Door-to-door pick-up and drop</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-indigo-600 mr-2">✓</span>
                        <span>One-way fares on popular routes</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-indigo-600 mr-2">✓</span>
                        <span>Instant online booking and real-time support</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-indigo-600 mr-2">✓</span>
                        <span>Trained and verified drivers for long-distance</span>
                      </li>
                    </ul>
                  </div>
                  <div className="relative h-80 rounded-lg overflow-hidden">
                    <Image
                      src="/banner.jpg"
                      alt="Txigo Service"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Vision & Mission */}
            <TabsContent value="mission" className="mt-8">
              <Card className="p-8 bg-white/90 backdrop-blur-sm">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-indigo-50 p-6 rounded-lg">
                    <h3 className="text-xl font-bold mb-4 text-indigo-800">Our Vision</h3>
                    <p className="text-gray-700 leading-relaxed">
                      To become India's most trusted and affordable intercity mobility platform, making every journey as relaxing as the destination itself.
                    </p>
                  </div>
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h3 className="text-xl font-bold mb-4 text-green-800">Our Mission</h3>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      To simplify long-distance road travel by offering:
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span>Transparent, competitive pricing</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span>Clean and comfortable vehicles</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span>Courteous and professional drivers</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span>Pan-India route coverage</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-4">How Txigo Works</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    {[
                      { step: "1", title: "Book", description: "Via app or website in under 2 minutes" },
                      { step: "2", title: "Travel", description: "With verified drivers in comfortable cabs" },
                      { step: "3", title: "Arrive", description: "Safely at your destination, stress-free" },
                    ].map((item, index) => (
                      <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold mb-3">
                          {item.step}
                        </div>
                        <h4 className="font-semibold mb-1">{item.title}</h4>
                        <p className="text-gray-600 text-sm">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Network & Coverage */}
            {/* Network & Coverage */}
            <TabsContent value="network" className="mt-8">
              <Card className="p-8 bg-white/90 backdrop-blur-sm">
                <h2 className="text-2xl font-bold mb-6">Our Growing Network</h2>
                <p className="text-gray-700 leading-relaxed mb-8">
                  Txigo has rapidly expanded across India's top cities and travel corridors, especially in areas where public transport is unavailable or unreliable. We're the ideal solution for weekend travelers, corporate commuters, and families alike.
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {citiesCovered.map((region, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-bold text-lg mb-3 text-gray-800">{region.region}</h3>
                      <ul className="space-y-2">
                        {region.cities.map((city, cityIndex) => (
                          <li key={cityIndex} className="flex items-start">
                            <span className="text-indigo-600 mr-2">•</span>
                            <span>{city}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Popular Routes */}
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-xl font-bold mb-3 text-blue-800">Popular Routes</h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {[
                        "Delhi → Jaipur",
                        "Mumbai → Pune",
                        "Bangalore → Mysore",
                        "Kolkata → Darjeeling",
                        "Delhi → Chandigarh",
                        "Guwahati → Shillong",
                        "Ahmedabad → Vadodara",
                        "Chennai → Pondicherry"
                      ].map((route, index) => (
                        <div key={index} className="bg-white px-3 py-2 rounded text-sm shadow-sm flex items-center">
                          <ArrowRight className="h-4 w-4 mr-2 text-blue-500" />
                          {route}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Customer Testimonials */}
                  <div>
                    <h3 className="text-xl font-bold mb-4 text-gray-800">What Our Customers Say</h3>
                    <div className="space-y-4">
                      <div className="bg-white p-4 rounded-lg border-l-4 border-indigo-500 shadow-sm">
                        <p className="italic text-gray-700 mb-2">"Booked a Mumbai to Vadodara cab with Txigo and the entire experience was hassle-free. Transparent pricing and no last-minute surprises."</p>
                        <p className="font-medium text-gray-900">— Ramesh S., Business Traveler</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border-l-4 border-indigo-500 shadow-sm">
                        <p className="italic text-gray-700 mb-2">"Txigo is now our go-to for intercity trips. Safer and way more comfortable than trains or buses."</p>
                        <p className="font-medium text-gray-900">— Priyanka D., Frequent Traveler</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Media & Contact */}
                <div className="mt-8 grid md:grid-cols-2 gap-8">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-xl font-bold mb-3 text-gray-800">Media Mentions</h3>
                    <p className="text-gray-700 mb-4">
                      Txigo is gaining attention in the travel and mobility space for its disruptive approach to intercity travel.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {["Startup News", "Travel Blogs", "Local Media", "Business Journals"].map((source, index) => (
                        <span key={index} className="bg-white px-3 py-1 rounded-full text-xs font-medium shadow-sm">
                          {source}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-indigo-50 p-6 rounded-lg">
                    <h3 className="text-xl font-bold mb-3 text-indigo-800">Get In Touch</h3>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <Globe className="h-5 w-5 mt-0.5 mr-3 text-indigo-600" />
                        <a href="https://www.txigo.com" className="hover:underline">www.txigo.com</a>
                      </div>
                      <div className="flex items-start">
                        <Mail className="h-5 w-5 mt-0.5 mr-3 text-indigo-600" />
                        <a href="mailto:support@txigo.com" className="hover:underline">support@txigo.com</a>
                      </div>
                      <div className="flex items-start">
                        <Share2 className="h-5 w-5 mt-0.5 mr-3 text-indigo-600" />
                        <div>
                          <p className="text-sm">Follow us:</p>
                          <div className="flex space-x-3 mt-1">
                            {['Instagram', 'Facebook', 'Twitter'].map((platform) => (
                              <span key={platform} className="bg-white px-2 py-1 rounded text-xs font-medium shadow-sm">
                                @txigoindia
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
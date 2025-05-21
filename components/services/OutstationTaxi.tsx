import Image from "next/image";
import Link from "next/link";

const routes = [
  {
    from: "Bangalore",
    to: "Coorg",
    label: "Bangalore to Coorg road trip",
    distance: "254 km",
    time: "6 hours",
    bookText: "Bangalore to Coorg cabs",
  },
  {
    from: "Pune",
    to: "Bhimashankar",
    label: "Pune to Bhimashankar by road",
    distance: "124 km",
    time: "4 hours",
    bookText: "Pune to Bhimashankar cabs",
  },
  {
    from: "Dehradun",
    to: "Delhi",
    label: "Dehradun to Delhi road trip",
    distance: "239 km",
    time: "6 hours",
    bookText: "Dehradun to Delhi cabs",
  },
  {
    from: "Bangalore",
    to: "Mysore",
    label: "Bangalore to Mysore cab fares",
    distance: "282 km",
    time: "7 hours",
    bookText: "Bangalore to Mysore cab fares",
  },
  {
    from: "Jammu",
    to: "Srinagar",
    label: "Jammu to Srinagar road trip",
    distance: "244 km",
    time: "6 hours",
    bookText: "Jammu to Srinagar cabs",
  },
  {
    from: "Hyderabad",
    to: "Goa",
    label: "Hyderabad to Goa road trip",
    distance: "667 km",
    time: "15 hours",
    bookText: "Hyderabad to Goa cabs",
  },
];

export default function OutstationTaxi() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="mb-12 text-center">
        <h1 className="text-xl font-semibold my-4 border-t-2 border-b-2 border-gray-300 py-2 text-gray-800">
          Book an Outstation Cab with Driver -Safe & Reliable
        </h1>

        <p className="text-md text-gray-600 max-w-3xl mx-auto">
          Txigo's round-trip cabs are the perfect solution for a convenient and economical roundtrip journey to any destination. Enjoy the freedom of flexible travel, customizing your itinerary, and discovering hidden gems en route.
        </p>
      </section>

      {/* Budget Section */}
      <section className="bg-white py-10 px-4 md:px-10 lg:px-20 text-gray-800">
        <div className="max-w-5xl mx-auto text-start">
          <h2 className="text-xl md:text-2xl font-bold mb-4">
            Choose Txigo’s Budget-Friendly Round-Trip Cabs
          </h2>

          <p className="mb-3 text-sm md:text-base leading-relaxed">
            Round-trip cabs are perfect for customers planning a roundtrip journey with a doorstep pickup and drop service without booking separate cabs for a return journey. Whether for outstation trips or railway station and airport transfers, Txigo’s round-trip taxi guarantees a safe, secure, and stress-free travel experience.
          </p>
          <h2 className="text-xl md:text-2xl font-bold mb-4">
            Txigo's round-trip cab fares for top routes
          </h2>
          <p className="mb-5 text-sm md:text-base leading-relaxed">
            Txigo round-trip taxi fare is quite affordable as it is an all-inclusive price comprising driver allowance, toll tax, fuel charges, and GST. Moreover, our transparent pricing policy guarantees that customers pay only for the service used, with no hidden charges or additional costs added to their round-trip cab fare.
          </p>

          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border border-gray-200 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left py-2 px-3 font-semibold border-b">Cab Type</th>
                  <th className="text-left py-2 px-3 font-semibold border-b">Price Starting From</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2 px-3">AC Hatchbacks</td>
                  <td className="py-2 px-3">₹12/km</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-3">AC Sedans</td>
                  <td className="py-2 px-3">₹13.5/km</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-3">AC Premium SUVs</td>
                  <td className="py-2 px-3">₹16/km</td>
                </tr>
                <tr>
                  <td className="py-2 px-3">AC Tempo Travellers</td>
                  <td className="py-2 px-3">₹26/km</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Cab Options */}
      <section className="flex flex-col justify-center items-center py-10">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2 text-center">
          Wide range of local car rental options at Txigo
        </h2>
        <p className="mb-6 text-gray-600 px-4 text-center max-w-2xl text-sm">
          Txigo offers an extensive selection of local taxi cab options, catering to various needs and preferences.
          Whether you need a compact car for quick city trips or a spacious SUV for family gatherings, weddings, etc.,
          Txigo's fleet is equipped to provide the perfect vehicle for your journey.
        </p>

        <div className="w-full bg-blue-300 shadow-lg rounded-xl p-4 mx-2">
          <h2 className="text-xl md:text-2xl font-bold text-white border-b border-white pb-2 mb-4 text-center">
            Our Car Options
          </h2>

          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 md:gap-6">
            {[
              { src: "/inova-crysta.jpg", title: "Hatchback", seats: "4 Seater" },
              { src: "/etios-cab.jpg", title: "Sedan", seats: "4 Seater" },
              { src: "/suv.jpg", title: "SUV Large", seats: "7 Seater" },
              { src: "/tempo-1.jpg", title: "Full Size Van", seats: "12 Seater" },
            ].map((car, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 sm:gap-4 p-2 shrink-0"
              >
                <div className="rounded-full border-2 border-black p-1 sm:p-2">
                  <Image
                    src={car.src}
                    alt={car.title}
                    width={40}
                    height={40}
                    className="rounded-full object-cover sm:w-[70px] sm:h-[70px]"
                  />
                </div>
                <div className="text-[10px] sm:text-sm">
                  <h3 className="font-semibold text-gray-800">{car.title}</h3>
                  <p className="text-gray-700">{car.seats}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Fleet Options */}
      <section className="bg-white py-10 px-4 md:px-10 lg:px-20 text-gray-800">
        <div className="max-w-6xl mx-auto text-start">
          <h2 className="text-xl md:text-2xl font-bold mb-4">
            Txigo's Outstation Taxi Service Across Popular Routes
          </h2>

          <p className="mb-6 text-sm md:text-base leading-relaxed">
            Opt forTxigo's reliable and affordable outstation taxi service for a roundtrip journey, saving significantly on your travels and enjoying a memorable road trip to all popular destinations in India.
          </p>

          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border border-gray-200 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left py-2 px-3 font-semibold border-b">Popular Routes</th>
                  <th className="text-left py-2 px-3 font-semibold border-b">Total Distance</th>
                  <th className="text-left py-2 px-3 font-semibold border-b">Time Taken</th>
                  <th className="text-left py-2 px-3 font-semibold border-b">Book Cab</th>
                </tr>
              </thead>
              <tbody>
                {routes.map((route, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2 px-3">{route.label}</td>
                    <td className="py-2 px-3">{route.distance}</td>
                    <td className="py-2 px-3">{route.time}</td>
                    <td className="py-2 px-3 text-blue-600 hover:underline cursor-pointer">
                      <Link href={`/${route.bookText.split(" ")[0].toLowerCase()}/one-way`}>
                        {route.bookText}
                      </Link>


                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto p-6 font-sans">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Round-trip taxi services by Txigo</h1>
        <p className="text-gray-600 mb-6">Txigo offers round-trip taxi services for local, outstation, and airport transfers, allowing customers to choose any service based on their travel requirements and preferences.</p>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Outstation round-trip cabs</h2>
          <p className="text-gray-600 mb-4">Txigo's outstation round-trip car rental is perfect for to-and-fro journeys, where customers can enjoy the convenience of having a dedicated car and chauffeur at their service. Our flexibility with customers' travel itineraries, multiple stops, short detours, and breaks at popular destinations or eateries en route elevates the road trip experience without limiting it to a mere round-trip car ride.</p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Roundtrip airport taxi service</h2>
          <p className="text-gray-600 mb-4">Txigo's roundtrip airport taxi service is ideal for airport transfers, where customers can skip the inconvenience of booking separate cabs for a return journey. With the convenience of door-to-door service and the guarantee of on-time arrival at the airport, missing a flight can never happen with Txigo's reliable round-trip cabs.</p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">How to book round-trip cabs with Txigo?</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">Book your ride on our website:</h3>
              <p className="text-gray-600">Visit Txigo's official website to hire round-trip cabs, choose your preferred car type, enter your details, and get instant confirmation. Our user-friendly website provides a streamlined booking experience, allowing you to complete your round-trip cab booking with ease.</p>
            </div>
            <div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">Download the app:</h3>
              <p className="text-gray-600">Txigo's Android and iOS cab booking application is a handy app that allows you to book, manage, and engage with just a few clicks. By downloading the Txigo cab booking app, you can enjoy exclusive app-only deals and stay updated on current trends.</p>
            </div>
            <div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">Call center:</h3>
              <p className="text-gray-600">Experience the personal touch added by Txigo's dedicated call center, offering the best solutions and support for all travel queries. Give us a call at <span className="font-semibold">9045450000</span> for 24x7 support.</p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Why choose Txigo's round-trip car rental?</h2>
          <p className="text-gray-600 mb-4">As India's top-rated car rental company, Txigo Car Rentals offers the best cab service, promising comfort, safety, and convenience in every ride. Renowned for exceptional service, Txigo stands out for customers seeking reliable round-trip cab solutions. Txigo's commitment to quality, combined with nearly 20 years of experience in the industry, ensures that every ride in our well-maintained cabs driven by expert chauffeurs is a delightful and memorable experience.</p>

          <div className="grid grid-cols-1 gap-6 mt-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-800 mb-2">Safety first:</h3>
              <p className="text-gray-600">Safety is our top priority. We adhere to strict safety protocols, including regular vehicle inspections and driver training, to guarantee a secure journey for every passenger. On Tripadvisor, we have a score of 4.2 for safety.</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-800 mb-2">Well-maintained cars:</h3>
              <p className="text-gray-600">We understand the importance of a reliable vehicle for a smooth journey. That's why our cars are rigorously maintained to the highest standards, ensuring not only comfort but also reliability on the road.</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-800 mb-2">Service guaranteed:</h3>
              <p className="text-gray-600">At Txigo, we pride ourselves on our commitment to exceptional service. From the moment you book with us, every detail is handled with utmost care to ensure a seamless and satisfying travel experience.</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-800 mb-2">Expert chauffeurs:</h3>
              <p className="text-gray-600">Our chauffeurs are more than drivers; they are seasoned professionals. Skilled in navigation and customer service, they are equipped to make your journey comfortable and efficient.</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-800 mb-2">All-inclusive fares:</h3>
              <p className="text-gray-600">Txigo's all-inclusive fares comprise driver allowance, GST, toll taxes, and fuel charges. Our transparent pricing policy ensures no hidden costs are added to the final bill.</p>
            </div>
          </div>

        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Txigo's exclusive cab services for an upgraded travel experience</h2>
          <p className="text-gray-600 mb-4">Txigo sets a new standard in transportation with its specialized cab services, available across 20+ major Indian cities. These services transcend traditional travel, offering journeys defined by exceptional comfort and personalized attention. At Txigo, travel is not just about reaching a destination—it's about curating a seamless, enjoyable road trip experience tailored to each passenger's unique needs, turning every journey into a cherished memory.</p>

          <div className="grid grid-cols-1 gap-6 mt-6">
            <div className="border border-gray-200 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-800 mb-2">Cabs equipped with luggage carriers</h3>
              <p className="text-gray-600">We recognize the importance of hassle-free travel, especially when it comes to managing luggage. Therefore, our vehicles come with dedicated luggage carriers, ensuring your belongings are transported securely and conveniently. This thoughtful feature underscores our commitment to delivering a seamless, stress-free travel experience.</p>
            </div>
            <div className="border border-gray-200 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-800 mb-2">Language-fluent chauffeurs</h3>
              <p className="text-gray-600">We enhance your travel experience by providing a driver fluent in your preferred language, ensuring a truly personalized journey. This service not only eliminates language barriers but also fosters a comfortable and engaging environment where you feel understood and at ease throughout your trip.</p>
            </div>
            <div className="border border-gray-200 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-800 mb-2">VIP-assisted pickup</h3>
              <p className="text-gray-600">Txigo's VIP-assisted pickup service offers a seamless blend of luxury and convenience, ensuring a smooth journey from your doorstep to any destination. From the moment you step outside, you are greeted with a personalized welcome, setting the stage for an exceptional travel experience. With a focus on delivering unparalleled comfort and className, Txigo redefines hassle-free travel with its commitment to excellence.</p>
            </div>
            <div className="border border-gray-200 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-800 mb-2">New car promise</h3>
              <p className="text-gray-600">Travel in style with our modern fleet of brand-new vehicles with the best features and amenities. We regularly update our fleet to offer the latest car models, ensuring you enjoy a ride with great convenience and elegance. Our dedication to providing a "new car" experience guarantees an unparalleled journey every time.</p>
            </div>
            <div className="border border-gray-200 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-800 mb-2">Pet-friendly cabs</h3>
              <p className="text-gray-600">Distressed about finding reliable caretakers for your furry friends? Not anymore. Embark on an unforgettable road trip to your favorite destination with Txigo's pet-friendly cabs—the ideal choice for pet parents and their furry companions. With a pet-friendly chauffeur at the helm, every journey is designed to be smooth, safe, and truly memorable.</p>
            </div>
          </div>

        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">About Txigo Car Rentals</h2>
          <p className="text-gray-600">Txigo Car Rentals, established in 2006, is India's leading chauffeur-driven car rental service provider. Demonstrating an unwavering commitment to reliability, safety, and affordability, Txigo has a presence in over 2,000 cities across the country, creating the most extensive geographical network of cab services.</p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Frequently asked questions by Txigo customers</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">How to book a round-trip taxi with Txigo?</h3>
              <p className="text-gray-600">You can create a one-way cab booking with Txigo by visiting our website, downloading our car rental app, or calling our customer care team at 9045450000.</p>
            </div>
            <div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">Can I make stops during my round-trip journey with Txigo?</h3>
              <p className="text-gray-600">Yes. With Txigo, your round-trip journey is completely customizable. You can make multiple stops, take short detours, or visit popular tourist sites en route to your destination. Our courteous chauffeurs are flexible with your itineraries, ensuring an enhanced travel experience and complete customer satisfaction.</p>
            </div>
            <div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">Are there any hidden charges for round-trip cab services?</h3>
              <p className="text-gray-600">No. Txigo follows a transparent pricing policy and all-inclusive fares for a round-trip taxi, where the ride price includes the driver charges, fuel charges, tolls and taxes, and GST, with no hidden or additional prices added to the final bill. What you see at the end of the trip is what you pay.</p>
            </div>
            <div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">Are round-trip cabs suitable for airport transfers?</h3>
              <p className="text-gray-600">Certainly! Booking a round-trip taxi is perfect for airport transfers, as you can enjoy door-to-door service and the promise of reaching the airport on time. Whether you have to pick up your guests from the airport or drop them off, a round-trip cab service eliminates the hassle of booking separate cabs for a return journey, saving you time and money.</p>
            </div>
            <div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">Does Txigo provide doorstep pickup and drop-off for round-trip cabs?</h3>
              <p className="text-gray-600">Yes. Txigo offers doorstep pickup and drop-off for round-trip cabs to customers making a round-trip cab booking with us. Whether you require cabs for outstation trips, running local errands, or airport transfers, Txigo offers a dedicated cab and a professional chauffeur until your trip is completed.</p>
            </div>
            <div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">Are Txigo's round-trip cabs available for all routes?</h3>
              <p className="text-gray-600">Txigo offers round-trip cab service across more than 2000 cities in India. You can book a round-trip car rental from top cities like Delhi, Bangalore, Mumbai, Chennai, Pune, Kolkata, Mysore, etc., and travel to popular destinations like Shimla, Manali, Pondicherry, Coorg, Varkala, and more conveniently. We also offer services in tier-three cities and remote towns, ensuring the availability of cabs for all your travel needs.</p>
            </div>
            <div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">What types of vehicles do you offer for round-trip rides?</h3>
              <p className="text-gray-600">Txigo has an extensive fleet with multiple cab options, including compact hatchbacks (Tata Indica), comfortable sedans (Swift Dzire, Toyota Etios, Tata Indigo), SUVs (Mahindra Xylo, Maruti Ertiga), and Toyota Innova and Innova Crysta cabs. For groups larger than 8, you can also hire a tempo traveller or a minibus.</p>
            </div>
            <div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">What is Txigo's cancellation policy?</h3>
              <p className="text-gray-600">You may cancel the booking 24 hours before the journey time without any cancellation charges for all services. In case cancellation or shorting of the trip is requested within 24 hours of the pick-up time, then the following rules will apply:</p>
              <ul className="list-disc pl-5 mt-2 text-gray-600">
                <li className="mb-1">Multi-day trip: The charge for the first day will be deducted from the total amount, and the user will receive a refund.</li>
                <li className="mb-1">Single Day trip/ Airport transfer: No Refund will be issued to the user.</li>
                <li>Airport transfer: No cancellation charges apply if cancelled at least 2 hours before pickup time.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <section className=" py-10">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-6 border-t border-b border-gray-300 py-4">
            Popular Cab Services by Txigo
          </h2>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-blue-600 font-medium">
            <li>
              <a href="/" className="hover:underline">Homepage</a>
            </li>
            <li>
              <a href="/oneWayCabs" className="hover:underline">One Way Cabs</a>
            </li>
            <li>
              <a href="/services/airport" className="hover:underline">Airport Taxi</a>
            </li>
            <li>
              <a href="/services/corporate" className="hover:underline">Corporate Car Rental</a>
            </li>
            <li>
              <a href="/" className="hover:underline">Roundtrip Cabs</a>
            </li>
            <li>
              <a href="/services/tempo-travellers" className="hover:underline">Tempo Travellers and Minibuses</a>
            </li>
          </ul>
        </div>
      </section>
    </div>
  )
}

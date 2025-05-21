import Image from "next/image";
import Link from "next/link";

export default function LocalRentals() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="mb-12 text-center">
        <h1 className="text-xl font-semibold my-4 border-t-2 border-b-2 border-gray-300 py-2 text-gray-800">
          Book a Local Car Rental for Weddings, Errands, Sightseeing, etc.
        </h1>

        <p className="text-md text-gray-600 max-w-3xl mx-auto">
          Embark on a journey of convenience, variety, and unmatched reliability with Txigo's local car rental services.
          Tailored to meet the diverse needs of travellers, Txigo offers a seamless travel experience in its local taxi cabs,
          combining the luxury of choice with the assurance of quality service.
        </p>
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
      <section className="mb-12 px-4 md:px-8">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">
          Txigo's Local Car Rental Fares
        </h3>
        <p className="mb-6 text-gray-600 max-w-2xl">
          Txigo offers transparent and competitive local car rental fares. Whether you need a cab for half-day or full-day,
          Txigo's pricing is reasonable and clear, with no hidden charges.
        </p>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-blue-100 text-gray-700 text-sm uppercase">
              <tr>
                <th className="py-3 px-6 text-left">Cab Type</th>
                <th className="py-3 px-6 text-left">Half-Day Fare</th>
                <th className="py-3 px-6 text-left">Full-Day Fare</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm divide-y divide-gray-200">
              <tr className="hover:bg-gray-50">
                <td className="py-3 px-6">AC Sedans</td>
                <td className="py-3 px-6">₹1335</td>
                <td className="py-3 px-6">₹2512</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="py-3 px-6">AC SUVs & MUVs</td>
                <td className="py-3 px-6">₹2406</td>
                <td className="py-3 px-6">₹3595</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="py-3 px-6">Premium SUVs</td>
                <td className="py-3 px-6">₹2629</td>
                <td className="py-3 px-6">₹4232</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="py-3 px-6">AC Tempo Travellers</td>
                <td className="py-3 px-6">₹6917</td>
                <td className="py-3 px-6">₹8520</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>


      {/* Why Choose Txigo */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
          Why trust Txigo's local car rentals over self-drive cars?
        </h2>
        <p className="mb-6 text-gray-600">
          Opting for Txigo's local taxi cabs over self-drive car rentals means choosing peace of mind, expert navigation, and comfort.
          With Txigo, you get the benefit of experienced drivers who are well-versed in routes and ensure a safe and relaxed journey,
          freeing you from the hassles of navigation and traffic.
        </p>

        <div className="grid  gap-8 mb-8">
          <section className="py-12 bg-blue-50">
            <div className="container mx-auto px-4">
              {/* Heading */}
              <h2 className="text-3xl font-bold text-center text-blue-800 mb-12">
                Why Choose <span className="text-blue-600">Txigo</span> Over Self-Drive?
              </h2>

              {/* Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Feature 1 - Travel Expertise */}
                <div className="bg-white rounded-xl p-6 shadow-md text-center">
                  <div className="bg-blue-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4 overflow-hidden">
                    <Image
                      src="/banner.jpg"
                      alt="Travel Expertise"
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-blue-800 mb-2">Travel Expertise</h3>
                  <p className="text-gray-600">Professional drivers who know the best routes</p>
                </div>

                {/* Feature 2 - Door to Door Pickup */}
                <div className="bg-white rounded-xl p-6 shadow-md text-center">
                  <div className="bg-blue-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4 overflow-hidden">
                    <Image
                      src="/banner.jpg"
                      alt="Door to Door Pickup"
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-blue-800 mb-2">Door to Door Pickup</h3>
                  <p className="text-gray-600">We pick you up from your preferred location</p>
                </div>

                {/* Feature 3 - Sitback and Relax */}
                <div className="bg-white rounded-xl p-6 shadow-md text-center">
                  <div className="bg-blue-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4 overflow-hidden">
                    <Image
                      src="/banner.jpg"
                      alt="Sitback and Relax"
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-blue-800 mb-2">Sitback and Relax</h3>
                  <p className="text-gray-600">No driving stress, just enjoy your journey</p>
                </div>

                {/* Feature 4 - Zero Liability */}
                <div className="bg-white rounded-xl p-6 shadow-md text-center">
                  <div className="bg-blue-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4 overflow-hidden">
                    <Image
                      src="/banner.jpg"
                      alt="Zero Liability"
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-blue-800 mb-2">Zero Liability</h3>
                  <p className="text-gray-600">We handle all vehicle-related responsibilities</p>
                </div>
              </div>
            </div>
          </section>


          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1 mr-3 text-blue-500">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Doorstep pick-up and drop-off service</h3>
                <p className="text-gray-600">Enjoy hassle-free travel with our complimentary doorstep pick-up and drop-off service.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1 mr-3 text-blue-500">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Expert chauffeurs at your service</h3>
                <p className="text-gray-600">Our multilingual chauffeurs are well-trained in driving and navigation, offering you valuable local insights.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1 mr-3 text-blue-500">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Relax and enjoy the ride</h3>
                <p className="text-gray-600">Leave the driving to our professional chauffeurs and escape the city's challenging traffic.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1 mr-3 text-blue-500">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Streamlined booking process</h3>
                <p className="text-gray-600">Book your ride effortlessly with Txigo's website or app in just four quick steps.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1 mr-3 text-blue-500">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Zero reliability</h3>
                <p className="text-gray-600">Booking Txigo's local taxi cabs requires no security deposits.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Process */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            How to Book a Local Cab with Txigo
          </h2>

          <div className="space-y-8">
            {/* Website Booking */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold text-blue-600 mb-3 flex items-center">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                Book Online
              </h3>
              <p className="text-gray-600">
                Visit Txigo's website, where you can choose your preferred car, enter your details, and get instant confirmation on your local cab booking. Our user-friendly website provides a streamlined booking experience, allowing you to plan your ride with ease.
              </p>
            </div>

            {/* App Booking */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold text-blue-600 mb-3 flex items-center">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                Mobile App
              </h3>
              <p className="text-gray-600">
                Txigo's Android & iOS local car rental app is a handy application that allows you to book, manage, and engage with just a few clicks. By downloading the local cab booking app, you enjoy exclusive app-only deals and stay updated on the latest travel trends.
              </p>
            </div>

            {/* Call Center */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold text-blue-600 mb-3 flex items-center">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call Center
              </h3>
              <p className="text-gray-600">
                Need human assistance for your local cab booking process? Txigo's dedicated call center offers bespoke solutions and support for all travel queries. Give us a call at <span className="font-semibold text-blue-600">9045450000</span> for 24x7 support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Other Services */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2 text-center">
          Other car rental services available at Txigo
        </h2>

        <div className="flex flex-col gap-6">
          {/* Card 1 */}
          <div className="w-full p-2">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              Outstation - Oneway trips & Round trips
            </h3>
            <p className="text-gray-600">
              Looking for a comfortable and safe way to travel out of town? Choose Txigo's outstation services for your longer journeys.
            </p>
          </div>

          {/* Card 2 */}
          <div className="w-full p-2">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              Airport transfers
            </h3>
            <p className="text-gray-600">
              Make your airport journeys stress-free with Txigo's timely and comfortable airport transfer services.
            </p>
          </div>

          {/* Card 3 */}
          <div className="w-full p-2">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              Corporate car rentals
            </h3>
            <p className="text-gray-600">
              Txigo's corporate car rental services cater to the unique demands of business travel.
            </p>
          </div>

          {/* Card 4 */}
          <div className="w-full p-2">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              Wedding car rentals
            </h3>
            <p className="text-gray-600">
              Experience elegance and style on your special day with Txigo's wedding car rental services.
            </p>
          </div>
        </div>
      </section>


      {/* Cities Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
          Book local cabs across multiple cities
        </h2>
        <p className="mb-6 text-gray-600">
          Book a local taxi service across various cities with Txigo at the most affordable rates.
          Choose from our options of 4 hours/40 km to 12 hours/120 km and explore popular destinations.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            ['Bangalore', 'Mumbai', 'Hyderabad', 'Delhi'],
            ['Goa', 'Chennai', 'Pune', 'Ahmedabad']
          ].map((group, groupIndex) => (
            <div key={groupIndex} className="flex flex-col gap-4">
              {group.map((city) => (
                <Link
                  key={city}
                  href={`/${city.toLowerCase()}/rental`}
                  className="text-center text-gray-700 font-medium hover:text-blue-600 hover:underline transition duration-200"
                >
                  {city} car rental
                </Link>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Txigo */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
          Why choose Txigo car rentals?
        </h2>
        <p className="mb-6 text-gray-600">
          Choosing Txigo Car Rentals means prioritizing comfort, safety, and convenience.
          Renowned for delivering exceptional service, Txigo is the trusted choice for travelers seeking dependable car rental solutions.
        </p>

        <div className="flex flex-col gap-3">
          <div className="p-6 rounded-lg bg-transparent">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Service guaranteed</h3>
            <p className="text-gray-600">
              At Txigo, last-minute cancellations never happen. We pride ourselves on our commitment to exceptional service.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-transparent">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Transparent pricing</h3>
            <p className="text-gray-600">
              Txigo follows a transparent pricing policy where customers pay what they see at the end of the trip.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-transparent">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Expert chauffeurs</h3>
            <p className="text-gray-600">
              Our chauffeurs are more than drivers; they are seasoned professionals skilled in navigation and customer service.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-transparent">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Track record</h3>
            <p className="text-gray-600">
              Txigo's commitment to excellence is reflected in our customer reviews with a consistent rating of 4.4 stars and above.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-transparent">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Well-maintained cars</h3>
            <p className="text-gray-600">
              We understand the importance of a reliable vehicle for a smooth journey. That's why our cars are rigorously maintained.
            </p>
          </div>
        </div>
      </section>


      {/* Exclusive Services */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
          Txigo's exclusive services for an upgraded travel experience
        </h2>
        <p className="mb-6 text-gray-600">
          Txigo sets the standard for excellence by launching special cab services in over 20 major Indian cities.
          These services transcend traditional transportation, offering a journey characterized by comfort and personalization.
        </p>

        <div className="flex flex-col gap-3">
          <div className="p-6 rounded-lg bg-transparent">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">VIP-assisted pickup</h3>
            <p className="text-gray-600">
              Experience the epitome of luxury from the very first step with our VIP-assisted pickup service.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-transparent">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Cabs with luggage Carriers</h3>
            <p className="text-gray-600">
              Our cars are equipped with dedicated luggage carriers, ensuring your belongings are transported safely.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-transparent">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Language-fluent drivers</h3>
            <p className="text-gray-600">
              With drivers who speak your language, we offer a unique, personalized exploration experience.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-transparent">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">New car promise</h3>
            <p className="text-gray-600">
              Our fleet is continuously updated, ensuring you travel in the latest models equipped with modern amenities.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-transparent">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Pet-friendly cabs</h3>
            <p className="text-gray-600">
              Experience the thrill of a road trip to your favorite destination with Txigo's pet-friendly cabs.
            </p>
          </div>
        </div>
      </section>


      {/* About Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
          About Txigo Car Rentals
        </h2>
        <p className="text-gray-600">
          Established in 2006, Txigo Car Rentals has emerged as India's premier chauffeur-driven car rental service provider,
          specializing in local, outstation, and airport cab services. Committed to delivering reliable, safe, and affordable transportation,
          Txigo boasts an unparalleled presence across more than 2000 cities, establishing itself as the country's most extensive cab service network.
        </p>
      </section>

      {/* FAQ Section */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
          Frequently asked questions by Txigo customers
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              How can I book a local car rental with Txigo?
            </h3>
            <p className="text-gray-600">
              Book a local taxi cab with Txigo by visiting our website, downloading our cab booking app, or calling our responsive customer care service.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              What types of vehicles are available for rent?
            </h3>
            <p className="text-gray-600">
              Txigo offers various options for a local taxi service. Our fleet includes compact hatchbacks, comfortable sedans, SUVs, and tempo travellers.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              Are there any hidden fees or additional charges?
            </h3>
            <p className="text-gray-600">
              At Txigo, we follow a transparent billing policy, charging customers only for their trip and nothing beyond.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              What is Txigo's cancellation policy?
            </h3>
            <p className="text-gray-600">
              You may cancel the booking 24 hours prior to the time of the journey without any cancellation charges for all services.
            </p>
          </div>
        </div>
      </section>


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
              <a href="/services/airport" className="hover:underline">Reviews & Testimonials</a>
            </li>
            <li>
              <a href="/" className="hover:underline">Book Oneway Cabs</a>
            </li>
            <li>
              <a href="/about" className="hover:underline">Our Company</a>
            </li>
          </ul>
        </div>
      </section>
    </div>
  )
}
import Image from "next/image";
import Link from "next/link";

export default function AirportTaxi() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="mb-12 text-center">
        <h1 className="text-xl font-semibold my-4 border-t-2 border-b-2 border-gray-300 py-2 text-gray-800">
          Hire Reliable Airport Taxi - On-time Service Guaranteed
        </h1>

        <p className="text-md text-gray-600 max-w-3xl mx-auto">
          Make your airport transfers convenient and affordable with Txigo’s airport taxi service. Txigo offers diverse cab options and the luxury of choosing the right one for seamless travel, guaranteeing quality service, and punctual airport pickup and drop.
        </p>
      </section>

      {/* Cab Options */}
      <section className="flex flex-col justify-center items-center py-10">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2 text-center">
          Txigo's wide range of airport taxi options
        </h2>
        <p className="mb-6 text-gray-600 px-4 text-center max-w-2xl text-sm">
          Txigo presents a diverse range of airport cabs, and customers can choose any cab based on their travel needs and preferences. From compact cars for quick drops to hotels or business meetings to spacious SUVs for outstation trips, our fleet is the best option for a hassle-free journey.
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
          Airport taxi Rates
        </h3>
        <p className="mb-6 text-gray-600 max-w-2xl">
          Txigo offers an economical and transparent airport taxi fare. Be it a short ride or a long journey for an outstation trip, our prices are quite competitive and clear, with no hidden charges or additional costs.
        </p>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-blue-100 text-gray-700 text-sm uppercase">
              <tr>
                <th className="py-3 px-6 text-left">Cab Type</th>
                <th className="py-3 px-6 text-left">Airport taxi fare (starting from)</th>

              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm divide-y divide-gray-200">
              <tr className="hover:bg-gray-50">
                <td className="py-3 px-6">AC Sedans</td>
                <td className="py-3 px-6">₹31/km</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="py-3 px-6">AC SUVs & MUVs</td>
                <td className="py-3 px-6">₹60/km</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="py-3 px-6">Premium SUVs</td>
                <td className="py-3 px-6">₹75/km</td>
              </tr>

            </tbody>
          </table>
        </div>
      </section>

      <div className="max-w-4xl mx-auto p-6 font-sans">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Airport taxi services by Txigo</h1>
        <p className="text-gray-600 mb-6">Txigo's airport taxi services extend to local drop-offs, outstation trips, and one-way journeys, where customers can choose any of these services based on their travel itinerary and requirements.</p>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">One-way airport taxi service</h2>
          <p className="text-gray-600 mb-4">Looking for a one-way taxi service to reach your preferred location from or to the airport? Txigo's one-way cabs are just a few clicks away. Pre-book a taxi for airport seamlessly using our app or website and enjoy the convenience of a chauffeur-driven ride without the hassle of waiting in long queues at the airport for taxis or relying on airport shuttles for the commute. </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Local hourly cab service</h2>
          <p className="text-gray-600 mb-4">Have a layover at the airport and wish to explore the city? Booking local hourly car rentals with Txigo is perfect for quick sightseeing, shopping, or running errands. With options like 4-hour 40km to 12-hour 120 km, you can hire local hourly cabs for the required duration and enjoy a comfortable ride around the city. </p>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Outstation airport taxi service</h2>
          <p className="text-gray-600 mb-4">Txigo's airport taxi service extends to outstation journeys as well. From the airport, you can plan your intercity travel by booking a comfortable chauffeur-driven outstation cab and embark on a hassle-free trip, be it to top cities, hill stations, beach destinations, or offbeat locations.</p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">How to book a taxi for airport with Txigo?</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">Book your ride on our website :</h3>
              <p className="text-gray-600"> Visit Txigo's official website to hire an airport taxi, choose your preferred car type, enter your details, and get ready to commence your journey. Our user-friendly website provides a streamlined booking experience, allowing you to pre-book cabs for airport pickup and drop and travel stress-free in chauffeur-driven cars.</p>
            </div>
            <div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">Download the app:</h3>
              <p className="text-gray-600">Txigo's Android & iOS cab booking app is a handy airport taxi app that allows you to book, manage, and engage with just a few clicks. By downloading the Txigo app, you gain access to exclusive app-only deals, simplifying your airport taxi booking process with ease right at your fingertips.</p>
            </div>
            <div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">Call center:</h3>
              <p className="text-gray-600">Experience the personal touch added by Txigo's dedicated call center, offering the best solutions and support for all travel queries. Give us a call at <span className="font-semibold">9045450000</span> for 24x7 support.</p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Choose Txigo Car Rentals - Indias top-rated airport cab service</h2>
          <p className="text-gray-600 mb-4">Choosing Txigo Car Rentals means opting for unparalleled comfort, safety, and convenience. Trusted by travelers for exceptional service, Txigo is the go-to choice for reliable car rental solutions. With nearly two decades of industry expertise, we are committed to delivering quality at every step. Our well-maintained vehicles and professional chauffeurs ensure airport transfers are more than just a ride—theyre an unforgettable experience.</p>

          <div className="grid grid-cols-1 gap-6 mt-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-800 mb-2">Timely airport pickup and drop service:</h3>
              <p className="text-gray-600"> Book a taxi for airport with Txigo and enjoy reliable service with the guarantee of never missing a flight. 
Expert chauffeurs: Our professional drivers will hold a placard with your name, assist you with the luggage, and escort you to the car. Not just that, they will also be your travel companion and your local guides whenever needed.</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-800 mb-2">Different cab services for different trip types:</h3>
              <p className="text-gray-600"> Besides reliable airport pickup and drop service, Txigo also offers cabs for outstation trips, local sightseeing, and hourly car rental options for customers.</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-800 mb-2">Fixed pricing:</h3>
              <p className="text-gray-600"> Txigo's hassle-free prepaid booking facility can help avoid surge prices and sold-out situations, guaranteeing a reliable cab for customers, be it for early-morning arrivals or late-night departures. Travelers can also skip the inconvenience of waiting in long queues at the airport for taxis.</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-800 mb-2">Flexible itineraries:</h3>
              <p className="text-gray-600">Our chauffeurs are more than drivers; they are seasoned professionals. Skilled in navigation and customer service, they are equipped to make your journey comfortable and efficient.</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-800 mb-2">All-inclusive fares:</h3>
              <p className="text-gray-600">Txigo welcomes changes to itineraries, allowing travelers to personalize their trips and choose routes and stops as per their convenience.</p>
            </div>
          </div>

        </div>
              {/* Cities Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
          Txigo's airport taxi service across multiple cities
        </h2>
        <p className="mb-6 text-gray-600">
          Book a taxi for airport across all the top Indian cities with Txigo and experience a comfortable and stress-free ride in chauffeur-driven airport cabs.
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
                  href={`/${city.toLowerCase()}/airport`}
                  className="text-center text-gray-700 font-medium hover:text-blue-600 hover:underline transition duration-200"
                >
                  {city}  airport taxi
                </Link>
              ))}
            </div>
          ))}
        </div>
      </section>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Txigo's exclusive cab services for an upgraded travel experience</h2>
          <p className="text-gray-600 mb-4">Txigo redefines excellence in transportation by introducing specialized cab services across 20+ major Indian cities. These services go beyond conventional travel, delivering journeys distinguished by comfort and personalization. At Txigo, we view travel as more than simply reaching a destination—its about crafting a seamless and enjoyable road trip experience tailored to each passenger's unique needs, ensuring every journey becomes a lasting memory.</p>

          <div className="grid grid-cols-1 gap-6 mt-6">
            <div className="border border-gray-200 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-800 mb-2">VIP-assisted pickup</h3>
              <p className="text-gray-600">Experience the epitome of luxury from your doorstep to the airport and vice versa with Txigo's VIP-assisted pickup service. We ensure your journey begins seamlessly with an exclusive, personalized welcome as soon as you step out of your door. Our dedication to delivering VIP treatment establishes a standard of comfort and class for your journey, making it hassle-free.</p>
            </div>
            <div className="border border-gray-200 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-800 mb-2">Cabs equipped with luggage carriers</h3>
              <p className="text-gray-600">We understand the importance of hassle-free travel, particularly when it comes to managing your luggage. Hence, our vehicles are equipped with dedicated luggage carriers, ensuring your baggage is transported securely and conveniently. This commitment reflects our dedication to providing a seamless, smooth, and stress-free travel experience.</p>
            </div>
            <div className="border border-gray-200 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-800 mb-2">Language-fluent chauffeurs</h3>
              <p className="text-gray-600">By assigning a driver fluent in your preferred language, we promise a unique, personalized travel experience. Besides overcoming language barriers, this service aims to create a comfortable and engaging travel environment where you feel understood and at ease.</p>
            </div>
            <div className="border border-gray-200 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-800 mb-2">New car promise</h3>
              <p className="text-gray-600">Journey in style with our modern fleet of brand-new cars sporting the best features and amenities. We continuously update our fleet to ensure you travel in the latest car models of your choice. This commitment to providing a "new car" experience guarantees a stylish, comfortable, and contemporary travel environment for every ride.</p>
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
              <h3 className="text-xl font-medium text-gray-800 mb-2">Does Txigo offer 24/7 airport taxi services?</h3>
              <p className="text-gray-600">Yes, Txigo Car Rentals provides 24/7 airport taxi services across all major Indian cities. Whether it is a late-night or early-morning flight, make your airport transfers smooth and stress-free by booking a top-rated airport taxi with Txigo. We guarantee timely arrival with no scope of missing your flight. </p>
            </div>
            <div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">How do I book an airport taxi online?</h3>
              <p className="text-gray-600">To book an airport pickup taxi or a cab for airport dropping, visit Txigo's website or download our user-friendly app and complete your booking in just a few clicks. For human assistance, you can even contact our customer service team at 9045450000 to complete the airport cab booking process. </p>
            </div>
            <div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">How much does an airport taxi cost?</h3>
              <p className="text-gray-600">Txigo provides the cheapest airport cab service, offering competitive and affordable rates. You can book an airport taxi at any domestic or international airport in India and head to your hotel, a nearby city, or any other destination in a reliable, comfortable, and economical cab.</p>
            </div>
            <div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">What payment methods does Txigo accept??</h3>
              <p className="text-gray-600">Txigo is flexible with both online and offline payments. You can pay the driver in cash, credit/debit cards, UPI, GPay, PhonePe, and international cards, or you can make an online payment while completing your airport taxi booking.</p>
            </div>
            <div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">Do you offer airport transfers to nearby cities?</h3>
              <p className="text-gray-600">Yes. Txigo offers airport cabs for outstation trips to nearby cities. You can either book a one-way cab for a one-way drop or opt for a roundtrip ride and reach the airport in the same cab conveniently.</p>
            </div>
            <div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">What types of vehicles do you offer for airport transfers?</h3>
              <p className="text-gray-600">Txigo has an extensive fleet with multiple cab options ranging from compact hatchbacks (Tata Indica), comfortable sedans (Swift Dzire, Toyota Etios, Tata Indigo), and SUVs (Mahindra Xylo, Maruti Ertiga) to Toyota Innova and Innova Crysta cabs. You can also hire a tempo traveller or a minibus for a group size of more than 8 members. </p>
            </div>
            <div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">Do you offer meet-and-greet services at the airport?</h3>
              <p className="text-gray-600">Txigo's chauffeurs promptly arrive at the airports Arrival Gate with a placard displaying the travellers name. They courteously escort the passenger to the cab, carrying their luggage, and assist them throughout the ride, ensuring a hassle-free travel experience.</p>
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

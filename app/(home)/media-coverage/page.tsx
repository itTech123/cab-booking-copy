
const mediaItems = [
  {
    title: "MakeMyTrip acquires controlling stake in cab rental company Txigo Car rentals",
    description: "MakeMyTrip secures a dominant share in Txigo Car Rentals through acquisition, strengthening its presence in the cab rental industry",
    source: "Economic Times",
    img: "/banner.jpg",
    link: "https://economictimes.indiatimes.com/industry/services/travel/makemytrip-completes-Txigo-transaction-acquires-controlling-stake-in-cab-rental-company/articleshow/107139733.cms"
  },
  {
    title: "Mobility as a Service - Revolutionizing the Car Rental Industry | Insight by Txigo",
    description: "Txigo provides insights on how Mobility as a Service is transforming the car rental industry",
    source: "Deccan Herald",
  img: "/banner.jpg",
    link: "https://www.deccanherald.com/brandpr/mobility-as-a-service-revolutionizing-the-car-rental-industry-insights-from-Txigo-car-rentals-2859237"
  },
  {
    title: "Txigo’s Special Services set to significantly impact the car rental industry in India",
    description: "Txigo's Special Services poised to make a big impact in India's car rental sector",
    source: "Hindustan Times",
    img: "/banner.jpg",
    link: "https://www.hindustantimes.com/brand-stories/Txigos-specialized-services-set-to-significantly-impact-the-car-rental-industry-in-india-101702294281920.html"
  }
];

export default function MediaCoverage() {
  return (
    <div className="px-4 md:px-20 py-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
        Media Coverage for Txigo Car Rentals
      </h1>
      <p className="text-sm md:text-base text-justify mb-8">
        Txigo is India's largest Car Rental company. With over 15 years of experience,
        it is an industry leader in Indian Travel and Tourism. We are covered in top publications
        like Times of India, Indian Express, Forbes India, Deccan Herald, and Hindustan Times.
        Our media presence includes press releases, thought leadership pieces, and inspirational
        travel content aligned with the vision of an Aatmanirbhar Bharat.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mediaItems.map((item, idx) => (
          <div key={idx} className="bg-[#edeceb] rounded-lg overflow-hidden shadow-md">
            <img src={item.img} alt={item.source} className="w-full h-[150px] object-cover" />
            <div className="p-4">
              <h4 className="text-sm font-semibold mb-2">
                <a href={item.link} target="_blank" rel="noreferrer" className="text-blue-700 hover:underline">
                  {item.title}
                </a>
              </h4>
              <p className="text-xs mb-3">{item.description}</p>
              <p className="text-center font-bold text-sm">{item.source}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


const mediaItems = [
  {
    title: "Txigo’s Vision: Mobility as a Service Is the Future- Deccan Herald",
    description: "Txigo shares thought leadership on how 'Mobility as a Service' (MaaS) is reshaping the car rental industry, driven by technology, user experience, and urban demand. Leveraging technology, the company is building an ecosystem where seamless, on-demand, and subscription-based car rentals are redefining mobility access",
    source: "Deccan Herald",
    img: "/banner.jpg",
    link: ""
  },
  {
    title: "Revolutionizing Rentals: Txigo’s Special Services Lead the Way- Hindustan Times.",
    description: "Txigo introduces unique service lines that cater to emerging travel demands from chauffeur-driven premium rides to intercity flexibility. These offerings are redefining convenience and reliability in the Indian market.",
    source: "Hindustan Times",
    img: "/banner.jpg",
    link: ""
  },
  {
    title: "Leisure Travel Dented, but Not Defeated: CEO Speaks Out- Live Mint",
    description: "In a candid conversation, Txigo’s CEO discusses how the second wave of COVID-19 impacted travel behavior and why hope for revival remains strong.",
    source: "Live Mint",
    img: "/banner.jpg",
    link: ""
  },
  {
    title: "Customers Returning Stronger: Travel Recovery in Progress- Financial Express",
    description: "Repeat customers are driving the comeback of travel, according to Txigo's leadership, who anticipate a full rebound by the second half of the year.",
    source: "Financial Express",
    img: "/banner.jpg",
    link: ""
  },
  {
    title: "Faster Access to Vaccination Centers with Txigo Cabs- Business News This Week",
    description: "To support the national vaccination drive, Txigo mobilized rapid-response cab services in over 2,500 cities, ensuring access to hospitals and vaccination centers in under 90 minutes.",
    source: "Business News This Week",
    img: "/banner.jpg",
    link: ""
  },
  {
    title: "One-Way Rentals Boom Amid Travel Curbs- Financial Express",
    description: "Lockdowns may have disrupted mobility, but Txigo’s flexible one-way rental model saw a surge in demand as people sought safer, more economical travel solutions.",
    source: "Financial Express",
    img: "/banner.jpg",
    link: ""
  },
  {
    title: "Emergency Travel Support: Txigo Serves Over 25,000 Patients- International Business Times",
    description: "Txigo emerged as a critical player during the pandemic by facilitating thousands of emergency medical rides, prioritizing health, hygiene, and safety for all passengers.",
    source: "International Business Times",
    img: "/banner.jpg",
    link: ""
  },
  {
    title: "Top Choice for Travel in Metro Cities: Txigo’s Recognition- GrabOn",
    description: "Ranked among the best cab rental services in Hyderabad and Bangalore, Txigo offers seamless intercity and long-distance options with exceptional customer satisfaction.",
    source: "GrabOn",
    img: "/banner.jpg",
    link: ""
  },
  {
    title: "Travel Demand in Tier-II & III Cities Set to Surge- Economic Times",
    description: "Founders of Txigo, an Online Cab Booking platform which is the rising Brand in Tours and Travels Industry predicts a travel boom in smaller towns as people opt for safer, road-based leisure trips post-pandemic, unlocking new travel corridors.",
    source: "Economic Times",
    img: "/banner.jpg",
    link: ""
  },
  {
    title: "Union Budget 2024: Txigo Calls for Tourism Boost- Financial Express",
    description: "Txigo advocates for significant hikes in tourism-related allocations and tax incentives in the 2024 Union Budget to drive domestic tourism and EV infrastructure. In light of the 2024 Union Budget, Txigo advocates increased budgetary support for domestic tourism, tax incentives for travelers, and EV infrastructure. These reforms can help India leap toward sustainable and inclusive travel growth.",
    source: "Financial Express",
    img: "/banner.jpg",
    link: ""
  },
  {
    title: "Highway Investment Key to Local Travel Ecosystem- Deccan Herald",
    description: "Txigo applauds increased infrastructure spending in Budget 2024, citing it as vital for connecting rural India and supporting grassroots travel and hospitality businesses.",
    source: "Deccan Herald",
    img: "/banner.jpg",
    link: ""
  },
  {
    title: "Budget 2024: Clear Roadmap Needed for Travel Recovery- CNBC TV-18",
    description: "With tourism’s GDP contribution projected to touch 10%, Txigo stresses the importance of strategic policymaking and funding to accelerate the sector’s recovery.",
    source: "CNBC TV-18",
    img: "/banner.jpg",
    link: ""
  },
  {
    title: "Building Bharat: Road Infrastructure Key to Tourism Uplift- Deccan Herald",
    description: "Txigo supports the government’s focus on expanding road networks under Union Budget 2024, aligning with the vision of \"Atmanirbhar Bharat\". Better roads translate to deeper tourism penetration and job creation in smaller towns.",
    source: "Deccan Herald",
    img: "/banner.jpg",
    link: ""
  },
  {
    title: "Budget 2024: No Direct Relief for Hard-Hit Travel Sector- Forbes India",
    description: "Despite being one of the most affected sectors during COVID, travel and hospitality industries find little representation in Budget 2024. Txigo voices concern over the lack of targeted stimulus or relief.",
    source: "Forbes India",
    img: "/banner.jpg",
    link: ""
  },
  {
    title: "Highway Focus Applauded, But Tourism Misses Out Again- Deccan Herald",
    description: "Txigo CEO praises the government’s investment in highway construction in Budget 2024 but highlights the absence of focused support for the tourism and mobility sector. This, he says, is a missed opportunity.",
    source: "Deccan Herald",
    img: "/banner.jpg",
    link: ""
  }
];


export default function MediaCoverage() {
  return (
    <div className="px-4 md:px-20 py-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
        Media Coverage for Txigo Car Rentals
      </h1>
      <p className="text-sm md:text-base text-justify mb-8">
        Txigo stands as India’s leading car rental and road travel brand. With over 15 years of deep-rooted experience and nationwide presence, Txigo has been frequently featured in prestigious national and regional publications. From pioneering innovations in Mobility-as-a-Service to navigating the travel industry's COVID challenges, here’s a look at how the media spotlight has followed Txigo’s journey of transformation and leadership
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mediaItems.map((item, idx) => (
          <div key={idx} className="bg-[#edeceb] rounded-lg overflow-hidden shadow-md flex flex-col h-[350px]">
            <img src={item.img} alt={item.source} className="w-full h-[150px] object-cover" />
            <div className="p-4 flex flex-col flex-grow overflow-hidden">
              <h4 className="text-sm font-semibold mb-2">
                <a
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-700 hover:underline line-clamp-2"
                  title={item.title} // Full title on hover
                >
                  {item.title.length > 70 ? item.title.slice(0, 67) + '...' : item.title}
                </a>
              </h4>
              <p
                className="text-xs mb-3 line-clamp-3 overflow-hidden"
                style={{ minHeight: '4.5rem' }}
              >
                {item.description.length > 200 ? item.description.slice(0, 200) + '...' : item.description}
              </p>
              <p className="text-center font-bold text-sm text-orange-500 whitespace-nowrap overflow-hidden text-ellipsis">
                {item.source}
              </p>
            </div>
          </div>



        ))}
      </div>
    </div>
  );
}

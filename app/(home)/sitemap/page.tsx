import Link from 'next/link';

export default function SiteMapPage() {
  const pageCategories = [
    {
      title: "Company Information",
      pages: [
        { name: "About Us", path: "/about" },
        { name: "Privacy Policy", path: "/privacyPolicy" },
        { name: "Terms and Condition", path: "/terms" },
        { name: "Contact Us", path: "/contact" }
      ]
    },
    {
      title: "Booking Options",
      pages: [
        { name: "Book Taxi", path: "/" },
        { name: "One way Cabs", path: "/" },
        { name: "Outstation Cabs", path: "/" },
        { name: "Outstation Cabs from Airport", path: "/" }
      ]
    },
    {
      title: "Cab Services",
      pages: [
        { name: "Airport Taxi", path: "/" },
        { name: "Full Day Cabs", path: "/" },
        { name: "Half Day Cabs", path: "/" },
        { name: "Car Rental", path: "/" },
        { name: "Tourist Cabs", path: "/" },
        { name: "Darshan Cabs", path: "/" }
      ]
    },
    {
      title: "Cab Information",
      pages: [
        { name: "City Cab Type", path: "/" },
        { name: "Cab Types", path: "/" },
        { name: "Cabs from Local Areas", path: "/" }
      ]
    },
    {
      title: "Policies",
      pages: [
        { name: "Cancellation and Refunds", path: "/refunds" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Site Map
          </h1>
          <p className="mt-3 text-xl text-gray-500">
            Explore all our services and information pages
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {pageCategories.map((category, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
                {category.title}
              </h2>
              <ul className="space-y-2">
                {category.pages.map((page, pageIndex) => (
                  <li key={pageIndex}>
                    <Link 
                      href={page.path}
                      className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                    >
                      {page.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
import { FaStar, FaMapMarkerAlt, FaUsers } from "react-icons/fa";

const StatsSection = () => {
  const stats = [
    {
      title: "Car Rental Expert",
      description: "since 2006",
      icon: <FaStar className="text-[#FF671F] text-6xl" />,
      bg: "bg-white",
    },
    {
      title: "2000+ Cities",
      description: " across India",
      icon: <FaMapMarkerAlt className="text-[#FF671F] text-6xl" />,
      bg: "bg-white",
    },
    {
      title: "30,000+ Driver",
      description: " Partners",
      icon: <FaUsers className="text-[#FF671F] text-6xl" />,
      bg: "bg-white",
    },
  ];

  return (
    <div className=" py-10 px-4 sm:px-6 lg:px-8">
     <div className="max-w-3xl mx-auto bg-[#fee9e6] rounded-2xl p-8 drop-shadow-2xl shadow-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {stats.map((item, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className={`p-2 rounded-full flex items-center justify-center ${item.bg}`}>
                {item.icon}
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-800">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsSection;

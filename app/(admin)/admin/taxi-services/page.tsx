"use client";

import { useEffect, useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import TexiServiceComponent from "@/components/admin/texiServicesComponent";

type City = {
  _id: string;
  name: string;
  price: {
    acSedans: string;
    acSUVsAndMUVs: string;
    premiumSUVs: string;
    acTempoTravellers: string;
  };
};

export default function TaxiServices() {
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCityId, setSelectedCityId] = useState<string>("");
  const [form, setForm] = useState<City["price"]>({
    acSedans: "",
    acSUVsAndMUVs: "",
    premiumSUVs: "",
    acTempoTravellers: "",
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const selectedCity = cities.find((c) => c._id === selectedCityId);

  // Filter and paginate cities
  const filteredCities = useMemo(() => {
    return cities.filter(city =>
      city?.name?.toLowerCase().includes(searchTerm?.toLowerCase())
    );
  }, [cities, searchTerm]);

  const paginatedCities = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredCities.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredCities, currentPage]);

  const totalPages = Math.ceil(filteredCities.length / itemsPerPage);
   
  // Fetch ALL cities on mount
  useEffect(() => {
    const fetchCities = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_baseURL}/api/city/cities`);
        if (!res.ok) throw new Error("Failed to fetch cities");
        const data: City[] = await res.json();
        setCities(data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCities();
  }, []);

  // Update form when city changes
  useEffect(() => {
    if (selectedCity) {
      setForm(selectedCity.price);
    } else {
      setForm({
        acSedans: "",
        acSUVsAndMUVs: "",
        premiumSUVs: "",
        acTempoTravellers: "",
      });
    }
  }, [selectedCity]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCityId) return;
    
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_baseURL}/api/city/cities/${selectedCityId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: selectedCity?.name,
            price: form,
          }),
        }
      );

      if (!res.ok) throw new Error("Failed to update");
      
      // Update local state with the new data
      const updatedCity = await res.json();
      setCities(cities.map(city => 
        city._id === updatedCity._id ? updatedCity : city
      ));
      
      alert("Pricing updated successfully!");
    } catch (error) {
      console.error("Update error:", error);
      alert("Failed to update pricing.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Update Taxi Service Prices</h1>

      {/* Search input */}
      <Input
        type="text"
        placeholder="Search cities..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1);
        }}
        className="mb-4"
      />

      {/* City selection list */}
      <div className="mb-4 space-y-2">
        {loading ? (
          <p>Loading cities...</p>
        ) : filteredCities.length === 0 ? (
          <p>No cities found</p>
        ) : (
          <>
            {paginatedCities.map((city) => (
              <div
                key={city._id}
                className={`p-3 border rounded cursor-pointer transition-colors ${
                  selectedCityId === city._id 
                    ? "bg-blue-100 border-blue-500" 
                    : "hover:bg-gray-50"
                }`}
                onClick={() => setSelectedCityId(city._id)}
              >
                {city.name}
              </div>
            ))}

            {/* Pagination controls */}
            {totalPages > 1 && (
              <div className="flex justify-between mt-4">
                <Button
                  variant="outline"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Previous
                </Button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Price form */}
      {selectedCity && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">AC Sedans Price</label>
            <Input
              name="acSedans"
              value={form.acSedans || ""}
              onChange={handleChange}
              placeholder="Enter price for AC Sedans"
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">AC SUVs & MUVs Price</label>
            <Input
              name="acSUVsAndMUVs"
              value={form.acSUVsAndMUVs || ""}
              onChange={handleChange}
              placeholder="Enter price for AC SUVs & MUVs"
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Premium SUVs Price</label>
            <Input
              name="premiumSUVs"
              value={form.premiumSUVs || ""}
              onChange={handleChange}
              placeholder="Enter price for Premium SUVs"
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">AC Tempo Travellers Price</label>
            <Input
              name="acTempoTravellers"
              value={form.acTempoTravellers || ""}
              onChange={handleChange}
              placeholder="Enter price for AC Tempo Travellers"
            />
          </div>
          
          <Button type="submit" className="w-full mt-4">
            Update Pricing for {selectedCity.name}
          </Button>
        </form>
      )}

      <TexiServiceComponent/>
    </div>
  );
}
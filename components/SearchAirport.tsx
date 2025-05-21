'use client';

import { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Loader2, X } from 'lucide-react';

interface AirportSearchProps {
  placeholder?: string;
  onSelect?: (value: string, raw?: any) => void;
  searchResultWidth?: string;
}

const popularAirports = [
  'Indira Gandhi International Airport Delhi',
  'Kempegowda International Airport Bangalore',
  'Chennai International Airport',
  'Rajiv Gandhi International Airport Hyderabad',
  'Netaji Subhas Chandra Bose International Airport Kolkata',
];

export default function AirportSearch({
  placeholder = 'Search airport...',
  onSelect,
  searchResultWidth = 'w-96',
}: AirportSearchProps) {
  const [airportData, setAirportData] = useState<any[]>([]);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [selected, setSelected] = useState<string>('');
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  const fetchAirports = async () => {
    try {
      setIsLoading(true);
      const startTime = Date.now();
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_baseURL}/api/airports/getAirports`);
      const data = await response.json();
      
      // Ensure loading shows for at least 500ms
      const elapsed = Date.now() - startTime;
      if (elapsed < 500) {
        await new Promise(resolve => setTimeout(resolve, 500 - elapsed));
      }
      
      setAirportData(data);
    } catch (error) {
      console.error('Error fetching airports:', error);
    } finally {
      setIsLoading(false);
    }
  };

  fetchAirports();
}, []);

  useEffect(() => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      searchAirports(query);
    }, 500);

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [query]);

  const searchAirports = (searchQuery: string) => {
    if (!searchQuery) {
      setResults([]);
      return;
    }

    const query = searchQuery?.toLowerCase().trim();

    const filteredResults = airportData?.filter((airport: any) => {
      // Check for direct matches in important fields first
      if (airport?.code?.toLowerCase() === query) return true;
      if (airport?.name?.toLowerCase().includes(query)) return true;
      if (airport?.location?.toLowerCase().includes(query)) return true;
      if (airport?.state?.toLowerCase().includes(query)) return true;

      // Then check combined fields
      const combined = `${airport.code} ${airport.name} ${airport.location} ${airport.state} ${airport.pincode}`?.toLowerCase();
      return combined.includes(query);
    });

    setResults(filteredResults);
  };

  const formatAddress = (airport: any) => {
    return `${airport.name},${airport.state}, ${airport.location},`;
  };


  const handleSelect = (airport: any) => {
    const formatted = formatAddress(airport);
    setSelected(formatted);
    setQuery('');
    setResults([]);
    onSelect?.(formatted, airport);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setSelected('');
  };

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      if (!containerRef.current?.contains(document.activeElement)) {
        setIsFocused(false);
      }
    }, 200);
  };

  const handleStaticSelect = (airport: string) => {
    setSelected(airport);
    setQuery('');
    setResults([]);
    onSelect?.(airport);
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      <div className="relative">
        <Input
          placeholder={placeholder}
          value={selected || query}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          className="border-0 border-b-2 "
        />
        {(isLoading) && (
          <div className="absolute inset-y-0 right-2 flex items-center">
            <Loader2 className="h-4 w-4 animate-spin text-gray-500 pointer-events-none" />
          </div>
        )}
        {!isLoading && (selected || query) && (
          <div className="absolute inset-y-0 right-2 flex items-center">
            <X
              className="h-4 w-4 text-gray-500 cursor-pointer hover:text-gray-700"
              onClick={(e) => {
                e.preventDefault();
                setQuery('');
                setSelected('');
              }}
            />
          </div>
   
        )}
    </div>


      {
    isFocused && !selected && (
      <div className={`absolute z-50 mt-1 ${searchResultWidth}`}>
        {query === '' && (
          <div className="bg-white border border-gray-300 rounded-md shadow-xl max-h-60 overflow-auto">
            <div className="p-2 text-xs text-gray-500 font-medium">Popular Airports</div>
            {popularAirports.map((airport, idx) => (
              <div
                key={idx}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleStaticSelect(airport)}
                className="p-2 text-sm text-gray-800 hover:bg-blue-100 hover:text-blue-700 cursor-pointer transition-colors"
              >
                {airport}
              </div>
            ))}
          </div>
        )}

        {query !== '' && results.length > 0 && (
          <div className="bg-white border border-gray-300 rounded-md shadow-xl max-h-60 overflow-auto">
            {results.map((place, idx) => (
              <div
                key={idx}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleSelect(place)}
                className="p-2 text-sm text-gray-800 hover:bg-blue-100 hover:text-blue-700 cursor-pointer transition-colors"
              >
                {formatAddress(place)}
              </div>
            ))}
          </div>
        )}

        {query !== '' && results.length === 0 && !isLoading && (
          <div className="bg-white border border-gray-300 rounded-md shadow-xl p-2 text-sm text-gray-500">
            {query.length < 3
              ? 'Keep typing to search...'
              : 'No airports found. Try a different search term.'}
          </div>
        )}
      </div>
    )
  }
    </div >
  );
}
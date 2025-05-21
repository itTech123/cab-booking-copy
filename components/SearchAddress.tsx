'use client';

import { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Loader2, History, X } from 'lucide-react';
import { popularLocations } from '@/data';

interface AddressSearchProps {
  placeholder?: string;
  onSelect?: (value: string, raw?: any) => void;
  onChanget?: (value: string) => void;
  searchResultWidth?: string;
  countryCode?: string;
  value?: string;
  maxRecentSearches?: number;
  showPopular?: boolean;
  popularDistricts?: { district: string; state: string }[];
  popularTitle?: string;
}

export default function SearchAddress({
  placeholder = 'Search address...',
  onSelect,
  searchResultWidth = 'w-96',
  countryCode = 'in',
  value,
  maxRecentSearches = 5,
  showPopular = true,
  popularDistricts,
  popularTitle = 'Popular Cities'
}: AddressSearchProps) {
  const apiKey = process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY;
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [selected, setSelected] = useState<string>('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load recent searches from localStorage on component mount
  useEffect(() => {
    const savedSearches = localStorage.getItem('addressRecentSearches');
    if (savedSearches) {
      try {
        setRecentSearches(JSON.parse(savedSearches));
      } catch (e) {
        console.error('Failed to parse recent searches', e);
      }
    }
  }, []);

  const addToRecentSearches = (address: string) => {
    setRecentSearches(prev => {
      // Remove if already exists and add to beginning
      const updated = [
        address,
        ...prev.filter(item => item !== address)
      ].slice(0, maxRecentSearches);

      // Save to localStorage
      localStorage.setItem('addressRecentSearches', JSON.stringify(updated));
      return updated;
    });
  };

  const fetchAddresses = async (searchQuery: string) => {
    if (!searchQuery || !apiKey) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
          searchQuery
        )}&filter=countrycode:${countryCode}&limit=10&apiKey=${apiKey}`
      );
      const data = await response.json();
      const filtered = data.features?.filter((item: any) => item.properties.formatted) || [];
      setResults(filtered);
    } catch (error) {
      console.error('Failed to fetch addresses:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    if (query.trim()) {
      typingTimeoutRef.current = setTimeout(() => {
        fetchAddresses(query);
      }, 500);
    } else {
      setResults([]);
    }

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [query]);

  const formatAddress = (place: any) => place.properties.formatted;

  const handleSelect = (place: any) => {
    const formatted = formatAddress(place);
    setSelected(formatted);
    setQuery('');
    setResults([]);
    addToRecentSearches(formatted);
    onSelect?.(formatted, place);
  };

  const handleSelectRecent = (address: string) => {
    setSelected(address);
    setQuery('');
    setResults([]);
    onSelect?.(address);
  };

  const handleSelectPopular = (district: string, state: string) => {
    const formatted = `${district}, ${state}`;
    setSelected(formatted);
    setQuery('');
    setResults([]);
    addToRecentSearches(formatted);
    onSelect?.(formatted);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setSelected('');
  };

  const handleInputFocus = () => setIsFocused(true);
  const handleInputBlur = () => {
    setTimeout(() => {
      if (!containerRef.current?.contains(document.activeElement)) {
        setIsFocused(false);
      }
    }, 200);
  };

  useEffect(() => {
    if (value) {
      setSelected(value);
    }
  }, [value]);

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('addressRecentSearches');
  };

const renderPopularLocations = () => {
  

  return (
    <>
      <div className="p-2 text-md text-gray-500 border-t border-b">
        {popularTitle}
      </div>

      {/* Render either popularDistricts OR popularLocations */}
      {popularDistricts ? (
        popularDistricts.map((districtItem, idx) => {
          const label = `${districtItem.district}, ${districtItem.state}`;
          return (
            <div
              key={`popular-${idx}`}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleSelectPopular(districtItem.district, districtItem.state)}
              className="p-2 text-xs text-blue-600 hover:bg-blue-100 hover:text-blue-800 cursor-pointer transition-colors"
            >
              {label}
            </div>
          );
        })
      ) : (
        popularLocations.map((location, idx) => {
          const firstDistrict = location.popularDistricts[0];
          const label = `${firstDistrict.district}, ${firstDistrict.state}`;
          return (
            <div
              key={`popular-loc-${idx}`}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleSelectPopular(firstDistrict.district, firstDistrict.state)}
              className="p-2 text-xs text-blue-600 hover:bg-blue-100 hover:text-blue-800 cursor-pointer transition-colors"
            >
              {label}
            </div>
          );
        })
      )}
    </>
  );
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
          className="border-0 border-b-2 border-gray-300 pr-8"  // Added padding for the icon
        />
        {(isLoading || (selected || query)) && (  // Show either loader or clear icon
          <div className="absolute inset-y-0 right-2 flex items-center">
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin text-gray-500 pointer-events-none" />
            ) : (
              <X
                className="h-4 w-4 text-gray-500 cursor-pointer hover:text-gray-700"
                onClick={(e) => {
                  e.preventDefault();
                  setQuery('');
                  setSelected('');

                }}
              />
            )}
          </div>
        )}
      </div>

      {isFocused && !selected && (
        <div className={`absolute z-50 mt-1 w-80 max-w-full ${searchResultWidth}`}>
          {/* Show dropdown content based on query state */}
          {query === '' ? (
            <div className="bg-white border border-gray-300 rounded-lg shadow-2xl max-h-60 overflow-auto text-left">
              {/* Recent Searches Section */}
              {recentSearches.length > 0 && (
                <>
                  <div className="p-3 text-sm text-gray-600 flex items-center justify-between border-b border-gray-200">
                    <div className="flex items-center font-semibold">
                      <History className="h-3 w-2 mr-2 text-blue-500" />
                      Recent Searches
                    </div>
                    <button
                      onClick={clearRecentSearches}
                      className="text-blue-600 hover:text-blue-800 text-xs font-medium"
                    >
                      Clear
                    </button>
                  </div>
                  {recentSearches.map((address, idx) => (
                    <div
                      key={`recent-${idx}`}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => handleSelectRecent(address)}
                      className="px-4 py-2 text-sm text-blue-800 hover:bg-blue-100 hover:text-blue-700 cursor-pointer transition-colors"
                    >
                      {address}
                    </div>
                  ))}
                </>
              )}

              {/* Popular Locations Section */}
           
                <div className="pt-2">{renderPopularLocations()}</div>
          
            </div>
          ) : (
            <>
              {results.length > 0 ? (
                <div className="bg-white border border-gray-300 rounded-lg shadow-2xl max-h-60 overflow-auto text-left">
                  {results.map((place, idx) => (
                    <div
                      key={`${place.properties.place_id}-${idx}`}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => handleSelect(place)}
                      className="px-4 py-2 text-sm text-gray-800 hover:bg-blue-100 hover:text-blue-700 cursor-pointer transition-colors"
                    >
                      {formatAddress(place)}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white border border-gray-300 rounded-lg shadow-2xl p-4 text-sm text-gray-500">
                  {query.length < 3
                    ? 'Keep typing to search...'
                    : 'No addresses found. Try a different search term.'}
                </div>
              )}
            </>
          )}
        </div>
      )}

    </div>
  );
}
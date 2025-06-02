'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card'; // shadcn/ui
import { Skeleton } from '@/components/ui/skeleton';

interface SearchType {
  _id: string;
  name: string;
  email: string;
  phone: string;
  bookingType: string;
  pickup: string;
  drop?: string;
  pickupDate: string;
  pickupTime?: string; // added
  returnDate?: string;
  package?: string;
  createdAt: string;
}

export default function SearchList() {
  const [searches, setSearches] = useState<SearchType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSearches = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_baseURL}/api/search/getAll`);
        const data = await res.json();
        setSearches(data);
      } catch (error) {
        console.error('Failed to fetch searches', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearches();
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-semibold mb-6">Search List</h1>

      {loading ? (
        <div className="space-y-4">
          <Skeleton className="h-24 w-full rounded-xl" />
          <Skeleton className="h-24 w-full rounded-xl" />
        </div>
      ) : searches.length === 0 ? (
        <p>No searches found.</p>
      ) : (
        <div className="grid gap-4">
          {searches.map((search) => (
            <Card key={search._id}>
              <CardContent className="p-4 space-y-1">
                <p><span className="font-semibold">Name:</span> {search.name}</p>
                <p><span className="font-semibold">Email:</span> {search.email}</p>
                <p><span className="font-semibold">Phone:</span> {search.phone}</p>
                <p><span className="font-semibold">Booking Type:</span> {search.bookingType}</p>
                <p>
                  <span className="font-semibold">From:</span> {search.pickup} →
                  <span className="font-semibold"> To:</span> {search.drop || 'N/A'}
                </p>
                <p><span className="font-semibold">Pickup Date:</span> {search.pickupDate?.split('T')[0]}</p>
                {search.pickupTime && (
                  <p><span className="font-semibold">Pickup Time:</span> {search.pickupTime}</p>
                )}
                {search.returnDate && (
                  <p><span className="font-semibold">Return Date:</span> {search.returnDate.split('T')[0]}</p>
                )}
                {search.package && (
                  <p><span className="font-semibold">Package:</span> {search.package}</p>
                )}
                <p><span className="font-semibold">Search Date:</span> {search.createdAt.split('T')[0]}</p>
                <p><span className="font-semibold">Search Time:</span> {new Date(search.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

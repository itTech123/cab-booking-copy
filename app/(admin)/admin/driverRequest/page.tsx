'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface Driver {
  _id: string;
  name: string;
  phone: string;
  email: string; // ✅ Added email field
  city: string;
  carType: string;
}

export default function DriverRequestPage() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_baseURL}/api/driver/getAll`);
        const data = await res.json();
        setDrivers(data.drivers || []);
      } catch (error) {
        console.error('Error fetching drivers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDrivers();
  }, []);

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Driver Requests</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left border border-gray-200 rounded">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Phone</th>
                    <th className="px-4 py-2">Email</th>
                    <th className="px-4 py-2">City</th>
                    <th className="px-4 py-2">Car Type</th>
                  </tr>
                </thead>
                <tbody>
                  {drivers.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-4 text-gray-500">
                        No drivers found.
                      </td>
                    </tr>
                  ) : (
                    drivers.map(driver => (
                      <tr key={driver._id} className="border-t">
                        <td className="px-4 py-2">{driver.name}</td>
                        <td className="px-4 py-2">{driver.phone}</td>
                        <td className="px-4 py-2">{driver.email}</td>
                        <td className="px-4 py-2">{driver.city}</td>
                        <td className="px-4 py-2">{driver.carType}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

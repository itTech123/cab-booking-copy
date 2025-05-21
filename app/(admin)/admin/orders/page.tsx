'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { format } from 'date-fns';

interface Order {
  _id: string;
  name: string;
  phone: string;
  email: string;
  pickup: string;
  drop?: string;
  pickupDate: string;
  pickupTime: string;
  returnDate?: string;
  ridefare: number;
  orderType: string;
  createdAt: string;
  advancePayment?: number;
  distance?: string;
  nightAllowence?: number;
  extraHr?: number;
  extraKm?: number;
  waitingCharge?: number;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_baseURL}/api/orders/getAllOrders`);
        if (!res.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await res.json();
        setOrders(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleRowClick = (orderId: string) => {
    router.push(`/admin/orders/singleOrder/${orderId}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded">
        No orders found
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">All Orders</h2>
      <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
        <Table className="min-w-full divide-y divide-gray-200">
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking Type</TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking Date</TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fare</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <TableRow 
                key={order._id} 
                onClick={() => handleRowClick(order._id)} 
                className="hover:bg-blue-50 transition cursor-pointer"
              >
                <TableCell className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{order.name}</div>
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-gray-500">
                  {order.email}
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-gray-500">
                  {order.phone}
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${order.orderType === 'One Way' ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'}`}>
                    {order.orderType}
                  </span>
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-gray-500">
                  {format(new Date(order.pickupDate), 'MMM dd, yyyy')}
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-gray-500">
                  ₹{order.ridefare?.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
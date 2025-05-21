'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import OrderForm from '@/components/admin/OrderForm';

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
  bookingId: String
  pinCode? : string
}

export default function OrderDetailPage() {
  const params = useParams();
  const id = params?.Id;

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  console.log(order?.returnDate)
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_baseURL}/api/orders/orders/${id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch order');
        }
        const data = await res.json();
        setOrder(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchOrder();
  }, [id]);

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this order?')) {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_baseURL}/api/orders/orders/${id}`, {
          method: 'DELETE',
        });

        if (!res.ok) {
          throw new Error('Failed to delete order');
        }

        router.push('/admin/orders');
      } catch (err: any) {
        setError(err.message);
      }
    }
  };

  const handleUpdate = async (updatedOrder: Order) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_baseURL}/api/orders/orders/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedOrder),
      });

      if (!res.ok) {
        throw new Error('Failed to update order');
      }

      const data = await res.json();
      setOrder(data);
      setIsEditing(false);
    } catch (err: any) {
      setError(err.message);
    }
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
      <div
        className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded">
        Order not found
      </div>
    );
  }
  
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Order Details</h2>
        <div className="space-x-2">
          <Button
            variant={isEditing ? 'secondary' : 'default'}
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </div>

      {isEditing ? (
        <OrderForm initialData={order} onSubmit={handleUpdate} isEditMode />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium">{order.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{order.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">{order.phone}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Booking Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Booking ID</p>
                <p className="font-medium">{order.bookingId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Booking Type</p>
                <p className="font-medium">{order.orderType}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Pickup Location</p>
                <p className="font-medium">{order.pickup}</p>
              </div>
              {order.drop && (
                <div>
                  <p className="text-sm text-gray-500">Drop Location</p>
                  <p className="font-medium">{order.drop}</p>
                </div>
              )}
              {order.pinCode && (
                <div>
                  <p className="text-sm text-gray-500">Pin Code</p>
                  <p className="font-medium">{order.pinCode}</p>
                </div>
              )}
              <div>
                <p className="text-sm text-gray-500">Pickup Date</p>
                <p className="font-medium">
                  {format(new Date(order.pickupDate), 'MMM dd, yyyy')} at {order.pickupTime}
                </p>
              </div>
              {order.returnDate && (
                <div>
                  <p className="text-sm text-gray-500">Return Date </p>
                  <p className="font-medium">{order.returnDate.split("T")[0]}</p>
                </div>
              )}
              <div>
                <p className="text-sm text-gray-500">Booked On</p>
                <p className="font-medium">
                  {format(new Date(order.createdAt), 'MMM dd, yyyy hh:mm a')}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Payment Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Total Fare</p>
                <p className="font-bold text-lg">₹{order.ridefare?.toLocaleString()}</p>
              </div>
              {order.advancePayment && (
                <div>
                  <p className="text-sm text-gray-500">Advance Payment</p>
                  <p className="font-medium">₹{order.advancePayment?.toLocaleString()}</p>
                </div>
              )}
              {order.distance && (
                <div>
                  <p className="text-sm text-gray-500">Distance</p>
                  <p className="font-medium">{order.distance}  KM</p>
                </div>
              )}
              {order.nightAllowence && (
                <div>
                  <p className="text-sm text-gray-500">Night Allowance</p>
                  <p className="font-medium">₹{order.nightAllowence?.toLocaleString()}</p>
                </div>
              )}
              {order.extraHr && (
                <div>
                  <p className="text-sm text-gray-500">Extra Hours</p>
                  <p className="font-medium">{order.extraHr} hrs</p>
                </div>
              )}
              {order.extraKm && (
                <div>
                  <p className="text-sm text-gray-500">Extra KM</p>
                  <p className="font-medium">{order.extraKm} km</p>
                </div>
              )}
              {order.waitingCharge && (
                <div>
                  <p className="text-sm text-gray-500">Waiting Charge</p>
                  <p className="font-medium">₹{order.waitingCharge?.toLocaleString()}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi'; // Import back arrow icon

type Order = {
  _id?: string;
  name: string;
  phone: string;
  pickup: string;
  drop: string;
  pickupDate: string;
  pickupTime: string;
  bookingStatus: string;
  orderType: string;
  rideOtp?: string;
  vehicleType?: string;
  packageDetails?: string;
  fareDetails?: string;
  extraKmsCharge?: string;
  extraHoursCharge?: string;
  nightCharges?: string;
  amountDue?: string;
  pickupLocation?: string;
  paymentDetails?: string;
  addonServices?: string;
  distance?: string; // Added distance field
  duration?: string; // Added duration field if available
};

export default function OrderDetailsPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = params?.id;

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [cancellingOrderId, setCancellingOrderId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOrder() {
      if (!id) return;
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_baseURL}/api/orders/orders/${id}`);
        if (!res.ok) throw new Error('Failed to fetch order');
        const data = await res.json();
        setOrder(data);
      } catch (error) {
        console.error(error);
        setError('Failed to load order details');
      } finally {
        setLoading(false);
      }
    }
    fetchOrder();
  }, [id]);

  const cancelOrder = async (orderId: string) => {
    try {
      setCancellingOrderId(orderId);
      const response = await fetch(`${process.env.NEXT_PUBLIC_baseURL}/api/orders/order/cancel/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to cancel order');
      }

      // Update the local state to reflect the cancellation
      if (order) {
        setOrder({
          ...order,
          bookingStatus: "cancelled"
        });
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to cancel order'
      );
    } finally {
      setCancellingOrderId(null);
    }
  };

  if (loading) return <div className="max-w-xl mx-auto p-6"><p>Loading...</p></div>;
  if (!order) return <div className="max-w-xl mx-auto p-6"><p>Order not found.</p></div>;

  // Helper to format date+time nicely
  const formattedPickupTime = `${order.pickupDate} ${order.pickupTime}`;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded-md relative">
      {/* Back button at top left */}
      <button 
        onClick={() => router.back()}
        className="absolute left-6 top-6 flex items-center text-blue-600 hover:text-blue-800"
      >
        <FiArrowLeft className="mr-1" /> Back
      </button>

      <h1 className="text-2xl font-bold mb-6 text-center">Order Details</h1>

      {error && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>}

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-semibold">Ride Status:</p>
            <p className={order.bookingStatus === 'cancelled' ? 'text-red-600' : 'text-green-600'}>
              {order.bookingStatus === 'cancelled' ? 'Cancelled' : 
               order.bookingStatus === 'pending' ? 'Pending' : 'Confirmed'}
            </p>
          </div>
          <div>
            <p className="font-semibold">Booking Type:</p>
            <p>{order.orderType || 'Hourly Rentals'}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-semibold">Vehicle Type:</p>
            <p>{order.vehicleType || 'Mini | 4 Seater | AC'}</p>
          </div>
          <div>
            <p className="font-semibold">Distance:</p>
            <p>{order.distance ? `${order.distance} km` : 'N/A'}</p>
          </div>
        </div>

        <div>
          <p className="font-semibold">Pickup Time:</p>
          <p>{formattedPickupTime}</p>
        </div>

       

        <div className="border-t pt-4">
          <h2 className="text-lg font-semibold">Route Details</h2>
          <div className="mt-2 space-y-2">
            <p><span className="font-semibold">From:</span> {order.pickup}</p>
            <p><span className="font-semibold">To:</span> {order.drop}</p>
          </div>
        </div>

        <div className="border-t pt-4">
          <h2 className="text-lg font-semibold">Package Details:</h2>
          <p>{order.packageDetails || 'Package includes 80 Kms & 8 Hours'}</p>
          {order.duration && <p>Estimated Duration: {order.duration}</p>}
        </div>

        <div className="border-t pt-4">
          <h3 className="font-semibold">Fare Breakdown</h3>
          <ul className="mt-2 space-y-1">
            <li>Base Fare: ₹{order.fareDetails || '1000'}</li>
            {order.extraKmsCharge && <li>Extra KMS: ₹{order.extraKmsCharge}/km</li>}
            {order.extraHoursCharge && <li>Extra Hours: ₹{order.extraHoursCharge}/hr</li>}
            {order.nightCharges && <li>Night Charges: ₹{order.nightCharges} (11pm-6am)</li>}
          </ul>
        </div>

        <div className="border-t pt-4">
          <h3 className="font-semibold">Payment Summary</h3>
          <p className="mt-2"><span className="font-semibold">Amount Due:</span> ₹{order.amountDue || '1000'}</p>
        </div>

        <div className="border-t pt-4">
          <h3 className="font-semibold">Important Notes</h3>
          <p className="mt-2">{order.addonServices || 'For Pre scheduled 100% Confirmed rides, booking confirmation charges are Non- Refundable.'}</p>
        </div>
      </div>

      <div className="mt-8 flex gap-4 justify-center">
        {/* Show Book Now button if status is 'pending' */}
        {order.bookingStatus === 'pending' && (
          <button
            onClick={() => router.push(`/booking/${id}`)}
            className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Book Now
          </button>
        )}

        {/* Show Cancel button if order is not already cancelled */}
        {order.bookingStatus !== 'cancelled' && order._id && (
          <button
            onClick={() => order._id && cancelOrder(order._id)}
            disabled={cancellingOrderId === order._id}
            className="px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700 transition disabled:bg-red-400"
          >
            {cancellingOrderId === order._id ? 'Cancelling...' : 'Cancel Order'}
          </button>
        )}
      </div>
    </div>
  );
}
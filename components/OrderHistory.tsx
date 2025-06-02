'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type Order = {
  _id: string;
  name: string;
  phone: string;
  email: string;
  pickup: string;
  drop?: string;
  pinCode?: string;
  pickupDate: string;
  pickupTime: string;
  returnDate?: string;
  ridefare: string;
  advancePayment?: string;
  orderType: string;
  distance?: string;
  bookingStatus: "booked" | "cancelled" | "pending";
  nightAllowence?: string;
  extraHr?: string;
  extraKm?: string;
  waitingCharge?: string;
  bookingId?: string;
  createdAt: string;
  updatedAt: string;
};

interface OrderHistoryProps {
  phone: string;
}

export default function OrderHistory({ phone }: OrderHistoryProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'upcoming' | 'history'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [cancellingOrderId, setCancellingOrderId] = useState<string | null>(null);

  const router = useRouter();
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_baseURL}/api/orders/userOrders/${phone}`
        );

        if (!response.ok) {
          throw new Error('No Orders found for this phone number.');
        }
        const data: Order[] = await response.json();
        setOrders(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'An unknown error occurred'
        );
      } finally {
        setLoading(false);
      }
    };

    if (phone) {
      fetchOrders();
    }
  }, [phone]);



  const filteredOrders = orders.filter((order) => {
    const now = new Date();
    const pickupDateTime = new Date(`${order.pickupDate}T${order.pickupTime}`);
    const isPastOrder = pickupDateTime < now;

    if (activeTab === 'upcoming') {
      return (order.bookingStatus === "booked" || order.bookingStatus === "pending") && !isPastOrder;
    }

    if (activeTab === 'history') {
      return (
        (order.bookingStatus === "booked" && isPastOrder) ||
        (order.bookingStatus === "pending" && isPastOrder) ||
        order.bookingStatus === "cancelled"
      );
    }

    // For 'all' tab: show only future booked/pending, exclude cancelled
    return (
      (order.bookingStatus === "booked" || order.bookingStatus === "pending") && !isPastOrder
    );
  });


  const redirectToOrderDetails = (orderId: string) => {
    router.push(`/order-details/${orderId}`);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Order History</h2>

      {/* Tab Navigation */}

      <div className="mb-4 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 overflow-x-auto pb-2" aria-label="Tabs">
          <div className="flex space-x-8">
            {['all', 'upcoming', 'history'].map((tab) => {
              const now = new Date();

              const count = orders.filter(order => {
                const pickupDateTime = new Date(`${order.pickupDate}T${order.pickupTime}`);
                const isPastOrder = pickupDateTime < now;

                if (tab === 'all') {
                  // Show all orders except cancelled
                  return order.bookingStatus !== "cancelled";
                } else if (tab === 'upcoming') {
                  // Show pending OR booked+not past
                  return order.bookingStatus === "pending" ||
                    (order.bookingStatus === "booked" && !isPastOrder);
                } else if (tab === 'history') {
                  // Show booked+past OR cancelled
                  return (order.bookingStatus === "booked" && isPastOrder) ||
                    order.bookingStatus === "cancelled";
                }
                return false;
              }).length;

              const labelMap: Record<string, string> = {
                all: "All Orders",
                upcoming: "Upcoming",
                history: "History"
              };

              const isActive = activeTab === tab;

              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`whitespace-nowrap py-4 px-2 border-b-2 font-medium text-sm focus:outline-none transition-colors duration-200
              ${isActive
                      ? 'border-indigo-500 text-indigo-600 bg-indigo-50 rounded-t'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                  {labelMap[tab]} ({count})
                </button>
              );
            })}
          </div>
        </nav>
      </div>


      {loading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
        </div>
      ) : error ? (
        <div className="text-red-500 text-center py-4">{error}</div>
      ) : filteredOrders.length === 0 ? (
        <div className="text-gray-500 text-center py-4">No orders found for this category.</div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const pickupDateTime = new Date(`${order.pickupDate}T${order.pickupTime}`);
            const isPastOrder = pickupDateTime < new Date();
            const status =
              order.bookingStatus === "cancelled"
                ? "Cancelled"
                : order.bookingStatus === "pending" && isPastOrder
                  ? "Expired"
                  : isPastOrder
                    ? "Completed"
                    : "Upcoming";

            return (
              <div
                key={order._id}
                className={`border-b border-gray-200 pb-4 last:border-0 last:pb-0 cursor-pointer hover:bg-gray-50 transition-colors duration-200 ${order.bookingStatus === "cancelled" ? "bg-red-50" : ""
                  }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    {/* Status Badge at the top - shows exact booking status */}
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mb-1 ${order.bookingStatus === "booked"
                      ? "bg-green-100 text-green-800"
                      : order.bookingStatus === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800" // For cancelled
                      }`}>
                      {order.bookingStatus.charAt(0).toUpperCase() + order.bookingStatus.slice(1)}
                    </span>

                    <h3 className="font-medium text-gray-900">
                      Order from {order.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      <span className="font-semibold">Pickup Date:</span>{" "}
                      <span className="text-indigo-600 font-semibold">
                        {order.pickupDate.split('T')[0]}
                      </span>{" "}
                      at {order.pickupTime}
                    </p>
                    <p className="text-sm text-gray-500">
                      <span className="font-semibold">From:</span> {order.pickup}
                    </p>
                    {order.drop && (
                      <p className="text-sm text-gray-500">
                        <span className="font-semibold">To:</span> {order.drop}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="font-medium text-gray-800">
                      ₹{parseFloat(order.ridefare).toFixed(2)}
                    </span>
                    {order.bookingId && (
                      <span className="text-xs text-gray-500 mt-1">
                        ID: {order.bookingId}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-2 flex flex-wrap gap-2 justify-end">
                  <button
                    onClick={() => redirectToOrderDetails(order._id)}
                    className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-md text-sm hover:bg-indigo-200"
                  >
                    View Details
                  </button>
                  <a
                    href="/contact"
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200"
                  >
                    Contact Us
                  </a>


                </div>
              </div>
            );
          })}
        </div>

      )}
    </div>
  );
}
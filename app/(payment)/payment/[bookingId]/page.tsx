'use client';

import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter, useParams } from "next/navigation";
import { useEffect } from "react";

export default function PaymentSuccessPage() {
  const router = useRouter();
  const params = useParams();

  const bookingId = params?.bookingId;
  
  useEffect(() => {
    if (!bookingId) return;

    const sendConfirmationEmail = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_baseURL }/api/orders/sendBookingConfirmation/${bookingId}`, {
          method: 'POST',
        });

        if (!res.ok) {
          throw new Error('Failed to send email');
        }

        console.log('Email sent successfully');
      } catch (err) {
        console.error('Email sending error:', err);
      }
    };

    sendConfirmationEmail();
  }, [bookingId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f9ff] to-[#e0f2fe] flex flex-col items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white dark:bg-gray-900 rounded-2xl sm:rounded-3xl shadow-lg p-6 sm:p-8 max-w-md w-full text-center border border-gray-100 dark:border-gray-800"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 1.2, ease: "easeInOut", repeat: Infinity, repeatDelay: 3 }}
          className="flex justify-center mb-6"
        >
          <CheckCircle2 className="h-16 w-16 sm:h-20 sm:w-20 text-green-500 dark:text-green-400" strokeWidth={1.5} />
        </motion.div>

        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-3 sm:mb-4"
        >
          Booking Successful!
        </motion.h1>

        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 text-sm sm:text-base"
        >
          Your Booking has been completed successfully. Our team will contact you shortly with the details.
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <Button
            onClick={() => router.push("/")}
            variant="outline"
            className="w-full border-2 border-gray-300 dark:border-gray-700 bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 py-3 rounded-xl text-base font-medium transition-all"
          >
            Back to Home
          </Button>

          {bookingId && (
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              Booking ID: {bookingId}
            </p>
          )}
        </motion.div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 sm:mt-8 text-center"
      >
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          Need help? <a href="#" className="text-blue-500 dark:text-blue-400 hover:underline">Contact support</a>
        </p>
      </motion.div>
    </div>
  );
}

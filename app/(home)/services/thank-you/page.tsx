"use client"

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // for navigation

export default function ThankYouPage() {
  const router = useRouter();
  const [showCheckmark, setShowCheckmark] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setShowCheckmark(true), 500);
    const timer2 = setTimeout(() => setShowMessage(true), 1500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <motion.div 
      className="flex flex-col items-center justify-center min-h-screen p-5 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {showCheckmark && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
        >
          <svg 
            className="w-24 h-24 mb-8"
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 52 52"
          >
            <motion.circle 
              cx="26" 
              cy="26" 
              r="25" 
              fill="none"
              stroke="#4CAF50"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 0.5,
                ease: "easeInOut"
              }}
            />
            <motion.path 
              fill="none" 
              stroke="#4CAF50"
              strokeWidth="2"
              d="M14.1 27.2l7.1 7.2 16.7-16.8"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                delay: 0.5,
                duration: 0.3,
                ease: "easeInOut"
              }}
            />
          </svg>
        </motion.div>
      )}
      
      {showMessage && (
        <motion.div
          className="space-y-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: 0.8,
            duration: 0.6,
            ease: "easeOut"
          }}
        >
          <motion.h1 
            className="text-4xl font-bold text-gray-800"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 1,
              type: "spring",
              stiffness: 300
            }}
          >
            Thank you!
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              delay: 1.2,
              duration: 0.4
            }}
          >
            Your response has been submitted.
          </motion.p>

          <motion.button
            onClick={() => router.push('/')}
            className="mt-6 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 1.4,
              duration: 0.4
            }}
          >
            Go to Home
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
}

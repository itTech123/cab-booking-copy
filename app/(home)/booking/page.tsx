


import BookingPage from "@/pages/bookingPage";
import { Suspense } from "react";

export default function Booking() {
  return (
  
     <Suspense fallback={"<div>Loading..</div>"}>
      <BookingPage/>
    </Suspense>
  
  )
}

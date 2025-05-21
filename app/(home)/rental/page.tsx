


import CarListingPage from "@/pages/rentalCarListing";
import { Suspense } from "react";

export default function RentalPage() {
  return (
 
    <Suspense fallback={"<div>Loading..</div>"}>
      <CarListingPage/>
    </Suspense>
   
  )
}

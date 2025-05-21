



import AirportCarListingPage from "@/pages/airportCarListing";
import { Suspense } from "react";

export default function AirportPage() {
  return (

      <Suspense fallback={"<div>Loading...</div>"}>

        <AirportCarListingPage />
      </Suspense>

  )
}

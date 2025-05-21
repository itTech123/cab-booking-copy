

import RoundTripCarListingPage from "@/pages/roundTripCarListing";
import { Suspense } from "react";


export default function RoundTripPage() {
  return (
    <Suspense fallback={"<div>Loading...</div>"}>
      <RoundTripCarListingPage/>
    </Suspense>
  )
}

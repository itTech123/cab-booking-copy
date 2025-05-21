

import OneWayCarListing from "@/pages/oneWayCarListing";
import { Suspense } from "react";

export default function OneWayBooking() {
  return (

     <Suspense fallback={"<div>Loading..</div>"}>
      <OneWayCarListing/>
    </Suspense>
  
  )
}

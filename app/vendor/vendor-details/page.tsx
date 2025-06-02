"use client"

import UploadVendorDetails from "@/components/vendor/vendorDetails"
import { Suspense } from "react"

export default function VendorDetails() {
  return (
       <Suspense fallback={"<div>Loading...</div>"}>
        <UploadVendorDetails/>
    </Suspense>
  )
}

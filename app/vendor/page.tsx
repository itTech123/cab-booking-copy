"use client"

import withVendorAuth from "@/components/vendor/withVendorAuth"

 function VendorPage() {
  return (
    <div>
      hi vendor
    </div>
  )
}

export default  withVendorAuth(VendorPage)

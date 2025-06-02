"use client"

import ResetPasswordComponent from "@/components/vendor/resetPassword"
import { Suspense } from "react"

export default function ResetPasswordPage() {
  return (
     <Suspense fallback={"<div>Loading...</div>"}>
      <ResetPasswordComponent/>
    </Suspense>
  )
}

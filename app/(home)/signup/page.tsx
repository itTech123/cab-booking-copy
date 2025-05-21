"use client"

import SignupPage from "@/pages/SignupPage";
import { Suspense } from "react";


export default function Signup() {
  return (
    <Suspense fallback={"<div>Loading...</div>"}>
      <SignupPage/>
    </Suspense>
  )
}

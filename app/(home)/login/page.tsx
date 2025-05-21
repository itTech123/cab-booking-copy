


import LoginPage from "@/pages/LoginPage";
import { Suspense } from "react";


export default function Login() {
  return (
    <Suspense fallback={"<div>Loading...</div>"}>
      <LoginPage/>
    </Suspense>
  )
}

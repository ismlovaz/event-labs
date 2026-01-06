"use client"

import { SignUp } from "@clerk/nextjs"
import { dark } from "@clerk/themes"

const Page = () => {
  return (
    <div className="w-full flex-1 flex items-center justify-center">
      <SignUp
        fallbackRedirectUrl="/welcome"
        forceRedirectUrl="/welcome"
        appearance={{
          baseTheme: dark
        }}
      />
    </div>
  )
}

export default Page

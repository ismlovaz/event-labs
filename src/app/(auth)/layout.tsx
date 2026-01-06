import { ReactNode } from "react"
import { Navbar } from "@/components/navbar"

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center bg-gray-950 antialiased">
      <Navbar />
      {children}
    </div>
  )
}

export default Layout

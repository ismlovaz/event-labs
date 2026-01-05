import Link from "next/link"
import { MaxWidthWrapper } from "./max-width-wrapper"
import { SignOutButton } from "@clerk/nextjs"
import { Button, buttonVariants } from "./ui/button"
import { ArrowRight } from "lucide-react"
import { currentUser } from "@clerk/nextjs/server"
import { StickyNav } from "./sticky-nav"

export const Navbar = async () => {
  const user = await currentUser()

  return (
    <StickyNav>
      <MaxWidthWrapper>
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex z-40 font-semibold text-white">
            Ping<span className="text-brand-700">Panda</span>
          </Link>

          <div className="h-full flex items-center space-x-4">
            {user ? (
              <>
                <SignOutButton>
                  <Button size="sm" variant="ghost" className="text-white hover:text-white/80">
                    Sign out
                  </Button>
                </SignOutButton>

                <Link
                  href="/dashboard"
                  className={buttonVariants({
                    size: "sm",
                    className: "flex items-center gap-1",
                  })}
                >
                  Dashboard <ArrowRight className="ml-1.5 size-4" />
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/pricing"
                  className={buttonVariants({
                    size: "sm",
                    variant: "ghost",
                    className: "text-white hover:text-white/80",
                  })}
                >
                  Pricing
                </Link>
                <Link
                  href="/sign-in"
                  className={buttonVariants({
                    size: "sm",
                    variant: "ghost",
                    className: "text-white hover:text-white/80",
                  })}
                >
                  Sign in
                </Link>

                <div className="h-8 w-px bg-gray-800" />

                <Link
                  href="/sign-up"
                  className={buttonVariants({
                    size: "sm",
                    className: "flex items-center gap-1.5",
                  })}
                >
                  Sign up <ArrowRight className="size-4" />
                </Link>
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </StickyNav>
  )
}

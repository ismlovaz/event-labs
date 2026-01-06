import { cn } from "@/utils"
import { Marquee } from "@/components/ui/marquee"
import { Star } from "lucide-react"

const reviews = [
    {
        name: "Alex Turner",
        username: "@alexturnerdev",
        body: "Set this up in literally 10 minutes. Now every Stripe payment and new signup hits my Discord instantly. Way simpler than wiring Slack + webhooks myself.",
        img: "https://avatar.vercel.sh/alexturner",
    },
    {
        name: "Sofia Martinez",
        username: "@sofiamartinez",
        body: "I run a small SaaS solo and EventLabs gives me peace of mind. Even when I'm away from my laptop, I instantly know when something important happens.",
        img: "https://avatar.vercel.sh/sofiamartinez",
    },
    {
        name: "Daniel Kim",
        username: "@dkim",
        body: "The 'buy once, use forever' model was what convinced me. Stayed for the reliability. Haven’t missed a single event since switching.",
        img: "https://avatar.vercel.sh/danielkim",
    },
    {
        name: "Emily Rogers",
        username: "@emilyrogers",
        body: "Seeing sales notifications pop up in Discord never gets old. It’s oddly motivating when you’re building in public.",
        img: "https://avatar.vercel.sh/emilyrogers",
    },
    {
        name: "Marco Bianchi",
        username: "@marcobianchi",
        body: "I use EventLabs to track failed payments and quota limits. Being alerted instantly helped us reduce churn without building custom tooling.",
        img: "https://avatar.vercel.sh/marcobianchi",
    },
    {
        name: "Liam O'Connor",
        username: "@liamoconnor",
        body: "Clean API, no unnecessary complexity. I was sending events from Node and Go within the same afternoon.",
        img: "https://avatar.vercel.sh/liamoconnor",
    },
    {
        name: "Priya Shah",
        username: "@priyashah",
        body: "We replaced a messy internal notification system with EventLabs. Everything important now lives in one Discord channel.",
        img: "https://avatar.vercel.sh/priyashah",
    },
    {
        name: "Tom Wilson",
        username: "@tomwilson",
        body: "Honestly didn’t expect much, but this just works. No overengineering, no dashboards I’ll never open. Just real-time alerts where I already hang out.",
        img: "https://avatar.vercel.sh/tomwilson",
    },

]


const firstRow = reviews.slice(0, reviews.length / 2)
const secondRow = reviews.slice(reviews.length / 2)

const ReviewCard = ({
    img,
    name,
    username,
    body,
}: {
    img: string
    name: string
    username: string
    body: string
}) => {
    return (
        <figure
            className={cn(
                "relative h-full w-80 cursor-pointer overflow-hidden rounded-xl border p-4",
                "border-gray-50/[.1] bg-[#111827] hover:bg-[#111827]/80"
            )}
        >
            <div className="flex flex-row items-center gap-2">
                <img className="rounded-full" width="32" height="32" alt="" src={img} />
                <div className="flex flex-col">
                    <figcaption className="text-sm font-medium text-white">
                        {name}
                    </figcaption>
                    <p className="text-xs font-medium text-white/40">{username}</p>
                </div>
            </div>
            <div className="flex gap-0.5 mb-2 mt-2 justify-start">
                <Star className="size-5 text-brand-600 fill-brand-600" />
                <Star className="size-5 text-brand-600 fill-brand-600" />
                <Star className="size-5 text-brand-600 fill-brand-600" />
                <Star className="size-5 text-brand-600 fill-brand-600" />
                <Star className="size-5 text-brand-600 fill-brand-600" />
            </div>
            <blockquote className="mt-2 text-sm text-gray-300">{body}</blockquote>
        </figure>
    )
}

export function Reviews() {
    return (
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
            <Marquee pauseOnHover className="[--duration:20s]">
                {firstRow.map((review) => (
                    <ReviewCard key={review.username} {...review} />
                ))}
            </Marquee>
            <Marquee reverse pauseOnHover className="[--duration:20s]">
                {secondRow.map((review) => (
                    <ReviewCard key={review.username} {...review} />
                ))}
            </Marquee>
            <div className="from-gray-950 pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r"></div>
            <div className="from-gray-950 pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l"></div>
        </div>
    )
}

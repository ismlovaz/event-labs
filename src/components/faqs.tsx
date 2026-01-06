import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { PlusIcon } from "lucide-react";

export function FaqsSection() {
    return (
        <section className="mx-auto grid min-h-screen w-full max-w-5xl grid-cols-1 md:grid-cols-2 lg:border-x lg:border-gray-800">
            <div className="px-4 pt-12 pb-6">
                <div className="space-y-5">
                    <h2 className="text-balance font-bold text-4xl md:text-6xl lg:font-black text-brand-600">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-gray-300">
                        Quick answers to common questions about EventLabs. Open any question to
                        learn more.
                    </p>
                    <p className="text-gray-300">
                        {"Can't find what you're looking for? "}
                        <a className="text-brand-500 hover:text-brand-400 hover:underline transition-colors" href="#">
                            Contact Us
                        </a>
                    </p>
                </div>
            </div>
            <div className="relative place-content-center">
                {/* vertical guide line */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 left-3 h-full w-px bg-gray-800"
                />

                <Accordion collapsible type="single">
                    {faqs.map((item) => (
                        <AccordionItem
                            className="group relative border-b border-gray-800 pl-5 first:border-t last:border-b"
                            key={item.id}
                            value={item.id}
                        >
                            {/*  plus */}
                            <PlusIcon
                                aria-hidden="true"
                                className="-bottom-[5.5px] -translate-x-1/2 pointer-events-none absolute left-[12.5px] size-2.5 text-gray-500 group-last:hidden"
                            />

                            <AccordionTrigger className="px-4 py-4 text-[15px] leading-6 hover:no-underline text-white font-medium">
                                {item.title}
                            </AccordionTrigger>

                            <AccordionContent className="px-4 pb-4 text-gray-200">
                                {item.content}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    );
}

const faqs = [
    {
        id: "item-1",
        title: "What is EventLabs?",
        content:
            "EventLabs is a real-time SaaS monitoring tool that delivers critical business insights—like new sales, signups, and errors—directly to your Discord server.",
    },
    {
        id: "item-2",
        title: "Who is EventLabs for?",
        content:
            "EventLabs is built for indie hackers, SaaS founders, and product teams who want to keep a pulse on their business without refreshing dashboards.",
    },
    {
        id: "item-3",
        title: "How does the Discord integration work?",
        content:
            "Simply connect your Discord server, creating a webhook, and use our simple API to send events. Notifications land in your chosen channel instantly.",
    },
    {
        id: "item-4",
        title: "Can I customize the event data?",
        content:
            "Yes! You can attach any custom properties to your events—user emails, plan types, revenue amounts, or error messages—and they'll display beautifully in Discord.",
    },
    {
        id: "item-5",
        title: "Is there a free trial?",
        content:
            "We offer a generous free tier for getting started, and simple paid plans as you scale your event volume.",
    },
    {
        id: "item-6",
        title: "Do I need to be a developer to use it?",
        content:
            "Basic coding knowledge is helpful for integrating our API, but our documentation makes it copy-paste simple for most popular frameworks.",
    },
];

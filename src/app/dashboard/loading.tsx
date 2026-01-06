import { Skeleton } from "@/components/ui/skeleton"

export default function DashboardLoading() {
    return (
        <div className="flex-1 w-full h-full p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div className="space-y-2">
                    <Skeleton className="h-8 w-64 bg-gray-800" />
                    <Skeleton className="h-4 w-48 bg-gray-800" />
                </div>
                <Skeleton className="h-10 w-32 bg-gray-800" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                    <Skeleton key={i} className="h-48 w-full rounded-xl bg-gray-800" />
                ))}
            </div>
        </div>
    )
}

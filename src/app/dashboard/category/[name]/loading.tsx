import { Skeleton } from "@/components/ui/skeleton"

export default function CategoryLoading() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="space-y-2">
                    <Skeleton className="h-8 w-64 bg-gray-800" />
                    <Skeleton className="h-4 w-48 bg-gray-800" />
                </div>
                <Skeleton className="h-10 w-32 bg-gray-800" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Skeleton className="h-24 rounded-xl bg-gray-800" />
                <Skeleton className="h-24 rounded-xl bg-gray-800" />
                <Skeleton className="h-24 rounded-xl bg-gray-800" />
            </div>

            <div className="space-y-4">
                <Skeleton className="h-10 w-full bg-gray-800" />
                <Skeleton className="h-64 w-full bg-gray-800" />
            </div>
        </div>
    )
}

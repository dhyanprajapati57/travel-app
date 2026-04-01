// components/skeletons/flight-card-skeleton.tsx

import { Skeleton } from "@/app/componenets/ui/skeleton";

export default function FlightCardSkeleton() {
  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 shadow-lg">
      
      <div className="space-y-3">
        <Skeleton className="h-5 w-1/2" />
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-4 w-1/4" />

        <div className="flex justify-between items-center mt-4">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-8 w-24 rounded-md" />
        </div>
      </div>
    </div>
  );
}
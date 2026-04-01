// components/skeletons/booking-card-skeleton.tsx

import { Skeleton } from "@/app/componenets/ui/skeleton";

export default function BookingCardSkeleton() {
  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 shadow-lg">
      
      <div className="flex justify-between items-center mb-2">
        <Skeleton className="h-5 w-16 rounded" />
        <Skeleton className="h-4 w-20" />
      </div>

      <Skeleton className="h-5 w-2/3 mb-2" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  );
}
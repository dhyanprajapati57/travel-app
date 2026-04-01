// components/skeletons/hotel-card-skeleton.tsx

import { Skeleton } from "@/app/componenets/ui/skeleton";

export default function HotelCardSkeleton() {
  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 shadow-lg">
      
      {/* Image */}
      {/* <Skeleton className="w-full h-40 rounded-lg mb-4" /> */}

      {/* Content */}
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-1/3" />

        <div className="flex justify-between items-center mt-4">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-8 w-24 rounded-md" />
        </div>
      </div>
    </div>
  );
}
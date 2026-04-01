// components/skeletons/home-hero-skeleton.tsx

import { Skeleton } from "@/app/componenets/ui/skeleton";

export default function HomeHeroSkeleton() {
  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
      
      <Skeleton className="h-12 w-80 mb-4" />
      <Skeleton className="h-5 w-96 mb-8" />

      <div className="flex gap-4 mb-6">
        <Skeleton className="h-12 w-32 rounded-lg" />
        <Skeleton className="h-12 w-32 rounded-lg" />
      </div>

      <div className="flex gap-3 flex-wrap justify-center">
        <Skeleton className="h-8 w-16" />
        <Skeleton className="h-8 w-16" />
        <Skeleton className="h-8 w-16" />
        <Skeleton className="h-8 w-16" />
      </div>

    </div>
  );
}
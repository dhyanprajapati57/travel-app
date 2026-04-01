import BookingCardSkeleton from "@/app/componenets/Skeleton/bookingskeleton";
import { Skeleton } from "@/app/componenets/ui/skeleton";

export default function Loading() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      
      {/* Background fallback */}
      <div className="fixed inset-0 bg-black -z-10" />

      <div className="relative z-20 max-w-5xl mx-auto mt-10 p-6 text-white">
        
        {/* Header */}
        <Skeleton className="h-10 w-48 mb-6" />

        {/* User Info */}
        <div className="mb-8 bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20">
          <Skeleton className="h-5 w-40 mb-2" />
          <Skeleton className="h-4 w-60" />
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mb-8">
          <Skeleton className="h-10 w-24 rounded-lg" />
          <Skeleton className="h-10 w-24 rounded-lg" />
        </div>

        {/* Bookings */}
        <Skeleton className="h-6 w-40 mb-4" />

        <div className="grid md:grid-cols-2 gap-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <BookingCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
// components/skeletons/history-skeleton.tsx

import { Skeleton } from "@/app/componenets/ui/skeleton";

export default function HistorySkeleton() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 3 }).map((_, i) => (
        <Skeleton key={i} className="h-6 w-full rounded" />
      ))}
    </div>
  );
}
"use client";

import { Skeleton } from "@/app/componenets/ui/skeleton";

export default function CSRPageSkeleton() {
  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <Skeleton className="h-8 w-64" />

      {/* CSR Description Section */}
      <section className="p-4 border rounded bg-blue-50 space-y-3">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[90%]" />
        <Skeleton className="h-4 w-[80%]" />
        <Skeleton className="h-4 w-[95%]" />
        <Skeleton className="h-4 w-[85%]" />
      </section>

      {/* Posts Data */}
      <section className="p-4 border rounded space-y-3">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-4 w-48" />
      </section>

      {/* Users Data */}
      <section className="p-4 border rounded space-y-3">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-4 w-48" />
      </section>

      {/* Back Button */}
      <div>
        <Skeleton className="h-4 w-16" />
      </div>
    </div>
  );
}
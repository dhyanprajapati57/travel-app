// components/skeletons/login-skeleton.tsx

import { Skeleton } from "@/app/componenets/ui/skeleton";

export default function LoginSkeleton() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-6 space-y-5">
        
        <Skeleton className="h-8 w-32 mx-auto" />

        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>

        <Skeleton className="h-10 w-24 mx-auto rounded-lg" />

        <Skeleton className="h-4 w-40 mx-auto" />
      </div>
    </div>
  );
}
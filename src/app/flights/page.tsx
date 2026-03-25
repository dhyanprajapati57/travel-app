// app/flights/page.tsx
import { Suspense } from "react";
import Flights from "./flights";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading flights...</div>}>
      <Flights />
    </Suspense>
  );
}
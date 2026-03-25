// src/app/api/flights/route.ts
import flights from "../../../../data/flight.json";

export const revalidate = 60;

export async function GET() {
  return Response.json(flights);
}
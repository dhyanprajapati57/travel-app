
// src/app/api/hotels/route.ts
import hotels from "../../../../data/hotel.json";

export const revalidate = 60;

export async function GET() {
  return Response.json(hotels);
}
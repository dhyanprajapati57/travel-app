import hotels from "../../../../../data/hotel.json";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> } // params is a Promise here
) {
  // Await params to get the actual object
  const params = await context.params;

  const id = Number(params.id);

  console.log("Parsed ID:", id);

  const hotel = hotels.find((h) => h.id === id);

  if (!hotel) {
    return new Response("Hotel not found", { status: 404 });
  }

  return Response.json(hotel);
}
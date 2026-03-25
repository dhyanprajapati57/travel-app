import flights from "../../../../../data/flight.json";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> } 
) {
  const params = await context.params;
  const id = Number(params.id);

  const flight = flights.find((f) => f.id === id);

  if (!flight) {
    return new Response("Flight not found", { status: 404 });
  }

  return Response.json(flight);
}
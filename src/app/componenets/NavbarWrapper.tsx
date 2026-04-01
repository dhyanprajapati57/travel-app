import { cookies } from "next/headers";
import Navbar from "./Navbar";

export default async function NavbarWrapper() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  return <Navbar isLoggedIn={!!token} />;
}
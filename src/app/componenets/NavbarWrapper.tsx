// export const dynamic = "force-dynamic"; //aa add karyu
// // import { cookies } from "next/headers";
// import Navbar from "./Navbar";

// export default async function NavbarWrapper({ children ,loggedIn }) {
//   // const cookieStore = await cookies();
//   // const token = cookieStore.get("token")?.value;

//   return (
//     <>
//       <Navbar isLoggedIn={!!loggedIn} /> {children}
//     </>
//   );
// }import React, { ReactNode } from "react";
import { ReactNode } from "react";
import Navbar from "./Navbar";

type Props = {
  children: ReactNode;
  loggedIn: string | null | undefined;
};

export default function NavbarWrapper({ children, loggedIn }: Props) {
  return (
    <>
      <Navbar isLoggedIn={!!loggedIn} />
      {children}
    </>
  );
}
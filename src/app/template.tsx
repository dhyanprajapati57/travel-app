'use client'
import { ReactNode } from "react";
import dynamic from "next/dynamic";
import { getCookie } from "./lib/coockies/coockies.helpr";

const NavbarWrapperNoSSR = dynamic(() => import("./componenets/NavbarWrapper"), { ssr: false });

const Template = ({ children }: { children: ReactNode }) => {
  const loggedIn = getCookie('token');

  return (
    <NavbarWrapperNoSSR loggedIn={loggedIn}>
      {children}
    </NavbarWrapperNoSSR>
  );
};

export default Template;
"use client";

export const getCookie = (name: string) => {
  if (typeof window !== "undefined") {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);

    if (parts.length === 2) {
      const cookieValue = parts.pop()?.split(";").shift();
      return cookieValue ?? null;
    } else {
      return null;
    }
  } else {
    return null;
  }
};

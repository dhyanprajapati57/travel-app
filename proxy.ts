import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/dashboard") && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (pathname === "/login" && token) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
//  Runs before page load
//  Checks user login (token)
//  Allows or blocks access
//  code that runs between a request and a response.




//    Browser sends request → Server receives request
//                  |
//                  v
//          Middleware triggered
//                  |
//                  v
//    ┌───────────────────────────────┐
//    │ Extract token from cookies    │
//    │ token = req.cookies.get("token")?.value │
//    └───────────────────────────────┘
//                  |
//                  v
//        Check requested path
//                  |
//       ┌──────────┴───────────┐
//       │                      │
//       v                      v
// Path starts with /dashboard?  Path is /login?
//       │                      │
//       │                      │
// token exists?                token exists?
//   │        │                 │       │
//   v        v                 v       v
// Yes       No               Yes       No
//  │        │                 │        │
//  │        └─────> Redirect to /login
//  │
//  └─────> Continue to /dashboard
//                                │
//                                └─────> Redirect to /dashboard

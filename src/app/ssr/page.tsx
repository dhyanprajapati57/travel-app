// app/ssr-page/page.tsx
import Link from "next/link";
import React from "react";

export default async function SSRPage() {
  // Fetch posts (fresh every request)
  const resPosts = await fetch("https://jsonplaceholder.typicode.com/posts", {
    cache: "no-store", // true SSR
  });
  const posts = await resPosts.json();

  // Fetch users (fresh every request)
  const resUsers = await fetch("https://jsonplaceholder.typicode.com/users", {
    cache: "no-store",
  });
  const users = await resUsers.json();

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <h1 className="text-3xl font-bold">SSR Page Example</h1>

      {/* SSR Description Section */}
      <section className="p-4 border rounded bg-gray-50">
        <h2 className="text-2xl font-semibold mb-2">What is SSR?</h2>
        <p className="mb-1">
          Server-Side Rendering (SSR) means the server prepares your webpages
          finished HTML before sending it to your browser.
        </p>
        <p className="mb-1">
          Instead of your browser building the page with JavaScript like
          standard React, the server does all the heavy lifting first.
        </p>
        <p>
          Think of it like this:{" "}
          <strong>SSR = chef cooks the meal in the kitchen</strong>
          and brings you ready-to-eat food, while CSR = you cook it yourself at
          the table.
        </p>
        <p>
          START User requests page → Server receives request → Server fetches
          data (DB/API) → Server generates full HTML with data → Send HTML to
          browser → Browser displays content END
        </p>
      </section>

      {/* Posts Data */}
      <section className="p-4 border rounded">
        <h2 className="text-xl font-semibold mb-2">Posts (SSR)</h2>
        <p>
          Total Posts fetched from API: <strong>{posts.length}</strong>
        </p>
      </section>

      <section className="p-4 border rounded">
        <h2 className="text-xl font-semibold mb-2">KEY</h2>
        <p>cache : no-store;</p>
      </section>

      {/* Users Data */}
      <section className="p-4 border rounded">
        <h2 className="text-xl font-semibold mb-2">Users (SSR)</h2>
        <p>
          Total Users fetched from API: <strong>{users.length}</strong>
        </p>
      </section>
      <div>
        <button>
          <Link href="/" className="text-gray-700 hover:text-blue-600">
            back
          </Link>
        </button>
      </div>
    </div>
  );
}

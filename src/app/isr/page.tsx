// app/isr-page/page.tsx
import Link from "next/link";
import React from "react";

export default async function ISRPage() {
  // Fetch posts and revalidate every 10 seconds
  const resPosts = await fetch("https://jsonplaceholder.typicode.com/posts", {
    next: { revalidate: 10 }, // ISR: rebuilds every 10 seconds
  });
  const posts = await resPosts.json();

  // Fetch users and revalidate every 10 seconds
  const resUsers = await fetch("https://jsonplaceholder.typicode.com/users", {
    next: { revalidate: 10 },
  });
  const users = await resUsers.json();

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <h1 className="text-3xl font-bold">ISR Page Example</h1>

      {/* ISR Description Section */}
      <section className="p-4 border rounded bg-green-50">
        <h2 className="text-2xl font-semibold mb-2">What is ISR?</h2>
        <p className="mb-1">
          Incremental Static Regeneration (ISR) is like SSG but with automatic
          updates.
        </p>
        <p className="mb-1">
          The page is initially built at build time, but Next.js can regenerate
          it **after a set interval**.
        </p>
        <p>
          Think of it like this:{" "}
          <strong>ISR = chef prepares meals in advance (SSG)</strong>, but every
          10 minutes, they refresh some dishes with fresh food. Visitors get
          mostly static pages, but with **recent updates automatically**.
        </p>
      </section>

      {/* Posts Data */}
      <section className="p-4 border rounded">
        <h2 className="text-xl font-semibold mb-2">Posts (ISR)</h2>
        <p>
          Total Posts fetched with ISR: <strong>{posts.length}</strong>
        </p>
      </section>

      {/* Users Data */}
      <section className="p-4 border rounded">
        <h2 className="text-xl font-semibold mb-2">Users (ISR)</h2>
        <p>
          Total Users fetched with ISR: <strong>{users.length}</strong>
        </p>
      </section>

      <section className="p-4 border rounded">
        <h2 className="text-xl font-semibold mb-2">KEY</h2>
        <p>next : revalidate-60 </p>
        <p>Update this page every 60 seconds automatically </p>
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

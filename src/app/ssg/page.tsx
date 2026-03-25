// app/ssg-page/page.tsx
import Link from "next/link";
import React from "react";

export default async function SSGPage() {
  // Fetch posts once at build time
  const resPosts = await fetch("https://jsonplaceholder.typicode.com/posts", {
    cache: "force-cache", // SSG: cached at build
  });
  const posts = await resPosts.json();

  // Fetch users once at build time
  const resUsers = await fetch("https://jsonplaceholder.typicode.com/users", {
    cache: "force-cache",
  });
  const users = await resUsers.json();

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <h1 className="text-3xl font-bold">SSG Page Example</h1>

      {/* SSG Description Section */}
      <section className="p-4 border rounded bg-yellow-50">
        <h2 className="text-2xl font-semibold mb-2">What is SSG?</h2>
        <p className="mb-1">
          Static Site Generation (SSG) means the webpage is built **once at
          build time**.
        </p>
        <p className="mb-1">
          Every visitor sees the same pre-built HTML until the site is rebuilt.
        </p>
        <p>
          Think of it like this:{" "}
          <strong>
            SSG = chef prepares meals in advance and stores them on the counter
          </strong>
          . When you come, you grab a ready meal — no waiting. But if you want a
          new dish, the chef has to cook a new batch (site rebuild).
        </p>
      </section>

      {/* Posts Data */}
      <section className="p-4 border rounded">
        <h2 className="text-xl font-semibold mb-2">Posts (SSG)</h2>
        <p>
          Total Posts fetched at build time: <strong>{posts.length}</strong>
        </p>
      </section>

      {/* Users Data */}
      <section className="p-4 border rounded">
        <h2 className="text-xl font-semibold mb-2">Users (SSG)</h2>
        <p>
          Total Users fetched at build time: <strong>{users.length}</strong>
        </p>
      </section>

      <section className="p-4 border rounded">
        <h2 className="text-xl font-semibold mb-2">KEY</h2>
        <p>force-cache</p>
        <p>Data is fetched only one time (build time)..After that → always same data</p>
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

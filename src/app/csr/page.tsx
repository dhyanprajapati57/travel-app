"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function CSRPage() {
  const [posts, setPosts] = useState<unknown[]>([]);
  const [users, setUsers] = useState<unknown[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const postsRes = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
      );
      const postsData = await postsRes.json();

      const usersRes = await fetch(
        "https://jsonplaceholder.typicode.com/users",
      );
      const usersData = await usersRes.json();

      setPosts(postsData);
      setUsers(usersData);
      setLoading(false);
    }

    fetchData();
  }, []);

  if (loading) return <p className="p-6">Loading data...</p>;

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <h1 className="text-3xl font-bold">CSR Page Example</h1>

      {/* CSR Description Section */}
      <section className="p-4 border rounded bg-blue-50">
        <h2 className="text-2xl font-semibold mb-2">What is CSR?</h2>
        <p className="mb-1">
          Client-Side Rendering (CSR) means the browser builds the webpage after
          it loads using JavaScript.
        </p>
        <p className="mb-1">
          The server only sends a mostly empty HTML shell, and the browser does
          the heavy lifting.
        </p>
        <p>
          Think of it like this:{" "}
          <strong>CSR = you cook the meal yourself at the table</strong>. You
          can eat only after everything is prepared in the browser.
        </p>
        <p>
          START User requests page → Server sends empty HTML + JS bundle →
          Browser loads JS → JS executes → JS calls API to fetch data → Data
          received → UI is rendered in browser END
        </p>
      </section>

      {/* Posts Data */}
      <section className="p-4 border rounded">
        <h2 className="text-xl font-semibold mb-2">Posts (CSR)</h2>
        <p>
          Total Posts fetched in browser: <strong>{posts.length}</strong>
        </p>
      </section>

      {/* Users Data */}
      <section className="p-4 border rounded">
        <h2 className="text-xl font-semibold mb-2">Users (CSR)</h2>
        <p>
          Total Users fetched in browser: <strong>{users.length}</strong>
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

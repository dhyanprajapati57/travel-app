import Link from "next/link";

async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default async function ISRPage() {
  await delay(2000);

  const resPosts = await fetch("https://jsonplaceholder.typicode.com/posts", {
    next: { revalidate: 10 },
  });
  const posts = await resPosts.json();

  const resUsers = await fetch("https://jsonplaceholder.typicode.com/users", {
    next: { revalidate: 10 },
  });
  const users = await resUsers.json();

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">ISR Page Example</h1>

      <section className="p-4 border rounded bg-green-50">
        <h2 className="text-2xl font-semibold mb-2">What is ISR?</h2>
        <p>ISR updates static pages automatically after a time interval.</p>
      </section>

      <section className="p-4 border rounded">
        <h2 className="text-xl font-semibold mb-2">Posts (ISR)</h2>
        <p>Total Posts: {posts.length}</p>
      </section>

      <section className="p-4 border rounded">
        <h2 className="text-xl font-semibold mb-2">Users (ISR)</h2>
        <p>Total Users: {users.length}</p>
      </section>

      <div>
        <Link href="/" className="text-gray-700 hover:text-blue-600">
          back
        </Link>
      </div>
    </div>
  );
}
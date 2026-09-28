import { useEffect, useState } from "react";

export default function PostsClient() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch("/api/posts");
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        const json = await res.json();
        if (!cancelled) setData(json);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  // Downsides of this approach (observe them in the browser):
  // 1. No caching: state is lost when the component unmounts.
  // 2. Refetches on every mount: navigating away and back shows "Loading..." again.
  // 3. Boilerplate: loading, error, and cleanup logic written by hand.
  // 4. No revalidation on focus or reconnect, no request deduplication.

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <main>
      <h1>Posts (useEffect + fetch)</h1>
      <p>API generated at: <strong>{data.generatedAt}</strong></p>
      <p>API request #: <strong>{data.requestNumber}</strong></p>
      <ul>
        {data.posts.map((p) => (
          <li key={p.id}>{p.title} by {p.author}</li>
        ))}
      </ul>
    </main>
  );
}

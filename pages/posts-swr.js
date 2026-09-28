import useSWR from "swr";

const fetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
};

export default function PostsSWR() {
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    "/api/posts",
    fetcher
  );

  if (error) return <p>Error: {error.message}</p>;
  if (isLoading) return <p>Loading...</p>;

  return (
    <main>
      <h1>Posts (SWR)</h1>
      <p>
        Status:{" "}
        <strong>{isValidating ? "revalidating in background..." : "up to date"}</strong>
      </p>
      <p>API generated at: <strong>{data.generatedAt}</strong></p>
      <p>API request #: <strong>{data.requestNumber}</strong></p>
      <ul>
        {data.posts.map((p) => (
          <li key={p.id}>{p.title} by {p.author}</li>
        ))}
      </ul>
      <button onClick={() => mutate()}>Revalidate now</button>
    </main>
  );
}

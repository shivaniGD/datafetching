export default function Home() {
  return (
    <main>
      <h1>Day 3: Client-side fetching and SWR</h1>
      <p>
        Use the nav to move between the two pages. Watch the loading state,
        the timestamp, and the request number each time you come back.
      </p>
      <ol>
        <li><b>Client (useEffect)</b>: manual fetch, no cache, refetches on every mount</li>
        <li><b>Client (SWR)</b>: cached data shows instantly, then revalidates in the background</li>
      </ol>
    </main>
  );
}

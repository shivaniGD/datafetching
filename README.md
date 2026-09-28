# Next.js: Client-side fetching and SWR

## Tasks covered
1. `pages/posts-client.js`: fetch inside `useEffect`, stored in state
2. Downsides noted as comments in that file (no caching, refetch on every mount)
3. `pages/posts-swr.js`: same page rewritten with the `useSWR` hook (`npm install swr`)
4. Caching/revalidation check (steps below)

`pages/api/posts.js` has an 800ms delay and a request counter so behavior is easy to see.

## Run
```bash
npm install
npm run dev
```

## Confirm the behavior
Use the nav links (client-side navigation), not the browser refresh button.

**Client (useEffect) page**
1. Open it: "Loading..." for about 0.8s, then data.
2. Go to Home, then come back.
3. "Loading..." shows again, the timestamp is new, and the request # went up.
   Nothing was cached; every mount refetches.

**Client (SWR) page**
1. Open it: "Loading..." the first time only.
2. Go to Home, then come back.
3. The old data appears instantly (served from the SWR cache), status shows
   "revalidating in background...", then the timestamp and request # update.
   This is stale-while-revalidate.
4. Switch to another browser tab and back: SWR revalidates on focus.
5. Open the Network tab: several components using the same key share one request (deduplication).

## Optional: axios
Swap `fetch` for axios by running `npm install axios` and using
`axios.get("/api/posts").then(r => r.data)` in the effect or the SWR fetcher.

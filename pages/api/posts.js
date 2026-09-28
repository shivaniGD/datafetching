let requestCount = 0;

export default async function handler(req, res) {
  requestCount += 1;

  // Simulate a slow network so loading states are easy to see
  await new Promise((resolve) => setTimeout(resolve, 800));

  res.status(200).json({
    posts: [
      { id: 1, title: "Getting started with Next.js", author: "Asha" },
      { id: 2, title: "Understanding SSG vs SSR", author: "Ravi" },
      { id: 3, title: "API routes made simple", author: "Meera" },
    ],
    generatedAt: new Date().toISOString(),
    requestNumber: requestCount,
  });
}

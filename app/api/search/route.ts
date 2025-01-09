import { NextResponse } from "next/server";

import { TMedia, TSearchResponse, TSearchResults } from "@/types/search";

// for CORS & requests merge
export async function GET(
  request: Request,
): Promise<NextResponse<TSearchResponse>> {
  const url = new URL(request.url);
  const query = url.searchParams.get("query") ?? ""; // Поиск по термину
  const mediaTypes: TMedia[] = [
    "music",
    "book",
    "movie",
    "podcast",
    "audiobook",
    "software",
    "ebook",
  ];

  if (query.trim()) {
    const fetchResultsForMedia = async (media: string) => {
      const response = await fetch(
        `https://itunes.apple.com/search?term=${query}&country=US&media=${media}&limit=10`,
      );
      const data = await response.json();

      return { media, results: data.results };
    };

    const results = (await Promise.allSettled(
      mediaTypes.map(fetchResultsForMedia),
    )) as TSearchResults[];

    const rejectedResults = results.filter(
      (result) => result.status === "rejected",
    );
    const isAllRejected = rejectedResults.length === mediaTypes.length;

    if (isAllRejected) {
      return NextResponse.json(
        {
          error: "All requests rejected by server. Please try again later.",
          data: results,
        },
        {
          status: 500,
        },
      );
    }

    return NextResponse.json({ data: results });
  }

  return NextResponse.json({ data: [] });
}

export interface TSearchResponse {
  data: TSearchResults[];
  error?: string;
}

export interface TSearchResults {
  status: "fulfilled" | "rejected";
  value?: TSearchResultValue;
  reason?: {};
}

export type TMedia =
  | "music"
  | "book"
  | "movie"
  | "podcast"
  | "audiobook"
  | "software"
  | "ebook";

export interface TSearchResultValue {
  media: TMedia;
  results: TSearchResult[];
}

export interface TSearchResult {
  id: string;
  wrapperType: string;
  kind: string;
  artistId: number;
  collectionId: number;
  trackId: number;
  artistName: string;
  collectionName: string;
  trackName: string;
  collectionCensoredName: string;
  trackCensoredName: string;
  artistViewUrl: string;
  collectionViewUrl: string;
  trackViewUrl: string;
  previewUrl: string;
  artworkUrl30: string;
  artworkUrl60: string;
  artworkUrl100: string;
  collectionPrice: number;
  trackPrice: number;
  releaseDate: string;
  collectionExplicitness: string;
  trackExplicitness: string;
  discCount: number;
  discNumber: number;
  trackCount: number;
  trackNumber: number;
  trackTimeMillis: number;
  country: string;
  currency: string;
  primaryGenreName: string;
  isStreamable: boolean;
}

export enum Status {
  none = "none",
  loading = "loading",
  done = "done",
  error = "error",
}

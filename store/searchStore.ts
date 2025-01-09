import { makeAutoObservable, reaction } from "mobx";
import { debounce, sample } from "lodash-es";
import { makePersistable } from "mobx-persist-store";
import axios, { AxiosError } from "axios";

import { Status, TSearchResponse, TSearchResults } from "@/types/search";

class SearchStore {
  searchQuery = "";
  searchResults: Required<TSearchResults>[] = [];
  status = Status.none;
  errorMessage = "";

  get isNone() {
    return this.status === Status.none;
  }
  get isLoading() {
    return this.status === Status.loading;
  }
  get isDone() {
    return this.status === Status.done;
  }
  get isError() {
    return this.status === Status.error;
  }
  get inNotFound() {
    return (
      searchStore.searchQuery &&
      searchStore.isDone &&
      !searchStore.searchResults.length
    );
  }

  private randomQueries = [
    "Drake",
    "Fight Club",
    "The Neighbourhood",
    "Seven",
    "Pulp Fiction",
    "Mozart",
    "Steppenwolf",
    "Земфира",
    "Joji",
    "The Beatles",
    "Shostakovich",
    "Inception",
    "Radiohead",
    "The Matrix",
    "Arctic Monkeys",
    "Björk",
    "Nirvana",
    "The Rolling Stones",
    "King Crimson",
    "Tool",
    "David Bowie",
    "Tame Impala",
    "Queen",
    "Pink Floyd",
    "Kanye West",
    "Lana Del Rey",
    "The Cure",
    "The Weeknd",
    "Massive Attack",
    "Tool",
    "Led Zeppelin",
    "Billie Eilish",
    "Hitchcock",
    "Vivaldi",
    "Lorde",
    "The Smiths",
    "Eminem",
    "Black Sabbath",
    "Frank Ocean",
    "Nine Inch Nails",
    "Sia",
    "The Doors",
    "Beethoven",
    "The Velvet Underground",
  ];

  generateRandomSearchQuery() {
    this.setSearchQuery(sample(this.randomQueries)!);
  }

  setSearchQuery(searchQuery: string) {
    this.searchQuery = searchQuery;
  }

  private setSearchResults(results: any[]) {
    this.searchResults = results;
  }

  setStatus(status: Status) {
    this.status = status;
  }

  private async search() {
    this.setStatus(Status.loading);
    try {
      const {
        data: { data },
      } = await axios.get<TSearchResponse>(
        `/api/search?query=${this.searchQuery}`,
      );

      if (this.searchQuery) {
        this.setSearchResults(
          data.filter((search) => search.value?.results?.length),
        );
        this.setStatus(Status.done);
      } else {
        this.setStatus(Status.none);
      }
    } catch (e) {
      this.setStatus(Status.error);
      const error = e as AxiosError<TSearchResponse>;

      this.errorMessage = error.response?.data.error ?? "Network error";
    }
  }

  private searchReaction() {
    const debouncedSearch = debounce(() => this.search(), 500);

    reaction(
      () => this.searchQuery.trim(),
      (searchQuery, previousSearchQuery) => {
        if (searchQuery) {
          debouncedSearch();
          !previousSearchQuery && this.setStatus(Status.loading);
        } else {
          this.setSearchResults([]);
          this.setStatus(Status.none);
        }
      },
    );
  }

  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: "search",
      properties: ["searchQuery"],
      storage: localStorage,
    });
    this.searchReaction();
  }
}

export const searchStore = new SearchStore();

"use client";

import { observer } from "mobx-react-lite";

import { useStores } from "@/store";
import {
  SearchCardResults,
  EmptySearch,
  SearchCardsPlaceholder,
  SearchErrorAlert,
  SearchInput,
} from "@/components";

function Main() {
  const { searchStore } = useStores();

  return (
    <>
      <SearchInput />
      {searchStore.isLoading ? (
        <SearchCardsPlaceholder />
      ) : (
        <SearchCardResults />
      )}
      {searchStore.isError && <SearchErrorAlert />}
      {(searchStore.isNone || searchStore.inNotFound) && <EmptySearch />}
    </>
  );
}

export default observer(Main);

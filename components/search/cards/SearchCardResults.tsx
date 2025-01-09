"use client";

import React from "react";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { observer } from "mobx-react-lite";

import { SearchCard } from "./SearchCard";

import { useStores } from "@/store";

export const SearchCardResults = observer(() => {
  const { searchStore } = useStores();

  if (searchStore.searchResults.length) {
    return (
      <Accordion
        className={"accordion"}
        defaultSelectedKeys={"all"}
        itemClasses={{ trigger: "accordion__trigger" }}
        selectionMode={"multiple"}
        variant={"splitted"}
      >
        {searchStore.searchResults.map(({ value: { media, results } }) => (
          <AccordionItem
            key={media}
            aria-label={media}
            className={"accordion__item"}
            title={<SearchCard.Title amount={results.length} title={media} />}
          >
            <div className={"flex flex-wrap gap-4 w-full"}>
              {results.map((result) => (
                <SearchCard key={result.trackId} {...result} />
              ))}
            </div>
          </AccordionItem>
        ))}
      </Accordion>
    );
  }

  return null;
});

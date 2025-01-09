"use client";
import React from "react";
import { Button } from "@nextui-org/button";
import { observer } from "mobx-react-lite";

import { useStores } from "@/store";

export const EmptySearch = observer(() => {
  const { searchStore } = useStores();

  return (
    <div className="flex flex-col gap-3 justify-center items-center w-full h-full">
      <h1 className={"text-xl font-bold"}>
        {searchStore.inNotFound
          ? "No results found. Try adjusting your search criteria."
          : "There's nothing here yet."}
      </h1>
      <Button
        color="primary"
        onPress={() => searchStore.generateRandomSearchQuery()}
      >
        Try to search something {searchStore.inNotFound && "different"}
      </Button>
    </div>
  );
});

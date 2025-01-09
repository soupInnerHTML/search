"use client";
import React, { FC, useEffect } from "react";
import { Input, InputProps } from "@nextui-org/input";
import { Kbd } from "@nextui-org/kbd";
import { Spinner } from "@nextui-org/spinner";
import { observer } from "mobx-react-lite";

import { SearchIcon } from "@/components";
import { useStores } from "@/store";

export const SearchInput: FC<InputProps> = observer((props) => {
  const { searchStore } = useStores();
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey && event.key === "k") {
        // Когда нажимаем Command + K (для Mac)
        event.preventDefault();
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <Input
      ref={inputRef}
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-content1 mb-5",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        searchStore.isLoading ? (
          <Spinner size={"sm"} />
        ) : (
          <SearchIcon
            className="text-base text-default-400 pointer-events-none flex-shrink-0"
            height={20}
            width={20}
          />
        )
      }
      type="search"
      value={searchStore.searchQuery}
      onChange={(e) => searchStore.setSearchQuery(e.target.value)}
      {...props}
    />
  );
});

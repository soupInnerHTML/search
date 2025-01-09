import React, { FC } from "react";
import { Card, CardBody } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Chip } from "@nextui-org/chip";

import { SearchCardTitle } from "./SearchCardTitle";

import { TSearchResult } from "@/types/search";

const SearchCardBase: FC<TSearchResult> = ({
  artistName,
  collectionName,
  trackName,
  artworkUrl100,
  primaryGenreName,
}) => {
  return (
    <Card className="custom-card">
      <CardBody className="custom-card__body">
        <p
          className="text-tiny uppercase font-bold truncate w-full"
          title={artistName}
        >
          {artistName}
        </p>
        <h4 className="font-bold text-large truncate w-full" title={trackName}>
          {trackName}
        </h4>
        <small
          className="text-default-500 truncate w-full"
          title={collectionName}
        >
          {collectionName}
        </small>
        {primaryGenreName && (
          <Chip className={"mt-auto"} color="success" size={"sm"}>
            {primaryGenreName}
          </Chip>
        )}
      </CardBody>
      <Image
        alt="Card background"
        className="object-cover rounded-xl w-[100px] h-[100px]"
        height={100}
        src={artworkUrl100}
        width={100}
      />
    </Card>
  );
};

export const SearchCard = Object.assign(SearchCardBase, {
  Title: SearchCardTitle,
});

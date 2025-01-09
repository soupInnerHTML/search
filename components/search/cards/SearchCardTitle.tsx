import React, { useMemo } from "react";
import { Chip } from "@nextui-org/chip";
import pluralize from "pluralize";

import { title as titleStyle } from "@/components/primitives";

interface TitleProps {
  title: string;
  amount: number;
}
export const SearchCardTitle: React.FC<TitleProps> = ({ title, amount }) => {
  const normalizedTitle = useMemo(() => pluralize(title), [title]);

  return (
    <div className={"flex w-full justify-between items-center"}>
      <span
        className={titleStyle({
          color: "foreground",
          className: "capitalize text-2xl",
        })}
      >
        {normalizedTitle}
      </span>
      <Chip>{amount}</Chip>
    </div>
  );
};

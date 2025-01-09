import React from "react";
import { Skeleton } from "@nextui-org/skeleton";
import { Card } from "@nextui-org/card";
import clsx from "clsx";

import { For } from "@/components/common/For";

export const SearchCardsPlaceholder = () => {
  return (
    <div className={"accordion"}>
      <For count={7} render={(index) => <CardPlaceholderGroup key={index} />} />
    </div>
  );
};

const SkeletonInner: React.FC<{ className: string }> = ({ className }) => {
  return <div className={clsx("rounded-lg bg-default-200", className)} />;
};

const CardPlaceholderGroup = () => {
  return (
    <div className={"bg-content1 rounded-medium accordion__item space-y-4"}>
      <Skeleton className="w-[100px] lg:w-[160px] rounded-lg accordion__trigger">
        <SkeletonInner className="h-[32px] lg:h-[48px]" />
      </Skeleton>
      <div className="flex flex-wrap gap-4">
        <For count={10} render={(index) => <CardPlaceholder key={index} />} />
      </div>
    </div>
  );
};

const CardPlaceholder = () => {
  return (
    <Card className="custom-card" radius="lg">
      <div className="space-y-3 w-1/2">
        <Skeleton className="rounded-lg w-4/5">
          <SkeletonInner className="h-3" />
        </Skeleton>
        <Skeleton className="rounded-lg">
          <SkeletonInner className="h-4" />
        </Skeleton>
        <Skeleton className="rounded-lg w-3/5">
          <SkeletonInner className="h-3" />
        </Skeleton>
        <Skeleton className="rounded-full w-[60px]">
          <SkeletonInner className="h-5" />
        </Skeleton>
      </div>
      <Skeleton className="rounded-xl">
        <SkeletonInner className="w-[100px] h-[100px]" />
      </Skeleton>
    </Card>
  );
};

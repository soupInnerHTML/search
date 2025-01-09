"use client";

import { Button } from "@nextui-org/button";

import { subtitle } from "@/components/primitives";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div
      className={
        "flex flex-col w-full h-full items-center justify-center gap-3"
      }
    >
      <h1 className={subtitle({ className: "text-center" })}>
        Something went wrong!
      </h1>
      <Button
        className={"w-[200px]"}
        color={"primary"}
        onPress={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </Button>
    </div>
  );
}

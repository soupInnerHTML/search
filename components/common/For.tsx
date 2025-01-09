import React from "react";

type ForProps = {
  count: number;
  render: (index: number) => React.ReactNode;
};

export const For: React.FC<ForProps> = ({ count, render }) => {
  return <>{Array.from({ length: count }, (_, index) => render(index))}</>;
};

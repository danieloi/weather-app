import React from "react";

type Props = {
  items: unknown[];
  loadingLabel: string;
  emptyStateLabel: string;
  isFetching: boolean;
  renderItem: (item: any) => void;
};

export default function List({
  items,
  renderItem,
  loadingLabel,
  isFetching,
  emptyStateLabel,
}: Props) {
  const isEmpty = items.length === 0;

  if (isEmpty && isFetching) {
    return (
      <p className="f5">
        <i>{loadingLabel}</i>
      </p>
    );
  }

  if (isEmpty && !isFetching) {
    return (
      <p className="f5">
        <i>{emptyStateLabel}</i>
      </p>
    );
  }

  return <>{items.map(renderItem)}</>;
}

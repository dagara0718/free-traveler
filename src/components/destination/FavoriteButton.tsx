"use client";

import { useSyncExternalStore } from "react";
import {
  isFavorite,
  subscribeFavorites,
  toggleFavorite,
} from "@/lib/favorites";

export function FavoriteButton({
  destinationId,
  destinationName,
}: {
  destinationId: string;
  destinationName: string;
}) {
  const favorite = useSyncExternalStore(
    subscribeFavorites,
    () => isFavorite(destinationId),
    () => false,
  );

  return (
    <button
      type="button"
      aria-pressed={favorite}
      aria-label={
        favorite
          ? `${destinationName} 즐겨찾기 해제`
          : `${destinationName} 즐겨찾기 추가`
      }
      onClick={() => toggleFavorite(destinationId)}
      className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill={favorite ? "#F2603C" : "none"}
        stroke={favorite ? "#F2603C" : "#1F2328"}
        strokeWidth={1.8}
        aria-hidden="true"
      >
        <path d="M12 21s-7.5-4.7-10-9.3C.4 8.2 2 4.5 5.6 4c2-.3 3.9.7 5 2.3C11.7 4.7 13.6 3.7 15.6 4c3.6.5 5.2 4.2 3.6 7.7C17.5 16.3 12 21 12 21z" />
      </svg>
    </button>
  );
}

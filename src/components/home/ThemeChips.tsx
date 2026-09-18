"use client";

export function ThemeChips({
  themes,
  selected,
  onSelect,
}: {
  themes: string[];
  selected: string | null;
  onSelect: (theme: string | null) => void;
}) {
  return (
    <div
      className="flex flex-wrap gap-2"
      role="group"
      aria-label="여행 테마 필터"
    >
      {themes.map((theme) => {
        const active = selected === theme;
        return (
          <button
            key={theme}
            type="button"
            aria-pressed={active}
            onClick={() => onSelect(active ? null : theme)}
            className={`rounded-full px-4 py-2 text-sm ${
              active
                ? "bg-[#F7F7F8] text-[#F2603C]"
                : "bg-[#F7F7F8] text-[#1F2328]"
            }`}
          >
            {theme}
          </button>
        );
      })}
    </div>
  );
}

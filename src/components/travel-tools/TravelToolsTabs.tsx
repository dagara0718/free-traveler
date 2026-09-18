"use client";

import { useState, type ReactNode } from "react";

export interface TravelToolsTab {
  id: string;
  label: string;
  panel: ReactNode;
}

export function TravelToolsTabs({ tabs }: { tabs: TravelToolsTab[] }) {
  const [activeId, setActiveId] = useState(tabs[0]?.id);

  return (
    <div>
      <div
        role="tablist"
        aria-label="여행 도구"
        className="flex gap-6 overflow-x-auto border-b border-[#E4E4E7]"
      >
        {tabs.map((tab) => {
          const active = tab.id === activeId;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setActiveId(tab.id)}
              className={`shrink-0 pb-3 text-base font-semibold ${
                active
                  ? "border-b-2 border-[#F2603C] text-[#F2603C]"
                  : "text-[#6B7280]"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {tabs.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          hidden={tab.id !== activeId}
          className="pt-6"
        >
          {tab.panel}
        </div>
      ))}
    </div>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_ITEMS = [
  { href: "/", label: "여행지" },
  { href: "/travel-tools", label: "여행 도구" },
  { href: "/mates", label: "동행" },
  { href: "/about", label: "대표 소개" },
];

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="border-b border-[#E4E4E7] bg-white">
      <div className="mx-auto flex h-14 max-w-[1280px] items-center justify-between px-4 md:h-[72px] md:px-8">
        <Link href="/" className="text-lg font-bold text-[#1F2328]">
          Free Traveler
        </Link>

        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="주요 내비게이션"
        >
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`pb-1 text-base ${
                  active
                    ? "border-b-2 border-[#F2603C] text-[#1F2328]"
                    : "text-[#1F2328]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <Link
            href="/account"
            className="flex h-11 items-center rounded-full bg-[#F2603C] px-6 text-base font-semibold text-white"
          >
            로그인
          </Link>
        </div>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center md:hidden"
          aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6"
            fill="none"
            stroke="#1F2328"
            strokeWidth={1.8}
            aria-hidden="true"
          >
            {menuOpen ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <nav
          className="flex flex-col gap-1 border-t border-[#E4E4E7] px-4 py-2 md:hidden"
          aria-label="모바일 내비게이션"
        >
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
                className={`rounded-md px-2 py-3 text-base ${
                  active ? "text-[#F2603C]" : "text-[#1F2328]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/account"
            onClick={() => setMenuOpen(false)}
            className="rounded-md px-2 py-3 text-base font-semibold text-[#F2603C]"
          >
            로그인
          </Link>
        </nav>
      )}
    </header>
  );
}

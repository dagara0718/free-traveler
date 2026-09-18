"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { AuthPanel, SignOutButton } from "@/components/account/AuthPanel";
import { ProfilePanel } from "@/components/account/ProfilePanel";
import { MyActivityPanel } from "@/components/account/MyActivityPanel";
import { AdminPanel } from "@/components/account/AdminPanel";

type Role =
  | { kind: "loading" }
  | { kind: "guest" }
  | { kind: "member"; userId: string; isAdmin: boolean };

const MEMBER_TABS = ["프로필", "내 활동"] as const;
const ADMIN_TAB = "관리자";

export default function AccountPage() {
  useEffect(() => {
    document.title = "계정 | Free Traveler";
  }, []);

  const [role, setRole] = useState<Role>({ kind: "loading" });
  const [activeTab, setActiveTab] = useState<string>(MEMBER_TABS[0]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      let supabase;
      try {
        supabase = createClient();
      } catch {
        if (!cancelled) setRole({ kind: "guest" });
        return;
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        if (!cancelled) setRole({ kind: "guest" });
        return;
      }

      const { data: profile } = await supabase
        .from("user_profile")
        .select("role")
        .eq("id", user.id)
        .single();

      if (cancelled) return;
      setRole({
        kind: "member",
        userId: user.id,
        isAdmin: profile?.role === "admin",
      });
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (role.kind === "loading") {
    return (
      <div className="mx-auto max-w-[1280px] px-4 py-12 md:px-8 md:py-20">
        <div className="h-64 animate-pulse rounded-[16px] bg-[#F7F7F8]" />
      </div>
    );
  }

  if (role.kind === "guest") {
    return (
      <div className="mx-auto flex max-w-[600px] flex-col gap-6 px-4 py-12 md:py-20">
        <div>
          <h1 className="text-[26px] font-bold text-[#1F2328]">계정</h1>
          <p className="mt-2 text-base text-[#42474F]">
            로그인하면 동행글 작성, 참가 신청 관리, 내 활동을 확인할 수
            있습니다.
          </p>
        </div>
        <AuthPanel />
      </div>
    );
  }

  const tabs = role.isAdmin ? [...MEMBER_TABS, ADMIN_TAB] : MEMBER_TABS;

  return (
    <div className="mx-auto flex max-w-[1280px] flex-col gap-8 px-4 py-12 md:flex-row md:gap-12 md:px-8 md:py-20">
      <nav className="flex gap-2 overflow-x-auto md:w-48 md:flex-col">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`shrink-0 rounded-full px-4 py-2 text-left text-sm font-semibold md:rounded-[12px] ${
              activeTab === tab
                ? "bg-[#F2603C] text-white"
                : "bg-[#F7F7F8] text-[#1F2328]"
            }`}
          >
            {tab}
          </button>
        ))}
        <SignOutButton />
      </nav>

      <div className="flex-1">
        {activeTab === "프로필" && <ProfilePanel userId={role.userId} />}
        {activeTab === "내 활동" && <MyActivityPanel userId={role.userId} />}
        {activeTab === ADMIN_TAB && role.isAdmin && <AdminPanel />}
      </div>
    </div>
  );
}

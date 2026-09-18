"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import {
  FilterBar,
  EMPTY_FILTERS,
  type MateFilters,
} from "@/components/mates/FilterBar";
import { MatePostList } from "@/components/mates/MatePostList";
import { MateDetailPanel } from "@/components/mates/MateDetailPanel";
import { ApplyForm } from "@/components/mates/ApplyForm";
import { ReportButton } from "@/components/mates/ReportButton";
import { BlockButton } from "@/components/mates/BlockButton";
import type { MatePostSummary } from "@/lib/server/mates";

type Row = MatePostSummary & { description: string; author_id: string };

function mapRow(row: {
  id: string;
  title: string;
  country_code: string;
  region: string;
  start_date: string;
  end_date: string;
  headcount: number;
  style: string | null;
  status: MatePostSummary["status"];
  created_at: string;
  description: string;
  author_id: string;
}): Row {
  return {
    id: row.id,
    title: row.title,
    countryCode: row.country_code,
    region: row.region,
    startDate: row.start_date,
    endDate: row.end_date,
    headcount: row.headcount,
    style: row.style,
    status: row.status,
    createdAt: row.created_at,
    description: row.description,
    author_id: row.author_id,
  };
}

export default function MatesPage() {
  useEffect(() => {
    document.title = "동행 찾기 | Free Traveler";
  }, []);

  const [filters, setFilters] = useState<MateFilters>(EMPTY_FILTERS);
  const [posts, setPosts] = useState<Row[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      let supabase;
      try {
        supabase = createClient();
      } catch {
        if (!cancelled) {
          setPosts([]);
          setError("동행 목록을 불러올 수 없습니다.");
        }
        return;
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!cancelled) setUserId(user?.id ?? null);

      let blockedAuthorIds: string[] = [];
      if (user) {
        const { data: blocks } = await supabase
          .from("user_block")
          .select("blocked_id")
          .eq("blocker_id", user.id);
        blockedAuthorIds = (blocks ?? []).map((row) => row.blocked_id);
      }

      let query = supabase
        .from("mate_post")
        .select(
          "id, title, country_code, region, start_date, end_date, headcount, style, status, created_at, description, author_id",
        )
        .order("created_at", { ascending: false });

      if (filters.countryCode)
        query = query.eq("country_code", filters.countryCode);
      if (filters.region) query = query.ilike("region", `%${filters.region}%`);
      if (filters.startDate) query = query.gte("end_date", filters.startDate);
      if (filters.endDate) query = query.lte("start_date", filters.endDate);
      if (filters.style) query = query.ilike("style", `%${filters.style}%`);
      if (filters.status) query = query.eq("status", filters.status);
      if (blockedAuthorIds.length > 0) {
        query = query.not("author_id", "in", `(${blockedAuthorIds.join(",")})`);
      }

      const { data, error: queryError } = await query;
      if (cancelled) return;

      if (queryError) {
        setError("동행 목록을 불러오지 못했습니다. 다시 시도해 주세요.");
        setPosts([]);
        return;
      }

      setError(null);
      setPosts((data ?? []).map(mapRow));
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [filters]);

  const selected: Row | null =
    posts?.find((post) => post.id === selectedId) ?? null;

  return (
    <div className="mx-auto flex max-w-[1280px] flex-col gap-12 px-4 py-12 md:px-8 md:py-20">
      <section className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-[26px] font-bold text-[#1F2328]">동행 찾기</h1>
          <p className="mt-2 text-base text-[#42474F]">
            조건에 맞는 동행글을 찾아보거나 새 동행글을 작성해 보세요.
          </p>
        </div>
        <Link
          href="/travel-tools"
          className="flex h-12 items-center rounded-full bg-[#F2603C] px-6 text-base font-semibold whitespace-nowrap text-white"
        >
          새 동행글 작성
        </Link>
      </section>

      <section>
        <FilterBar
          filters={filters}
          onChange={setFilters}
          resultCount={posts?.length ?? 0}
        />
      </section>

      {error && (
        <p role="alert" className="text-sm text-[#C1272D]">
          {error}
        </p>
      )}

      <section className="grid grid-cols-1 gap-8 md:grid-cols-[2fr_3fr]">
        {posts === null ? (
          <div className="h-64 animate-pulse rounded-[16px] bg-[#F7F7F8] md:col-span-2" />
        ) : (
          <>
            <MatePostList posts={posts} onSelect={setSelectedId} />
            <div className="flex flex-col gap-4">
              <MateDetailPanel
                post={selected}
                onClose={() => setSelectedId(null)}
              />
              {selected && userId && selected.author_id !== userId && (
                <div className="flex flex-col gap-4 rounded-[16px] border border-[#E4E4E7] p-6">
                  <ApplyForm postId={selected.id} />
                  <div className="flex gap-3">
                    <ReportButton
                      targetType="mate_post"
                      targetId={selected.id}
                    />
                    <BlockButton blockedUserId={selected.author_id} />
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </section>

      <section>
        <h2 className="text-[26px] font-bold text-[#1F2328]">참가 신청 방법</h2>
        <ol className="mt-4 flex flex-col gap-3">
          <li className="rounded-[12px] border border-[#E4E4E7] p-4 text-sm text-[#42474F]">
            ① 목록에서 관심 있는 동행글을 선택해 상세 내용을 확인하세요.
          </li>
          <li className="rounded-[12px] border border-[#E4E4E7] p-4 text-sm text-[#42474F]">
            ② 참가 메시지를 작성해 신청을 보내세요.
          </li>
          <li className="rounded-[12px] border border-[#E4E4E7] p-4 text-sm text-[#42474F]">
            ③ 작성자가 신청을 검토한 뒤 승인/거절 결과를 계정의 내 활동에서
            확인할 수 있습니다.
          </li>
        </ol>
      </section>

      <section className="rounded-[16px] bg-[#F7F7F8] p-8">
        <h2 className="text-[26px] font-bold text-[#1F2328]">안전 안내</h2>
        <p className="mt-2 text-base text-[#42474F]">
          공개 연락처(전화번호·메신저ID·이메일)를 게시글이나 메시지에 남기지
          마세요. 부적절한 사용자는 신고 또는 차단 기능으로 대응할 수 있습니다.
        </p>
        <Link
          href="/account"
          className="mt-4 inline-flex h-11 items-center rounded-full border border-[#E4E4E7] bg-white px-5 text-sm font-semibold text-[#1F2328]"
        >
          로그인 후 내 활동 관리하기
        </Link>
      </section>
    </div>
  );
}

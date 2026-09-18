"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { anonymizeAccount } from "@/lib/server/account";

interface MyPost {
  id: string;
  title: string;
  status: "recruiting" | "closing_soon" | "closed";
}

interface ReceivedRequest {
  id: string;
  post_id: string;
  message: string;
  status: "pending" | "approved" | "rejected";
  post_title: string;
}

interface BlockedUser {
  id: string;
  blocked_id: string;
  blocked_name: string;
}

function EmptyState({
  description,
  howTo,
  ctaHref,
  ctaLabel,
}: {
  description: string;
  howTo: string;
  ctaHref: string;
  ctaLabel: string;
}) {
  return (
    <div className="flex flex-col items-start gap-2 rounded-[12px] border border-[#E4E4E7] p-4">
      <p className="text-sm text-[#1F2328]">{description}</p>
      <p className="text-sm text-[#6B7280]">{howTo}</p>
      <a
        href={ctaHref}
        className="mt-1 rounded-full bg-[#F2603C] px-4 py-2 text-xs font-semibold text-white"
      >
        {ctaLabel}
      </a>
    </div>
  );
}

export function MyActivityPanel({ userId }: { userId: string }) {
  const router = useRouter();
  const [myPosts, setMyPosts] = useState<MyPost[] | null>(null);
  const [received, setReceived] = useState<ReceivedRequest[] | null>(null);
  const [blocked, setBlocked] = useState<BlockedUser[] | null>(null);
  const [deleteConfirming, setDeleteConfirming] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const supabase = createClient();

      const { data: posts } = await supabase
        .from("mate_post")
        .select("id, title, status")
        .eq("author_id", userId)
        .order("created_at", { ascending: false });
      if (!cancelled) setMyPosts(posts ?? []);

      const { data: applications } = await supabase
        .from("mate_application")
        .select(
          "id, post_id, message, status, mate_post!inner(title, author_id)",
        )
        .eq("mate_post.author_id", userId);
      if (!cancelled) {
        setReceived(
          (applications ?? []).map((row: unknown) => {
            const r = row as {
              id: string;
              post_id: string;
              message: string;
              status: ReceivedRequest["status"];
              mate_post: { title: string } | { title: string }[];
            };
            const post = Array.isArray(r.mate_post)
              ? r.mate_post[0]
              : r.mate_post;
            return {
              id: r.id,
              post_id: r.post_id,
              message: r.message,
              status: r.status,
              post_title: post?.title ?? "",
            };
          }),
        );
      }

      const { data: blocks } = await supabase
        .from("user_block")
        .select(
          "id, blocked_id, user_profile!user_block_blocked_id_fkey(display_name)",
        )
        .eq("blocker_id", userId);
      if (!cancelled) {
        setBlocked(
          (blocks ?? []).map((row: unknown) => {
            const r = row as {
              id: string;
              blocked_id: string;
              user_profile:
                { display_name: string } | { display_name: string }[];
            };
            const profile = Array.isArray(r.user_profile)
              ? r.user_profile[0]
              : r.user_profile;
            return {
              id: r.id,
              blocked_id: r.blocked_id,
              blocked_name: profile?.display_name ?? "알 수 없음",
            };
          }),
        );
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [userId]);

  async function closePost(postId: string) {
    const supabase = createClient();
    await supabase
      .from("mate_post")
      .update({ status: "closed" })
      .eq("id", postId);
    setMyPosts(
      (prev) =>
        prev?.map((post) =>
          post.id === postId ? { ...post, status: "closed" } : post,
        ) ?? null,
    );
  }

  async function respondToRequest(
    applicationId: string,
    status: "approved" | "rejected",
  ) {
    const response = await fetch(`/api/applications/${applicationId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (response.ok) {
      setReceived(
        (prev) =>
          prev?.map((req) =>
            req.id === applicationId ? { ...req, status } : req,
          ) ?? null,
      );
    }
  }

  async function unblock(blockedId: string) {
    const response = await fetch("/api/blocks", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ blockedId }),
    });
    if (response.ok) {
      setBlocked(
        (prev) => prev?.filter((b) => b.blocked_id !== blockedId) ?? null,
      );
    }
  }

  async function handleDeleteAccount() {
    setDeleteError(null);
    try {
      await anonymizeAccount();
      router.push("/");
      router.refresh();
    } catch {
      setDeleteError("탈퇴 처리에 실패했습니다.");
    }
  }

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h3 className="text-base font-semibold text-[#1F2328]">내 글</h3>
        <div className="mt-3 flex flex-col gap-3">
          {myPosts === null ? (
            <div className="h-24 animate-pulse rounded-[12px] bg-[#F7F7F8]" />
          ) : myPosts.length === 0 ? (
            <EmptyState
              description="아직 작성한 동행글이 없습니다."
              howTo="여행 도구의 동행 구하기 탭에서 새 글을 작성할 수 있습니다."
              ctaHref="/travel-tools"
              ctaLabel="새 동행글 작성"
            />
          ) : (
            myPosts.map((post) => (
              <div
                key={post.id}
                className="flex items-center justify-between rounded-[12px] border border-[#E4E4E7] p-4"
              >
                <div>
                  <p className="text-sm font-semibold text-[#1F2328]">
                    {post.title}
                  </p>
                  <p className="text-xs text-[#6B7280]">{post.status}</p>
                </div>
                {post.status !== "closed" && (
                  <button
                    type="button"
                    onClick={() => closePost(post.id)}
                    className="rounded-full border border-[#E4E4E7] px-3 py-1 text-xs"
                  >
                    마감하기
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      <div>
        <h3 className="text-base font-semibold text-[#1F2328]">받은 요청</h3>
        <div className="mt-3 flex flex-col gap-3">
          {received === null ? (
            <div className="h-24 animate-pulse rounded-[12px] bg-[#F7F7F8]" />
          ) : received.length === 0 ? (
            <EmptyState
              description="아직 받은 참가 요청이 없습니다."
              howTo="동행글을 작성하면 여기에서 받은 요청을 확인할 수 있습니다."
              ctaHref="/travel-tools"
              ctaLabel="새 동행글 작성"
            />
          ) : (
            received.map((req) => (
              <div
                key={req.id}
                className="flex flex-col gap-2 rounded-[12px] border border-[#E4E4E7] p-4"
              >
                <p className="text-sm font-semibold text-[#1F2328]">
                  {req.post_title}
                </p>
                <p className="text-sm text-[#42474F]">{req.message}</p>
                <p className="text-xs text-[#6B7280]">{req.status}</p>
                {req.status === "pending" && (
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => respondToRequest(req.id, "approved")}
                      className="rounded-full bg-[#1E8E5A] px-3 py-1 text-xs font-semibold text-white"
                    >
                      승인
                    </button>
                    <button
                      type="button"
                      onClick={() => respondToRequest(req.id, "rejected")}
                      className="rounded-full border border-[#E4E4E7] px-3 py-1 text-xs"
                    >
                      거절
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      <div>
        <h3 className="text-base font-semibold text-[#1F2328]">차단 목록</h3>
        <div className="mt-3 flex flex-col gap-3">
          {blocked === null ? (
            <div className="h-24 animate-pulse rounded-[12px] bg-[#F7F7F8]" />
          ) : blocked.length === 0 ? (
            <EmptyState
              description="차단한 사용자가 없습니다."
              howTo="동행글 상세에서 부적절한 사용자를 차단할 수 있습니다."
              ctaHref="/mates"
              ctaLabel="동행 목록 보기"
            />
          ) : (
            blocked.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between rounded-[12px] border border-[#E4E4E7] p-4"
              >
                <p className="text-sm text-[#1F2328]">{user.blocked_name}</p>
                <button
                  type="button"
                  onClick={() => unblock(user.blocked_id)}
                  className="rounded-full border border-[#E4E4E7] px-3 py-1 text-xs"
                >
                  차단 해제
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="rounded-[16px] border border-[#E4E4E7] p-6">
        <h3 className="text-base font-semibold text-[#1F2328]">계정 탈퇴</h3>
        <p className="mt-2 text-sm text-[#42474F]">
          탈퇴하면 프로필이 즉시 비식별화되며 되돌릴 수 없습니다.
        </p>
        {deleteError && (
          <p role="alert" className="mt-2 text-sm text-[#C1272D]">
            {deleteError}
          </p>
        )}
        {deleteConfirming ? (
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={handleDeleteAccount}
              className="rounded-full bg-[#C1272D] px-4 py-2 text-sm font-semibold text-white"
            >
              탈퇴 확정
            </button>
            <button
              type="button"
              onClick={() => setDeleteConfirming(false)}
              className="rounded-full border border-[#E4E4E7] px-4 py-2 text-sm"
            >
              취소
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setDeleteConfirming(true)}
            className="mt-3 rounded-full border border-[#C1272D] px-4 py-2 text-sm font-semibold text-[#C1272D]"
          >
            계정 탈퇴
          </button>
        )}
      </div>
    </div>
  );
}

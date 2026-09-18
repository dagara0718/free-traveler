"use server";

import { requireUser } from "@/lib/server/auth";
import { createClient } from "@/lib/supabase/server";

export async function anonymizeAccount() {
  const user = await requireUser();
  const supabase = await createClient();

  const { error } = await supabase
    .from("user_profile")
    .update({
      display_name: "탈퇴한 사용자",
      is_adult: false,
      is_adult_confirmed_at: null,
    })
    .eq("id", user.id);

  if (error) {
    throw new Error(`탈퇴 처리 실패: ${error.message}`);
  }

  await supabase.auth.signOut();
}

export async function exportUserData() {
  const user = await requireUser();
  const userId = user.id;
  const supabase = await createClient();

  const [profile, posts, applications, blocks] = await Promise.all([
    supabase.from("user_profile").select("*").eq("id", userId).single(),
    supabase.from("mate_post").select("*").eq("author_id", userId),
    supabase.from("mate_application").select("*").eq("applicant_id", userId),
    supabase.from("user_block").select("*").eq("blocker_id", userId),
  ]);

  return {
    exportedAt: new Date().toISOString(),
    profile: profile.data ?? null,
    matePosts: posts.data ?? [],
    mateApplications: applications.data ?? [],
    blocks: blocks.data ?? [],
  };
}

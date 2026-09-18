import { describe, it, expect, beforeAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Supabase RLS 통합 테스트. 실제 Supabase 프로젝트(로컬 `supabase start` 또는
 * 원격 프로젝트)와 `supabase/seed.sql` 시드 데이터가 필요하다. 관련 환경변수가
 * 없으면 전체를 skip한다 — Vitest 단위 테스트만으로는 RLS를 검증할 수 없으므로
 * 이 파일은 CI에서 Supabase 시크릿이 설정된 경우에만 실질적으로 실행된다.
 */

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const hasSupabaseEnv = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

const MEMBER_EMAIL = "seed-member@example.com";
const MEMBER_PASSWORD = "seed-password-1";
const APPLICANT_EMAIL = "seed-applicant@example.com";
const APPLICANT_PASSWORD = "seed-password-2";
const ADMIN_EMAIL = "seed-admin@example.com";
const ADMIN_PASSWORD = "seed-password-3";

const SEED_POST_ID = "10000000-0000-0000-0000-000000000001";
const SEED_APPLICATION_ID = "20000000-0000-0000-0000-000000000001";

async function signInClient(
  email: string,
  password: string,
): Promise<SupabaseClient> {
  const client = createClient(SUPABASE_URL!, SUPABASE_ANON_KEY!);
  const { error } = await client.auth.signInWithPassword({ email, password });
  if (error) {
    throw new Error(`시드 계정 로그인 실패(${email}): ${error.message}`);
  }
  return client;
}

describe.skipIf(!hasSupabaseEnv)(
  "Supabase RLS — user_profile/mate_post/mate_application",
  () => {
    let anonClient: SupabaseClient;
    let memberClient: SupabaseClient;
    let applicantClient: SupabaseClient;
    let adminClient: SupabaseClient;

    beforeAll(async () => {
      anonClient = createClient(SUPABASE_URL!, SUPABASE_ANON_KEY!);
      memberClient = await signInClient(MEMBER_EMAIL, MEMBER_PASSWORD);
      applicantClient = await signInClient(APPLICANT_EMAIL, APPLICANT_PASSWORD);
      adminClient = await signInClient(ADMIN_EMAIL, ADMIN_PASSWORD);
    });

    it("Guest: mate_post 목록은 공개 열람 가능", async () => {
      const { data, error } = await anonClient
        .from("mate_post")
        .select("id")
        .eq("id", SEED_POST_ID);
      expect(error).toBeNull();
      expect(data).toHaveLength(1);
    });

    it("Guest: mate_application은 비로그인 상태에서 열람 불가(빈 결과)", async () => {
      const { data, error } = await anonClient
        .from("mate_application")
        .select("id")
        .eq("id", SEED_APPLICATION_ID);
      expect(error).toBeNull();
      expect(data ?? []).toHaveLength(0);
    });

    it("작성자: 본인 mate_post에 대한 mate_application 열람 가능", async () => {
      const { data, error } = await memberClient
        .from("mate_application")
        .select("id")
        .eq("id", SEED_APPLICATION_ID);
      expect(error).toBeNull();
      expect(data).toHaveLength(1);
    });

    it("신청자 본인: 자신의 mate_application 열람 가능", async () => {
      const { data, error } = await applicantClient
        .from("mate_application")
        .select("id")
        .eq("id", SEED_APPLICATION_ID);
      expect(error).toBeNull();
      expect(data).toHaveLength(1);
    });

    it("무관한 Member: 타인의 user_block 목록 열람 불가(빈 결과)", async () => {
      const { data, error } = await applicantClient
        .from("user_block")
        .select("id")
        .eq("blocker_id", MEMBER_EMAIL);
      expect(error).toBeNull();
      expect(data ?? []).toHaveLength(0);
    });

    it("Member: admin_setting 수정 시도는 거부됨(0행 갱신)", async () => {
      const { data, error } = await memberClient
        .from("admin_setting")
        .update({ value: { template: "https://example.com" } })
        .eq("key", "outbound_flight_url_template")
        .select();
      expect(error).toBeNull();
      expect(data ?? []).toHaveLength(0);
    });

    it("Admin: admin_setting 수정 가능", async () => {
      const { data, error } = await adminClient
        .from("admin_setting")
        .update({
          value: { template: "https://www.google.com/travel/flights" },
        })
        .eq("key", "outbound_flight_url_template")
        .select();
      expect(error).toBeNull();
      expect(data ?? []).toHaveLength(1);
    });

    it("Admin: report 목록 열람 가능(Moderator/Admin 전용)", async () => {
      const { data, error } = await adminClient.from("report").select("id");
      expect(error).toBeNull();
      expect((data ?? []).length).toBeGreaterThan(0);
    });

    it("신고자가 아닌 Member: 타인이 접수한 report 열람 불가(빈 결과)", async () => {
      const { data, error } = await memberClient.from("report").select("id");
      expect(error).toBeNull();
      expect(data ?? []).toHaveLength(0);
    });
  },
);

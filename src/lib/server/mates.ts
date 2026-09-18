import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

export const createMatePostSchema = z
  .object({
    title: z.string().min(1).max(120),
    countryCode: z.string().length(2),
    region: z.string().min(1).max(80),
    startDate: z.string().date(),
    endDate: z.string().date(),
    headcount: z.number().int().min(1).max(20),
    style: z.string().max(80).optional(),
    description: z.string().min(1).max(2000),
    safetyAck: z.literal(true),
  })
  .refine((value) => value.endDate >= value.startDate, {
    message: "종료일은 시작일 이후여야 합니다.",
    path: ["endDate"],
  });

export type CreateMatePostInput = z.infer<typeof createMatePostSchema>;

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX_POSTS = 3;

export class RateLimitError extends Error {
  constructor(
    message = "너무 많은 글을 작성했습니다. 잠시 후 다시 시도해 주세요.",
  ) {
    super(message);
    this.name = "RateLimitError";
  }
}

export async function createMatePost(
  authorId: string,
  input: CreateMatePostInput,
) {
  const supabase = await createClient();

  const windowStart = new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString();
  const { count, error: countError } = await supabase
    .from("mate_post")
    .select("id", { count: "exact", head: true })
    .eq("author_id", authorId)
    .gte("created_at", windowStart);

  if (countError) {
    throw new Error(`동행글 생성 사전 확인 실패: ${countError.message}`);
  }
  if ((count ?? 0) >= RATE_LIMIT_MAX_POSTS) {
    throw new RateLimitError();
  }

  const { data, error } = await supabase
    .from("mate_post")
    .insert({
      author_id: authorId,
      title: input.title,
      country_code: input.countryCode,
      region: input.region,
      start_date: input.startDate,
      end_date: input.endDate,
      headcount: input.headcount,
      style: input.style ?? null,
      description: input.description,
      safety_ack: input.safetyAck,
    })
    .select("id")
    .single();

  if (error) {
    throw new Error(`동행글 생성 실패: ${error.message}`);
  }

  return data;
}

export interface MatePostSummary {
  id: string;
  title: string;
  countryCode: string;
  region: string;
  startDate: string;
  endDate: string;
  headcount: number;
  style: string | null;
  status: "recruiting" | "closing_soon" | "closed";
  createdAt: string;
}

export async function getRecentRecruitingMates(
  limit = 3,
): Promise<MatePostSummary[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("mate_post")
    .select(
      "id, title, country_code, region, start_date, end_date, headcount, style, status, created_at",
    )
    .eq("status", "recruiting")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    throw new Error(`동행글 목록 조회 실패: ${error.message}`);
  }

  return (data ?? []).map((row) => ({
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
  }));
}

export interface MateListFilters {
  countryCode?: string;
  startDate?: string;
  endDate?: string;
  currentUserId?: string;
}

export async function listMates(
  filters: MateListFilters = {},
): Promise<MatePostSummary[]> {
  const supabase = await createClient();

  let blockedAuthorIds: string[] = [];
  if (filters.currentUserId) {
    const { data: blocks } = await supabase
      .from("user_block")
      .select("blocked_id")
      .eq("blocker_id", filters.currentUserId);
    blockedAuthorIds = (blocks ?? []).map((row) => row.blocked_id);
  }

  let query = supabase
    .from("mate_post")
    .select(
      "id, title, country_code, region, start_date, end_date, headcount, style, status, created_at",
    )
    .order("created_at", { ascending: false });

  if (filters.countryCode) {
    query = query.eq("country_code", filters.countryCode);
  }
  if (filters.startDate) {
    query = query.gte("end_date", filters.startDate);
  }
  if (filters.endDate) {
    query = query.lte("start_date", filters.endDate);
  }
  if (blockedAuthorIds.length > 0) {
    query = query.not("author_id", "in", `(${blockedAuthorIds.join(",")})`);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(`동행글 목록 조회 실패: ${error.message}`);
  }

  return (data ?? []).map((row) => ({
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
  }));
}

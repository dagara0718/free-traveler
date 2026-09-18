import { z } from "zod";
import {
  requireUser,
  unauthorizedResponse,
  UnauthorizedError,
} from "@/lib/server/auth";
import { createClient } from "@/lib/supabase/server";

const createReportSchema = z.object({
  targetType: z.enum(["mate_post", "mate_application", "user_profile"]),
  targetId: z.string().uuid(),
  reason: z.string().min(1).max(500),
});

export async function POST(request: Request) {
  let user;
  try {
    user = await requireUser();
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return unauthorizedResponse();
    }
    throw error;
  }

  const body = await request.json();
  const parsed = createReportSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: "입력값이 올바르지 않습니다.", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("report")
    .insert({
      reporter_id: user.id,
      target_type: parsed.data.targetType,
      target_id: parsed.data.targetId,
      reason: parsed.data.reason,
    })
    .select("id, status, created_at")
    .single();

  if (error) {
    return Response.json(
      { error: `신고 접수 실패: ${error.message}` },
      { status: 400 },
    );
  }

  return Response.json(data, { status: 201 });
}

export async function GET(request: Request) {
  let user;
  try {
    user = await requireUser();
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return unauthorizedResponse();
    }
    throw error;
  }

  const supabase = await createClient();
  const { data: profile } = await supabase
    .from("user_profile")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "moderator" && profile?.role !== "admin") {
    return Response.json(
      { error: "신고 목록은 관리자만 조회할 수 있습니다." },
      { status: 403 },
    );
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");

  let query = supabase
    .from("report")
    .select("id, target_type, target_id, reason, status, created_at")
    .order("created_at", { ascending: false });

  if (status) {
    query = query.eq("status", status);
  }

  const { data, error } = await query;

  if (error) {
    return Response.json(
      { error: `신고 목록 조회 실패: ${error.message}` },
      { status: 400 },
    );
  }

  return Response.json({ reports: data ?? [] }, { status: 200 });
}

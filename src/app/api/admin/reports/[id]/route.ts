import { z } from "zod";
import {
  requireUser,
  unauthorizedResponse,
  UnauthorizedError,
} from "@/lib/server/auth";
import { createClient } from "@/lib/supabase/server";

const updateReportSchema = z.object({
  status: z.enum(["open", "reviewing", "resolved"]),
});

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
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
      { error: "신고 상태 변경은 관리자만 할 수 있습니다." },
      { status: 403 },
    );
  }

  const { id } = await params;
  const body = await request.json();
  const parsed = updateReportSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: "입력값이 올바르지 않습니다.", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const { data, error } = await supabase
    .from("report")
    .update({ status: parsed.data.status })
    .eq("id", id)
    .select("id, status")
    .single();

  if (error) {
    return Response.json(
      { error: `상태 변경 실패: ${error.message}` },
      { status: 400 },
    );
  }

  return Response.json(data, { status: 200 });
}

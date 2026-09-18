import { z } from "zod";
import {
  requireUser,
  unauthorizedResponse,
  UnauthorizedError,
} from "@/lib/server/auth";
import { createClient } from "@/lib/supabase/server";

const updateApplicationSchema = z.object({
  status: z.enum(["approved", "rejected"]),
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

  const { id } = await params;
  const body = await request.json();
  const parsed = updateApplicationSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: "입력값이 올바르지 않습니다.", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const supabase = await createClient();

  const { data: application, error: fetchError } = await supabase
    .from("mate_application")
    .select("id, post_id, mate_post!inner(author_id)")
    .eq("id", id)
    .single();

  if (fetchError || !application) {
    return Response.json(
      { error: "참가 요청을 찾을 수 없습니다." },
      { status: 404 },
    );
  }

  const { data: profile } = await supabase
    .from("user_profile")
    .select("role")
    .eq("id", user.id)
    .single();

  const post = Array.isArray(application.mate_post)
    ? application.mate_post[0]
    : application.mate_post;
  const isAuthor = post?.author_id === user.id;
  const isStaff = profile?.role === "moderator" || profile?.role === "admin";

  if (!isAuthor && !isStaff) {
    return Response.json(
      { error: "이 참가 요청의 상태를 변경할 권한이 없습니다." },
      { status: 403 },
    );
  }

  const { data, error } = await supabase
    .from("mate_application")
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

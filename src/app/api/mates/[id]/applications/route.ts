import { z } from "zod";
import {
  requireUser,
  unauthorizedResponse,
  UnauthorizedError,
} from "@/lib/server/auth";
import { createClient } from "@/lib/supabase/server";

const createApplicationSchema = z.object({
  message: z.string().min(1).max(500),
});

export async function POST(
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

  const { id: postId } = await params;
  const body = await request.json();
  const parsed = createApplicationSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: "입력값이 올바르지 않습니다.", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("mate_application")
    .insert({
      post_id: postId,
      applicant_id: user.id,
      message: parsed.data.message,
    })
    .select("id, status, created_at")
    .single();

  if (error) {
    if (error.code === "23505") {
      return Response.json(
        { error: "이미 참가 신청을 보냈습니다." },
        { status: 409 },
      );
    }
    return Response.json(
      { error: `참가 신청 실패: ${error.message}` },
      { status: 400 },
    );
  }

  return Response.json(data, { status: 201 });
}

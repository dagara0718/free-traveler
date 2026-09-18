import { NextRequest } from "next/server";
import {
  requireUser,
  unauthorizedResponse,
  UnauthorizedError,
} from "@/lib/server/auth";
import {
  createMatePost,
  createMatePostSchema,
  RateLimitError,
} from "@/lib/server/mates";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
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
    .select("is_adult")
    .eq("id", user.id)
    .single();

  if (!profile?.is_adult) {
    return Response.json(
      { error: "성인 인증이 완료된 회원만 동행글을 작성할 수 있습니다." },
      { status: 403 },
    );
  }

  const body = await request.json();
  const parsed = createMatePostSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: "입력값이 올바르지 않습니다.", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  try {
    const post = await createMatePost(user.id, parsed.data);
    return Response.json({ id: post.id }, { status: 201 });
  } catch (error) {
    if (error instanceof RateLimitError) {
      return Response.json({ error: error.message }, { status: 429 });
    }
    throw error;
  }
}

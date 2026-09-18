import { z } from "zod";
import {
  requireUser,
  unauthorizedResponse,
  UnauthorizedError,
} from "@/lib/server/auth";
import { createClient } from "@/lib/supabase/server";

const blockSchema = z.object({
  blockedId: z.string().uuid(),
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
  const parsed = blockSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: "입력값이 올바르지 않습니다.", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  if (parsed.data.blockedId === user.id) {
    return Response.json(
      { error: "본인을 차단할 수 없습니다." },
      { status: 400 },
    );
  }

  const supabase = await createClient();
  const { error } = await supabase.from("user_block").insert({
    blocker_id: user.id,
    blocked_id: parsed.data.blockedId,
  });

  if (error && error.code !== "23505") {
    return Response.json(
      { error: `차단 실패: ${error.message}` },
      { status: 400 },
    );
  }

  return Response.json({ blockedId: parsed.data.blockedId }, { status: 201 });
}

export async function DELETE(request: Request) {
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
  const parsed = blockSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: "입력값이 올바르지 않습니다.", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("user_block")
    .delete()
    .eq("blocker_id", user.id)
    .eq("blocked_id", parsed.data.blockedId);

  if (error) {
    return Response.json(
      { error: `차단 해제 실패: ${error.message}` },
      { status: 400 },
    );
  }

  return Response.json({ blockedId: parsed.data.blockedId }, { status: 200 });
}

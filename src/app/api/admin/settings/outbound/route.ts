import { z } from "zod";
import {
  requireUser,
  unauthorizedResponse,
  UnauthorizedError,
} from "@/lib/server/auth";
import { createClient } from "@/lib/supabase/server";

const ALLOWED_KEYS = [
  "outbound_flight_url_template",
  "outbound_hotel_url_template",
] as const;

const updateOutboundSchema = z.object({
  key: z.enum(ALLOWED_KEYS),
  url: z
    .string()
    .url()
    .refine((value) => value.startsWith("https://"), {
      message: "HTTPS URL만 저장할 수 있습니다.",
    })
    .refine((value) => !/^(javascript|data):/i.test(value), {
      message: "허용되지 않는 URL 스킴입니다.",
    }),
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

  const supabase = await createClient();
  const { data: profile } = await supabase
    .from("user_profile")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    return Response.json(
      { error: "외부 URL 설정은 관리자만 변경할 수 있습니다." },
      { status: 403 },
    );
  }

  const body = await request.json();
  const parsed = updateOutboundSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: "입력값이 올바르지 않습니다.", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const { error } = await supabase.from("admin_setting").upsert({
    key: parsed.data.key,
    value: { template: parsed.data.url },
    updated_by: user.id,
  });

  if (error) {
    return Response.json(
      { error: `저장 실패: ${error.message}` },
      { status: 400 },
    );
  }

  return Response.json(
    { key: parsed.data.key, url: parsed.data.url },
    { status: 200 },
  );
}

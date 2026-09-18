import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

async function createAuthClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        },
      },
    },
  );
}

export async function getSessionUser() {
  const supabase = await createAuthClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export class UnauthorizedError extends Error {
  constructor(message = "인증이 필요합니다.") {
    super(message);
    this.name = "UnauthorizedError";
  }
}

export async function requireUser() {
  const user = await getSessionUser();
  if (!user) {
    throw new UnauthorizedError();
  }
  return user;
}

export function unauthorizedResponse(message = "인증이 필요합니다.") {
  return Response.json({ error: message }, { status: 401 });
}

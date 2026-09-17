// release:check가 호출하는 조건부 E2E 실행기.
// 실 Supabase Secret이 없는 환경(CI 등)에서는 로그인 없이 가능한 공개 Smoke만 돌린다.
import { execSync } from "node:child_process";

const hasSupabaseSecrets = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

const npmScript = hasSupabaseSecrets ? "test:e2e" : "test:e2e:public";
console.log(
  `[release:check] Supabase secrets ${hasSupabaseSecrets ? "present" : "absent"} -> npm run ${npmScript}`,
);

execSync(`npm run ${npmScript}`, { stdio: "inherit" });

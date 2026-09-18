"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Mode = "sign-in" | "sign-up" | "reset";

export function AuthPanel() {
  const [mode, setMode] = useState<Mode>("sign-in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit() {
    setError(null);
    setMessage(null);

    let supabase;
    try {
      supabase = createClient();
    } catch {
      setError(
        "로그인 서비스를 사용할 수 없습니다. 잠시 후 다시 시도해 주세요.",
      );
      return;
    }

    setPending(true);
    try {
      if (mode === "sign-in") {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) {
          setError("이메일 또는 비밀번호가 올바르지 않습니다.");
          return;
        }
      } else if (mode === "sign-up") {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });
        if (signUpError) {
          setError(signUpError.message);
          return;
        }
        setMessage("가입 확인 이메일을 보냈습니다. 메일함을 확인해 주세요.");
      } else {
        const { error: resetError } =
          await supabase.auth.resetPasswordForEmail(email);
        if (resetError) {
          setError(resetError.message);
          return;
        }
        setMessage("비밀번호 재설정 이메일을 보냈습니다.");
      }
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="flex flex-col gap-4 rounded-[16px] border border-[#E4E4E7] p-6">
      <div className="flex gap-2">
        {(
          [
            { id: "sign-in", label: "로그인" },
            { id: "sign-up", label: "회원가입" },
            { id: "reset", label: "비밀번호 재설정" },
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setMode(tab.id)}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              mode === tab.id
                ? "bg-[#F2603C] text-white"
                : "bg-[#F7F7F8] text-[#1F2328]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <label className="flex flex-col gap-1 text-sm text-[#1F2328]">
        이메일
        <input
          type="email"
          className="h-[52px] rounded-[8px] border border-[#E4E4E7] px-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>

      {mode !== "reset" && (
        <label className="flex flex-col gap-1 text-sm text-[#1F2328]">
          비밀번호
          <input
            type="password"
            autoComplete={
              mode === "sign-up" ? "new-password" : "current-password"
            }
            className="h-[52px] rounded-[8px] border border-[#E4E4E7] px-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
      )}

      {error && (
        <p role="alert" className="text-sm text-[#C1272D]">
          {error}
        </p>
      )}
      {message && (
        <p role="status" className="text-sm text-[#1E8E5A]">
          {message}
        </p>
      )}

      <button
        type="button"
        disabled={pending}
        onClick={handleSubmit}
        className="flex h-12 w-fit items-center rounded-full bg-[#F2603C] px-6 text-base font-semibold text-white disabled:opacity-50"
      >
        {mode === "sign-in"
          ? "로그인"
          : mode === "sign-up"
            ? "회원가입"
            : "재설정 메일 보내기"}
      </button>

      <p className="text-sm text-[#6B7280]">
        미인증 계정은 동행글 작성 권한이 없습니다. 가입 확인 메일의 링크를 눌러
        인증을 완료해 주세요.
      </p>
    </div>
  );
}

export function SignOutButton() {
  async function handleSignOut() {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      window.location.reload();
    } catch {
      // Supabase 미설정 등으로 클라이언트 생성이 실패하면 조용히 무시한다.
    }
  }

  return (
    <button
      type="button"
      onClick={handleSignOut}
      className="flex h-11 items-center rounded-full border border-[#E4E4E7] px-5 text-sm font-semibold text-[#1F2328]"
    >
      로그아웃
    </button>
  );
}

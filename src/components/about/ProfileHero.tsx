import { profile } from "@/data/profile";

export function ProfileHero() {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-center">
      <div className="flex-1">
        <h1 className="text-[32px] leading-tight font-bold text-[#1F2328]">
          {profile.displayName}
        </h1>
        <div className="mt-6 flex flex-col gap-4">
          {profile.intro.map((paragraph) => (
            <p key={paragraph} className="text-base text-[#42474F]">
              {paragraph}
            </p>
          ))}
        </div>
        <p className="mt-6 text-base text-[#1F2328] italic">
          {profile.philosophy}
        </p>
      </div>
    </div>
  );
}

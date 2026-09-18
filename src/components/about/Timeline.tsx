import { profile } from "@/data/profile";

export function Timeline() {
  return (
    <ol className="flex flex-col gap-6 border-l border-[#E4E4E7] pl-6">
      {profile.timeline.map((item) => (
        <li key={`${item.year}-${item.place}`} className="relative">
          <span className="absolute top-1.5 -left-[29px] h-2.5 w-2.5 rounded-full bg-[#F2603C]" />
          <p className="text-sm font-semibold text-[#F2603C]">{item.year}</p>
          <p className="mt-1 text-base font-semibold text-[#1F2328]">
            {item.place}
          </p>
          <p className="mt-1 text-sm text-[#42474F]">{item.summary}</p>
        </li>
      ))}
    </ol>
  );
}

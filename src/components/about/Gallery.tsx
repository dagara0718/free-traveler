import { profile } from "@/data/profile";

export function Gallery() {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {profile.gallery.map((image) => (
        <div
          key={image.url}
          className="aspect-square overflow-hidden rounded-[16px] border border-[#E4E4E7] bg-[#F7F7F8]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image.url}
            alt={image.alt}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
}

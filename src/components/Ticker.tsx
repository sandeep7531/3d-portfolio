import { tickerTags } from "@/data/resume";

export default function Ticker() {
  const items = [...tickerTags, ...tickerTags];

  return (
    <div className="border-y border-neutral-800 bg-neutral-900 overflow-hidden">
      <div className="flex whitespace-nowrap py-3 marquee-track w-max">
        {items.map((tag, i) => (
          <span
            key={i}
            className="font-mono text-[11px] tracking-[0.2em] text-neutral-400 mx-6 flex items-center gap-6"
          >
            {tag}
            <span className="text-emerald-400">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
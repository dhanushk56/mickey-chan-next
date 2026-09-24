import Link from "next/link";
import { getVideos } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function Home() {
  const latest = (await getVideos()).slice(0, 3);

  return (
    <>
      <section className="hero-section px-6 md:px-16 py-24 md:py-36">
        <div className="hero-content max-w-6xl mx-auto">
          <div className="max-w-3xl">
            <div className="eyebrow inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] px-4 py-2 rounded-full mb-7">
              <span className="eyebrow-dot" /> GAMER · STREAMER · STORYTELLER
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-extrabold leading-[0.98] tracking-[-0.04em] mb-7">
              Play boldly.
              <br />
              <span className="gradient-text">Tell better stories.</span>
            </h1>
            <p className="text-black/65 text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
              Welcome to Mickey Chan&apos;s world of games, streams, and stories. Find your next favorite moment and join the community.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/videos" className="btn-primary">Explore videos <span aria-hidden="true">↗</span></Link>
              <Link href="/join" className="btn-secondary">Join the community</Link>
            </div>
          </div>
        </div>
      </section>
      {latest.length > 0 && <section className="max-w-6xl mx-auto px-6 md:px-16 py-20 border-t border-black/10"><div className="flex items-end justify-between mb-10"><div><p className="section-kicker">The latest</p><h2 className="font-display text-3xl md:text-4xl font-bold mt-2">Fresh from the channel</h2></div><Link href="/videos" className="hidden sm:block link-arrow">View all <span>↗</span></Link></div><div className="grid grid-cols-1 md:grid-cols-3 gap-6">{latest.map((v) => <article key={v.slug} className="glass-card rounded-2xl overflow-hidden"><div className="video-placeholder" style={{ backgroundImage: v.thumbnail ? `url(${v.thumbnail})` : undefined }}>[VIDEO THUMBNAIL]</div><div className="p-5"><h3 className="font-semibold mb-2">{v.title}</h3><p className="text-sm text-black/45">{v.views} · {v.date}</p></div></article>)}</div></section>}
    </>
  );
}

import Link from "next/link";
import { videos } from "@/data/videos";
import { positions } from "@/data/positions";

export default function Home() {
  const latest = videos.slice(0, 3);

  return (
    <>
      <section className="hero-section px-6 md:px-16 py-24 md:py-36">
        <div className="hero-content max-w-6xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-14 items-center">
          <div>
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
              <Link href="/videos" className="btn-primary">
                Explore videos <span aria-hidden="true">↗</span>
              </Link>
              <a href="#positions" className="btn-secondary">
                Meet the team
              </a>
            </div>
          </div>

          <div className="hero-art" aria-hidden="true">
            <div className="hero-orbit hero-orbit-one" />
            <div className="hero-orbit hero-orbit-two" />
            <div className="hero-art-card hero-art-card-main">
              <span className="hero-art-label">M.C.</span>
              <span className="hero-art-caption">CREATE<br />WITHOUT LIMITS</span>
            </div>
            <div className="hero-art-card hero-art-card-small">LIVE<br /><span>NOW</span></div>
          </div>
        </div>
      </section>

      {latest.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 md:px-16 py-20 border-t border-black/10">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="section-kicker">The latest</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold mt-2">Fresh from the channel</h2>
            </div>
            <Link href="/videos" className="hidden sm:block link-arrow">View all <span>↗</span></Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latest.map((v) => (
              <article key={v.slug} className="glass-card rounded-2xl overflow-hidden">
                <div className="video-placeholder">[VIDEO THUMBNAIL]</div>
                <div className="p-5">
                  <h3 className="font-semibold mb-2">{v.title}</h3>
                  <p className="text-sm text-black/45">{v.views} · {v.date}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      <section id="positions" className="max-w-6xl mx-auto px-6 md:px-16 py-20 border-t border-black/10">
        <div className="max-w-2xl mb-10">
          <p className="section-kicker">Work with us</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-2 mb-4">Good ideas need good people.</h2>
          <p className="text-black/60 leading-relaxed">We&apos;re building a small, ambitious team around the channel. Bring your craft, curiosity, and point of view.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {positions.map((p) => (
            <article key={p.title} className="glass-card rounded-2xl p-6">
              <div className="text-xs font-bold text-pink-700 mb-4 uppercase tracking-[0.16em]">{p.type}</div>
              <h3 className="font-display text-xl font-bold mb-3">{p.title}</h3>
              <p className="text-sm text-black/55 leading-relaxed">{p.description}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

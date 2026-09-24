import Link from "next/link";
import { videos } from "@/data/videos";
import { positions } from "@/data/positions";

export default function Home() {
  const latest = videos.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="px-6 md:px-16 py-24 md:py-32 text-center">
        <div className="badge inline-flex items-center gap-2 text-xs font-semibold tracking-wide px-4 py-1.5 rounded-full bg-gold-primary/10 border border-gold-primary/25 text-gold-primary mb-6">
          GAMER · STREAMER · STORYTELLER
        </div>
        <h1 className="font-orbitron text-4xl md:text-6xl font-bold mb-6">
          Welcome to <span className="gradient-text">Mickey Chan</span>
        </h1>
        <p className="text-black/60 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          Content creator, entertainer, and storyteller. Watch the latest videos, explore
          open positions, and join the community.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/videos" className="btn-primary">
            Watch Latest
          </Link>
          <a href="#join" className="btn-secondary">
            Join the Community
          </a>
        </div>
      </section>

      {/* Latest Videos */}
      <section className="px-6 md:px-16 py-20 border-t border-dark-border">
        <div className="flex items-center justify-between mb-10">
          <h2 className="font-orbitron text-2xl md:text-3xl">Latest Videos</h2>
          <Link href="/videos" className="text-sm text-gold-primary hover:text-gold-secondary font-medium">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latest.map((v) => (
            <div key={v.slug} className="glass-card rounded-xl overflow-hidden feature-card">
              <div className="h-40 flex items-center justify-center text-xs text-black/30 bg-black/40">
                [VIDEO THUMBNAIL]
              </div>
              <div className="p-5">
                <div className="font-semibold text-sm mb-2">{v.title}</div>
                <div className="text-xs text-black/40">
                  {v.views} · {v.date}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Open Positions */}
      <section id="positions" className="px-6 md:px-16 py-20 border-t border-dark-border">
        <h2 className="font-orbitron text-2xl md:text-3xl mb-3">Open Positions</h2>
        <p className="text-black/50 mb-10 max-w-xl">
          The channel is a small team. Here's where we could use a hand.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {positions.map((p) => (
            <div key={p.title} className="glass-card rounded-xl p-6">
              <div className="text-xs font-semibold text-gold-primary mb-2 uppercase tracking-wide">
                {p.type}
              </div>
              <h3 className="font-orbitron text-lg mb-3">{p.title}</h3>
              <p className="text-sm text-black/55 leading-relaxed">{p.description}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

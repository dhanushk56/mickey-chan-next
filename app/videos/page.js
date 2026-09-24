import { getVideos } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function VideosPage() {
  const videos = await getVideos();
  return <section className="max-w-6xl mx-auto px-6 md:px-16 py-20"><h1 className="font-display text-4xl mb-3">All Videos</h1><p className="text-black/50 mb-10">Every upload, newest first.</p>{videos.length === 0 ? <p className="glass-card rounded-2xl p-8 text-black/60">New videos are on the way.</p> : <div className="grid grid-cols-1 md:grid-cols-3 gap-6">{videos.map((v) => <article key={v.slug} className="glass-card rounded-2xl overflow-hidden"><div className="video-placeholder" style={{ backgroundImage: v.thumbnail ? `url(${v.thumbnail})` : undefined }}>[VIDEO THUMBNAIL]</div><div className="p-5"><h2 className="font-semibold mb-2">{v.title}</h2><p className="text-sm text-black/45">{v.views} · {v.date}</p></div></article>)}</div>}</section>;
}

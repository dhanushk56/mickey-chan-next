import { videos } from "@/data/videos";

export const metadata = {
  title: "Videos — Mickey Chan",
};

export default function VideosPage() {
  return (
    <section className="px-6 md:px-16 py-20">
      <h1 className="font-orbitron text-3xl md:text-4xl mb-3">All Videos</h1>
      <p className="text-black/50 mb-10">Every upload, newest first.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {videos.map((v) => (
          <div key={v.slug} className="glass-card rounded-xl overflow-hidden">
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
  );
}

import { getVideos } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function VideosPage() {
  const videos = await getVideos();

  return (
    <section className="px-6 md:px-16 py-20 md:py-28">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <p className="section-kicker">Latest uploads</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold mt-2">All Videos</h1>
        </div>

        {videos.length === 0 ? (
          <div className="glass-card rounded-2xl p-8 text-black/60">
            No videos have been published yet, or the channel metadata is not available.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {videos.map((video) => (
              <article key={video.id} className="glass-card rounded-2xl overflow-hidden">
                <div className="video-placeholder" style={{ backgroundImage: video.thumbnail ? `url(${video.thumbnail})` : undefined }}>
                  {!video.thumbnail && "[VIDEO THUMBNAIL]"}
                </div>
                <div className="p-5">
                  <h2 className="font-semibold text-base mb-2 leading-snug">{video.title}</h2>
                  <div className="text-sm text-black/45">{video.views} · {video.date}</div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

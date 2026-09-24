const socials = [
  { label: "YouTube", href: "#" },
  { label: "Twitch", href: "#" },
  { label: "Discord", href: "#" },
  { label: "X / Twitter", href: "#" },
];

export default function Footer() {
  return (
    <>
      <section id="join" className="px-6 md:px-16 py-24 border-t border-dark-border">
        <div className="glass-card rounded-2xl p-10 md:p-14 max-w-3xl mx-auto text-center">
          <h2 className="font-orbitron text-3xl mb-4">
            Join the <span className="gradient-text">Community</span>
          </h2>
          <p className="text-black/60 max-w-lg mx-auto mb-8 leading-relaxed">
            Catch streams live, chat during uploads, and get first look at new series.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {socials.map((s) => (
              <a key={s.label} href={s.href} className="btn-secondary text-sm !py-2 !px-5">
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer className="px-6 md:px-16 py-8 border-t border-dark-border text-center text-xs text-black/30">
        © 2026 Mickey Chan. All rights reserved.
      </footer>
    </>
  );
}

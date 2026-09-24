"use client";

import { useEffect, useState } from "react";
import { getFormConfig } from "@/lib/form-config";

const socials = [
  { label: "YouTube", href: "#" }, { label: "Twitch", href: "#" },
  { label: "Discord", href: "#" }, { label: "X / Twitter", href: "#" },
];

const defaults = { title: "Let's make something memorable.", description: "Want to collaborate, join the team, or simply say hello? Send a message and we'll get back to you.", nameLabel: "Name", namePlaceholder: "Your name", emailLabel: "Email", emailPlaceholder: "you@example.com", interestLabel: "I'm interested in", messageLabel: "Message", messagePlaceholder: "Tell us what you have in mind...", submitLabel: "Send message ↗", successMessage: "Thanks — your message has been sent." };

export default function Footer() {
  const [config, setConfig] = useState(defaults);
  const [status, setStatus] = useState(""); const [busy, setBusy] = useState(false);
  useEffect(() => { fetch("/api/form", { cache: "no-store" }).then((r) => r.ok && r.json()).then((value) => value && setConfig({ ...defaults, ...value })).catch(() => {}); }, []);
  async function submit(event) { event.preventDefault(); setBusy(true); setStatus(""); const form = new FormData(event.currentTarget); try { const response = await fetch("/api/join", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(form)) }); const result = await response.json(); if (!response.ok) throw new Error(result.error || "Unable to send your message."); event.currentTarget.reset(); setStatus(config.successMessage); } catch (error) { setStatus(error.message); } finally { setBusy(false); } }
  return <><section id="join" className="px-6 md:px-16 py-24 border-t border-black/10"><div className="max-w-6xl mx-auto grid lg:grid-cols-[.8fr_1.2fr] gap-12 items-start"><div><p className="section-kicker">Join the community</p><h2 className="font-display text-3xl md:text-4xl font-bold mt-2 mb-4">{config.title}</h2><p className="text-black/60 leading-relaxed mb-7">{config.description}</p><div className="flex flex-wrap gap-3">{socials.map((s) => <a key={s.label} href={s.href} className="btn-secondary text-sm">{s.label}</a>)}</div></div><form onSubmit={submit} className="glass-card rounded-2xl p-6 md:p-8 grid gap-4"><div className="grid sm:grid-cols-2 gap-4"><label className="form-label">{config.nameLabel}<input name="name" required className="form-input" placeholder={config.namePlaceholder} /></label><label className="form-label">{config.emailLabel}<input name="email" type="email" required className="form-input" placeholder={config.emailPlaceholder} /></label></div><label className="form-label">{config.interestLabel}<select name="role" className="form-input"><option>Community</option><option>Video Editor</option><option>Community Moderator</option><option>Thumbnail Artist</option><option>Collaboration</option></select></label><label className="form-label">{config.messageLabel}<textarea name="message" required rows="6" className="form-input resize-y" placeholder={config.messagePlaceholder} /></label><div className="flex flex-wrap items-center gap-4"><button disabled={busy} className="btn-primary disabled:opacity-60">{busy ? "Sending…" : config.submitLabel}</button>{status && <p role="status" className="text-sm text-black/60">{status}</p>}</div></form></div></section><footer className="px-6 md:px-16 py-8 border-t border-black/10 text-center text-xs text-black/40">© 2026 Mickey Chan. All rights reserved.</footer></>;
}

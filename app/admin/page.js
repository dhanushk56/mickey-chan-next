"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [data, setData] = useState({ videos: [], submissions: [] });
  const [draft, setDraft] = useState("[]");
  const [error, setError] = useState("");

  async function load() {
    const response = await fetch("/api/admin/content");
    if (!response.ok) return false;
    const result = await response.json();
    setData(result); setDraft(JSON.stringify(result.videos, null, 2)); setAuthed(true); return true;
  }
  useEffect(() => { load(); }, []);
  async function login(event) { event.preventDefault(); setError(""); const response = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) }); const result = await response.json(); if (!response.ok) return setError(result.error); await load(); }
  async function saveVideos(event) { event.preventDefault(); try { const videos = JSON.parse(draft); const response = await fetch("/api/admin/content", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ videos }) }); if (!response.ok) throw new Error("Could not save videos."); setData({ ...data, videos }); setError("Videos saved."); } catch (e) { setError(e.message); } }
  if (!authed) return <main className="max-w-md mx-auto px-6 py-32"><div className="glass-card rounded-2xl p-8"><p className="section-kicker">Private area</p><h1 className="font-display text-3xl font-bold mt-2 mb-6">Admin sign in</h1><form onSubmit={login} className="grid gap-4"><input autoFocus type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-input" placeholder="Admin password" required /><button className="btn-primary">Sign in</button>{error && <p className="text-sm text-pink-700">{error}</p>}</form></div></main>;
  return <main className="max-w-6xl mx-auto px-6 md:px-16 py-20"><p className="section-kicker">Private dashboard</p><h1 className="font-display text-4xl font-bold mt-2 mb-10">Site content</h1>{error && <p className="mb-4 text-sm text-pink-700">{error}</p>}<div className="grid lg:grid-cols-2 gap-8"><form onSubmit={saveVideos} className="glass-card rounded-2xl p-6"><h2 className="font-display text-2xl font-bold mb-2">Videos & thumbnails</h2><p className="text-sm text-black/55 mb-4">Edit the JSON array. Use a public image URL in <code>thumbnail</code>.</p><textarea value={draft} onChange={(e) => setDraft(e.target.value)} className="form-input font-mono text-sm min-h-80" /><button className="btn-primary mt-4">Save videos</button></form><section className="glass-card rounded-2xl p-6"><h2 className="font-display text-2xl font-bold mb-4">Submissions ({data.submissions.length})</h2><div className="grid gap-4 max-h-[34rem] overflow-auto">{data.submissions.length === 0 ? <p className="text-black/55">No submissions yet.</p> : data.submissions.map((s) => <article key={s.id} className="border-b border-black/10 pb-4"><p className="font-semibold">{s.name} · {s.role}</p><p className="text-sm text-pink-700">{s.email}</p><p className="text-sm text-black/65 mt-2 whitespace-pre-wrap">{s.message}</p><time className="text-xs text-black/40">{new Date(s.createdAt).toLocaleString()}</time></article>)}</div></section></div></main>;
}

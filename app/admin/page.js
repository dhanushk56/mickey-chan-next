"use client";

import { useEffect, useState } from "react";

const emptyForm = {
  title: "", description: "", nameLabel: "", namePlaceholder: "", emailLabel: "", emailPlaceholder: "",
  interestLabel: "", messageLabel: "", messagePlaceholder: "", submitLabel: "", successMessage: "",
};

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [data, setData] = useState({ videos: [], submissions: [], form: emptyForm });
  const [draft, setDraft] = useState("[]");
  const [formDraft, setFormDraft] = useState(emptyForm);
  const [notice, setNotice] = useState("");

  async function load() {
    const response = await fetch("/api/admin/content", { cache: "no-store" });
    if (!response.ok) return false;
    const result = await response.json();
    setData(result); setDraft(JSON.stringify(result.videos, null, 2)); setFormDraft({ ...emptyForm, ...result.form }); setAuthed(true); return true;
  }
  useEffect(() => { load(); }, []);
  async function login(event) {
    event.preventDefault(); setNotice("");
    const response = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
    const result = await response.json();
    if (!response.ok) return setNotice(result.error);
    setPassword(""); await load();
  }
  async function save(event) {
    event.preventDefault(); setNotice("");
    try {
      const videos = JSON.parse(draft);
      const response = await fetch("/api/admin/content", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ videos, form: formDraft }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not save changes.");
      setData({ ...data, videos, form: formDraft }); setNotice("Changes saved successfully.");
    } catch (error) { setNotice(error.message); }
  }
  if (!authed) return <main className="admin-shell max-w-md mx-auto px-6 py-32"><div className="admin-card"><p className="section-kicker">Private area</p><h1 className="font-display text-3xl font-bold mt-2 mb-2">Admin sign in</h1><p className="text-sm text-black/50 mb-6">Enter your password to continue.</p><form onSubmit={login} className="grid gap-4"><label className="form-label">Password<input autoFocus type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-input" placeholder="Password" autoComplete="current-password" required /></label><button className="btn-primary w-full">Sign in</button>{notice && <p role="alert" className="text-sm text-pink-700">{notice}</p>}</form></div></main>;
  return <main className="admin-shell max-w-7xl mx-auto px-6 md:px-10 py-16"><div className="mb-10"><p className="section-kicker">Private dashboard</p><h1 className="font-display text-4xl font-bold mt-2">Manage your site</h1><p className="text-black/55 mt-2">Update public form copy, videos, and thumbnails from one place.</p></div>{notice && <p role="status" className="admin-notice mb-6">{notice}</p>}<form onSubmit={save} className="grid xl:grid-cols-[1fr_1.15fr] gap-8"><section className="admin-card"><div className="admin-card-heading"><div><p className="section-kicker">Community form</p><h2 className="font-display text-2xl font-bold mt-1">Questions & labels</h2></div></div><div className="grid gap-5 mt-6"><label className="form-label">Heading<input className="form-input" value={formDraft.title} onChange={(e) => setFormDraft({ ...formDraft, title: e.target.value })} /></label><label className="form-label">Intro text<textarea rows="4" className="form-input" value={formDraft.description} onChange={(e) => setFormDraft({ ...formDraft, description: e.target.value })} /></label>{["nameLabel","namePlaceholder","emailLabel","emailPlaceholder","interestLabel","messageLabel","messagePlaceholder","submitLabel","successMessage"].map((key) => <label key={key} className="form-label"><span>{key.replace(/([A-Z])/g, " $1")}</span><input className="form-input" value={formDraft[key] || ""} onChange={(e) => setFormDraft({ ...formDraft, [key]: e.target.value })} /></label>)}</div></section><section className="grid gap-8"><div className="admin-card"><p className="section-kicker">Video library</p><h2 className="font-display text-2xl font-bold mt-1">Videos & thumbnails</h2><p className="text-sm text-black/55 mt-2 mb-5">Edit the JSON array. Add a public image URL in <code>thumbnail</code>.</p><textarea value={draft} onChange={(e) => setDraft(e.target.value)} className="form-input admin-editor" spellCheck="false" /><button className="btn-primary mt-5">Save all changes</button></div><div className="admin-card"><p className="section-kicker">Inbox</p><h2 className="font-display text-2xl font-bold mt-1 mb-5">Submissions ({data.submissions.length})</h2><div className="grid gap-4 max-h-[30rem] overflow-auto">{data.submissions.length === 0 ? <p className="text-black/55">No submissions yet.</p> : data.submissions.map((s) => <article key={s.id} className="border-b border-black/10 pb-4"><p className="font-semibold">{s.name} · {s.role}</p><p className="text-sm text-pink-700">{s.email}</p><p className="text-sm text-black/65 mt-2 whitespace-pre-wrap">{s.message}</p><time className="text-xs text-black/40">{new Date(s.createdAt).toLocaleString()}</time></article>)}</div></div></section></form></main>;
}

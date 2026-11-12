"use client";

import { useEffect, useState } from "react";
import {
  Shield,
  Database,
  FileCode2,
  Search,
  Terminal,
  KeyRound,
  Users,
  AlertTriangle,
  Award,
  ChevronRight,
  Lock,
  Bug,
} from "lucide-react";

type TabId = "skills" | "findings" | "about";

const FULL_NAME = "Bagaskara // Security Researcher";

const SKILLS = [
  {
    icon: Shield,
    title: "Web Pentest",
    desc: "Endpoint hunting, auth bypass, IDOR, logic flaws.",
  },
  {
    icon: Database,
    title: "Firebase Security",
    desc: "RTDB rules, storage rules, mass assignment surfaces.",
  },
  {
    icon: FileCode2,
    title: "Source Map Audit",
    desc: "Production .map disclosure, original source recovery.",
  },
  {
    icon: Search,
    title: "OSINT",
    desc: "Public asset mapping, leak correlation, recon chains.",
  },
  {
    icon: Terminal,
    title: "Linux",
    desc: "Shell tooling, scripting, triage and verification.",
  },
];

const FINDINGS = [
  {
    severity: "critical" as const,
    title: "Mass PII Leak",
    endpoint: "/apps.json (Firebase RTDB)",
    summary:
      "Unauthenticated endpoint exposed personal data for hundreds of users — names, photos, roles — in a single dump.",
  },
  {
    severity: "high" as const,
    title: "Cryptographic Key Leakage",
    endpoint: "/api/guard/storage-key",
    summary:
      "Master encryption key returned by an API route. Enabled full client-side decryption of protected payloads.",
  },
  {
    severity: "medium" as const,
    title: "Source Code Disclosure",
    endpoint: "main.js.map (production)",
    summary:
      "Source map shipped in production. Recovered original React Admin Panel source and internal structure.",
  },
  {
    severity: "critical" as const,
    title: "Mass Assignment",
    endpoint: "Firebase RTDB (writable fields)",
    summary:
      "25 sensitive fields writable by a normal user, including isAdmin and balance. Full privilege and balance control.",
  },
];

function SeverityBadge({ severity }: { severity: "critical" | "high" | "medium" }) {
  const label =
    severity === "critical" ? "Critical" : severity === "high" ? "High" : "Medium";
  const cls =
    severity === "critical"
      ? "badge-critical"
      : severity === "high"
        ? "badge-high"
        : "badge-medium";
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide ${cls}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          severity === "critical"
            ? "bg-red-400"
            : severity === "high"
              ? "bg-yellow-400"
              : "bg-cyan-400"
        }`}
      />
      {label}
    </span>
  );
}

function Typewriter({ text, speed = 42 }: { text: string; speed?: number }) {
  const [shown, setShown] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    setShown("");
    setDone(false);
    const id = setInterval(() => {
      i += 1;
      setShown(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(id);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);

  return (
    <span className="inline">
      {shown}
      {!done && <span className="caret" aria-hidden />}
    </span>
  );
}

export default function Home() {
  const [tab, setTab] = useState<TabId>("skills");

  return (
    <div className="relative min-h-dvh bg-base">
      {/* Background layers */}
      <div className="pointer-events-none fixed inset-0 bg-grid" />
      <div className="pointer-events-none fixed inset-0 glow-cyan" />
      <div className="pointer-events-none fixed inset-0 glow-blue" />

      <main className="relative z-10 mx-auto flex min-h-dvh max-w-3xl flex-col px-4 py-8 sm:px-6 sm:py-12">
        {/* Terminal chrome header */}
        <header className="mb-6 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-500/90" />
            <span className="h-3 w-3 rounded-full bg-yellow-400/90" />
            <span className="h-3 w-3 rounded-full bg-green-500/90" />
            <span className="ml-2 hidden text-xs text-slate-500 sm:inline">
              bagas-sec-portfolio
            </span>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 animate-pulseDot rounded-full bg-emerald-400" />
            </span>
            ONLINE
          </div>
        </header>

        {/* Main glass card */}
        <section className="glass flex flex-1 flex-col rounded-2xl p-5 shadow-glow sm:p-8">
          {/* Hero */}
          <div className="mb-8 space-y-4 border-b border-white/10 pb-8">
            <p className="text-sm text-cyan-400/90">
              <span className="text-slate-500">guest@berry:~$</span> whoami
            </p>
            <h1 className="text-xl font-semibold tracking-tight text-white sm:text-2xl md:text-3xl">
              <Typewriter text={FULL_NAME} />
            </h1>
            <p className="max-w-xl text-sm leading-relaxed text-slate-400 sm:text-[15px]">
              Started with Inspect Element on a phone. Now hunting open
              endpoints, broken rules, and keys that should never leave the
              server. Web, Firebase, source maps, OSINT.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-500">
              <Award className="h-3.5 w-3.5 text-cyan-400/80" />
              <span>Certificate of Appreciation</span>
              <span className="text-slate-600">·</span>
              <span>VIP Lifetime from platform owner</span>
            </div>
          </div>

          {/* Tabs */}
          <div
            role="tablist"
            aria-label="Portfolio sections"
            className="mb-6 flex flex-wrap gap-1 rounded-xl border border-white/10 bg-black/30 p-1"
          >
            {(
              [
                { id: "skills" as const, label: "Skills", icon: Shield },
                { id: "findings" as const, label: "Findings", icon: Bug },
                { id: "about" as const, label: "About", icon: Users },
              ] as const
            ).map(({ id, label, icon: Icon }) => {
              const active = tab === id;
              return (
                <button
                  key={id}
                  role="tab"
                  type="button"
                  aria-selected={active}
                  onClick={() => setTab(id)}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm transition-colors sm:flex-none sm:px-4 ${
                    active
                      ? "bg-white/10 text-cyan-300 shadow-glow-sm"
                      : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden />
                  {label}
                </button>
              );
            })}
          </div>

          {/* Tab panels */}
          <div className="flex-1">
            {tab === "skills" && (
              <div role="tabpanel" className="tab-panel grid gap-3 sm:grid-cols-2">
                {SKILLS.map((s) => {
                  const Icon = s.icon;
                  return (
                    <article
                      key={s.title}
                      className="glass-strong group rounded-xl p-4 transition-colors hover:border-cyan-500/25"
                    >
                      <div className="mb-2 flex items-center gap-2.5">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-cyan-400">
                          <Icon className="h-4 w-4" aria-hidden />
                        </span>
                        <h2 className="text-sm font-medium text-slate-100">
                          {s.title}
                        </h2>
                      </div>
                      <p className="text-xs leading-relaxed text-slate-400">
                        {s.desc}
                      </p>
                    </article>
                  );
                })}
              </div>
            )}

            {tab === "findings" && (
              <div role="tabpanel" className="tab-panel space-y-3">
                {FINDINGS.map((f) => (
                  <article
                    key={f.title}
                    className="glass-strong rounded-xl p-4 sm:p-5"
                  >
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <SeverityBadge severity={f.severity} />
                      <h2 className="text-sm font-medium text-slate-100">
                        {f.title}
                      </h2>
                    </div>
                    <p className="mb-2 flex items-start gap-1.5 font-mono text-[11px] text-cyan-400/80">
                      <ChevronRight className="mt-0.5 h-3 w-3 shrink-0" />
                      <span className="break-all">{f.endpoint}</span>
                    </p>
                    <p className="text-xs leading-relaxed text-slate-400">
                      {f.summary}
                    </p>
                  </article>
                ))}
                <p className="pt-2 text-center text-[11px] text-slate-500">
                  Responsible disclosure. Impact confirmed by Certificate of
                  Appreciation and VIP Lifetime.
                </p>
              </div>
            )}

            {tab === "about" && (
              <div role="tabpanel" className="tab-panel space-y-4 text-sm leading-relaxed text-slate-300">
                <p>
                  It started on a phone. Inspect Element, random endpoints,
                  curiosity. No formal training path — just following what
                  looked wrong.
                </p>
                <p>
                  Firebase Realtime Database without auth. An API that handed
                  out a storage key. A{" "}
                  <code className="rounded bg-white/10 px-1 py-0.5 text-cyan-300">
                    .map
                  </code>{" "}
                  file left in production. Writable fields that included{" "}
                  <code className="rounded bg-white/10 px-1 py-0.5 text-cyan-300">
                    isAdmin
                  </code>{" "}
                  and balance.
                </p>
                <p>
                  Reported clean. Got a Certificate of Appreciation and VIP
                  Lifetime from the platform owner. That feedback loop is the
                  reason this continues.
                </p>
                <div className="flex flex-wrap gap-3 pt-2 text-xs text-slate-500">
                  <span className="inline-flex items-center gap-1.5">
                    <KeyRound className="h-3.5 w-3.5 text-cyan-500/70" />
                    Keys that should stay server-side
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Lock className="h-3.5 w-3.5 text-cyan-500/70" />
                    Rules that actually rule
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <AlertTriangle className="h-3.5 w-3.5 text-cyan-500/70" />
                    Defaults that leak
                  </span>
                </div>
              </div>
            )}
          </div>
        </section>

        <footer className="mt-6 text-center text-[11px] text-slate-600">
          bagas-sec-portfolio · built for the bench
        </footer>
      </main>
    </div>
  );
}

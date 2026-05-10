"use client";

import { useState } from "react";
import {
  Instagram,
  Youtube,
  Linkedin,
  Hash,
  Sparkles,
  Copy,
  Check,
  ChevronDown,
  Zap,
  RefreshCw,
} from "lucide-react";

type Platform = "instagram" | "youtube" | "linkedin" | "hashtags";

interface PlatformConfig {
  id: Platform;
  label: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  borderColor: string;
  description: string;
}

const PLATFORMS: PlatformConfig[] = [
  {
    id: "instagram",
    label: "Instagram",
    icon: <Instagram size={20} />,
    color: "#E1306C",
    bgColor: "rgba(225, 48, 108, 0.08)",
    borderColor: "rgba(225, 48, 108, 0.25)",
    description: "Engaging captions that drive likes & saves",
  },
  {
    id: "youtube",
    label: "YouTube",
    icon: <Youtube size={20} />,
    color: "#FF0000",
    bgColor: "rgba(255, 0, 0, 0.08)",
    borderColor: "rgba(255, 0, 0, 0.25)",
    description: "Click-worthy titles that boost CTR",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    icon: <Linkedin size={20} />,
    color: "#0A66C2",
    bgColor: "rgba(10, 102, 194, 0.08)",
    borderColor: "rgba(10, 102, 194, 0.25)",
    description: "Professional posts that spark conversations",
  },
  {
    id: "hashtags",
    label: "Hashtags",
    icon: <Hash size={20} />,
    color: "#E8007A",
    bgColor: "rgba(232, 0, 122, 0.08)",
    borderColor: "rgba(232, 0, 122, 0.25)",
    description: "Strategic hashtag sets for max reach",
  },
];

const TONES = ["Professional", "Casual", "Inspirational", "Humorous", "Urgent", "Educational", "Storytelling"];

export default function Home() {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>("instagram");
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("Professional");
  const [audience, setAudience] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [charCount, setCharCount] = useState(0);

  const activePlatform = PLATFORMS.find((p) => p.id === selectedPlatform)!;

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setError("Please describe your content or topic.");
      return;
    }
    setError("");
    setResult("");
    setLoading(true);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ platform: selectedPlatform, topic, tone, audience }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Generation failed");
      setResult(data.content);
      setCharCount(data.content.length);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isHashtags = selectedPlatform === "hashtags";

  return (
    <div className="min-h-screen" style={{ background: "#0A0A0F" }}>
      {/* Ambient bg glow */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(232,0,122,0.08) 0%, transparent 60%)",
        }}
      />

      <div className="relative max-w-3xl mx-auto px-4 py-12">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6" style={{ background: "rgba(232,0,122,0.1)", border: "1px solid rgba(232,0,122,0.2)" }}>
            <Zap size={13} className="text-pink-400" />
            <span className="text-xs font-medium" style={{ color: "#FF66AF" }}>Powered by Groq · llama-3.3-70b</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-3" style={{ color: "#F0F0F8" }}>
            AI Social Media
            <span style={{ color: "#E8007A" }}> Manager</span>
          </h1>
          <p className="text-base" style={{ color: "#888899" }}>
            Generate platform-perfect content in seconds
          </p>
        </header>

        {/* Platform selector */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {PLATFORMS.map((platform) => (
            <button
              key={platform.id}
              onClick={() => { setSelectedPlatform(platform.id); setResult(""); setError(""); }}
              className="platform-card rounded-xl p-3 text-left transition-all"
              style={{
                background: selectedPlatform === platform.id ? platform.bgColor : "#111118",
                border: `1px solid ${selectedPlatform === platform.id ? platform.borderColor : "#1F1F28"}`,
              }}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span style={{ color: selectedPlatform === platform.id ? platform.color : "#888899" }}>
                  {platform.icon}
                </span>
                <span className="text-sm font-medium" style={{ color: selectedPlatform === platform.id ? "#F0F0F8" : "#888899" }}>
                  {platform.label}
                </span>
              </div>
              <p className="text-xs leading-snug" style={{ color: "#555566" }}>
                {platform.description}
              </p>
            </button>
          ))}
        </div>

        {/* Input form */}
        <div
          className="rounded-2xl p-6 mb-6"
          style={{ background: "#111118", border: "1px solid #1F1F28" }}
        >
          {/* Topic input */}
          <div className="mb-5">
            <label className="block text-sm font-medium mb-2" style={{ color: "#AAAABC" }}>
              What&apos;s your content about? *
            </label>
            <textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder={
                selectedPlatform === "instagram"
                  ? "e.g. My morning coffee ritual and how it sets the tone for a productive day..."
                  : selectedPlatform === "youtube"
                  ? "e.g. How to grow on YouTube in 2025 as a complete beginner..."
                  : selectedPlatform === "linkedin"
                  ? "e.g. Lessons I learned after failing my first startup and what I did differently..."
                  : "e.g. productivity, remote work, morning routines, entrepreneurship..."
              }
              rows={3}
              className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all"
              style={{
                background: "#18181F",
                border: "1px solid #2A2A35",
                color: "#E8E8F0",
                resize: "vertical",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#E8007A")}
              onBlur={(e) => (e.target.style.borderColor = "#2A2A35")}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Tone selector */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "#AAAABC" }}>
                Tone
              </label>
              <div className="relative">
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full rounded-xl px-4 py-3 text-sm appearance-none outline-none"
                  style={{
                    background: "#18181F",
                    border: "1px solid #2A2A35",
                    color: "#E8E8F0",
                  }}
                >
                  {TONES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "#555566" }} />
              </div>
            </div>

            {/* Target audience */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "#AAAABC" }}>
                Target Audience <span style={{ color: "#555566" }}>(optional)</span>
              </label>
              <input
                type="text"
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                placeholder="e.g. entrepreneurs, Gen Z, marketers..."
                className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all"
                style={{
                  background: "#18181F",
                  border: "1px solid #2A2A35",
                  color: "#E8E8F0",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#E8007A")}
                onBlur={(e) => (e.target.style.borderColor = "#2A2A35")}
              />
            </div>
          </div>

          {error && (
            <div
              className="mt-4 px-4 py-3 rounded-xl text-sm"
              style={{ background: "rgba(220,38,38,0.1)", border: "1px solid rgba(220,38,38,0.2)", color: "#FCA5A5" }}
            >
              {error}
            </div>
          )}

          {/* Generate button */}
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="mt-5 w-full flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all"
            style={{
              background: loading ? "#2A1020" : "linear-gradient(135deg, #E8007A, #C40068)",
              color: loading ? "#884455" : "#FFF",
              cursor: loading ? "not-allowed" : "pointer",
              boxShadow: loading ? "none" : "0 0 24px rgba(232,0,122,0.3)",
            }}
          >
            {loading ? (
              <>
                <RefreshCw size={15} className="animate-spin" />
                Generating with Groq...
              </>
            ) : (
              <>
                <Sparkles size={15} />
                Generate {activePlatform.label} Content
              </>
            )}
          </button>
        </div>

        {/* Result */}
        {(loading || result) && (
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: "#111118",
              border: `1px solid ${activePlatform.borderColor}`,
            }}
          >
            {/* Result header */}
            <div
              className="flex items-center justify-between px-5 py-3.5"
              style={{ borderBottom: "1px solid #1F1F28", background: activePlatform.bgColor }}
            >
              <div className="flex items-center gap-2">
                <span style={{ color: activePlatform.color }}>{activePlatform.icon}</span>
                <span className="text-sm font-medium" style={{ color: "#E8E8F0" }}>
                  {activePlatform.label} {isHashtags ? "Hashtag Set" : selectedPlatform === "youtube" ? "Title Options" : "Post"}
                </span>
                {result && (
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "#18181F", color: "#555566" }}>
                    {charCount} chars
                  </span>
                )}
              </div>
              {result && (
                <button
                  onClick={handleCopy}
                  className="copy-btn flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
                  style={{
                    background: copied ? "rgba(34,197,94,0.1)" : "#18181F",
                    border: `1px solid ${copied ? "rgba(34,197,94,0.3)" : "#2A2A35"}`,
                    color: copied ? "#86EFAC" : "#AAAABC",
                  }}
                >
                  {copied ? <Check size={12} /> : <Copy size={12} />}
                  {copied ? "Copied!" : "Copy"}
                </button>
              )}
            </div>

            {/* Content */}
            <div className="p-5">
              {loading && (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="shimmer rounded-lg h-4"
                      style={{ width: i === 3 ? "60%" : "100%" }}
                    />
                  ))}
                </div>
              )}

              {result && !loading && (
                <>
                  {isHashtags ? (
                    <div className="flex flex-wrap gap-2">
                      {result.split(/\s+/).filter((t) => t.startsWith("#")).map((tag, i) => (
                        <span key={i} className="tag-pill">{tag}</span>
                      ))}
                    </div>
                  ) : (
                    <div
                      className="text-sm leading-relaxed whitespace-pre-wrap"
                      style={{ color: "#C8C8D8" }}
                    >
                      {result}
                    </div>
                  )}

                  {/* Regenerate */}
                  <button
                    onClick={handleGenerate}
                    className="mt-5 flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all"
                    style={{
                      background: "#18181F",
                      border: "1px solid #2A2A35",
                      color: "#888899",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = activePlatform.color;
                      (e.currentTarget as HTMLButtonElement).style.color = activePlatform.color;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "#2A2A35";
                      (e.currentTarget as HTMLButtonElement).style.color = "#888899";
                    }}
                  >
                    <RefreshCw size={12} />
                    Regenerate
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-10 text-center text-xs" style={{ color: "#444455" }}>
          Built with Next.js · Groq API · llama-3.3-70b-versatile
        </footer>
      </div>
    </div>
  );
}

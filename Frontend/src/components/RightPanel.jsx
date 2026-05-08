import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import dayjs from "dayjs";

import { fetchSettings, updateSettings } from "../services/settingsService";

// ── Progress Ring ──────────────────────────────────────────
function ProgressRing({ progress, stats }) {
  const r = 72;
  const circ = 2 * Math.PI * r;
  const offset = circ - (circ * progress) / 100;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.8 }}
      className="glass-card px-6 py-6 text-center"
    >
      <h3 className="font-syne mb-4 text-lg font-bold">Daily Progress</h3>

      <div className="relative mx-auto mb-4 h-44 w-44">
        <svg
          width="180"
          height="180"
          viewBox="0 0 180 180"
          style={{ transform: "rotate(-90deg)" }}
        >
          <defs>
            <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#a78bfa" />
            </linearGradient>
          </defs>

          <circle
            cx="90"
            cy="90"
            r={r}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="14"
          />

          <circle
            cx="90"
            cy="90"
            r={r}
            fill="none"
            stroke="url(#ringGrad)"
            strokeWidth="14"
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={offset}
            style={{
              transition: "stroke-dashoffset 1.2s cubic-bezier(.4,0,.2,1)",
            }}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="font-syne text-4xl font-black">{progress}%</p>

          <p className="mt-1 text-[10px] uppercase tracking-widest text-white/35">
            Complete
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {[
          {
            label: "Done",
            val: stats.done,
            color: "text-emerald-400",
          },
          {
            label: "Left",
            val: stats.pending,
            color: "text-amber-400",
          },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-2xl py-2 text-center"
            style={{
              background: "rgba(0,0,0,0.2)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <p className={`font-syne text-2xl font-bold ${s.color}`}>{s.val}</p>

            <p className="text-[10px] text-white/35">{s.label}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ── Pomodoro ───────────────────────────────────────────────
const POMO_LABELS = [
  { key: "pomodoro", label: "Pomodoro" },
  { key: "short", label: "Short Break" },
  { key: "long", label: "Long Break" },
];

function PomodoroTimer() {
  const [settings, setSettings] = useState({
    focusTime: 25,
    shortBreak: 5,
    longBreak: 15,
  });

  const [mode, setMode] = useState("pomodoro");

  const getSeconds = (m) => {
    if (m === "pomodoro") return settings.focusTime * 60;

    if (m === "short") return settings.shortBreak * 60;

    return settings.longBreak;
  };

  const [sec, setSec] = useState(25 * 60);

  const [running, setRunning] = useState(false);

  const [showTimeInput, setShowTimeInput] = useState(false);

  const [customSeconds, setCustomSeconds] = useState(15 * 60);

  const intervalRef = useRef(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const data = await fetchSettings();

      const fixedSettings = {
        ...data,
        longBreak: data.longBreak || 900,
      };

      setSettings(fixedSettings);

      setCustomSeconds(fixedSettings.longBreak);

      setSec(fixedSettings.focusTime * 60);
    } catch (error) {
      console.log(error);
    }
  };

  const fmt = (s) => {
    const hrs = Math.floor(s / 3600);

    const mins = Math.floor((s % 3600) / 60);

    const secs = s % 60;

    if (mode === "long") {
      return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(
        2,
        "0",
      )}:${String(secs).padStart(2, "0")}`;
    }

    return `${String(Math.floor(s / 60)).padStart(
      2,
      "0",
    )}:${String(s % 60).padStart(2, "0")}`;
  };

  const reset = (m = mode) => {
    clearInterval(intervalRef.current);

    setRunning(false);

    if (m === "long") {
      setSec(customSeconds);
    } else {
      setSec(getSeconds(m));
    }
  };

  const toggle = () => {
    if (running) {
      clearInterval(intervalRef.current);

      setRunning(false);
    } else {
      setRunning(true);

      intervalRef.current = setInterval(() => {
        setSec((s) => {
          if (s <= 1) {
            clearInterval(intervalRef.current);

            setRunning(false);

            return 0;
          }

          return s - 1;
        });
      }, 1000);
    }
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  const total = mode === "long" ? customSeconds : getSeconds(mode);

  const barWidth = `${(sec / total) * 100}%`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.7 }}
      className="glass-card px-6 py-5"
    >
      <h3 className="font-syne mb-3 text-base font-bold">Focus Timer</h3>

      {/* Mode pills */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {POMO_LABELS.map((m) => (
          <button
            key={m.key}
            onClick={() => {
              if (m.key === "long") {
                setMode("long");

                setShowTimeInput(true);

                setSec(customSeconds);

                return;
              }

              setShowTimeInput(false);

              setMode(m.key);

              reset(m.key);
            }}
            className="rounded-full px-3 py-1 text-[11px] transition-all duration-200 
            cursor-pointer
            hover:-translate-y-0.5
            hover:shadow-[0_0_18px_rgba(167,139,250,0.45)]
            hover:bg-white/5"
            style={
              mode === m.key
                ? {
                    background: "rgba(96,165,250,0.12)",
                    border: "1px solid rgba(96,165,250,0.3)",
                    color: "#60a5fa",
                  }
                : {
                    background: "transparent",
                    border: "1px solid rgba(255,255,255,0.09)",
                    color: "rgba(255,255,255,0.4)",
                  }
            }
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Time Input */}
      {showTimeInput && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 flex items-center justify-center"
        >
          <input
            type="time"
            step="1"
            value={new Date(customSeconds * 1000).toISOString().slice(11, 19)}
            onChange={async (e) => {
              const value = e.target.value;

              // Prevent crash while editing
              if (!value || !value.includes(":")) {
                return;
              }

              const parts = value.split(":").map(Number);

              const hours = parts[0] || 0;
              const mins = parts[1] || 0;
              const secs = parts[2] || 0;

              const totalSeconds = hours * 3600 + mins * 60 + secs;

              if (isNaN(totalSeconds)) return;

              setCustomSeconds(totalSeconds);

              setSec(totalSeconds);

              const updated = {
                ...settings,
                longBreak: totalSeconds,
              };

              try {
                await updateSettings(updated);

                setSettings(updated);
              } catch (error) {
                console.log(error);
              }
            }}
            className="glass-input w-44 text-center"
          />
        </motion.div>
      )}

      {/* Timer display */}
      <p className="font-syne mb-4 text-center text-5xl font-black tracking-widest">
        {fmt(sec)}
      </p>

      {/* Buttons */}
      <div className="mb-3 flex justify-center gap-3">
        <button
          onClick={toggle}
          className="rounded-full px-6 py-2 text-sm font-medium transition-all duration-200 
          cursor-pointer
          hover:-translate-y-0.5
          hover:shadow-[0_0_18px_rgba(167,139,250,0.45)]
          hover:bg-white/5"
          style={
            running
              ? {
                  background: "rgba(248,113,113,0.12)",
                  border: "1px solid rgba(248,113,113,0.3)",
                  color: "#f87171",
                }
              : {
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "#fff",
                }
          }
        >
          {running ? "⏸ Pause" : "▶ Start"}
        </button>

        <button
          onClick={() => reset()}
          className="rounded-full px-5 py-2 text-sm text-white/40 transition-all duration-200 hover:text-white
          cursor-pointer
          hover:shadow-lg
          hover:shadow-blue-500/20
          hover:bg-white/5"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.09)",
          }}
        >
          ↺
        </button>
      </div>

      {/* Progress bar */}
      <div className="pomo-bar-track">
        <div className="pomo-bar-fill" style={{ width: barWidth }} />
      </div>
    </motion.div>
  );
}

// ── Quote Card ─────────────────────────────────────────────
const QUOTES = [
  {
    t: "The secret of getting ahead is getting started.",
    a: "Mark Twain",
  },
  {
    t: "It always seems impossible until it's done.",
    a: "Nelson Mandela",
  },
  {
    t: "Focus on being productive instead of busy.",
    a: "Tim Ferriss",
  },
  {
    t: "Deep work is the superpower of the 21st century.",
    a: "Cal Newport",
  },
  {
    t: "You don't rise to your goals, you fall to your systems.",
    a: "James Clear",
  },
  {
    t: "Energy and persistence conquer all things.",
    a: "Benjamin Franklin",
  },
];

function QuoteCard() {
  const [idx, setIdx] = useState(0);

  const q = QUOTES[idx];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.7 }}
      className="glass-card px-6 py-5"
    >
      <p className="mb-2 font-serif text-2xl leading-none text-purple-400/80">
        "
      </p>

      <p className="text-sm italic leading-relaxed text-white">{q.t}</p>

      <p className="mt-2 text-[11px] text-white/35">— {q.a}</p>

      <button
        onClick={() => setIdx((i) => (i + 1) % QUOTES.length)}
        className="mt-3 rounded-xl px-3 py-1.5 text-[11px] text-white/40 transition-all duration-200 hover:text-white
        cursor-pointer
        hover:-translate-y-0.5
        hover:shadow-[0_0_18px_rgba(167,139,250,0.45)]
        hover:bg-white/5"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        ↻ New quote
      </button>
    </motion.div>
  );
}

// ── Calendar ───────────────────────────────────────────────
function CalendarWidget() {
  const [current, setCurrent] = useState(dayjs());

  const today = dayjs();

  const startOfMonth = current.startOf("month");

  const daysInMonth = current.daysInMonth();

  const firstDay = startOfMonth.day();

  const dayLabels = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.7 }}
      className="glass-card px-5 py-5"
    >
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-syne text-base font-bold">
          {current.format("MMMM YYYY")}
        </h3>

        <div className="flex gap-0">
          {["‹", "›"].map((ch, i) => (
            <button
              key={ch}
              onClick={() =>
                setCurrent((d) =>
                  i === 0 ? d.subtract(1, "month") : d.add(1, "month"),
                )
              }
              className="rounded-lg px-3 py-0.5 text-sm text-white/40 transition-all duration-200 hover:bg-white/10 hover:text-white
              cursor-pointer
              text-xl"
            >
              {ch}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {dayLabels.map((d) => (
          <div
            key={d}
            className="py-1 text-center text-[12px] uppercase tracking-wider text-white/100"
          >
            {d}
          </div>
        ))}

        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;

          const isToday =
            day === today.date() &&
            current.month() === today.month() &&
            current.year() === today.year();

          return (
            <div
              key={day}
              className="flex items-center justify-center rounded-lg py-1 text-xs transition-all duration-150 hover:bg-white/10"
              style={
                isToday
                  ? {
                      background:
                        "linear-gradient(135deg,rgba(96,165,250,0.28),rgba(167,139,250,0.28))",
                      border: "1px solid rgba(96,165,250,0.3)",
                      color: "#fff",
                      fontWeight: 600,
                    }
                  : {
                      color: "rgba(255,255,255,0.4)",
                      cursor: "pointer",
                    }
              }
            >
              {day}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

// ── RightPanel ─────────────────────────────────────────────
export default function RightPanel({ progress, stats }) {
  return (
    <div className="flex flex-col gap-4">
      <ProgressRing progress={progress} stats={stats} />

      <PomodoroTimer />

      <QuoteCard />

      <CalendarWidget />
    </div>
  );
}

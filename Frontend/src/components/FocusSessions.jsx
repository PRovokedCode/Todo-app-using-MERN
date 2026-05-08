import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2 } from "lucide-react";

import {
  fetchSessions,
  createSession,
  deleteSession,
} from "../services/focusSessionService";

export default function FocusSessions() {
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");

  const [timeLeft, setTimeLeft] = useState(0);

  const [running, setRunning] = useState(false);

  const [sessions, setSessions] = useState([]);

  const intervalRef = useRef(null);

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = async () => {
    try {
      const data = await fetchSessions();

      setSessions(data);
    } catch (error) {
      console.log(error);
    }
  };

  const formatTime = (totalSeconds) => {
    const hrs = Math.floor(totalSeconds / 3600);

    const mins = Math.floor((totalSeconds % 3600) / 60);

    const secs = totalSeconds % 60;

    return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(
      2,
      "0",
    )}:${String(secs).padStart(2, "0")}`;
  };

const startTimer = () => {
  if (intervalRef.current) return;

  if (timeLeft <= 0) return;

  setRunning(true);

  intervalRef.current = setInterval(() => {
    setTimeLeft((prev) => {
      const next = prev - 1;

      if (next <= 0) {
        clearInterval(intervalRef.current);

        intervalRef.current = null;

        setRunning(false);

        // Run side effect OUTSIDE updater
        setTimeout(() => {
          saveSession(
            Number(hours) * 3600 +
              Number(minutes) * 60 +
              Number(seconds),
          );
        }, 0);

        return 0;
      }

      return next;
    });
  }, 1000);
};

  const pauseTimer = () => {
    clearInterval(intervalRef.current);

    intervalRef.current = null;

    setRunning(false);
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);

    intervalRef.current = null;

    setRunning(false);

    const totalSeconds =
      Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds);

    setTimeLeft(totalSeconds);
  };

  const saveSession = async (duration) => {
    try {
      const newSession = await createSession(duration);

      setSessions((prev) => [newSession, ...prev]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteSession(id);

      setSessions((prev) => prev.filter((s) => s._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);

      intervalRef.current = null;
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.7 }}
      className="glass-card px-6 py-5"
    >
      <h3 className="font-syne mb-4 text-lg font-bold">Focus Sessions</h3>

      {/* Time Inputs */}
      <div className="mb-4 flex items-center justify-center gap-2">
        <input
          type="number"
          min="0"
          max="99"
          disabled={running}
          value={hours}
          onChange={(e) => {
            const value = e.target.value;

            setHours(value);

            if (!running) {
              setTimeLeft(
                Number(value) * 3600 + Number(minutes) * 60 + Number(seconds),
              );
            }
          }}
          className="glass-input w-20 text-center disabled:opacity-40 disabled:cursor-not-allowed"
          placeholder="HH"
        />

        <span className="text-white/50">:</span>

        <input
          type="number"
          min="0"
          max="59"
          disabled={running}
          value={minutes}
          onChange={(e) => {
            const value = e.target.value;

            setMinutes(value);

            if (!running) {
              setTimeLeft(
                Number(hours) * 3600 + Number(value) * 60 + Number(seconds),
              );
            }
          }}
          className="glass-input w-20 text-center disabled:opacity-40 disabled:cursor-not-allowed"
          placeholder="MM"
        />

        <span className="text-white/50">:</span>

        <input
          type="number"
          min="0"
          max="59"
          disabled={running}
          value={seconds}
          onChange={(e) => {
            const value = e.target.value;

            setSeconds(value);

            if (!running) {
              setTimeLeft(
                Number(hours) * 3600 + Number(minutes) * 60 + Number(value),
              );
            }
          }}
          className="glass-input w-20 text-center disabled:opacity-40 disabled:cursor-not-allowed"
          placeholder="SS"
        />
      </div>

      {/* Timer */}
      <p className="font-syne mb-5 text-center text-5xl font-black tracking-widest">
        {formatTime(timeLeft)}
      </p>

      {/* Buttons */}
      <div className="mb-5 flex justify-center gap-3">
        {!running ? (
          <button
            onClick={startTimer}
            className="rounded-full px-6 py-2 text-sm font-medium transition-all duration-200
            cursor-pointer
            hover:-translate-y-0.5
            hover:shadow-[0_0_18px_rgba(34,197,94,0.45)]
            hover:bg-white/5"
            style={{
              background: "rgba(34,197,94,0.12)",
              border: "1px solid rgba(34,197,94,0.3)",
              color: "#22c55e",
            }}
          >
            ▶ Start Session
          </button>
        ) : (
          <button
            onClick={pauseTimer}
            className="rounded-full px-6 py-2 text-sm font-medium transition-all duration-200
            cursor-pointer
            hover:-translate-y-0.5
            hover:shadow-[0_0_18px_rgba(248,113,113,0.45)]
            hover:bg-white/5"
            style={{
              background: "rgba(248,113,113,0.12)",
              border: "1px solid rgba(248,113,113,0.3)",
              color: "#f87171",
            }}
          >
            ⏸ Pause
          </button>
        )}

        <button
          onClick={resetTimer}
          className="rounded-full px-6 py-2 text-sm font-medium transition-all duration-200
          cursor-pointer
          hover:-translate-y-0.5
          hover:shadow-[0_0_18px_rgba(96,165,250,0.45)]
          hover:bg-white/5"
          style={{
            background: "rgba(96,165,250,0.12)",
            border: "1px solid rgba(96,165,250,0.3)",
            color: "#60a5fa",
          }}
        >
          ↺ Reset
        </button>
      </div>

      {/* Sessions */}
      <div className="space-y-2">
        <AnimatePresence>
          {sessions.length > 0 ? (
            sessions.map((session) => (
              <motion.div
                key={session._id}
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  x: 30,
                }}
                className="flex items-center justify-between rounded-2xl px-4 py-3"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div>
                  <p className="text-sm font-medium text-white">
                    {formatTime(session.duration)}
                  </p>

                  <p className="mt-1 text-[11px] text-white/35">
                    {new Date(session.completedAt).toLocaleString()}
                  </p>
                </div>

                <motion.button
                  whileTap={{ scale: 0.92 }}
                  onClick={() => handleDelete(session._id)}
                  className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-[11px] font-medium transition-all duration-200 cursor-pointer"
                  style={{
                    background: "rgba(248,113,113,0.1)",
                    color: "#f87171",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "rgba(248,113,113,0.2)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "rgba(248,113,113,0.1)")
                  }
                >
                  <Trash2 size={12} />
                </motion.button>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-sm text-white/35">
              No focus sessions yet.
            </p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

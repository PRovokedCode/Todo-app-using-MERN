import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function HeroSection({ progress }) {
  const [time, setTime] = useState("");
  const [greeting, setGreeting] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const h = now.getHours();
      let hh = h % 12 || 12;
      const mm = String(now.getMinutes()).padStart(2, "0");
      const ap = h >= 12 ? "PM" : "AM";
      setTime(`${hh}:${mm} ${ap}`);

      if (h < 12) setGreeting("Good Morning");
      else if (h < 17) setGreeting("Good Afternoon");
      else if (h < 21) setGreeting("Good Evening");
      else setGreeting("Good Night");

      setDate(
        now.toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
        })
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const focusScore = Math.min(100, progress + 12);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="glass-card flex flex-col gap-6 px-7 py-6 lg:flex-row lg:items-center lg:justify-between"
    >
      {/* Left — greeting */}
      <div>
        <p className="mb-2 text-[11px] uppercase tracking-[5px] text-white/40">
          Dashboard · Personal Workspace
        </p>
        <h1
          className="font-syne gradient-text text-4xl font-extrabold leading-tight md:text-5xl"
        >
          {greeting}
        </h1>
        {/* <p className="mt-5 max-w-md font-light leading-relaxed text-white/60">
          Build momentum, stay in flow, and finish every day stronger than you
          started.
        </p> */}
        <p className="mt-5 text-white/60">{date}</p>
      </div>

      {/* Right — widgets */}
      <div className="flex gap-3 flex-wrap">
        {/* Clock */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="glass-card px-6 py-4 min-w-32.5"
        >
          <p className="text-[10px] uppercase tracking-[3px] text-white/60 mb-1">
            Time
          </p>
          <p className="font-syne text-3xl font-bold">{time}</p>
        </motion.div>

        {/* Focus Score */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="glass-card px-6 py-4 min-w-32.5"
          style={{
            background:
              "linear-gradient(135deg,rgba(96,165,250,0.12),rgba(167,139,250,0.12))",
            borderColor: "rgba(96,165,250,0.18)",
          }}
        >
          <p className="text-[10px] uppercase tracking-[3px] text-white/60 mb-1">
            Focus Score
          </p>
          <p className="font-syne gradient-text-blue text-3xl font-bold">
            {focusScore}%
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
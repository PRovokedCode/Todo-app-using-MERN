import { motion } from "framer-motion";
import { ClipboardList, CheckCircle2, Clock3 } from "lucide-react";

const cards = [
  {
    key: "total",
    label: "Total Tasks",
    sub: "All categories",
    color: "text-white",
    icon: ClipboardList,
    iconBg: "rgba(255,255,255,0.06)",
    iconColor: "#fff",
  },
  {
    key: "done",
    label: "Completed",
    sub: "Well done!",
    color: "text-emerald-400",
    icon: CheckCircle2,
    iconBg: "rgba(52,211,153,0.1)",
    iconColor: "#34d399",
  },
  {
    key: "pending",
    label: "Pending",
    sub: "Keep going",
    color: "text-amber-400",
    icon: Clock3,
    iconBg: "rgba(251,191,36,0.1)",
    iconColor: "#fbbf24",
  },
];

export default function StatsRow({ stats }) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {cards.map((c, i) => {
        const Icon = c.icon;
        return (
          <motion.div
            key={c.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i, duration: 0.6 }}
            className="glass-card relative overflow-hidden px-5 py-5"
          >
            {/* Icon accent */}
            <div
              className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-xl"
              style={{ background: c.iconBg }}
            >
              <Icon size={15} style={{ color: c.iconColor }} />
            </div>

            <p className="mb-2 text-[11px] uppercase tracking-wide text-white/60">
              {c.label}
            </p>
            <p className={`font-syne text-4xl font-black ${c.color}`}>
              {stats[c.key]}
            </p>
            <p className="mt-1 text-[10px] text-white/25">{c.sub}</p>
          </motion.div>
        );
      })}
    </div>
  );
}
import { motion } from "framer-motion";
import { Trash2, Check, RotateCcw } from "lucide-react";

const PRIORITY_STYLES = {
  High: {
    chip: {
      background: "rgba(248,113,113,0.12)",
      border: "1px solid rgba(248,113,113,0.22)",
      color: "#f87171",
    },
  },
  Medium: {
    chip: {
      background: "rgba(251,191,36,0.12)",
      border: "1px solid rgba(251,191,36,0.22)",
      color: "#fbbf24",
    },
  },
  Low: {
    chip: {
      background: "rgba(96,165,250,0.12)",
      border: "1px solid rgba(96,165,250,0.22)",
      color: "#60a5fa",
    },
  },
};

export default function TodoItem({ task, onToggle, onDelete, index }) {
  const ps = PRIORITY_STYLES[task.priority];

  const formatDeadline = () => {
    if (!task.date || task.date === "—") return "No deadline";
    const parts = [task.date];
    if (task.time && task.time !== "—") parts.push(task.time);
    return "Due: " + parts.join(" · ");
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20, height: 0 }}
      transition={{ delay: index * 0.07, duration: 0.4 }}
      whileHover={{ translateY: -2 }}
      className={`accent-${task.priority} mb-2 overflow-hidden rounded-2xl transition-all duration-300`}
      style={{
        background: "rgba(0,0,0,0.18)",
        border: "1px solid rgba(255,255,255,0.08)",
        opacity: task.done ? 0.45 : 1,
      }}
    >
      <div className="flex items-start justify-between gap-4 px-5 py-4">
        {/* Left content */}
        <div className="flex-1 min-w-0">
          {/* Chips */}
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span
              className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
              style={ps.chip}
            >
              {task.priority}
            </span>
            <span
              className="rounded-full px-2.5 py-0.5 text-[10px]"
              style={{
                background: "rgba(167,139,250,0.1)",
                border: "1px solid rgba(167,139,250,0.2)",
                color: "#a78bfa",
              }}
            >
              {task.category}
            </span>
          </div>

          {/* Title */}
          <p
            className={`text-sm font-medium leading-snug ${
              task.done ? "line-through text-white/35" : "text-white"
            }`}
          >
            {task.title}
          </p>

          {/* Description */}
          {task.description && (
            <p
              className={`mt-1 text-xs leading-relaxed ${
                task.done ? "text-white/20" : "text-white/45"
              }`}
            >
              {task.description}
            </p>
          )}

          {/* Deadline */}
          <p className="mt-1.5 text-[11px] text-white/35">{formatDeadline()}</p>
        </div>

        {/* Actions */}
        <div className="flex shrink-0 gap-2">
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => onToggle(task.id)}
            className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-[11px] font-medium transition-all duration-200 cursor-pointer"
            style={{
              background: "rgba(52,211,153,0.1)",
              color: "#34d399",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "rgba(52,211,153,0.2)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "rgba(52,211,153,0.1)")
            }
          >
            {task.done ? <RotateCcw size={12} /> : <Check size={12} />}
            {task.done ? "Undo" : "Done"}
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => onDelete(task.id)}
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
        </div>
      </div>
    </motion.div>
  );
}

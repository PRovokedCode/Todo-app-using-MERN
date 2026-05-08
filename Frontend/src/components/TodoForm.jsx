import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, X } from "lucide-react";

const CATEGORIES = [
  { label: "💼 Work", value: "Work" },
  { label: "📚 Study", value: "Study" },
  { label: "🏠 Personal", value: "Personal" },
  { label: "💪 Health", value: "Health" },
  { label: "🎨 Creative", value: "Creative" },
];

const PRIORITIES = [
  {
    label: "High",
    color: "rgba(248,113,113,0.12)",
    border: "rgba(248,113,113,0.3)",
    text: "#f87171",
    dot: "#f87171",
  },
  {
    label: "Medium",
    color: "rgba(251,191,36,0.12)",
    border: "rgba(251,191,36,0.3)",
    text: "#fbbf24",
    dot: "#fbbf24",
  },
  {
    label: "Low",
    color: "rgba(96,165,250,0.12)",
    border: "rgba(96,165,250,0.3)",
    text: "#60a5fa",
    dot: "#60a5fa",
  },
];

export default function TodoForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [priority, setPriority] = useState("High");
  const [category, setCategory] = useState("Work");

  const handleAdd = () => {
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = "Task title required!";
    }

    if (!date) {
      newErrors.date = "Due date required!";
    }

    if (!time) {
      newErrors.time = "Due time required!";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    onAdd({ title: title.trim(), description, priority, category, date, time });
    setTitle("");
    setDescription("");
    setCategory("Work");
    setDate("");
    setTime("");
  };

  const handleClear = () => {
    setTitle("");
    setDescription("");
    setDate("");
    setTime("");
    setPriority("High");
    setCategory("Work");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.7 }}
      className="glass-card overflow-hidden"
    >
      <div className="px-7 py-6">
        {/* Header */}
        <div className="mb-5 flex items-start justify-between">
          <div>
            <h2 className="font-syne text-xl font-bold">Create New Task</h2>
            <p className="mt-1 text-xs text-white/60">
              Capture your next productive move
            </p>
          </div>
          <span
            className="rounded-full px-3 py-1 text-[11px]
            hover:-translate-y-0.5
            hover:shadow-[0_0_18px_rgba(167,139,250,0.45)]
            hover:bg-white/5
            cursor-pointer"
            style={{
              background:
                "linear-gradient(90deg,rgba(96,165,250,0.12),rgba(167,139,250,0.12))",
              border: "1px solid rgba(167,139,250,0.22)",
              color: "#a78bfa",
            }}
          >
            ✦ Smart Planner
          </span>
        </div>

        {/* Title input */}
        <div className="mb-4">
          <label className="mb-2 block text-[10px] uppercase tracking-[2px] text-white/60">
            Task Title
          </label>
          <input
            className="glass-input"
            type="text"
            placeholder="What do you want to accomplish?"
            maxLength={80}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          />
          <p className="mt-1 text-right text-xs text-white/50">
            {title.length}/80
          </p>
        </div>

        {/*Description*/}
        <textarea
          className="glass-input min-h-[100px] resize-none"
          value={description}
          maxLength={80}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task description"
        />
        <p className="mt-1 text-right text-xs text-white/50">
          {description.length}/80
        </p>

        {/* Date + Time */}
        <div className="mb-4 grid grid-cols-2 gap-3">
          <div>
            <label className="mb-2 block text-[10px] uppercase tracking-[2px] text-white/60">
              Due Date
            </label>
            <input
              className="glass-input"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
            {errors.date && (
              <p className="mt-1 text-xs text-red-400 text-center">
                ⚠ {errors.date}
              </p>
            )}
          </div>
          <div>
            <label className="mb-2 block text-[10px] uppercase tracking-[2px] text-white/60">
              Due Time
            </label>
            <input
              className="glass-input"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
            {errors.time && (
              <p className="mt-1 text-xs text-red-400 text-center">
                ⚠ {errors.time}
              </p>
            )}
          </div>
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="mb-2 block text-[10px] uppercase tracking-[2px] text-white/60">
            Category
          </label>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c.value}
                onClick={() => setCategory(c.value)}
                className="rounded-xl px-3 py-1.5 text-xs transition-all duration-200 cursor-pointer
                hover:-translate-y-0.5
                hover:shadow-[0_0_18px_rgba(167,139,250,0.45)]
                hover:bg-white/5"
                style={{
                  background:
                    category === c.value
                      ? "rgba(167,139,250,0.14)"
                      : "rgba(0,0,0,0.2)",
                  border:
                    category === c.value
                      ? "1px solid rgba(167,139,250,0.35)"
                      : "1px solid rgba(255,255,255,0.09)",
                  color:
                    category === c.value ? "#a78bfa" : "rgba(255,255,255,0.42)",
                }}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Priority */}
        <div className="mb-6">
          <label className="mb-2 block text-[10px] uppercase tracking-[2px] text-white/60">
            Priority
          </label>
          <div className="flex flex-wrap gap-2 ">
            {PRIORITIES.map((p) => (
              <button
                key={p.label}
                onClick={() => setPriority(p.label)}

                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 0 18px ${p.dot}88`;
                }}

                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow =
                    priority === p.label
                      ? `0 0 8px ${p.dot}22`
                      : "none";
                }}

                className="flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-all duration-200 cursor-pointer
                hover:-translate-y-0.5
                hover:shadow-[0_0_18px]"

                style={{
                  background:
                    priority === p.label ? p.color : "rgba(0,0,0,0.2)",
                  border:
                    priority === p.label
                      ? `1px solid ${p.border}`
                      : "1px solid rgba(255,255,255,0.09)",
                  color:
                    priority === p.label ? p.text : "rgba(255,255,255,0.42)",

                  boxShadow:
                    priority === p.label
                      ? `0 0 8px ${p.dot}22`
                      : "none",
                }}
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{
                    background:
                      priority === p.label ? p.dot : "rgba(255,255,255,0.25)",
                  }}
                />
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ translateY: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleAdd}
            className="flex items-center gap-2 rounded-2xl px-7 py-3 text-sm font-semibold text-white transition-all cursor-pointer"
            style={{
              background: "linear-gradient(135deg,#60a5fa,#a78bfa)",
              boxShadow: "0 8px 24px rgba(96,165,250,0.22)",
            }}
          >
            <Plus size={16} />
            Add Task
          </motion.button>

          <button
            onClick={handleClear}
            className="flex items-center gap-2 rounded-2xl px-5 py-3 text-sm text-white/50 transition-all duration-200 hover:text-white cursor-pointer
            hover:-translate-y-0.5
            hover:shadow-[0_0_18px_rgba(167,139,250,0.45)]
            hover:bg-white/5"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.09)",
            }}
          >
            <X size={14} />
            Clear
          </button>
        </div>
      </div>
    </motion.div>
  );
}

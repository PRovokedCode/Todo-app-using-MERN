import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import TodoItem from "./TodoItem";

const FILTERS = ["All", "Pending", "Completed", "High"];

export default function TodoList({
  tasks,
  filter,
  setFilter,
  search,
  setSearch,
  onToggle,
  onDelete,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.45, duration: 0.7 }}
      className="glass-card px-6 py-6"
    >
      {/* Header */}
      <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="font-syne text-xl font-bold">Your Tasks</h2>
          <p className="mt-1 text-xs text-white/60">
            Stay on track, finish strong.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-200 cursor-pointer
              hover:-translate-y-0.5
              hover:shadow-[0_0_18px_rgba(167,139,250,0.45)]
              hover:bg-white/5"
              style={
                filter === f
                  ? {
                      background: "rgba(255,255,255,0.92)",
                      color: "#080c14",
                      border: "1px solid transparent",
                    }
                  : {
                      background: "transparent",
                      color: "rgba(255,255,255,0.42)",
                      border: "1px solid rgba(255,255,255,0.09)",
                    }
              }
            >
              {f === "High" ? "🔴 High" : f}
            </button>
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search
          size={14}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white"
        />
        <input
          className="glass-input pl-10"
          type="text"
          placeholder="Search tasks…"
          className="glass-input h-14 px-5 text-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Task list */}
      <AnimatePresence mode="popLayout">
        {tasks.length > 0 ? (
          tasks.map((task, i) => (
            <TodoItem
              key={task.id}
              task={task}
              index={i}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          ))
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="py-10 text-center text-sm text-white/30"
          >
            ✨ Nothing here. Add a task above!
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
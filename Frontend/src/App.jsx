import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { useTasks } from "./hooks/useTasks";
import HeroSection from "./components/HeroSection";
import StatsRow from "./components/StatsRow";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import RightPanel from "./components/RightPanel";

import logo from "./assets/logo.svg";

import morningBg from "./assets/backgrounds/morning.jpg";
import afternoonBg from "./assets/backgrounds/afternoon.jpg";
import eveningBg from "./assets/backgrounds/evening.jpg";
import nightBg from "./assets/backgrounds/night.jpg";

const BG_IMAGES = {
  morning: morningBg,
  afternoon: afternoonBg,
  evening: eveningBg,
  night: nightBg,
};

function getTimePeriod() {
  const h = new Date().getHours();

  if (h < 12) return "morning";
  if (h < 17) return "afternoon";
  if (h < 21) return "evening";

  return "night";
}

export default function App() {
  const [bgUrl, setBgUrl] = useState("");

  const {
    filteredTasks,
    stats,
    progress,
    filter,
    setFilter,
    search,
    setSearch,
    addTask,
    deleteTask,
    toggleTask,
  } = useTasks();

  useEffect(() => {
    setBgUrl(BG_IMAGES[getTimePeriod()]);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${bgUrl})`,
        }}
      />

      {/* Overlay */}
      <div
        className="fixed inset-0 z-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(8,12,20,0.78) 0%, rgba(8,12,20,0.58) 100%)",
        }}
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 mx-auto flex min-h-screen w-[92%] max-w-[1700px] flex-col gap-4 px-4 py-5"
      >
        {/* Top Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1">
            <img
              src={logo}
              alt="Logo"
              className="h-24 w-24 object-contain -mr-5"
              style={{
                filter: "drop-shadow(0 0 10px rgba(96,165,250,0.45))",
              }}
            />

            <span
              className="text-[25px] font-semibold uppercase tracking-[3px] text-blue-500"
              style={{
                filter: "drop-shadow(0 0 10px rgba(96,165,250,0.45))",
              }}
            >
              DO IT
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            <span
              className="rounded-full px-3 py-1 text-[11px]"
              style={{
                background: "rgba(52,211,153,0.07)",
                border: "1px solid rgba(52,211,153,0.18)",
                color: "#34d399",
              }}
            >
              ● Live
            </span>

            <span
              className="rounded-full px-3 py-1 text-[11px] text-white/35"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.09)",
              }}
            >
              {new Date().toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
        </div>

        {/* Hero */}
        <HeroSection progress={progress} />

        {/* Main Grid */}
        <div className="grid gap-4 xl:grid-cols-[1.35fr_0.65fr]">
          {/* Left */}
          <div className="flex flex-col gap-4">
            <StatsRow stats={stats} />

            <TodoForm onAdd={addTask} />

            <TodoList
              tasks={filteredTasks}
              filter={filter}
              setFilter={setFilter}
              search={search}
              setSearch={setSearch}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
          </div>

          {/* Right */}
          <RightPanel progress={progress} stats={stats} />
        </div>
      </motion.div>
    </div>
  );
}
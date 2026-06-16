"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ScheduleOutput, TimeBlock } from "../api/plan/route";

const TYPE_STYLES: Record<TimeBlock["type"], string> = {
  focus: "border-l-accent bg-accent/8 text-foreground",
  admin: "border-l-muted/50 bg-surface-2 text-muted",
  break: "border-l-success/50 bg-success/5 text-success",
  buffer: "border-l-warn/30 bg-warn/5 text-warn",
};

const TYPE_BADGE: Record<TimeBlock["type"], string> = {
  focus: "bg-accent/20 text-accent-2",
  admin: "bg-border text-muted",
  break: "bg-success/10 text-success",
  buffer: "bg-warn/10 text-warn",
};

const PRIORITY_DOT: Record<string, string> = {
  high: "bg-danger",
  medium: "bg-warn",
  low: "bg-muted",
};

type State = "idle" | "loading" | "error" | { demo: boolean; schedule: ScheduleOutput };

export default function PlannerForm() {
  const [tasks, setTasks] = useState("");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00");
  const [state, setState] = useState<State>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!tasks.trim()) return;
    setState("loading");
    try {
      const res = await fetch("/api/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tasks, startTime, endTime }),
      });
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setState({ demo: data.demo, schedule: data.schedule });
    } catch {
      setState("error");
    }
  }

  const result = typeof state === "object" ? state : null;

  return (
    <section id="plan" className="mx-auto w-full max-w-3xl px-4 pb-32">
      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 mb-10">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold uppercase tracking-wide text-muted">
            Your tasks for today
          </label>
          <textarea
            value={tasks}
            onChange={(e) => setTasks(e.target.value)}
            placeholder={"Finish product roadmap\nReply to client emails\nFix login bug\nReview investor deck\nTeam standup call"}
            rows={6}
            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted/60 focus:border-accent focus:outline-none resize-none"
          />
          <p className="text-xs text-muted">One task per line. Be specific — AI works better with real task names.</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wide text-muted">Start time</label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-foreground focus:border-accent focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wide text-muted">End time</label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-foreground focus:border-accent focus:outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={state === "loading" || !tasks.trim()}
          className="flex items-center justify-center gap-2 rounded-xl bg-accent py-3.5 text-sm font-semibold text-white hover:opacity-90 active:scale-[0.99] transition-all disabled:opacity-50"
        >
          {state === "loading" ? (
            <>
              <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4z" />
              </svg>
              Planning your day…
            </>
          ) : (
            "Plan my day →"
          )}
        </button>
      </form>

      {state === "error" && (
        <div className="rounded-xl border border-danger/30 bg-danger/10 p-4 text-sm text-danger mb-8">
          Something went wrong. Please try again.
        </div>
      )}

      {/* Results */}
      <AnimatePresence>
        {result && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-6"
          >
            {result.demo && (
              <div className="flex items-center gap-2 rounded-xl border border-accent/30 bg-accent-soft px-4 py-2.5 text-xs text-accent-2">
                <span>◈</span> Demo schedule — add a Groq API key to generate from your real tasks
              </div>
            )}

            {/* Top priority banner */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl border border-accent/30 bg-accent-soft p-5"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-1">Today&apos;s #1 priority</p>
              <p className="text-lg font-bold text-foreground">{result.schedule.topPriority}</p>
              <p className="text-sm text-muted mt-1">{result.schedule.summary}</p>
            </motion.div>

            {/* Stats row */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: "Focus time", value: `${Math.floor(result.schedule.totalFocusMinutes / 60)}h ${result.schedule.totalFocusMinutes % 60}m`, color: "text-accent-2" },
                { label: "Break time", value: `${result.schedule.totalBreakMinutes}m`, color: "text-success" },
                { label: "Time blocks", value: result.schedule.blocks.length.toString(), color: "text-foreground" },
                { label: "Work day", value: `${startTime} – ${endTime}`, color: "text-muted" },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.07 }}
                  className="rounded-xl border border-border bg-surface p-3 text-center"
                >
                  <p className={`text-lg font-bold ${s.color}`}>{s.value}</p>
                  <p className="text-xs text-muted mt-0.5">{s.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Schedule blocks */}
            <div className="flex flex-col gap-2">
              {result.schedule.blocks.map((block, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.05 }}
                  className={`flex items-start gap-3 rounded-xl border-l-4 p-4 ${TYPE_STYLES[block.type]}`}
                >
                  <div className="shrink-0 text-center w-16">
                    <p className="text-xs font-mono text-muted">{block.startTime}</p>
                    <p className="text-[10px] text-muted/50">→ {block.endTime}</p>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      {block.priority && (
                        <span className={`h-2 w-2 rounded-full shrink-0 ${PRIORITY_DOT[block.priority]}`} />
                      )}
                      <p className="text-sm font-semibold truncate">{block.task}</p>
                      <span className={`text-[10px] rounded-full px-2 py-0.5 font-semibold uppercase tracking-wide ${TYPE_BADGE[block.type]}`}>
                        {block.type}
                      </span>
                    </div>
                    {block.notes && <p className="text-xs text-muted mt-1">{block.notes}</p>}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const FEATURES = [
  {
    icon: "🧠",
    title: "AI prioritization",
    body: "DayForge reads your tasks and automatically identifies what needs deep focus vs. what can be batched into quick slots.",
  },
  {
    icon: "⏱",
    title: "Smart time-blocking",
    body: "Each task gets a realistic time estimate and a concrete time slot. No more undefined to-do lists that never happen.",
  },
  {
    icon: "☕",
    title: "Built-in breaks",
    body: "Your schedule includes recovery breaks timed to your work sessions. Designed for sustainable energy — not burnout.",
  },
  {
    icon: "📅",
    title: "Work hours aware",
    body: "Set your start and end time. DayForge fits everything inside your real working day, nothing bleeds into your evening.",
  },
  {
    icon: "🎯",
    title: "One priority per day",
    body: "The AI surfaces your single most important task and schedules it at peak-energy morning time automatically.",
  },
  {
    icon: "⚡",
    title: "30-second planning",
    body: "Paste your raw task list. Click plan. That's it. No forms, no tagging, no categories — just results.",
  },
];

export default function FeaturesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="mx-auto max-w-4xl px-4 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
          Your day, finally{" "}
          <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">
            under control
          </span>
        </h2>
        <p className="mt-3 text-muted">
          Built for founders, freelancers, and deep workers who need to ship.
        </p>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: i * 0.07 }}
            className="rounded-2xl border border-border bg-surface p-5 hover:border-accent/40 transition-colors"
          >
            <div className="mb-3 text-2xl">{f.icon}</div>
            <p className="mb-1 font-semibold text-foreground">{f.title}</p>
            <p className="text-sm text-muted leading-relaxed">{f.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";

function IconBrain() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.5 3.5a2.5 2.5 0 0 0-2.5 2.5v.5A2.5 2.5 0 0 0 4.5 9v1a2.5 2.5 0 0 0 1 2 2.5 2.5 0 0 0-1 2v1a2.5 2.5 0 0 0 2.5 2.5v.5a2.5 2.5 0 0 0 5 0v-13a2.5 2.5 0 0 0-2.5-2.5Z" />
      <path d="M14.5 3.5a2.5 2.5 0 0 1 2.5 2.5v.5a2.5 2.5 0 0 1 2.5 2.5v1a2.5 2.5 0 0 1-1 2 2.5 2.5 0 0 1 1 2v1a2.5 2.5 0 0 1-2.5 2.5v.5a2.5 2.5 0 0 1-5 0v-13a2.5 2.5 0 0 1 2.5-2.5Z" />
    </svg>
  );
}
function IconClock() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  );
}
function IconCup() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 8h11v6a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V8Z" />
      <path d="M16 9.5h1.5a2.5 2.5 0 0 1 0 5H16" />
      <path d="M8 3.5c0 1-1 1-1 2M12 3.5c0 1-1 1-1 2" />
    </svg>
  );
}
function IconCalendar() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="5.5" width="16" height="14.5" rx="2.5" />
      <path d="M4 10h16M8 3.5v3M16 3.5v3" />
    </svg>
  );
}
function IconTarget() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="0.9" fill="white" />
    </svg>
  );
}
function IconBolt() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12.5 3 5 13.5h6l-1 7L19 10h-6l-0.5-7Z" />
    </svg>
  );
}

const FEATURES: { icon: ReactNode; title: string; body: string }[] = [
  { icon: <IconBrain />, title: "AI prioritization", body: "DayForge reads your tasks and automatically identifies what needs deep focus vs. what can be batched into quick slots." },
  { icon: <IconClock />, title: "Smart time-blocking", body: "Each task gets a realistic time estimate and a concrete time slot. No more undefined to-do lists that never happen." },
  { icon: <IconCup />, title: "Built-in breaks", body: "Your schedule includes recovery breaks timed to your work sessions. Designed for sustainable energy, not burnout." },
  { icon: <IconCalendar />, title: "Work hours aware", body: "Set your start and end time. DayForge fits everything inside your real working day, nothing bleeds into your evening." },
  { icon: <IconTarget />, title: "One priority per day", body: "The AI surfaces your single most important task and schedules it at peak-energy morning time automatically." },
  { icon: <IconBolt />, title: "30-second planning", body: "Paste your raw task list. Click plan. That's it. No forms, no tagging, no categories, just results." },
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
            whileHover={{ y: -3 }}
            className="rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-accent/40"
          >
            <div className="icon-3d mb-4">{f.icon}</div>
            <p className="mb-1 font-semibold text-foreground">{f.title}</p>
            <p className="text-sm leading-relaxed text-muted">{f.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

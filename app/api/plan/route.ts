import { NextRequest, NextResponse } from "next/server";
import { persistPlan } from "@/lib/db";
import { completeWithFallback } from "@/lib/ai-fallback";

export const maxDuration = 30;

export type TimeBlock = {
  startTime: string;
  endTime: string;
  task: string;
  type: "focus" | "admin" | "break" | "buffer";
  priority: "high" | "medium" | "low" | null;
  notes?: string;
};

export type ScheduleOutput = {
  date: string;
  topPriority: string;
  blocks: TimeBlock[];
  totalFocusMinutes: number;
  totalBreakMinutes: number;
  summary: string;
};

const DEMO: ScheduleOutput = {
  date: "Today",
  topPriority: "Finish product roadmap document",
  blocks: [
    { startTime: "09:00", endTime: "09:15", task: "Daily review & setup", type: "admin", priority: "low" },
    { startTime: "09:15", endTime: "11:15", task: "Finish product roadmap document", type: "focus", priority: "high", notes: "Deep work — close all notifications" },
    { startTime: "11:15", endTime: "11:30", task: "Break — stretch & water", type: "break", priority: null },
    { startTime: "11:30", endTime: "12:30", task: "Reply to pending client emails", type: "admin", priority: "medium" },
    { startTime: "12:30", endTime: "13:30", task: "Lunch break", type: "break", priority: null },
    { startTime: "13:30", endTime: "15:00", task: "Fix login bug on production app", type: "focus", priority: "high", notes: "Urgent — blocking users" },
    { startTime: "15:00", endTime: "15:10", task: "Quick break", type: "break", priority: null },
    { startTime: "15:10", endTime: "16:10", task: "Review investor deck slides", type: "focus", priority: "medium" },
    { startTime: "16:10", endTime: "16:30", task: "Admin & wrap-up", type: "admin", priority: "low" },
    { startTime: "16:30", endTime: "17:00", task: "Buffer / catch-up time", type: "buffer", priority: null },
  ],
  totalFocusMinutes: 240,
  totalBreakMinutes: 55,
  summary: "High-intensity day with 4 hours of deep focus. Roadmap is your anchor task — protect that morning block.",
};

export async function POST(req: NextRequest) {
  const { tasks, startTime, endTime } = await req.json();

  if (!tasks || typeof tasks !== "string") {
    return NextResponse.json({ error: "tasks required" }, { status: 400 });
  }

  const systemPrompt = `You are a world-class productivity coach and time-block scheduler.
Given a raw list of tasks from a user, you create a realistic, optimized daily schedule.

Rules:
- Work within the provided start and end times (default 9:00-17:00)
- Schedule the most cognitively demanding task first in the morning (peak energy)
- Include short 10-15 min breaks every 90-120 min of focus work
- Include a 45-60 min lunch break around 12:00-13:00
- Leave a 30 min buffer/catch-up block at the end
- Be realistic about time estimates — don't cram too much
- type must be one of: "focus", "admin", "break", "buffer"
- priority must be: "high", "medium", "low", or null (for breaks/buffers)

Return ONLY valid JSON matching this exact shape:
{
  "date": "Today",
  "topPriority": "the single most important task",
  "blocks": [
    {
      "startTime": "HH:MM",
      "endTime": "HH:MM",
      "task": "task name",
      "type": "focus|admin|break|buffer",
      "priority": "high|medium|low|null",
      "notes": "optional short tip or context"
    }
  ],
  "totalFocusMinutes": 0,
  "totalBreakMinutes": 0,
  "summary": "one sentence about the day's energy and focus"
}`;

  const userMessage = `Work hours: ${startTime || "09:00"} to ${endTime || "17:00"}

My tasks for today:
${tasks}`;

  try {
    const { content } = await completeWithFallback(systemPrompt, userMessage, { temperature: 0.3, maxTokens: 2000 });
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    const schedule: ScheduleOutput = JSON.parse(jsonMatch ? jsonMatch[0] : content);
    const planId = await persistPlan(tasks, schedule, false).catch((err) => {
      console.error("dayforge_plans insert failed:", err instanceof Error ? err.message : err);
      return undefined;
    });
    return NextResponse.json({ demo: false, schedule, planId });
  } catch (err) {
    console.error("completeWithFallback failed:", err instanceof Error ? err.message : err);
    await new Promise((r) => setTimeout(r, 1500));
    const planId = await persistPlan(tasks, DEMO, true).catch((dbErr) => {
      console.error("dayforge_plans insert failed:", dbErr instanceof Error ? dbErr.message : dbErr);
      return undefined;
    });
    return NextResponse.json({ demo: true, schedule: DEMO, planId });
  }
}

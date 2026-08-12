import { Pool } from "pg";
import type { ScheduleOutput } from "@/app/api/plan/route";

let pool: Pool | null = null;

function getPool() {
  if (!process.env.DATABASE_URL) return null;
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
      max: 5,
    });
  }
  return pool;
}

export async function persistPlan(tasksInput: string, schedule: ScheduleOutput, demo: boolean) {
  const db = getPool();
  if (!db) return null;
  const res = await db.query(
    `INSERT INTO dayforge_plans (tasks_input, schedule, demo) VALUES ($1, $2, $3) RETURNING id`,
    [tasksInput, JSON.stringify(schedule), demo],
  );
  return res.rows[0]?.id as string | undefined;
}

export async function persistReview(
  planId: string | null,
  whatWorked: string,
  whatFailed: string,
  lesson: string,
) {
  const db = getPool();
  if (!db) return { persisted: false as const, reason: "DATABASE_URL not configured" };
  await db.query(
    `INSERT INTO dayforge_reviews (plan_id, what_worked, what_failed, lesson) VALUES ($1, $2, $3, $4)`,
    [planId, whatWorked, whatFailed, lesson],
  );
  return { persisted: true as const };
}

export async function recentReviews(limit = 14) {
  const db = getPool();
  if (!db) return [];
  const res = await db.query(
    `SELECT id, plan_id, created_at, what_worked, what_failed, lesson
     FROM dayforge_reviews ORDER BY created_at DESC LIMIT $1`,
    [limit],
  );
  return res.rows;
}

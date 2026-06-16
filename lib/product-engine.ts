export type IntelligenceInput = { input?: string };
const product = {
  "repo": "DayForge",
  "suite": "AI Productivity Suite",
  "domain": "Daily execution",
  "accent": "from-amber-200 via-orange-300 to-rose-300",
  "hero": "Forge a chaotic day into a calm execution command plan.",
  "sub": "DayForge helps high-agency builders protect deep work, recover from delays, and end the day with a clear learning loop instead of an exhausted task graveyard.",
  "input": "Today: 3 calls, launch update, proposal work, gym at 6, family time, urgent bug",
  "cta": "Forge my day",
  "score": "Execution clarity",
  "modules": [
    [
      "Priority furnace",
      "Sort the day by leverage, urgency, and energy."
    ],
    [
      "Time-block foundry",
      "Create focus blocks, buffers, and recovery paths."
    ],
    [
      "Interruption shield",
      "Detect where the day will break before it breaks."
    ],
    [
      "Daily review memory",
      "Capture what worked, failed, and should change tomorrow."
    ]
  ],
  "rows": [
    [
      "Deep work block",
      "Build",
      "High",
      "Protect the one output that makes the day valuable."
    ],
    [
      "Admin batch",
      "Operations",
      "Medium",
      "Contain shallow work to avoid day-wide leakage."
    ],
    [
      "Recovery buffer",
      "Schedule",
      "High",
      "Pre-plan what moves when meetings run over."
    ],
    [
      "Shutdown ritual",
      "Memory",
      "Medium",
      "Save lessons while they are still fresh."
    ]
  ],
  "missions": [
    [
      "Calendar integration",
      "Import real events and constraints before planning."
    ],
    [
      "Energy pattern learning",
      "Adapt schedules to the user’s best hours."
    ],
    [
      "Voice morning plan",
      "Let users speak the day and receive a command plan."
    ],
    [
      "End-of-day lesson writer",
      "Feed what worked and failed into persistent memory."
    ]
  ]
} as const;
function scoreFor(subject: string) { let score = 57 + Math.min(30, Math.floor(subject.length / 6)); if (/risk|urgent|investor|client|payment|contract|meeting|decision|launch|proof|delay/i.test(subject)) score += 7; return Math.min(98, score); }
function band(score: number) { return score >= 86 ? 'strong' : score >= 72 ? 'ready' : score >= 60 ? 'needs review' : 'starter'; }
export function generateIntelligence({ input = '' }: IntelligenceInput) {
  const subject = input.trim() || product.input;
  const score = scoreFor(subject);
  return {
    product: product.repo,
    brand: 'ArkNet Digital',
    suite: product.suite,
    domain: product.domain,
    subject,
    score,
    status: band(score),
    executive_summary: product.sub,
    intelligence_map: product.modules.map(([label, value]) => ({ label, value, status: score >= 72 ? 'priority' : 'review' })),
    action_queue: product.rows.slice(0, 3).map(([item, owner, priority, note]) => ({ action: item + ' - ' + owner, priority, impact: note })),
    contributor_lanes: product.missions.map(([lane, mission]) => ({ lane, mission })),
    generated_at: new Date().toISOString()
  };
}

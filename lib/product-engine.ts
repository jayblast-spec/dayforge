export type IntelligenceInput = { input?: string };

const product = {
  "repo": "DayForge",
  "suite": "AI Productivity Suite",
  "category": "Daily execution",
  "audience": "busy founders, builders, and high-agency teams",
  "promise": "turn a chaotic day into a sharp execution plan with recovery buffers",
  "inputLabel": "Today's goals, meetings, and constraints",
  "placeholder": "3 calls, launch landing update, gym at 6, need deep work for proposal",
  "primary": "Forge my day",
  "gradient": "from-amber-200 via-orange-300 to-rose-300",
  "modules": [
    "Priority sorting",
    "Calendar blocks",
    "Focus sprints",
    "Risk flags",
    "End-of-day review"
  ],
  "outputs": [
    "Daily command plan",
    "Protected deep work",
    "Delay recovery path",
    "Shutdown checklist"
  ],
  "next": [
    "calendar sync",
    "energy-pattern learning",
    "voice morning plan",
    "end-of-day learning loop"
  ]
} as const;

function score(text: string) {
  const length = text.trim().length;
  const diversity = new Set(text.toLowerCase().replace(/[^a-z0-9 ]/g, '').split(/\s+/).filter(Boolean)).size;
  return Math.min(97, 48 + Math.floor(length / 7) + Math.min(28, diversity));
}

export function generateIntelligence({ input = '' }: IntelligenceInput) {
  const subject = input.trim() || product.placeholder;
  const confidence = score(subject);
  const urgency = confidence > 82 ? 'high' : confidence > 66 ? 'medium' : 'starter';
  return {
    product: product.repo,
    category: product.category,
    subject,
    confidence,
    urgency,
    executive_summary: product.promise,
    immediate_outputs: product.outputs.map((output, index) => ({
      title: output,
      detail: output + ' for: ' + subject,
      priority: index === 0 ? 'primary' : index === 1 ? 'supporting' : 'next'
    })),
    automation_plan: product.modules.map((module, index) => ({
      stage: index + 1,
      module,
      value: 'Automate ' + module.toLowerCase() + ' so ' + product.audience + ' can move faster with less manual work.'
    })),
    future_addons: product.next.map((addon, index) => ({
      name: addon,
      horizon: index < 2 ? 'v2' : 'v3',
      contributor_lane: index % 2 === 0 ? 'integration' : 'product intelligence'
    })),
    contributor_brief: 'Improve ' + product.repo + ' by making ' + product.category.toLowerCase() + ' easier for ' + product.audience + '.',
    generated_at: new Date().toISOString()
  };
}

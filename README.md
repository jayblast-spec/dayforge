<div align="center">

# DayForge

### Paste Your Tasks, Get an AI Time-Blocked Schedule

DayForge converts a raw task list into a realistic, time-boxed daily schedule — deep work blocks placed at peak hours, admin work batched together, and highest-leverage tasks front-loaded by default. Add a task mid-day and the rest of the day regenerates around it.

<p>
  <a href="https://dayforge-psi.vercel.app"><img alt="Live Demo" src="https://img.shields.io/badge/Live-Demo-1D4ED8?style=for-the-badge&logo=vercel&logoColor=white"></a>
  <a href="https://github.com/jayblast-spec/dayforge"><img alt="GitHub Repo" src="https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white"></a>
</p>

<p>
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-App%20Router-000000?style=flat-square&logo=next.js&logoColor=white">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-Product%20Layer-007ACC?style=flat-square&logo=typescript&logoColor=white">
  <img alt="Tailwind" src="https://img.shields.io/badge/Tailwind-Design%20System-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white">
  <img alt="Framer Motion" src="https://img.shields.io/badge/Framer%20Motion-Interface%20Motion-1D4ED8?style=flat-square&logo=framer&logoColor=white">
  <img alt="Groq" src="https://img.shields.io/badge/Groq-Fast%20Inference-F55036?style=flat-square">
  <img alt="Vercel" src="https://img.shields.io/badge/Vercel-Deployment-000000?style=flat-square&logo=vercel&logoColor=white">
</p>

<p>
  <img alt="Animated DayForge headline" src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=700&size=18&duration=2600&pause=650&color=1D4ED8&center=true&vCenter=true&width=760&lines=Tasks+in+%E2%86%92+Time-blocked+day+out;Deep+work+at+peak+hours;Admin+batched%2C+priorities+front-loaded;Re-plan+the+day+in+one+click">
</p>

</div>

## What It Does

DayForge takes a pasted task list and builds a time-boxed daily schedule that accounts for meetings, breaks, and context-switching cost, places deep-work blocks at peak-energy hours, batches admin work together, and orders tasks by leverage. The resulting schedule exports for Notion, Google Calendar, or plain copy-paste, and can be regenerated on the fly when a new task is added mid-day.

## How It Works

- `app/page.tsx` renders the landing shell with `HeroSection`, `FeaturesSection`, and the `PlannerForm` input component.
- `app/api/plan/route.ts` sends the submitted task list to the Groq Chat Completions API (`llama-3.3-70b-versatile`) and returns a structured, time-blocked schedule.
- `app/api/intelligence/route.ts` provides a supporting formatting pass over the generated plan.
- Styling is Tailwind CSS with Framer Motion handling interface transitions; the app is a single Next.js App Router deployment with no database layer.

## Live

[dayforge-psi.vercel.app](https://dayforge-psi.vercel.app)

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| AI | Groq (`llama-3.3-70b-versatile`) |
| Styling | Tailwind CSS |
| Motion | Framer Motion |
| Deployment | Vercel |

<div align="center">

<img alt="Footer" src="https://capsule-render.vercel.app/api?type=rect&height=60&color=0:1D4ED8,55:0B1E3D,100:020617&text=michael%40arknet.digital&fontColor=FAFAFA&fontSize=18&fontAlign=50&animation=fadeIn">

</div>

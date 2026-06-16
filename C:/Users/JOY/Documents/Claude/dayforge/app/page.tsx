"use client";

import { useRef } from "react";
import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";
import PlannerForm from "./components/PlannerForm";
import Footer from "./components/Footer";

export default function Home() {
  const planRef = useRef<HTMLDivElement>(null);

  function scrollToPlan() {
    planRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <main>
      <HeroSection onPlanClick={scrollToPlan} />
      <FeaturesSection />
      <div ref={planRef} className="scroll-mt-8 pt-8">
        <div className="mx-auto max-w-3xl px-4 mb-10">
          <h2 className="text-xl font-bold text-foreground">Plan your day</h2>
          <p className="text-sm text-muted mt-1">
            Paste your tasks below — one per line. Set your work hours and let DayForge build your schedule.
          </p>
        </div>
        <PlannerForm />
      </div>
      <Footer />
    </main>
  );
}

'use client';

import { useRef } from 'react';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import PlannerForm from './components/PlannerForm';
import Footer from './components/Footer';

export default function Home() {
  const plannerRef = useRef<HTMLDivElement>(null);

  function scrollToPlanner() {
    plannerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <main className="min-h-dvh bg-background text-foreground">
      <HeroSection onPlanClick={scrollToPlanner} />
      <div ref={plannerRef} />
      <PlannerForm />
      <FeaturesSection />
      <Footer />
    </main>
  );
}

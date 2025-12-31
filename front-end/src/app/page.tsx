"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { PHYSICS } from "@/components/ui/motion-system";

// Import all home components
import {
  HeroSection,
  ImpactTicker,
  FeaturesBento,
  HowItWorks,
  HeroesMarquee,
  CTASection,
  Footer,
} from "@/components/home";

// ============================================================================
// FLOATING NAVBAR - Appears on scroll
// ============================================================================

function FloatingNavbar() {
  const { scrollY } = useScroll();
  const navOpacity = useTransform(scrollY, [0, 100], [0, 1]);
  const navY = useTransform(scrollY, [0, 100], [-20, 0]);

  return (
    <motion.header
      style={{ opacity: navOpacity, y: navY }}
      className="fixed left-0 right-0 top-0 z-50"
    >
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between rounded-2xl border border-slate-200/60 bg-white/80 px-6 py-3 shadow-lg shadow-slate-200/50 backdrop-blur-xl">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-md">
              <MapPin className="h-5 w-5" />
            </div>
            <span className="font-bold text-slate-900">ZeroHunger</span>
          </Link>

          {/* Nav Links - Desktop */}
          <nav className="hidden items-center gap-8 md:flex">
            <a href="#features" className="text-sm font-medium text-slate-600 transition-colors hover:text-emerald-600">
              Features
            </a>
            <a href="#how-it-works" className="text-sm font-medium text-slate-600 transition-colors hover:text-emerald-600">
              How It Works
            </a>
            <a href="#community" className="text-sm font-medium text-slate-600 transition-colors hover:text-emerald-600">
              Community
            </a>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            <Button asChild variant="ghost" className="hidden text-slate-700 hover:text-emerald-600 sm:inline-flex">
              <Link href="/login">Log in</Link>
            </Button>
            <Link href="/register">
              <MagneticButton
                size="sm"
                className="rounded-full bg-emerald-600 px-5 font-medium hover:bg-emerald-700"
              >
                Get Started
              </MagneticButton>
            </Link>
          </div>
        </div>
      </div>
    </motion.header>
  );
}

// ============================================================================
// INITIAL NAVBAR - Visible at top
// ============================================================================

function InitialNavbar() {
  const { scrollY } = useScroll();
  const navOpacity = useTransform(scrollY, [0, 100], [1, 0]);

  return (
    <motion.header
      style={{ opacity: navOpacity }}
      className="absolute left-0 right-0 top-0 z-40"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ ...PHYSICS.bouncy, delay: 0.1 }}
            className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-200/50"
          >
            <MapPin className="h-6 w-6" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col leading-tight"
          >
            <span className="font-bold tracking-tight text-slate-900">ZeroHunger</span>
            <span className="text-xs text-slate-500">Turning excess into access</span>
          </motion.div>
        </Link>

        {/* Nav Links - Desktop */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="hidden items-center gap-8 lg:flex"
        >
          <a href="#features" className="text-sm font-medium text-slate-600 transition-colors hover:text-emerald-600">
            Features
          </a>
          <a href="#how-it-works" className="text-sm font-medium text-slate-600 transition-colors hover:text-emerald-600">
            How It Works
          </a>
          <a href="#community" className="text-sm font-medium text-slate-600 transition-colors hover:text-emerald-600">
            Community
          </a>
          <a href="#impact" className="text-sm font-medium text-slate-600 transition-colors hover:text-emerald-600">
            Impact
          </a>
        </motion.nav>

        {/* Auth Buttons */}
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center gap-3"
        >
          <Button asChild variant="ghost" className="text-slate-700 hover:bg-emerald-50 hover:text-emerald-700">
            <Link href="/login">Log in</Link>
          </Button>
          <Link href="/register">
            <MagneticButton
              variant="default"
              className="rounded-full bg-emerald-600 px-6 font-medium shadow-lg shadow-emerald-200/50 hover:bg-emerald-700"
            >
              Join Now
            </MagneticButton>
          </Link>
        </motion.div>
      </div>
    </motion.header>
  );
}

// ============================================================================
// SCROLL PROGRESS INDICATOR
// ============================================================================

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 right-0 top-0 z-50 h-1 origin-left bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500"
    />
  );
}

// ============================================================================
// SECTION WRAPPER WITH ID FOR NAVIGATION
// ============================================================================

interface SectionProps {
  id: string;
  children: React.ReactNode;
}

function Section({ id, children }: SectionProps) {
  return (
    <div id={id} className="scroll-mt-24">
      {children}
    </div>
  );
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden bg-white">
      {/* Scroll Progress */}
      <ScrollProgress />

      {/* Navigation */}
      <InitialNavbar />
      <FloatingNavbar />

      {/* Main Content */}
      <main>
        {/* Hero Section - The Entrance */}
        <HeroSection />

        {/* Impact Ticker - Emotional Numbers */}
        <Section id="impact">
          <ImpactTicker />
        </Section>

        {/* Features Bento Grid */}
        <Section id="features">
          <FeaturesBento />
        </Section>

        {/* How It Works - Scroll Story */}
        <Section id="how-it-works">
          <HowItWorks />
        </Section>

        {/* Community Heroes Marquee */}
        <Section id="community">
          <HeroesMarquee />
        </Section>

        {/* Final CTA */}
        <CTASection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

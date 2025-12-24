"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, Bike, HeartHandshake, MapPin, Utensils } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const heroContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const heroItem: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 * i, duration: 0.6, ease: "easeOut" as const },
  }),
};

const steps = [
  {
    title: "Post",
    description: "Donors list surplus food with pickup windows and locations.",
  },
  {
    title: "Claim",
    description: "Volunteers claim, verify pickup codes, and coordinate routes.",
  },
  {
    title: "Deliver",
    description: "Recipients receive fresh food quickly and with dignity.",
  },
];

const pillars = [
  {
    title: "Donors",
    icon: HeartHandshake,
    copy: "Post surplus food in seconds. Track your impact.",
  },
  {
    title: "Volunteers",
    icon: Bike,
    copy: "Heroic deliveries. Claim donations, verify pickup, and earn impact points.",
  },
  {
    title: "Recipients",
    icon: Utensils,
    copy: "Dignified access. Locate nearby food sources anonymously.",
  },
];

export default function Home() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-emerald-50 via-white to-emerald-50">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, rgba(16, 185, 129, 0.14), transparent 30%), radial-gradient(circle at 80% 0%, rgba(16, 185, 129, 0.12), transparent 32%), radial-gradient(circle at 50% 80%, rgba(16, 185, 129, 0.1), transparent 26%)",
        }}
      />

      <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 shadow-sm">
            <MapPin className="h-5 w-5" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold tracking-[0.18em] text-emerald-600">ZeroHunger</span>
            <span className="text-sm text-slate-600">Turning excess into access</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button asChild variant="ghost" className="text-emerald-700 hover:bg-emerald-100">
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild className="bg-emerald-600 px-4 hover:bg-emerald-700">
            <Link href="/register">Join Now</Link>
          </Button>
        </div>
      </header>

      <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 pb-16 pt-6 sm:gap-20 sm:pb-24 sm:pt-10">
        <motion.section
          variants={heroContainer}
          initial="hidden"
          animate="show"
          className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]"
        >
          <div className="space-y-8">
            <motion.p variants={heroItem} className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-600">
              Join thousands of food heroes
            </motion.p>
            <motion.h1
              variants={heroItem}
              className="text-4xl font-black leading-[1.05] text-slate-900 sm:text-5xl lg:text-6xl"
            >
              Zero Hunger, Zero Waste.
            </motion.h1>
            <motion.p variants={heroItem} className="max-w-2xl text-lg text-slate-700 sm:text-xl">
              We connect surplus food from donors with volunteers and recipients in minutes. Every delivery keeps food out of landfills and puts meals on tables.
            </motion.p>
            <motion.div variants={heroItem} className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                asChild
                className="h-11 rounded-full bg-emerald-600 px-6 text-base font-semibold shadow-lg shadow-emerald-200 hover:bg-emerald-700"
              >
                <Link href="/register">Join the Movement</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-11 rounded-full border-emerald-200 px-6 text-base font-semibold text-emerald-700 hover:border-emerald-300 hover:bg-emerald-50"
              >
                <Link href="/login">Login</Link>
              </Button>
            </motion.div>
          </div>

          <motion.div
            variants={heroItem}
            className="relative overflow-hidden rounded-3xl bg-white/70 p-8 shadow-[0_30px_80px_-50px_rgba(16,185,129,0.6)] ring-1 ring-emerald-100 backdrop-blur"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/60 via-white to-emerald-200/40" />
            <div className="relative flex flex-col gap-4">
              <div className="flex items-center gap-3 text-sm font-semibold text-emerald-700">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-emerald-100">
                  <HeartHandshake className="h-5 w-5" />
                </div>
                Trusted by community kitchens, shelters, and local heroes
              </div>
              <div className="grid gap-4 rounded-2xl border border-emerald-100 bg-white/80 p-4 shadow-inner">
                <div className="flex items-center justify-between text-sm text-slate-700">
                  <span className="font-semibold text-slate-900">Live Impact</span>
                  <span className="flex items-center gap-1 text-emerald-600">
                    <ArrowRight className="h-4 w-4" /> Growing daily
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="rounded-xl bg-emerald-50 p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-emerald-600">Meals delivered</p>
                    <p className="mt-2 text-2xl font-bold text-emerald-900">128,420</p>
                    <p className="text-xs text-emerald-700">+1,240 today</p>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Food rescued</p>
                    <p className="mt-2 text-2xl font-bold text-slate-900">86,300 kg</p>
                    <p className="text-xs text-slate-600">Emission savings growing</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.section>

        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-emerald-300" />
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">Three pillars</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  variants={cardVariants}
                  initial="hidden"
                  animate="show"
                  custom={idx}
                  whileHover={{ scale: 1.05, translateY: -4, boxShadow: "0 25px 60px -40px rgba(16,185,129,0.6)" }}
                >
                  <Card className="h-full border-emerald-100 bg-white/80 backdrop-blur">
                    <CardHeader className="flex flex-row items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                        <Icon className="h-5 w-5" />
                      </div>
                      <CardTitle className="text-lg font-semibold text-slate-900">{pillar.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base text-slate-700">{pillar.copy}</CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </section>

        <section className="space-y-8">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-emerald-300" />
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">How it works</p>
          </div>
          <div className="grid gap-8 lg:grid-cols-3 lg:items-start">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                variants={cardVariants}
                initial="hidden"
                animate="show"
                custom={index}
                className="relative"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg shadow-emerald-200">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900">{step.title}</h3>
                </div>
                <p className="mt-3 text-base text-slate-700">{step.description}</p>
                {index < steps.length - 1 && (
                  <div className="mt-4 flex items-center gap-2 text-sm font-medium text-emerald-700 lg:absolute lg:left-[55%] lg:top-5 lg:w-1/2 lg:translate-x-1/2 lg:-translate-y-1/2 lg:items-center lg:gap-3">
                    <span className="hidden h-px flex-1 bg-gradient-to-r from-emerald-200 via-emerald-400 to-emerald-200 lg:inline" />
                    <ArrowRight className="h-4 w-4" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-emerald-100/70 bg-white/70 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 py-6 text-sm text-slate-600 sm:flex-row">
          <span>© {new Date().getFullYear()} ZeroHunger. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <Link href="https://github.com/zerohunger" className="hover:text-emerald-700" target="_blank" rel="noreferrer">
              Github
            </Link>
            <Link href="#" className="hover:text-emerald-700">
              Docs
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

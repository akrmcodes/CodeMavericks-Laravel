"use client";

import { useRef } from "react";
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
    useInView,
} from "framer-motion";
import {
    Camera,
    MapPin,
    QrCode,
    Truck,
    CheckCircle2,
    Heart,
    ArrowDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal, PHYSICS } from "@/components/ui/motion-system";

// ============================================================================
// TYPES
// ============================================================================

interface Step {
    id: number;
    title: string;
    description: string;
    icon: React.ElementType;
    color: string;
    gradient: string;
    detail: string;
}

// ============================================================================
// STEPS DATA
// ============================================================================

const steps: Step[] = [
    {
        id: 1,
        title: "Post Your Donation",
        description: "Snap a photo of your surplus food, add details like quantity and pickup window. Takes less than 60 seconds.",
        icon: Camera,
        color: "emerald",
        gradient: "from-emerald-500 to-teal-500",
        detail: "Our AI automatically categorizes food type and suggests optimal pickup times based on freshness.",
    },
    {
        id: 2,
        title: "Smart Matching",
        description: "Our algorithm instantly notifies nearby volunteers based on location, availability, and route optimization.",
        icon: MapPin,
        color: "blue",
        gradient: "from-blue-500 to-cyan-500",
        detail: "Machine learning improves matching accuracy over time, learning from successful deliveries.",
    },
    {
        id: 3,
        title: "Secure Pickup",
        description: "Volunteer claims the donation and arrives with a unique QR code. Scan to verify and release the food safely.",
        icon: QrCode,
        color: "violet",
        gradient: "from-violet-500 to-purple-500",
        detail: "Cryptographic verification ensures accountability and builds trust between all parties.",
    },
    {
        id: 4,
        title: "Track Delivery",
        description: "Real-time GPS tracking lets everyone see the food&apos;s journey from donor to recipient.",
        icon: Truck,
        color: "amber",
        gradient: "from-amber-500 to-orange-500",
        detail: "Temperature-sensitive items are prioritized for the fastest routes.",
    },
    {
        id: 5,
        title: "Confirm & Celebrate",
        description: "Recipient confirms delivery. Everyone gets impact points and the community celebrates another meal saved.",
        icon: Heart,
        color: "rose",
        gradient: "from-rose-500 to-pink-500",
        detail: "Impact scores unlock badges, leaderboard positions, and community recognition.",
    },
];

// ============================================================================
// TIMELINE CONNECTOR
// ============================================================================

function TimelineConnector({ progress }: { progress: number }) {
    return (
        <div className="absolute left-8 top-0 hidden h-full w-0.5 bg-slate-200 md:block">
            <motion.div
                className="w-full origin-top bg-gradient-to-b from-emerald-500 via-blue-500 to-rose-500"
                style={{ height: `${progress * 100}%` }}
            />
        </div>
    );
}

// ============================================================================
// STEP CARD COMPONENT
// ============================================================================

interface StepCardProps {
    step: Step;
    index: number;
}

function StepCard({ step, index }: StepCardProps) {
    const Icon = step.icon;
    const cardRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(cardRef, { once: false, margin: "-40% 0px -40% 0px" });

    const colorClasses = {
        emerald: "bg-emerald-100 text-emerald-600 border-emerald-200",
        blue: "bg-blue-100 text-blue-600 border-blue-200",
        violet: "bg-violet-100 text-violet-600 border-violet-200",
        amber: "bg-amber-100 text-amber-600 border-amber-200",
        rose: "bg-rose-100 text-rose-600 border-rose-200",
    };

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ ...PHYSICS.default, delay: index * 0.1 }}
            className={cn(
                "relative flex gap-6 pb-16 last:pb-0",
                "md:pl-24"
            )}
        >
            {/* Step Number Circle - Desktop */}
            <motion.div
                animate={{
                    scale: isInView ? 1.1 : 1,
                    boxShadow: isInView
                        ? "0 0 30px rgba(16, 185, 129, 0.4)"
                        : "0 0 0 rgba(16, 185, 129, 0)",
                }}
                transition={PHYSICS.snappy}
                className={cn(
                    "absolute left-0 hidden h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-white shadow-lg md:flex",
                    "z-10"
                )}
            >
                <div
                    className={cn(
                        "flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br text-white font-bold text-lg",
                        step.gradient
                    )}
                >
                    {step.id}
                </div>
            </motion.div>

            {/* Card Content */}
            <motion.div
                animate={{
                    y: isInView ? 0 : 20,
                    opacity: isInView ? 1 : 0.7,
                }}
                transition={PHYSICS.gentle}
                className={cn(
                    "flex-1 rounded-3xl border bg-white p-6 shadow-lg transition-shadow duration-300",
                    isInView ? "shadow-xl" : "shadow-md",
                    `border-${step.color}-100`
                )}
            >
                <div className="flex items-start gap-4">
                    {/* Mobile Step Number */}
                    <div
                        className={cn(
                            "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-white font-bold md:hidden",
                            step.gradient
                        )}
                    >
                        {step.id}
                    </div>

                    {/* Icon */}
                    <motion.div
                        animate={{ rotate: isInView ? [0, -10, 10, 0] : 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className={cn(
                            "hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl md:flex",
                            colorClasses[step.color as keyof typeof colorClasses]
                        )}
                    >
                        <Icon className="h-7 w-7" />
                    </motion.div>

                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-slate-900">{step.title}</h3>
                        <p className="mt-2 text-slate-600">{step.description}</p>

                        {/* Expandable detail */}
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{
                                height: isInView ? "auto" : 0,
                                opacity: isInView ? 1 : 0,
                            }}
                            transition={{ duration: 0.3, delay: 0.3 }}
                            className="overflow-hidden"
                        >
                            <div className="mt-4 rounded-xl bg-slate-50 p-4">
                                <p className="text-sm text-slate-500">
                                    <span className="font-medium text-slate-700">Pro tip: </span>
                                    {step.detail}
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Animated checkmark when in view */}
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                        scale: isInView ? 1 : 0,
                        opacity: isInView ? 1 : 0,
                    }}
                    transition={{ ...PHYSICS.bouncy, delay: 0.4 }}
                    className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg"
                >
                    <CheckCircle2 className="h-5 w-5" />
                </motion.div>
            </motion.div>
        </motion.div>
    );
}

// ============================================================================
// PARALLAX FLOATING ELEMENTS
// ============================================================================

function ParallaxElements({ scrollProgress }: { scrollProgress: number }) {
    const y1 = useSpring(useTransform(() => scrollProgress * -100), PHYSICS.gentle);
    const y2 = useSpring(useTransform(() => scrollProgress * -150), PHYSICS.gentle);
    const y3 = useSpring(useTransform(() => scrollProgress * -80), PHYSICS.gentle);
    const rotate1 = useSpring(useTransform(() => scrollProgress * 45), PHYSICS.gentle);
    const rotate2 = useSpring(useTransform(() => scrollProgress * -30), PHYSICS.gentle);

    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {/* Floating shapes */}
            <motion.div
                style={{ y: y1, rotate: rotate1 }}
                className="absolute left-[5%] top-[20%] h-20 w-20 rounded-2xl bg-emerald-100/50"
            />
            <motion.div
                style={{ y: y2, rotate: rotate2 }}
                className="absolute right-[10%] top-[40%] h-16 w-16 rounded-full bg-blue-100/50"
            />
            <motion.div
                style={{ y: y3 }}
                className="absolute left-[15%] top-[60%] h-12 w-12 rounded-xl bg-violet-100/50"
            />
            <motion.div
                style={{ y: y1, rotate: rotate2 }}
                className="absolute right-[20%] top-[70%] h-24 w-24 rounded-3xl bg-amber-100/50"
            />
        </div>
    );
}

// ============================================================================
// JOURNEY VISUALIZATION
// ============================================================================

function JourneyVisualization() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const pathProgress = useSpring(scrollYProgress, PHYSICS.gentle);

    return (
        <div ref={containerRef} className="relative hidden h-[600px] w-full lg:block">
            {/* Journey path */}
            <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 800 600"
                preserveAspectRatio="xMidYMid slice"
            >
                <defs>
                    <linearGradient id="journeyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="50%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#f43f5e" />
                    </linearGradient>
                </defs>

                {/* Background path */}
                <path
                    d="M 100,100 Q 200,150 300,100 T 500,150 T 700,100 Q 750,200 700,300 T 500,350 T 300,300 Q 200,400 300,500 T 500,450 T 700,500"
                    fill="none"
                    stroke="#e2e8f0"
                    strokeWidth="4"
                    strokeDasharray="8 8"
                />

                {/* Animated progress path */}
                <motion.path
                    d="M 100,100 Q 200,150 300,100 T 500,150 T 700,100 Q 750,200 700,300 T 500,350 T 300,300 Q 200,400 300,500 T 500,450 T 700,500"
                    fill="none"
                    stroke="url(#journeyGradient)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    style={{
                        pathLength: pathProgress,
                    }}
                />
            </svg>

            {/* Milestone icons */}
            {[
                { x: 100, y: 100, icon: "📝", label: "Post" },
                { x: 500, y: 150, icon: "🔍", label: "Match" },
                { x: 700, y: 300, icon: "📱", label: "Claim" },
                { x: 300, y: 300, icon: "🚗", label: "Deliver" },
                { x: 700, y: 500, icon: "🎉", label: "Complete!" },
            ].map((point, i) => (
                <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ ...PHYSICS.bouncy, delay: i * 0.2 }}
                    className="absolute flex flex-col items-center"
                    style={{
                        left: `${(point.x / 800) * 100}%`,
                        top: `${(point.y / 600) * 100}%`,
                        transform: "translate(-50%, -50%)",
                    }}
                >
                    <motion.div
                        whileHover={{ scale: 1.2 }}
                        className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-2xl shadow-lg"
                    >
                        {point.icon}
                    </motion.div>
                    <span className="mt-2 text-sm font-medium text-slate-600">{point.label}</span>
                </motion.div>
            ))}
        </div>
    );
}

// ============================================================================
// MAIN HOW IT WORKS SECTION
// ============================================================================

export function HowItWorks() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const smoothProgress = useSpring(scrollYProgress, PHYSICS.gentle);

    return (
        <section
            ref={sectionRef}
            className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white py-20 md:py-32"
        >
            <ParallaxElements scrollProgress={smoothProgress.get()} />

            <div className="relative mx-auto max-w-7xl px-6">
                {/* Section Header */}
                <div className="text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-medium text-slate-600 shadow-sm"
                    >
                        <ArrowDown className="h-4 w-4 text-emerald-500" />
                        <span>Simple Process</span>
                    </motion.div>

                    <Reveal>
                        <h2 className="mt-6 text-3xl font-black text-slate-900 md:text-5xl">
                            From Surplus to{" "}
                            <span className="bg-gradient-to-r from-emerald-600 via-blue-600 to-rose-600 bg-clip-text text-transparent">
                                Saved
                            </span>
                        </h2>
                    </Reveal>

                    <Reveal delay={0.1}>
                        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
                            Five simple steps. One powerful impact. Here&apos;s how we turn food waste into community nourishment.
                        </p>
                    </Reveal>
                </div>

                {/* Journey Visualization - Desktop */}
                <JourneyVisualization />

                {/* Timeline Steps */}
                <div className="relative mt-16 lg:mt-0">
                    <TimelineConnector progress={smoothProgress.get()} />

                    <div className="space-y-0">
                        {steps.map((step, index) => (
                            <StepCard
                                key={step.id}
                                step={step}
                                index={index}
                            />
                        ))}
                    </div>
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-16 text-center"
                >
                    <div className="inline-flex flex-col items-center gap-4 rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-teal-50 p-8">
                        <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="text-4xl"
                        >
                            🚀
                        </motion.div>
                        <h3 className="text-xl font-bold text-slate-900">Ready to make an impact?</h3>
                        <p className="text-slate-600">Join thousands of food heroes in your community.</p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="mt-2 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-3 font-semibold text-white shadow-lg shadow-emerald-200/50"
                        >
                            Get Started Free
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

export default HowItWorks;

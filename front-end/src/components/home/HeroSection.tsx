"use client";

import { useRef } from "react";
import Link from "next/link";
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
    useMotionValue,
} from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Fade, PHYSICS } from "@/components/ui/motion-system";
import { cn } from "@/lib/utils";

// ============================================================================
// ANIMATED GRADIENT MESH - The Living Background
// ============================================================================

function GradientMesh() {
    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {/* Base gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/80 via-white to-emerald-50/40" />

            {/* Animated gradient orbs */}
            <motion.div
                className="absolute -left-[20%] -top-[30%] h-[600px] w-[600px] rounded-full bg-gradient-to-br from-emerald-200/40 to-teal-100/30 blur-3xl"
                animate={{
                    x: [0, 50, 0],
                    y: [0, 30, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
            <motion.div
                className="absolute -right-[15%] top-[10%] h-[500px] w-[500px] rounded-full bg-gradient-to-bl from-emerald-300/30 to-cyan-100/20 blur-3xl"
                animate={{
                    x: [0, -40, 0],
                    y: [0, 50, 0],
                    scale: [1, 1.15, 1],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2,
                }}
            />
            <motion.div
                className="absolute bottom-[10%] left-[30%] h-[400px] w-[400px] rounded-full bg-gradient-to-tr from-teal-200/25 to-emerald-100/30 blur-3xl"
                animate={{
                    x: [0, -30, 0],
                    y: [0, -40, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 4,
                }}
            />

            {/* Grain texture overlay */}
            <div
                className="absolute inset-0 opacity-[0.015]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                }}
            />
        </div>
    );
}

// ============================================================================
// FLOATING ELEMENTS - Visual Interest
// ============================================================================

function FloatingElements() {
    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {/* Floating food icons with physics-based movement */}
            {[
                { emoji: "🍎", x: "10%", y: "20%", delay: 0, size: "text-4xl" },
                { emoji: "🥖", x: "85%", y: "15%", delay: 1, size: "text-3xl" },
                { emoji: "🥬", x: "5%", y: "60%", delay: 2, size: "text-3xl" },
                { emoji: "🍊", x: "90%", y: "55%", delay: 3, size: "text-2xl" },
                { emoji: "🥕", x: "75%", y: "75%", delay: 4, size: "text-2xl" },
                { emoji: "🍞", x: "20%", y: "80%", delay: 5, size: "text-3xl" },
            ].map((item, idx) => (
                <motion.div
                    key={idx}
                    className={cn("absolute select-none", item.size)}
                    style={{ left: item.x, top: item.y }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: 0.6,
                        scale: 1,
                        y: [0, -15, 0],
                        rotate: [-5, 5, -5],
                    }}
                    transition={{
                        opacity: { delay: item.delay * 0.2, duration: 0.5 },
                        scale: { delay: item.delay * 0.2, duration: 0.5, type: "spring" },
                        y: { duration: 4 + idx, repeat: Infinity, ease: "easeInOut" },
                        rotate: { duration: 5 + idx, repeat: Infinity, ease: "easeInOut" },
                    }}
                >
                    {item.emoji}
                </motion.div>
            ))}
        </div>
    );
}

// ============================================================================
// HERO BADGE - The Premium Touch
// ============================================================================

function HeroBadge() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...PHYSICS.default, delay: 0.1 }}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-200/60 bg-white/80 px-4 py-2 text-sm font-medium text-emerald-700 shadow-lg shadow-emerald-100/50 backdrop-blur-sm"
        >
            <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
                <Sparkles className="h-4 w-4 text-emerald-500" />
            </motion.div>
            <span>Join 12,000+ Food Heroes</span>
            <div className="flex -space-x-1">
                {["🧑‍🍳", "👨‍🌾", "👩‍🔬"].map((emoji, i) => (
                    <span key={i} className="text-base">{emoji}</span>
                ))}
            </div>
        </motion.div>
    );
}

// ============================================================================
// ANIMATED HEADLINE - Word by Word Reveal
// ============================================================================

function AnimatedHeadline() {
    const words = ["Zero", "Hunger,", "Zero", "Waste."];

    return (
        <h1 className="text-4xl font-black leading-[1.05] tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-7xl">
            {words.map((word, i) => (
                <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{
                        ...PHYSICS.default,
                        delay: 0.3 + i * 0.1,
                    }}
                    className={cn(
                        "inline-block",
                        word === "Waste." && "text-emerald-600"
                    )}
                >
                    {word}
                    {i < words.length - 1 && <span>&nbsp;</span>}
                </motion.span>
            ))}
        </h1>
    );
}

// ============================================================================
// LIVE PULSE INDICATOR
// ============================================================================

function LivePulse() {
    return (
        <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            <span className="text-sm font-medium text-emerald-600">Live Activity</span>
        </div>
    );
}

// ============================================================================
// FLOATING STATS CARD - The Hero Widget
// ============================================================================

function FloatingStatsCard() {
    const cardRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useSpring(useTransform(mouseY, [-100, 100], [5, -5]), PHYSICS.snappy);
    const rotateY = useSpring(useTransform(mouseX, [-100, 100], [-5, 5]), PHYSICS.snappy);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        mouseX.set(e.clientX - centerX);
        mouseY.set(e.clientY - centerY);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 60, rotateX: 15 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ ...PHYSICS.gentle, delay: 0.6 }}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative overflow-hidden rounded-3xl border border-emerald-100/50 bg-white/70 p-6 shadow-2xl shadow-emerald-200/40 backdrop-blur-xl sm:p-8"
        >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/60 via-transparent to-teal-50/40" />

            {/* Glow effect */}
            <motion.div
                className="absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                    background: "linear-gradient(to bottom right, rgba(16,185,129,0.1), transparent, rgba(20,184,166,0.1))",
                }}
            />

            <div className="relative space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <LivePulse />
                    <motion.span
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-xs font-medium text-slate-400"
                    >
                        Updated now
                    </motion.span>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                    <StatCard
                        label="Meals Delivered"
                        value="128,420"
                        change="+1,240 today"
                        color="emerald"
                        delay={0.7}
                    />
                    <StatCard
                        label="Food Rescued"
                        value="86.3K kg"
                        change="↑ 12% this week"
                        color="teal"
                        delay={0.8}
                    />
                </div>

                {/* Mini Activity Feed */}
                <div className="space-y-2 rounded-2xl border border-slate-100 bg-slate-50/50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Recent Activity</p>
                    <div className="space-y-2">
                        {[
                            { text: "Fresh produce claimed", time: "2m ago", emoji: "🥬" },
                            { text: "Bakery donation posted", time: "5m ago", emoji: "🥖" },
                            { text: "Delivery completed", time: "8m ago", emoji: "✅" },
                        ].map((activity, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.9 + i * 0.1 }}
                                className="flex items-center justify-between text-sm"
                            >
                                <span className="flex items-center gap-2">
                                    <span>{activity.emoji}</span>
                                    <span className="text-slate-600">{activity.text}</span>
                                </span>
                                <span className="text-xs text-slate-400">{activity.time}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function StatCard({
    label,
    value,
    change,
    color,
    delay,
}: {
    label: string;
    value: string;
    change: string;
    color: "emerald" | "teal";
    delay: number;
}) {
    const bgColor = color === "emerald" ? "bg-emerald-50" : "bg-teal-50";
    const textColor = color === "emerald" ? "text-emerald-600" : "text-teal-600";
    const valueColor = color === "emerald" ? "text-emerald-900" : "text-teal-900";

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ...PHYSICS.snappy, delay }}
            className={cn("rounded-xl p-4", bgColor)}
        >
            <p className={cn("text-xs font-semibold uppercase tracking-wider", textColor)}>
                {label}
            </p>
            <p className={cn("mt-1 text-2xl font-bold", valueColor)}>{value}</p>
            <p className={cn("mt-0.5 text-xs", textColor)}>{change}</p>
        </motion.div>
    );
}

// ============================================================================
// SCROLL INDICATOR
// ============================================================================

function ScrollIndicator() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="flex flex-col items-center gap-2 text-slate-400"
            >
                <span className="text-xs font-medium uppercase tracking-widest">Scroll to explore</span>
                <div className="flex h-8 w-5 items-start justify-center rounded-full border-2 border-slate-300 p-1">
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className="h-1.5 w-1.5 rounded-full bg-slate-400"
                    />
                </div>
            </motion.div>
        </motion.div>
    );
}

// ============================================================================
// MAIN HERO SECTION
// ============================================================================

export function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
    const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen overflow-hidden"
        >
            <GradientMesh />
            <FloatingElements />

            <motion.div
                style={{ opacity, scale, y }}
                className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 py-20"
            >
                <div className="grid w-full items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
                    {/* Left Column - Content */}
                    <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                        <HeroBadge />

                        <div className="mt-6 space-y-6">
                            <AnimatedHeadline />

                            <Fade direction="up" delay={0.5} distance={30}>
                                <p className="max-w-xl text-lg text-slate-600 sm:text-xl">
                                    We connect surplus food from donors with volunteers and recipients in{" "}
                                    <span className="font-semibold text-emerald-600">minutes</span>.
                                    Every delivery keeps food out of landfills and puts meals on tables.
                                </p>
                            </Fade>

                            {/* CTA Buttons */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ ...PHYSICS.default, delay: 0.7 }}
                                className="flex flex-col gap-4 pt-2 sm:flex-row"
                            >
                                <Link href="/register">
                                    <MagneticButton
                                        variant="glow"
                                        size="xl"
                                        className="group w-full rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 px-8 text-base font-semibold shadow-xl shadow-emerald-200/50 sm:w-auto"
                                    >
                                        Start Donating
                                        <motion.span
                                            className="ml-2 inline-block"
                                            animate={{ x: [0, 4, 0] }}
                                            transition={{ duration: 1.5, repeat: Infinity }}
                                        >
                                            <ArrowRight className="h-5 w-5" />
                                        </motion.span>
                                    </MagneticButton>
                                </Link>
                                <Link href="/login">
                                    <MagneticButton
                                        variant="outline"
                                        size="xl"
                                        className="w-full rounded-full border-2 border-emerald-200 px-8 text-base font-semibold text-emerald-700 hover:bg-emerald-50 sm:w-auto"
                                    >
                                        I&apos;m a Volunteer
                                    </MagneticButton>
                                </Link>
                            </motion.div>

                            {/* Trust Indicators */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1 }}
                                className="flex items-center gap-6 pt-4 text-sm text-slate-500"
                            >
                                <div className="flex items-center gap-2">
                                    <span className="text-emerald-500">✓</span>
                                    <span>Free forever</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-emerald-500">✓</span>
                                    <span>No credit card</span>
                                </div>
                                <div className="hidden items-center gap-2 sm:flex">
                                    <span className="text-emerald-500">✓</span>
                                    <span>Setup in 2 min</span>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Right Column - Floating Card */}
                    <div className="relative">
                        <FloatingStatsCard />
                    </div>
                </div>
            </motion.div>

            <ScrollIndicator />
        </section>
    );
}

export default HeroSection;

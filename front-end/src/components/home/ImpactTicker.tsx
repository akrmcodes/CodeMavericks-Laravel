"use client";

import { useRef, useEffect, useState } from "react";
import {
    motion,
    useInView,
    useSpring,
} from "framer-motion";
import { Leaf, Users, Truck, Scale, Heart, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal, PHYSICS } from "@/components/ui/motion-system";

// ============================================================================
// ANIMATED COUNTER - The Emotional Numbers
// ============================================================================

interface AnimatedCounterProps {
    value: number;
    duration?: number;
    suffix?: string;
    prefix?: string;
    decimals?: number;
}

function AnimatedCounter({
    value,
    suffix = "",
    prefix = "",
    decimals = 0,
}: AnimatedCounterProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [displayValue, setDisplayValue] = useState(0);

    const spring = useSpring(0, {
        stiffness: 50,
        damping: 30,
        mass: 1,
    });

    useEffect(() => {
        if (isInView) {
            spring.set(value);
        }
    }, [isInView, spring, value]);

    useEffect(() => {
        const unsubscribe = spring.on("change", (latest) => {
            setDisplayValue(latest);
        });
        return unsubscribe;
    }, [spring]);

    const formattedValue = decimals > 0
        ? displayValue.toFixed(decimals)
        : Math.floor(displayValue).toLocaleString();

    return (
        <span ref={ref} className="tabular-nums">
            {prefix}
            {formattedValue}
            {suffix}
        </span>
    );
}

// ============================================================================
// IMPACT STAT CARD
// ============================================================================

interface ImpactStatProps {
    icon: React.ElementType;
    value: number;
    suffix?: string;
    label: string;
    description: string;
    color: "emerald" | "teal" | "cyan" | "green";
    delay: number;
}

const colorMap = {
    emerald: {
        bg: "bg-emerald-50",
        icon: "bg-emerald-100 text-emerald-600",
        text: "text-emerald-600",
        border: "border-emerald-100",
        glow: "shadow-emerald-100/50",
    },
    teal: {
        bg: "bg-teal-50",
        icon: "bg-teal-100 text-teal-600",
        text: "text-teal-600",
        border: "border-teal-100",
        glow: "shadow-teal-100/50",
    },
    cyan: {
        bg: "bg-cyan-50",
        icon: "bg-cyan-100 text-cyan-600",
        text: "text-cyan-600",
        border: "border-cyan-100",
        glow: "shadow-cyan-100/50",
    },
    green: {
        bg: "bg-green-50",
        icon: "bg-green-100 text-green-600",
        text: "text-green-600",
        border: "border-green-100",
        glow: "shadow-green-100/50",
    },
};

function ImpactStatCard({
    icon: Icon,
    value,
    suffix,
    label,
    description,
    color,
    delay,
}: ImpactStatProps) {
    const colors = colorMap[color];

    return (
        <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ ...PHYSICS.default, delay }}
            whileHover={{ y: -8, scale: 1.02 }}
            className={cn(
                "group relative overflow-hidden rounded-2xl border bg-white p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl",
                colors.border,
                colors.glow
            )}
        >
            {/* Gradient overlay on hover */}
            <div
                className={cn(
                    "absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100",
                    colors.bg
                )}
            />

            <div className="relative flex flex-col gap-4">
                {/* Icon */}
                <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                    className={cn(
                        "flex h-12 w-12 items-center justify-center rounded-xl",
                        colors.icon
                    )}
                >
                    <Icon className="h-6 w-6" />
                </motion.div>

                {/* Value */}
                <div>
                    <p className="text-4xl font-black text-slate-900 lg:text-5xl">
                        <AnimatedCounter value={value} suffix={suffix} />
                    </p>
                    <p className={cn("mt-1 text-sm font-semibold uppercase tracking-wider", colors.text)}>
                        {label}
                    </p>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-600">{description}</p>
            </div>

            {/* Decorative corner */}
            <div
                className={cn(
                    "absolute -bottom-4 -right-4 h-24 w-24 rounded-full opacity-20",
                    colors.bg
                )}
            />
        </motion.div>
    );
}

// ============================================================================
// LIVE TICKER - Flowing Updates
// ============================================================================

const liveUpdates = [
    "🥖 Fresh bread donated in Brooklyn",
    "🥬 50kg vegetables rescued from market",
    "✅ Delivery completed to shelter",
    "🍎 Fruit boxes claimed by volunteer",
    "🍲 Hot meals distributed downtown",
    "🥕 Farm produce connected to food bank",
    "🧁 Bakery surplus found new homes",
    "🌽 Community kitchen restocked",
];

function LiveUpdatesTicker() {
    return (
        <div className="relative overflow-hidden py-4">
            {/* Gradient masks */}
            <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-slate-50 to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-slate-50 to-transparent" />

            <motion.div
                animate={{ x: [0, -1920] }}
                transition={{
                    duration: 40,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="flex gap-8 whitespace-nowrap"
            >
                {[...liveUpdates, ...liveUpdates, ...liveUpdates].map((update, i) => (
                    <span
                        key={i}
                        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 shadow-sm"
                    >
                        {update}
                    </span>
                ))}
            </motion.div>
        </div>
    );
}

// ============================================================================
// ENVIRONMENTAL IMPACT VISUALIZATION
// ============================================================================

function EnvironmentalImpact() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...PHYSICS.gentle, delay: 0.4 }}
            className="relative overflow-hidden rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-600 to-teal-600 p-8 text-white shadow-2xl shadow-emerald-200/50"
        >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
                <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>

            <div className="relative grid gap-8 md:grid-cols-2">
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Leaf className="h-6 w-6" />
                        <span className="text-sm font-semibold uppercase tracking-wider text-emerald-100">
                            Environmental Impact
                        </span>
                    </div>
                    <h3 className="text-3xl font-black md:text-4xl">
                        <AnimatedCounter value={2847} suffix=" tons" />
                    </h3>
                    <p className="text-emerald-100">
                        of CO₂ emissions prevented by rescuing food from landfills. That&apos;s equivalent to taking{" "}
                        <span className="font-bold text-white">618 cars</span> off the road for a year.
                    </p>
                </div>

                <div className="flex items-center justify-center">
                    <div className="relative">
                        {/* Animated rings */}
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                className="absolute inset-0 rounded-full border-2 border-white/20"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={isInView ? {
                                    scale: [0.8, 1.5 + i * 0.3],
                                    opacity: [0.6, 0],
                                } : {}}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: i * 0.5,
                                    ease: "easeOut",
                                }}
                            />
                        ))}
                        <div className="flex h-32 w-32 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            >
                                <Leaf className="h-16 w-16 text-white" />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom stats */}
            <div className="relative mt-8 grid grid-cols-3 gap-4 border-t border-white/20 pt-6">
                {[
                    { value: "86K", label: "kg Food Saved" },
                    { value: "42K", label: "Water (L) Preserved" },
                    { value: "618", label: "Cars Equivalent" },
                ].map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 + i * 0.1 }}
                        className="text-center"
                    >
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <p className="text-xs text-emerald-100">{stat.label}</p>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}

// ============================================================================
// MAIN IMPACT TICKER SECTION
// ============================================================================

export function ImpactTicker() {
    return (
        <section className="relative overflow-hidden bg-slate-50 py-20 md:py-32">
            {/* Background decoration */}
            <div className="absolute inset-0">
                <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-emerald-100/30 blur-3xl" />
                <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-teal-100/30 blur-3xl" />
            </div>

            <div className="relative mx-auto max-w-7xl px-6">
                {/* Section Header */}
                <div className="text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-1.5 text-sm font-medium text-emerald-700"
                    >
                        <Zap className="h-4 w-4" />
                        <span>Live Impact Dashboard</span>
                    </motion.div>

                    <Reveal>
                        <h2 className="mt-6 text-3xl font-black text-slate-900 md:text-5xl">
                            Every Number Tells a{" "}
                            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                Story
                            </span>
                        </h2>
                    </Reveal>

                    <Reveal delay={0.1}>
                        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
                            Real-time impact from our community of food heroes. These aren&apos;t just statistics—they&apos;re meals shared, waste prevented, and lives touched.
                        </p>
                    </Reveal>
                </div>

                {/* Live Updates Ticker */}
                <div className="mt-12">
                    <LiveUpdatesTicker />
                </div>

                {/* Stats Grid */}
                <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <ImpactStatCard
                        icon={Heart}
                        value={128420}
                        label="Meals Delivered"
                        description="Nutritious meals delivered to families, shelters, and community centers."
                        color="emerald"
                        delay={0}
                    />
                    <ImpactStatCard
                        icon={Scale}
                        value={86300}
                        suffix=" kg"
                        label="Food Rescued"
                        description="Perfectly good food saved from landfills and redistributed."
                        color="teal"
                        delay={0.1}
                    />
                    <ImpactStatCard
                        icon={Users}
                        value={12847}
                        label="Active Heroes"
                        description="Donors, volunteers, and recipients making a difference daily."
                        color="cyan"
                        delay={0.2}
                    />
                    <ImpactStatCard
                        icon={Truck}
                        value={24891}
                        label="Deliveries Made"
                        description="Successful pickups and deliveries completed by our volunteers."
                        color="green"
                        delay={0.3}
                    />
                </div>

                {/* Environmental Impact Card */}
                <div className="mt-12">
                    <EnvironmentalImpact />
                </div>
            </div>
        </section>
    );
}

export default ImpactTicker;

"use client";

import { useState, useRef } from "react";
import {
    motion,
    useMotionValue,
    useSpring,
    useTransform,
    AnimatePresence,
} from "framer-motion";
import {
    MapPin,
    QrCode,
    Bell,
    BarChart3,
    Smartphone,
    Users,
    ArrowRight,
    Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal, PHYSICS } from "@/components/ui/motion-system";

// ============================================================================
// TYPES
// ============================================================================

interface Feature {
    id: string;
    title: string;
    description: string;
    icon: React.ElementType;
    color: string;
    gradient: string;
    gridClass: string;
    demo?: React.ReactNode;
}

// ============================================================================
// FEATURE DATA
// ============================================================================

const features: Feature[] = [
    {
        id: "map",
        title: "Smart Location Matching",
        description:
            "AI-powered proximity matching connects donors with the nearest available volunteers instantly. Real-time GPS tracking ensures efficient pickups.",
        icon: MapPin,
        color: "text-emerald-600",
        gradient: "from-emerald-500 to-teal-500",
        gridClass: "md:col-span-2 md:row-span-2",
    },
    {
        id: "qr",
        title: "Secure QR Verification",
        description:
            "Cryptographic QR codes ensure only verified volunteers can claim donations. No more confusion or missed pickups.",
        icon: QrCode,
        color: "text-violet-600",
        gradient: "from-violet-500 to-purple-500",
        gridClass: "md:col-span-1",
    },
    {
        id: "notifications",
        title: "Real-time Notifications",
        description:
            "Instant push alerts when food is posted, claimed, or ready for pickup. Never miss an opportunity to help.",
        icon: Bell,
        color: "text-amber-600",
        gradient: "from-amber-500 to-orange-500",
        gridClass: "md:col-span-1",
    },
    {
        id: "analytics",
        title: "Impact Analytics",
        description:
            "Beautiful dashboards show your contribution to the community. Track meals delivered, CO₂ saved, and your growing impact score.",
        icon: BarChart3,
        color: "text-cyan-600",
        gradient: "from-cyan-500 to-blue-500",
        gridClass: "md:col-span-1 md:row-span-2",
    },
    {
        id: "mobile",
        title: "Mobile-First Design",
        description:
            "Optimized for on-the-go heroes. Quick posting, instant claiming, and one-tap navigation to pickup locations.",
        icon: Smartphone,
        color: "text-pink-600",
        gradient: "from-pink-500 to-rose-500",
        gridClass: "md:col-span-1",
    },
    {
        id: "community",
        title: "Community Leaderboards",
        description:
            "Friendly competition drives impact. See top donors, most active volunteers, and celebrate community achievements.",
        icon: Users,
        color: "text-indigo-600",
        gradient: "from-indigo-500 to-blue-500",
        gridClass: "md:col-span-1",
    },
];

// ============================================================================
// BENTO CARD COMPONENT
// ============================================================================

interface BentoCardProps {
    feature: Feature;
    index: number;
}

function BentoCard({ feature, index }: BentoCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    // 3D Tilt Effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), PHYSICS.snappy);
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), PHYSICS.snappy);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
        setIsHovered(false);
    };

    const Icon = feature.icon;
    const isLarge = feature.gridClass.includes("col-span-2") || feature.gridClass.includes("row-span-2");

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ ...PHYSICS.default, delay: index * 0.08 }}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            className={cn(
                "group relative overflow-hidden rounded-3xl border border-slate-200/60 bg-white p-6 shadow-lg transition-shadow duration-500 hover:shadow-2xl",
                feature.gridClass
            )}
        >
            {/* Animated gradient background on hover */}
            <motion.div
                className={cn(
                    "absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500",
                    feature.gradient
                )}
                animate={{ opacity: isHovered ? 0.05 : 0 }}
            />

            {/* Glow effect */}
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="pointer-events-none absolute inset-0"
                        style={{
                            background: `radial-gradient(circle at ${(mouseX.get() + 0.5) * 100}% ${(mouseY.get() + 0.5) * 100}%, rgba(255,255,255,0.3) 0%, transparent 50%)`,
                        }}
                    />
                )}
            </AnimatePresence>

            {/* Content */}
            <div className="relative z-10 flex h-full flex-col">
                {/* Icon with animated background */}
                <motion.div
                    whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.3 }}
                    className={cn(
                        "flex h-14 w-14 items-center justify-center rounded-2xl",
                        `bg-gradient-to-br ${feature.gradient}`
                    )}
                >
                    <Icon className="h-7 w-7 text-white" />
                </motion.div>

                {/* Title */}
                <h3 className="mt-4 text-xl font-bold text-slate-900">
                    {feature.title}
                </h3>

                {/* Description */}
                <p className={cn(
                    "mt-2 text-slate-600",
                    isLarge ? "text-base" : "text-sm"
                )}>
                    {feature.description}
                </p>

                {/* Interactive demo area for large cards */}
                {isLarge && feature.id === "map" && (
                    <div className="mt-6 flex-1">
                        <MapDemo />
                    </div>
                )}

                {isLarge && feature.id === "analytics" && (
                    <div className="mt-6 flex-1">
                        <AnalyticsDemo />
                    </div>
                )}

                {/* Hover action */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
                    className="mt-4 flex items-center gap-2 text-sm font-medium"
                    style={{ color: `var(--${feature.color.replace('text-', '')})` }}
                >
                    <span className={feature.color}>Learn more</span>
                    <motion.span
                        animate={{ x: isHovered ? 4 : 0 }}
                        className={feature.color}
                    >
                        <ArrowRight className="h-4 w-4" />
                    </motion.span>
                </motion.div>
            </div>

            {/* Decorative corner element */}
            <div
                className={cn(
                    "absolute -bottom-8 -right-8 h-32 w-32 rounded-full opacity-10",
                    `bg-gradient-to-br ${feature.gradient}`
                )}
            />
        </motion.div>
    );
}

// ============================================================================
// INTERACTIVE DEMOS
// ============================================================================

function MapDemo() {
    const points = [
        { x: 20, y: 30, label: "Bakery", type: "donor" },
        { x: 70, y: 20, label: "Restaurant", type: "donor" },
        { x: 45, y: 60, label: "Volunteer", type: "volunteer" },
        { x: 80, y: 70, label: "Shelter", type: "recipient" },
    ];

    return (
        <div className="relative h-48 overflow-hidden rounded-2xl bg-gradient-to-br from-slate-100 to-emerald-50">
            {/* Grid background */}
            <svg className="absolute inset-0 h-full w-full opacity-30">
                <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-slate-300" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#smallGrid)" />
            </svg>

            {/* Animated connection lines */}
            <svg className="absolute inset-0 h-full w-full">
                <motion.path
                    d="M 20% 30% Q 30% 50% 45% 60%"
                    stroke="url(#lineGradient)"
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                />
                <motion.path
                    d="M 45% 60% Q 60% 65% 80% 70%"
                    stroke="url(#lineGradient)"
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 1 }}
                />
                <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="100%" stopColor="#14b8a6" />
                    </linearGradient>
                </defs>
            </svg>

            {/* Animated points */}
            {points.map((point, i) => (
                <motion.div
                    key={i}
                    className="absolute"
                    style={{ left: `${point.x}%`, top: `${point.y}%` }}
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.15, type: "spring" }}
                >
                    {/* Pulse ring */}
                    <motion.div
                        className={cn(
                            "absolute -inset-2 rounded-full",
                            point.type === "donor" ? "bg-emerald-400" :
                                point.type === "volunteer" ? "bg-blue-400" : "bg-amber-400"
                        )}
                        animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                    {/* Point */}
                    <div
                        className={cn(
                            "relative h-4 w-4 rounded-full border-2 border-white shadow-lg",
                            point.type === "donor" ? "bg-emerald-500" :
                                point.type === "volunteer" ? "bg-blue-500" : "bg-amber-500"
                        )}
                    />
                    {/* Label */}
                    <span className="absolute left-6 top-0 whitespace-nowrap text-xs font-medium text-slate-600">
                        {point.label}
                    </span>
                </motion.div>
            ))}
        </div>
    );
}

function AnalyticsDemo() {
    const bars = [65, 85, 45, 90, 70, 55, 95];

    return (
        <div className="flex h-32 items-end justify-around gap-2 rounded-2xl bg-gradient-to-br from-slate-100 to-cyan-50 p-4">
            {bars.map((height, i) => (
                <motion.div
                    key={i}
                    className="relative w-full max-w-[30px] rounded-t-lg bg-gradient-to-t from-cyan-500 to-blue-500"
                    initial={{ height: 0 }}
                    whileInView={{ height: `${height}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.6, type: "spring" }}
                >
                    {/* Glow */}
                    <motion.div
                        className="absolute -inset-1 rounded-lg bg-cyan-400 blur-sm"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 0.3 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 + 0.3 }}
                    />
                </motion.div>
            ))}
        </div>
    );
}

// ============================================================================
// MAIN FEATURES BENTO SECTION
// ============================================================================

export function FeaturesBento() {
    return (
        <section className="relative overflow-hidden bg-white py-20 md:py-32">
            {/* Background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-emerald-100/40 blur-3xl" />
                <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-teal-100/40 blur-3xl" />
            </div>

            <div className="relative mx-auto max-w-7xl px-6">
                {/* Section Header */}
                <div className="text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-medium text-slate-600 shadow-sm"
                    >
                        <Sparkles className="h-4 w-4 text-emerald-500" />
                        <span>Powerful Features</span>
                    </motion.div>

                    <Reveal>
                        <h2 className="mt-6 text-3xl font-black text-slate-900 md:text-5xl">
                            Built for{" "}
                            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                Impact
                            </span>
                        </h2>
                    </Reveal>

                    <Reveal delay={0.1}>
                        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
                            Every feature is designed to reduce friction, maximize speed, and ensure no good food goes to waste.
                        </p>
                    </Reveal>
                </div>

                {/* Bento Grid */}
                <div className="mt-16 grid gap-6 md:grid-cols-3 md:grid-rows-3">
                    {features.map((feature, index) => (
                        <BentoCard key={feature.id} feature={feature} index={index} />
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-16 text-center"
                >
                    <p className="text-slate-600">
                        And many more features designed with love for our community.
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-4 inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-800"
                    >
                        <span>View All Features</span>
                        <ArrowRight className="h-4 w-4" />
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
}

export default FeaturesBento;

"use client";

import { useRef } from "react";
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
} from "framer-motion";
import { Star, Trophy, Heart, Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal, PHYSICS } from "@/components/ui/motion-system";

// ============================================================================
// TYPES
// ============================================================================

interface Hero {
    id: number;
    name: string;
    avatar: string;
    role: "donor" | "volunteer" | "recipient";
    stat: string;
    badge?: string;
    quote?: string;
}

// ============================================================================
// MOCK DATA - Community Heroes
// ============================================================================

const heroes: Hero[] = [
    { id: 1, name: "Sarah's Bakery", avatar: "🧁", role: "donor", stat: "2,847 meals", badge: "Top Donor" },
    { id: 2, name: "Marcus T.", avatar: "🚴", role: "volunteer", stat: "156 deliveries", badge: "Speed Hero" },
    { id: 3, name: "Green Market", avatar: "🥬", role: "donor", stat: "1,200 kg saved" },
    { id: 4, name: "Elena R.", avatar: "🎒", role: "volunteer", stat: "89 deliveries" },
    { id: 5, name: "City Deli", avatar: "🥪", role: "donor", stat: "940 meals" },
    { id: 6, name: "James K.", avatar: "🚗", role: "volunteer", stat: "203 deliveries", badge: "Legend" },
    { id: 7, name: "Fresh Farms", avatar: "🥕", role: "donor", stat: "3,100 kg saved" },
    { id: 8, name: "Priya S.", avatar: "🏃‍♀️", role: "volunteer", stat: "127 deliveries" },
    { id: 9, name: "Baker's Joy", avatar: "🍞", role: "donor", stat: "1,560 meals" },
    { id: 10, name: "Tom H.", avatar: "🛵", role: "volunteer", stat: "178 deliveries", badge: "Rising Star" },
    { id: 11, name: "Sunrise Cafe", avatar: "☕", role: "donor", stat: "820 meals" },
    { id: 12, name: "Luna M.", avatar: "🚲", role: "volunteer", stat: "95 deliveries" },
];

const testimonials = [
    {
        id: 1,
        quote: "ZeroHunger transformed how we handle surplus. What used to end up in the trash now feeds families. It's beautiful.",
        author: "Maria Chen",
        role: "Restaurant Owner",
        avatar: "👩‍🍳",
    },
    {
        id: 2,
        quote: "Every delivery feels like I'm making a real difference. The app makes it so easy to help my community.",
        author: "David Park",
        role: "Volunteer Driver",
        avatar: "🚗",
    },
    {
        id: 3,
        quote: "The dignity this platform provides is incredible. No judgment, just kindness and fresh food for my family.",
        author: "Anonymous Recipient",
        role: "Community Member",
        avatar: "💚",
    },
];

// ============================================================================
// HERO CARD COMPONENT
// ============================================================================

interface HeroCardProps {
    hero: Hero;
}

function HeroCard({ hero }: HeroCardProps) {
    const roleColors = {
        donor: "from-emerald-500 to-teal-500",
        volunteer: "from-blue-500 to-cyan-500",
        recipient: "from-amber-500 to-orange-500",
    };

    const roleBg = {
        donor: "bg-emerald-50 text-emerald-700",
        volunteer: "bg-blue-50 text-blue-700",
        recipient: "bg-amber-50 text-amber-700",
    };

    return (
        <motion.div
            whileHover={{ y: -8, scale: 1.02 }}
            transition={PHYSICS.snappy}
            className="group relative flex w-64 shrink-0 flex-col items-center rounded-2xl border border-slate-200/60 bg-white p-6 shadow-lg"
        >
            {/* Badge */}
            {hero.badge && (
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -right-2 -top-2 flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 px-3 py-1 text-xs font-bold text-white shadow-lg"
                >
                    <Trophy className="h-3 w-3" />
                    {hero.badge}
                </motion.div>
            )}

            {/* Avatar */}
            <motion.div
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
                className={cn(
                    "flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br text-3xl shadow-lg",
                    roleColors[hero.role]
                )}
            >
                {hero.avatar}
            </motion.div>

            {/* Name */}
            <h4 className="mt-4 font-bold text-slate-900">{hero.name}</h4>

            {/* Role Tag */}
            <span className={cn(
                "mt-2 rounded-full px-3 py-1 text-xs font-medium capitalize",
                roleBg[hero.role]
            )}>
                {hero.role}
            </span>

            {/* Stat */}
            <div className="mt-3 flex items-center gap-1 text-sm font-medium text-slate-600">
                <Star className="h-4 w-4 text-amber-400" />
                {hero.stat}
            </div>

            {/* Hover effect */}
            <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/5 to-teal-500/5"
            />
        </motion.div>
    );
}

// ============================================================================
// INFINITE MARQUEE
// ============================================================================

interface MarqueeProps {
    children: React.ReactNode;
    direction?: "left" | "right";
    speed?: number;
    className?: string;
}

function Marquee({ children, direction = "left", speed = 30, className }: MarqueeProps) {
    return (
        <div className={cn("relative flex overflow-hidden", className)}>
            {/* Gradient masks */}
            <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-slate-50 to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-slate-50 to-transparent" />

            <motion.div
                animate={{
                    x: direction === "left" ? [0, -50 * React.Children.count(children)] + "%" : [-50 * React.Children.count(children) + "%", "0%"],
                }}
                transition={{
                    duration: speed,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="flex gap-6"
            >
                {children}
                {children}
            </motion.div>
        </div>
    );
}

// ============================================================================
// TESTIMONIAL CARD
// ============================================================================

interface TestimonialCardProps {
    testimonial: typeof testimonials[0];
    index: number;
}

function TestimonialCard({ testimonial, index }: TestimonialCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...PHYSICS.default, delay: index * 0.15 }}
            whileHover={{ y: -4 }}
            className="group relative overflow-hidden rounded-3xl border border-slate-200/60 bg-white p-8 shadow-lg"
        >
            {/* Quote icon */}
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
                <Quote className="h-5 w-5 text-emerald-600" />
            </div>

            {/* Quote */}
            <p className="text-lg text-slate-700 italic">
                &ldquo;{testimonial.quote}&rdquo;
            </p>

            {/* Author */}
            <div className="mt-6 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 text-2xl">
                    {testimonial.avatar}
                </div>
                <div>
                    <p className="font-bold text-slate-900">{testimonial.author}</p>
                    <p className="text-sm text-slate-500">{testimonial.role}</p>
                </div>
            </div>

            {/* Decorative */}
            <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-emerald-100/30 transition-transform duration-500 group-hover:scale-150" />
        </motion.div>
    );
}

// ============================================================================
// LEADERBOARD PREVIEW
// ============================================================================

function LeaderboardPreview() {
    const topDonors = [
        { rank: 1, name: "Fresh Farms Co.", meals: 3100, emoji: "🥇" },
        { rank: 2, name: "Sarah's Bakery", meals: 2847, emoji: "🥈" },
        { rank: 3, name: "City Deli", meals: 1560, emoji: "🥉" },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-3xl border border-slate-200/60 bg-white shadow-xl"
        >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 bg-gradient-to-r from-amber-50 to-orange-50 px-6 py-4">
                <div className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-amber-500" />
                    <span className="font-bold text-slate-900">Top Donors This Month</span>
                </div>
                <motion.span
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-xs font-medium text-amber-600"
                >
                    Live Rankings
                </motion.span>
            </div>

            {/* Leaderboard */}
            <div className="p-4">
                {topDonors.map((donor, i) => (
                    <motion.div
                        key={donor.rank}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ x: 4 }}
                        className="flex items-center justify-between rounded-xl p-3 transition-colors hover:bg-slate-50"
                    >
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">{donor.emoji}</span>
                            <div>
                                <p className="font-medium text-slate-900">{donor.name}</p>
                                <p className="text-sm text-slate-500">{donor.meals.toLocaleString()} meals donated</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 text-amber-500">
                            <Star className="h-4 w-4 fill-current" />
                            <Star className="h-4 w-4 fill-current" />
                            <Star className="h-4 w-4 fill-current" />
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Footer */}
            <div className="border-t border-slate-100 px-6 py-3 text-center">
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="text-sm font-medium text-emerald-600 hover:text-emerald-700"
                >
                    View Full Leaderboard →
                </motion.button>
            </div>
        </motion.div>
    );
}

// ============================================================================
// MAIN HEROES MARQUEE SECTION
// ============================================================================

import React from "react";

export function HeroesMarquee() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const y = useSpring(useTransform(scrollYProgress, [0, 1], [50, -50]), PHYSICS.gentle);

    return (
        <section
            ref={sectionRef}
            className="relative overflow-hidden bg-slate-50 py-20 md:py-32"
        >
            {/* Background elements */}
            <div className="pointer-events-none absolute inset-0">
                <motion.div
                    style={{ y }}
                    className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-emerald-100/30 blur-3xl"
                />
                <motion.div
                    style={{ y: useTransform(y, v => -v) }}
                    className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-blue-100/30 blur-3xl"
                />
            </div>

            <div className="relative">
                {/* Section Header */}
                <div className="mx-auto max-w-7xl px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-1.5 text-sm font-medium text-emerald-700 shadow-sm"
                    >
                        <Heart className="h-4 w-4" />
                        <span>Community Heroes</span>
                    </motion.div>

                    <Reveal>
                        <h2 className="mt-6 text-3xl font-black text-slate-900 md:text-5xl">
                            Meet the{" "}
                            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                Heroes
                            </span>
                        </h2>
                    </Reveal>

                    <Reveal delay={0.1}>
                        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
                            Every day, incredible people in our community make the choice to share. Here are some of our amazing food heroes.
                        </p>
                    </Reveal>
                </div>

                {/* Marquee - Row 1 */}
                <div className="mt-12">
                    <Marquee direction="left" speed={50}>
                        {heroes.slice(0, 6).map((hero) => (
                            <HeroCard key={hero.id} hero={hero} />
                        ))}
                    </Marquee>
                </div>

                {/* Marquee - Row 2 (Opposite direction) */}
                <div className="mt-6">
                    <Marquee direction="right" speed={40}>
                        {heroes.slice(6, 12).map((hero) => (
                            <HeroCard key={hero.id} hero={hero} />
                        ))}
                    </Marquee>
                </div>

                {/* Testimonials & Leaderboard Grid */}
                <div className="mx-auto mt-20 max-w-7xl px-6">
                    <Reveal>
                        <h3 className="text-center text-2xl font-bold text-slate-900">
                            What Our Community Says
                        </h3>
                    </Reveal>

                    <div className="mt-10 grid gap-8 lg:grid-cols-3">
                        {/* Testimonials */}
                        <div className="lg:col-span-2">
                            <div className="grid gap-6 md:grid-cols-2">
                                {testimonials.slice(0, 2).map((testimonial, index) => (
                                    <TestimonialCard
                                        key={testimonial.id}
                                        testimonial={testimonial}
                                        index={index}
                                    />
                                ))}
                            </div>
                            {testimonials[2] && (
                                <div className="mt-6">
                                    <TestimonialCard
                                        testimonial={testimonials[2]}
                                        index={2}
                                    />
                                </div>
                            )}
                        </div>

                        {/* Leaderboard */}
                        <div className="lg:col-span-1">
                            <LeaderboardPreview />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HeroesMarquee;

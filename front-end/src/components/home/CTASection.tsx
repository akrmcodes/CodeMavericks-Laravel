"use client";

import { useRef } from "react";
import Link from "next/link";
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
} from "framer-motion";
import { ArrowRight, Sparkles, Users, Zap, Shield } from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { PHYSICS } from "@/components/ui/motion-system";

// ============================================================================
// ANIMATED BACKGROUND
// ============================================================================

function AnimatedBackground() {
    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {/* Gradient base */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600" />

            {/* Animated mesh */}
            <motion.div
                animate={{
                    backgroundPosition: ["0% 0%", "100% 100%"],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    repeatType: "reverse",
                }}
                className="absolute inset-0 opacity-30"
                style={{
                    backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%),
                                      radial-gradient(circle at 80% 20%, rgba(255,255,255,0.2) 0%, transparent 40%),
                                      radial-gradient(circle at 40% 80%, rgba(255,255,255,0.25) 0%, transparent 45%)`,
                    backgroundSize: "100% 100%",
                }}
            />

            {/* Floating particles - using static positions for purity */}
            {[
                { left: 5, top: 10, duration: 3, delay: 0 },
                { left: 15, top: 25, duration: 4, delay: 0.3 },
                { left: 25, top: 80, duration: 3.5, delay: 0.6 },
                { left: 35, top: 15, duration: 4.5, delay: 0.9 },
                { left: 45, top: 60, duration: 3.2, delay: 1.2 },
                { left: 55, top: 35, duration: 4.2, delay: 0.4 },
                { left: 65, top: 85, duration: 3.8, delay: 0.7 },
                { left: 75, top: 20, duration: 4.8, delay: 1.0 },
                { left: 85, top: 55, duration: 3.3, delay: 1.5 },
                { left: 95, top: 70, duration: 4.1, delay: 0.2 },
                { left: 10, top: 45, duration: 3.6, delay: 0.5 },
                { left: 20, top: 90, duration: 4.4, delay: 0.8 },
                { left: 30, top: 30, duration: 3.1, delay: 1.1 },
                { left: 40, top: 75, duration: 4.6, delay: 1.4 },
                { left: 50, top: 5, duration: 3.4, delay: 1.7 },
                { left: 60, top: 50, duration: 4.3, delay: 0.1 },
                { left: 70, top: 95, duration: 3.7, delay: 0.35 },
                { left: 80, top: 40, duration: 4.7, delay: 0.65 },
                { left: 90, top: 65, duration: 3.9, delay: 0.95 },
                { left: 98, top: 12, duration: 4.0, delay: 1.25 },
            ].map((particle, i) => (
                <motion.div
                    key={i}
                    className="absolute h-1 w-1 rounded-full bg-white/30"
                    style={{
                        left: `${particle.left}%`,
                        top: `${particle.top}%`,
                    }}
                    animate={{
                        y: [0, -30, 0],
                        opacity: [0.3, 0.8, 0.3],
                    }}
                    transition={{
                        duration: particle.duration,
                        repeat: Infinity,
                        delay: particle.delay,
                    }}
                />
            ))}

            {/* Grid overlay */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                      linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                    backgroundSize: "50px 50px",
                }}
            />
        </div>
    );
}

// ============================================================================
// TRUST BADGES
// ============================================================================

function TrustBadges() {
    const badges = [
        { icon: Users, label: "12,000+ Heroes" },
        { icon: Zap, label: "Real-time Matching" },
        { icon: Shield, label: "Secure & Private" },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-6"
        >
            {badges.map((badge, i) => {
                const Icon = badge.icon;
                return (
                    <div
                        key={i}
                        className="flex items-center gap-2 text-white/80"
                    >
                        <Icon className="h-5 w-5" />
                        <span className="text-sm font-medium">{badge.label}</span>
                    </div>
                );
            })}
        </motion.div>
    );
}

// ============================================================================
// MAIN CTA SECTION
// ============================================================================

export function CTASection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const scale = useSpring(useTransform(scrollYProgress, [0, 0.5], [0.95, 1]), PHYSICS.gentle);
    const y = useSpring(useTransform(scrollYProgress, [0, 0.5], [50, 0]), PHYSICS.gentle);

    return (
        <section
            ref={sectionRef}
            className="relative overflow-hidden py-20 md:py-32"
        >
            <motion.div
                style={{ scale, y }}
                className="relative mx-auto max-w-7xl px-6"
            >
                <div className="relative overflow-hidden rounded-[2.5rem] shadow-2xl">
                    <AnimatedBackground />

                    <div className="relative z-10 px-8 py-16 text-center md:px-16 md:py-24">
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm"
                        >
                            <motion.div
                                animate={{ rotate: [0, 20, -20, 0] }}
                                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                            >
                                <Sparkles className="h-4 w-4" />
                            </motion.div>
                            <span>Join the Movement Today</span>
                        </motion.div>

                        {/* Headline */}
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="mt-6 text-3xl font-black text-white md:text-5xl lg:text-6xl"
                        >
                            Ready to Make a{" "}
                            <span className="relative">
                                <span className="relative z-10">Difference</span>
                                <motion.span
                                    initial={{ scaleX: 0 }}
                                    whileInView={{ scaleX: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.5, duration: 0.6 }}
                                    className="absolute bottom-0 left-0 h-3 w-full origin-left bg-white/20"
                                />
                            </span>
                            ?
                        </motion.h2>

                        {/* Subheadline */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="mx-auto mt-6 max-w-2xl text-lg text-white/80 md:text-xl"
                        >
                            Whether you&apos;re a donor with surplus food, a volunteer with time to spare, or someone in need—there&apos;s a place for you in our community.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
                        >
                            <Link href="/register">
                                <MagneticButton
                                    variant="secondary"
                                    size="xl"
                                    className="group w-full rounded-full bg-white px-8 text-base font-semibold text-emerald-700 shadow-xl hover:bg-white/90 sm:w-auto"
                                >
                                    Get Started Free
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
                                    variant="ghost"
                                    size="xl"
                                    className="w-full rounded-full border-2 border-white/30 px-8 text-base font-semibold text-white hover:bg-white/10 sm:w-auto"
                                >
                                    I Already Have an Account
                                </MagneticButton>
                            </Link>
                        </motion.div>

                        {/* Trust badges */}
                        <TrustBadges />

                        {/* Decorative elements */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                            className="pointer-events-none absolute -left-32 -top-32 h-64 w-64 rounded-full border border-white/10"
                        />
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
                            className="pointer-events-none absolute -bottom-40 -right-40 h-80 w-80 rounded-full border border-white/10"
                        />
                    </div>
                </div>
            </motion.div>
        </section>
    );
}

export default CTASection;

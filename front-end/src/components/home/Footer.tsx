"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
    MapPin,
    Github,
    Twitter,
    Linkedin,
    Instagram,
    Mail,
    Heart,
} from "lucide-react";

// ============================================================================
// FOOTER LINKS DATA
// ============================================================================

const footerLinks = {
    product: {
        title: "Product",
        links: [
            { label: "Features", href: "/#features" },
            { label: "How It Works", href: "/#how-it-works" },
            { label: "Pricing", href: "/" },
            { label: "FAQ", href: "/" },
        ],
    },
    company: {
        title: "Company",
        links: [
            { label: "About Us", href: "/" },
            { label: "Blog", href: "/" },
            { label: "Careers", href: "/" },
            { label: "Press Kit", href: "/" },
        ],
    },
    resources: {
        title: "Resources",
        links: [
            { label: "Documentation", href: "/" },
            { label: "Help Center", href: "/" },
            { label: "Community", href: "/#community" },
            { label: "Partners", href: "/" },
        ],
    },
    legal: {
        title: "Legal",
        links: [
            { label: "Privacy Policy", href: "/" },
            { label: "Terms of Service", href: "/" },
            { label: "Cookie Policy", href: "/" },
            { label: "Accessibility", href: "/" },
        ],
    },
};

const socialLinks = [
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
];

// ============================================================================
// FOOTER COLUMN
// ============================================================================

interface FooterColumnProps {
    title: string;
    links: { label: string; href: string }[];
    delay: number;
}

function FooterColumn({ title, links, delay }: FooterColumnProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay }}
        >
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-900">
                {title}
            </h4>
            <ul className="mt-4 space-y-3">
                {links.map((link) => (
                    <li key={link.label}>
                        <Link
                            href={link.href as "/"}
                            className="text-sm text-slate-600 transition-colors hover:text-emerald-600"
                        >
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </motion.div>
    );
}

// ============================================================================
// NEWSLETTER FORM
// ============================================================================

function NewsletterForm() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="rounded-2xl border border-slate-200 bg-gradient-to-br from-emerald-50 to-teal-50 p-6"
        >
            <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-emerald-600" />
                <h4 className="font-semibold text-slate-900">Stay Updated</h4>
            </div>
            <p className="mt-2 text-sm text-slate-600">
                Get weekly impact reports and community stories delivered to your inbox.
            </p>
            <form className="mt-4 flex gap-2">
                <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm outline-none transition-shadow focus:ring-2 focus:ring-emerald-500/20"
                />
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
                >
                    Subscribe
                </motion.button>
            </form>
            <p className="mt-3 text-xs text-slate-500">
                No spam, ever. Unsubscribe anytime.
            </p>
        </motion.div>
    );
}

// ============================================================================
// MAIN FOOTER
// ============================================================================

export function Footer() {
    return (
        <footer className="relative overflow-hidden border-t border-slate-200 bg-white">
            {/* Background decoration */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-emerald-100/40 blur-3xl" />
                <div className="absolute -right-32 top-0 h-64 w-64 rounded-full bg-teal-100/40 blur-3xl" />
            </div>

            <div className="relative mx-auto max-w-7xl px-6 py-16">
                {/* Top Section */}
                <div className="grid gap-12 lg:grid-cols-2">
                    {/* Brand & Newsletter */}
                    <div className="space-y-8">
                        {/* Logo */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-3"
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-200/50">
                                <MapPin className="h-6 w-6" />
                            </div>
                            <div>
                                <span className="text-xl font-bold text-slate-900">ZeroHunger</span>
                                <p className="text-sm text-slate-500">Turning excess into access</p>
                            </div>
                        </motion.div>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="max-w-md text-slate-600"
                        >
                            We&apos;re on a mission to end food waste while fighting hunger.
                            Join our community of food heroes making a difference one meal at a time.
                        </motion.p>

                        {/* Social Links */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="flex gap-4"
                        >
                            {socialLinks.map((social) => {
                                const Icon = social.icon;
                                return (
                                    <motion.a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ y: -2, scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-emerald-100 hover:text-emerald-600"
                                        aria-label={social.label}
                                    >
                                        <Icon className="h-5 w-5" />
                                    </motion.a>
                                );
                            })}
                        </motion.div>

                        {/* Newsletter */}
                        <NewsletterForm />
                    </div>

                    {/* Links Grid */}
                    <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
                        <FooterColumn {...footerLinks.product} delay={0.1} />
                        <FooterColumn {...footerLinks.company} delay={0.15} />
                        <FooterColumn {...footerLinks.resources} delay={0.2} />
                        <FooterColumn {...footerLinks.legal} delay={0.25} />
                    </div>
                </div>

                {/* Divider */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="my-12 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"
                />

                {/* Bottom Section */}
                <div className="flex flex-col items-center justify-between gap-4 text-sm text-slate-500 sm:flex-row">
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                    >
                        © {new Date().getFullYear()} ZeroHunger. All rights reserved.
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                        className="flex items-center gap-1"
                    >
                        Made with{" "}
                        <motion.span
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                        >
                            <Heart className="h-4 w-4 fill-rose-500 text-rose-500" />
                        </motion.span>{" "}
                        for a hunger-free world
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 }}
                        className="flex items-center gap-4"
                    >
                        <Link href="https://github.com/zerohunger" className="hover:text-emerald-600" target="_blank">
                            Open Source
                        </Link>
                        <span className="text-slate-300">|</span>
                        <Link href="#" className="hover:text-emerald-600">
                            Status
                        </Link>
                    </motion.div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;

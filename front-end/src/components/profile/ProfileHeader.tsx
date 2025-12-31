"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import {
    Calendar,
    Camera,
    Heart,
    Shield,
    Truck,
    Users,
    Sparkles,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { User } from "@/lib/api";
import { ROLE_CONFIG, type UserRole, calculateProfileCompletion } from "@/types/profile";

// =============================================================================
// Props
// =============================================================================

interface ProfileHeaderProps {
    user: User;
    onEditClick: () => void;
}

// =============================================================================
// Animation Variants
// =============================================================================

const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring" as const,
            stiffness: 300,
            damping: 25,
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring" as const,
            stiffness: 400,
            damping: 25,
        },
    },
};

const avatarVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
        scale: 1,
        opacity: 1,
        transition: {
            type: "spring" as const,
            stiffness: 300,
            damping: 20,
        },
    },
};

const pulseVariants = {
    animate: {
        scale: [1, 1.05, 1],
        opacity: [0.5, 0.8, 0.5],
        transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut" as const,
        },
    },
};

// =============================================================================
// Helper Functions
// =============================================================================

const getInitials = (name: string): string => {
    const parts = name.trim().split(" ").filter(Boolean);
    if (parts.length === 0) return "??";
    const first = parts[0];
    const last = parts[parts.length - 1];
    if (parts.length === 1 || !first || !last) {
        return (first?.substring(0, 2) ?? "??").toUpperCase();
    }
    return ((first[0] ?? "") + (last[0] ?? "")).toUpperCase();
};

const ROLE_ICONS = {
    donor: Heart,
    volunteer: Truck,
    recipient: Users,
    default: Shield,
} as const;

// =============================================================================
// Component
// =============================================================================

export function ProfileHeader({ user, onEditClick }: ProfileHeaderProps) {
    const primaryRole = (user.roles?.[0] || "donor") as UserRole;
    const roleConfig = ROLE_CONFIG[primaryRole] || ROLE_CONFIG.donor;
    const RoleIcon = ROLE_ICONS[primaryRole] || ROLE_ICONS.default;

    const memberSince = useMemo(() => {
        if (!user.created_at) return "Recently joined";
        try {
            return format(new Date(user.created_at), "MMMM yyyy");
        } catch {
            return "Recently joined";
        }
    }, [user.created_at]);

    const completion = useMemo(
        () => calculateProfileCompletion(user),
        [user]
    );

    const completionHint = completion.missingFields.length
        ? completion.missingFields.join(", ")
        : "Add more details to stand out";

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative overflow-hidden rounded-2xl bg-linear-to-br from-white via-slate-50/80 to-emerald-50/50 border border-slate-200/60 shadow-xl shadow-slate-200/30"
        >
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -right-20 -top-20 size-64 rounded-full bg-linear-to-br from-emerald-200/30 to-blue-200/20 blur-3xl" />
                <div className="absolute -left-10 -bottom-10 size-48 rounded-full bg-linear-to-br from-violet-200/20 to-pink-200/10 blur-2xl" />
            </div>

            <div className="relative px-6 py-8 sm:px-8 sm:py-10">
                <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
                    {/* Avatar Section */}
                    <motion.div
                        variants={avatarVariants}
                        className="relative"
                    >
                        {/* Glow effect */}
                        <motion.div
                            variants={pulseVariants}
                            animate="animate"
                            className="absolute inset-0 rounded-full bg-linear-to-br from-emerald-400/40 to-blue-400/30 blur-xl"
                        />

                        {/* Avatar */}
                        <div className="relative">
                            <Avatar className="size-28 border-4 border-white shadow-xl ring-2 ring-emerald-100">
                                <AvatarFallback className="bg-linear-to-br from-emerald-500 to-emerald-600 text-2xl font-bold text-white">
                                    {getInitials(user.name)}
                                </AvatarFallback>
                            </Avatar>

                            {/* Edit overlay button */}
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={onEditClick}
                                className={cn(
                                    "absolute -bottom-1 -right-1",
                                    "flex size-9 items-center justify-center rounded-full",
                                    "bg-white shadow-lg border border-slate-200",
                                    "text-slate-600 hover:text-emerald-600 hover:border-emerald-200",
                                    "transition-colors duration-200"
                                )}
                                aria-label="Edit profile"
                            >
                                <Camera className="size-4" />
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Info Section */}
                    <div className="flex-1 text-center sm:text-left">
                        <motion.div variants={itemVariants} className="space-y-3">
                            {/* Name */}
                            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                                {user.name}
                            </h1>

                            {/* Role Badge */}
                            <motion.div
                                variants={itemVariants}
                                className="inline-flex items-center gap-2"
                            >
                                <span
                                    className={cn(
                                        "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5",
                                        "text-sm font-semibold border",
                                        roleConfig.color
                                    )}
                                >
                                    <RoleIcon className="size-4" />
                                    {roleConfig.label}
                                </span>

                                {/* Impact Score Mini Badge */}
                                <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-sm font-semibold text-amber-800 border border-amber-200">
                                    <Sparkles className="size-3.5" />
                                    {user.impact_score ?? 0} pts
                                </span>
                            </motion.div>

                            {/* Meta info */}
                            <motion.div
                                variants={itemVariants}
                                className="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-500 sm:justify-start"
                            >
                                <span className="flex items-center gap-1.5">
                                    <Calendar className="size-4" />
                                    Member since {memberSince}
                                </span>
                            </motion.div>

                            {/* Role Description */}
                            <motion.p
                                variants={itemVariants}
                                className="text-sm text-slate-600 max-w-md"
                            >
                                {roleConfig.description}
                            </motion.p>
                        </motion.div>
                    </div>

                    {/* Edit Button (Desktop) */}
                    <motion.div
                        variants={itemVariants}
                        className="hidden sm:block"
                    >
                        <Button
                            onClick={onEditClick}
                            variant="outline"
                            className="gap-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-300"
                        >
                            Edit Profile
                        </Button>
                    </motion.div>
                </div>

                {/* Profile Completion Bar */}
                {!completion.isComplete && (
                    <motion.div
                        variants={itemVariants}
                        className="mt-6 rounded-xl bg-white/70 backdrop-blur-sm border border-slate-200/60 p-4"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-slate-700">
                                Profile Completion
                            </span>
                            <span className="text-sm font-bold text-emerald-600">
                                {completion.percentage}%
                            </span>
                        </div>
                        <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${completion.percentage}%` }}
                                transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                                className="h-full rounded-full bg-linear-to-r from-emerald-500 to-emerald-400"
                            />
                        </div>
                        <p className="mt-2 text-xs text-slate-500">
                            Complete your profile: {completionHint}
                        </p>
                    </motion.div>
                )}

                {/* Mobile Edit Button */}
                <motion.div
                    variants={itemVariants}
                    className="mt-6 sm:hidden"
                >
                    <Button
                        onClick={onEditClick}
                        className="w-full gap-2 bg-emerald-600 hover:bg-emerald-700"
                    >
                        Edit Profile
                    </Button>
                </motion.div>
            </div>
        </motion.div>
    );
}

export default ProfileHeader;

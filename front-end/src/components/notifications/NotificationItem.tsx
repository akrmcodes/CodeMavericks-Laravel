"use client";

import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import { X, CheckCircle2, Info, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Notification, NotificationType } from "@/context/NotificationContext";

// ============================================================================
// Props
// ============================================================================

interface NotificationItemProps {
    notification: Notification;
    onMarkAsRead: (id: string) => void;
    onRemove: (id: string) => void;
    index: number;
}

// ============================================================================
// Styling Utilities
// ============================================================================

const getTypeStyles = (type: NotificationType) => {
    switch (type) {
        case "success":
            return {
                bg: "bg-gradient-to-r from-emerald-50/80 to-green-50/60",
                border: "border-emerald-200/60",
                iconBg: "bg-emerald-100",
                accentLine: "bg-emerald-500",
            };
        case "warning":
            return {
                bg: "bg-gradient-to-r from-amber-50/80 to-yellow-50/60",
                border: "border-amber-200/60",
                iconBg: "bg-amber-100",
                accentLine: "bg-amber-500",
            };
        case "info":
        default:
            return {
                bg: "bg-gradient-to-r from-blue-50/80 to-sky-50/60",
                border: "border-blue-200/60",
                iconBg: "bg-blue-100",
                accentLine: "bg-blue-500",
            };
    }
};

const getDefaultIcon = (type: NotificationType) => {
    switch (type) {
        case "success":
            return <CheckCircle2 className="size-4 text-emerald-600" />;
        case "warning":
            return <AlertTriangle className="size-4 text-amber-600" />;
        case "info":
        default:
            return <Info className="size-4 text-blue-600" />;
    }
};

// ============================================================================
// Animation Variants
// ============================================================================

const itemVariants = {
    hidden: {
        opacity: 0,
        x: 50,
        scale: 0.8,
    },
    visible: (index: number) => ({
        opacity: 1,
        x: 0,
        scale: 1,
        transition: {
            type: "spring" as const,
            stiffness: 400,
            damping: 25,
            delay: index * 0.05,
        },
    }),
    exit: {
        opacity: 0,
        x: -50,
        scale: 0.8,
        transition: {
            type: "spring" as const,
            stiffness: 400,
            damping: 25,
        },
    },
};

const hoverVariants = {
    rest: { scale: 1 },
    hover: {
        scale: 1.02,
        transition: {
            type: "spring" as const,
            stiffness: 400,
            damping: 17,
        },
    },
    tap: {
        scale: 0.98,
    },
};

const removeButtonVariants = {
    rest: { opacity: 0, scale: 0.5 },
    hover: {
        opacity: 1,
        scale: 1,
        transition: {
            type: "spring" as const,
            stiffness: 500,
            damping: 25,
        },
    },
};

const unreadDotVariants = {
    initial: { scale: 0 },
    animate: {
        scale: 1,
        transition: {
            type: "spring" as const,
            stiffness: 500,
            damping: 15,
        },
    },
    pulse: {
        scale: [1, 1.2, 1],
        transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut" as const,
        },
    },
};

// ============================================================================
// Component
// ============================================================================

export function NotificationItem({
    notification,
    onMarkAsRead,
    onRemove,
    index,
}: NotificationItemProps) {
    const { id, title, message, type, timestamp, read, icon } = notification;
    const styles = getTypeStyles(type);

    const handleClick = () => {
        if (!read) {
            onMarkAsRead(id);
        }
    };

    const handleRemove = (e: React.MouseEvent) => {
        e.stopPropagation();
        onRemove(id);
    };

    return (
        <motion.div
            layout
            custom={index}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="group relative"
        >
            <motion.div
                variants={hoverVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                onClick={handleClick}
                className={cn(
                    "relative cursor-pointer overflow-hidden rounded-xl border p-4",
                    "backdrop-blur-sm shadow-sm",
                    "transition-shadow duration-300",
                    "hover:shadow-md",
                    styles.bg,
                    styles.border,
                    !read && "ring-1 ring-inset ring-primary/10"
                )}
            >
                {/* Accent line on the left */}
                <div
                    className={cn(
                        "absolute left-0 top-0 h-full w-1 rounded-l-xl",
                        styles.accentLine,
                        read && "opacity-30"
                    )}
                />

                {/* Content */}
                <div className="flex items-start gap-3 pl-2">
                    {/* Icon */}
                    <div
                        className={cn(
                            "flex size-10 shrink-0 items-center justify-center rounded-full",
                            styles.iconBg,
                            "shadow-sm"
                        )}
                    >
                        {icon || getDefaultIcon(type)}
                    </div>

                    {/* Text Content */}
                    <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                            <h4
                                className={cn(
                                    "truncate text-sm font-semibold text-slate-900",
                                    read && "text-slate-600"
                                )}
                            >
                                {title}
                            </h4>

                            {/* Unread indicator */}
                            {!read && (
                                <motion.div
                                    variants={unreadDotVariants}
                                    initial="initial"
                                    animate={["animate", "pulse"]}
                                    className="size-2 shrink-0 rounded-full bg-primary shadow-sm shadow-primary/30"
                                />
                            )}
                        </div>

                        <p
                            className={cn(
                                "mt-1 line-clamp-2 text-sm text-slate-600",
                                read && "text-slate-500"
                            )}
                        >
                            {message}
                        </p>

                        <p className="mt-2 text-xs text-slate-400">
                            {formatDistanceToNow(new Date(timestamp), {
                                addSuffix: true,
                            })}
                        </p>
                    </div>

                    {/* Remove button (appears on hover) */}
                    <motion.button
                        variants={removeButtonVariants}
                        onClick={handleRemove}
                        className={cn(
                            "absolute right-2 top-2",
                            "flex size-6 items-center justify-center rounded-full",
                            "bg-slate-100 text-slate-400",
                            "hover:bg-red-100 hover:text-red-500",
                            "transition-colors duration-200",
                            "focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                        )}
                        aria-label="Remove notification"
                    >
                        <X className="size-3.5" />
                    </motion.button>
                </div>

                {/* Shimmer effect on hover */}
                <motion.div
                    className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent"
                    initial={false}
                    whileHover={{
                        translateX: "100%",
                        transition: { duration: 0.6, ease: "easeInOut" as const },
                    }}
                />
            </motion.div>
        </motion.div>
    );
}

export default NotificationItem;

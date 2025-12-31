"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Bell, BellOff, CheckCheck, Sparkles, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNotifications } from "@/context/NotificationContext";
import { NotificationItem } from "./NotificationItem";

// ============================================================================
// Animation Variants
// ============================================================================

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
            delayChildren: 0.1,
        },
    },
};

const headerVariants = {
    hidden: { opacity: 0, y: -10 },
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

const buttonVariants = {
    rest: { scale: 1 },
    hover: {
        scale: 1.05,
        transition: {
            type: "spring" as const,
            stiffness: 400,
            damping: 17,
        },
    },
    tap: { scale: 0.95 },
};

const emptyStateVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            type: "spring" as const,
            stiffness: 300,
            damping: 25,
            delay: 0.1,
        },
    },
};

const floatingBellVariants = {
    animate: {
        y: [0, -8, 0],
        rotate: [0, 5, -5, 0],
        transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut" as const,
        },
    },
};

const sparkleVariants = {
    animate: {
        scale: [1, 1.2, 1],
        opacity: [0.5, 1, 0.5],
        transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut" as const,
        },
    },
};

// ============================================================================
// Empty State Component
// ============================================================================

function EmptyState() {
    return (
        <motion.div
            variants={emptyStateVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center justify-center py-12 text-center"
        >
            {/* Animated illustration */}
            <div className="relative mb-6">
                {/* Glow effect */}
                <div className="absolute inset-0 blur-2xl">
                    <div className="size-24 rounded-full bg-linear-to-br from-emerald-200/50 to-blue-200/50" />
                </div>

                {/* Bell icon */}
                <motion.div
                    variants={floatingBellVariants}
                    animate="animate"
                    className="relative flex size-24 items-center justify-center rounded-full bg-linear-to-br from-slate-50 to-slate-100 shadow-inner"
                >
                    <BellOff className="size-10 text-slate-300" />

                    {/* Sparkles */}
                    <motion.div
                        variants={sparkleVariants}
                        animate="animate"
                        className="absolute -right-1 -top-1"
                    >
                        <Sparkles className="size-5 text-amber-400" />
                    </motion.div>
                    <motion.div
                        variants={sparkleVariants}
                        animate="animate"
                        style={{ animationDelay: "0.5s" }}
                        className="absolute -bottom-1 -left-1"
                    >
                        <Sparkles className="size-4 text-emerald-400" />
                    </motion.div>
                </motion.div>
            </div>

            <h3 className="text-lg font-semibold text-slate-700">
                All caught up!
            </h3>
            <p className="mt-1 max-w-50 text-sm text-slate-500">
                No new notifications. We&apos;ll let you know when something
                important happens.
            </p>
        </motion.div>
    );
}

// ============================================================================
// Main Component
// ============================================================================

export function NotificationList() {
    const {
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        removeNotification,
        clearAll,
    } = useNotifications();

    const hasNotifications = notifications.length > 0;

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex w-95 flex-col overflow-hidden"
        >
            {/* Glassmorphism Header */}
            <motion.div
                variants={headerVariants}
                className={cn(
                    "sticky top-0 z-10 border-b",
                    "bg-linear-to-r from-white/95 via-slate-50/90 to-white/95",
                    "backdrop-blur-md",
                    "px-4 py-3"
                )}
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="flex size-8 items-center justify-center rounded-lg bg-linear-to-br from-primary/10 to-emerald-100">
                            <Bell className="size-4 text-primary" />
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-slate-900">
                                Notifications
                            </h3>
                            <p className="text-xs text-slate-500">
                                {unreadCount > 0
                                    ? `${unreadCount} unread`
                                    : "All read"}
                            </p>
                        </div>
                    </div>

                    {/* Action buttons */}
                    {hasNotifications && (
                        <div className="flex items-center gap-1">
                            {unreadCount > 0 && (
                                <motion.button
                                    variants={buttonVariants}
                                    initial="rest"
                                    whileHover="hover"
                                    whileTap="tap"
                                    onClick={markAllAsRead}
                                    className={cn(
                                        "flex items-center gap-1.5 rounded-lg px-2.5 py-1.5",
                                        "text-xs font-medium text-slate-600",
                                        "bg-slate-100 hover:bg-emerald-100 hover:text-emerald-700",
                                        "transition-colors duration-200"
                                    )}
                                >
                                    <CheckCheck className="size-3.5" />
                                    <span className="hidden sm:inline">
                                        Mark all read
                                    </span>
                                </motion.button>
                            )}

                            <motion.button
                                variants={buttonVariants}
                                initial="rest"
                                whileHover="hover"
                                whileTap="tap"
                                onClick={clearAll}
                                className={cn(
                                    "flex items-center justify-center rounded-lg p-1.5",
                                    "text-slate-400 hover:text-red-500",
                                    "hover:bg-red-50",
                                    "transition-colors duration-200"
                                )}
                                title="Clear all notifications"
                            >
                                <Trash2 className="size-4" />
                            </motion.button>
                        </div>
                    )}
                </div>
            </motion.div>

            {/* Notification List */}
            <div className="max-h-100 overflow-y-auto overscroll-contain">
                {hasNotifications ? (
                    <div className="space-y-2 p-3">
                        <AnimatePresence mode="popLayout">
                            {notifications.map((notification, index) => (
                                <NotificationItem
                                    key={notification.id}
                                    notification={notification}
                                    onMarkAsRead={markAsRead}
                                    onRemove={removeNotification}
                                    index={index}
                                />
                            ))}
                        </AnimatePresence>
                    </div>
                ) : (
                    <EmptyState />
                )}
            </div>

            {/* Footer gradient fade */}
            {hasNotifications && notifications.length > 3 && (
                <div className="pointer-events-none sticky bottom-0 h-6 bg-linear-to-t from-white to-transparent" />
            )}
        </motion.div>
    );
}

export default NotificationList;

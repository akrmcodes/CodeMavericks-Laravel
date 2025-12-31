"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useNotifications } from "@/context/NotificationContext";
import { NotificationList } from "./NotificationList";

// ============================================================================
// Animation Variants
// ============================================================================

const bellShakeVariants = {
    idle: { rotate: 0 },
    ring: {
        rotate: [0, 15, -15, 12, -12, 8, -8, 5, -5, 0],
        transition: {
            duration: 0.8,
            ease: "easeInOut" as const,
        },
    },
};

const bellHoverVariants = {
    rest: { scale: 1 },
    hover: {
        scale: 1.1,
        transition: {
            type: "spring" as const,
            stiffness: 400,
            damping: 17,
        },
    },
    tap: { scale: 0.95 },
};

const badgeVariants = {
    hidden: {
        scale: 0,
        opacity: 0,
    },
    visible: {
        scale: 1,
        opacity: 1,
        transition: {
            type: "spring" as const,
            stiffness: 500,
            damping: 15,
        },
    },
    exit: {
        scale: 0,
        opacity: 0,
        transition: {
            type: "spring" as const,
            stiffness: 500,
            damping: 25,
        },
    },
};

const badgePulseVariants = {
    pulse: {
        scale: [1, 1.2, 1],
        transition: {
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut" as const,
        },
    },
};

const glowVariants = {
    animate: {
        opacity: [0.3, 0.6, 0.3],
        scale: [1, 1.3, 1],
        transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut" as const,
        },
    },
};

const popoverVariants = {
    hidden: {
        opacity: 0,
        scale: 0.95,
        y: -10,
    },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            type: "spring" as const,
            stiffness: 400,
            damping: 25,
        },
    },
    exit: {
        opacity: 0,
        scale: 0.95,
        y: -10,
        transition: {
            duration: 0.15,
        },
    },
};

// ============================================================================
// Component
// ============================================================================

export function NotificationBell() {
    const { unreadCount } = useNotifications();
    const [isShaking, setIsShaking] = useState(false);
    const previousCountRef = useRef(0);
    const [isOpen, setIsOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    // Ensure consistent rendering between server and client
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Sync previousCountRef after mount
    useEffect(() => {
        if (isMounted) {
            previousCountRef.current = unreadCount;
        }
    }, [isMounted, unreadCount]);

    // Trigger shake animation when new notifications arrive
    useEffect(() => {
        // Only trigger if count increased (new notification)
        if (unreadCount > previousCountRef.current && previousCountRef.current !== 0) {
            // Use requestAnimationFrame to batch state updates
            requestAnimationFrame(() => {
                setIsShaking(true);
            });
            const timer = setTimeout(() => {
                requestAnimationFrame(() => {
                    setIsShaking(false);
                });
            }, 800);
            previousCountRef.current = unreadCount;
            return () => clearTimeout(timer);
        }
        previousCountRef.current = unreadCount;
    }, [unreadCount]);

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <motion.button
                    variants={bellHoverVariants}
                    initial="rest"
                    whileHover="hover"
                    whileTap="tap"
                    className={cn(
                        "relative flex size-10 items-center justify-center rounded-full",
                        "bg-white/80 backdrop-blur-sm",
                        "border border-slate-200/60 shadow-sm",
                        "hover:border-emerald-200 hover:bg-emerald-50/50",
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                        "transition-colors duration-200"
                    )}
                    aria-label={`Notifications${isMounted && unreadCount > 0 ? ` (${unreadCount} unread)` : ""}`}
                >
                    {/* Glow effect behind the bell when there are unread notifications */}
                    <AnimatePresence>
                        {isMounted && unreadCount > 0 && (
                            <motion.div
                                variants={glowVariants}
                                initial={{ opacity: 0 }}
                                animate="animate"
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 rounded-full bg-primary/20 blur-md"
                            />
                        )}
                    </AnimatePresence>

                    {/* Bell Icon with shake animation */}
                    <motion.div
                        variants={bellShakeVariants}
                        animate={isShaking ? "ring" : "idle"}
                    >
                        <Bell
                            className={cn(
                                "size-5 transition-colors duration-200",
                                isMounted && unreadCount > 0
                                    ? "text-primary"
                                    : "text-slate-600"
                            )}
                            aria-hidden="true"
                        />
                    </motion.div>

                    {/* Unread Badge */}
                    <AnimatePresence>
                        {isMounted && unreadCount > 0 && (
                            <motion.div
                                variants={badgeVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="absolute -right-0.5 -top-0.5"
                            >
                                {/* Pulse glow */}
                                <motion.div
                                    variants={badgePulseVariants}
                                    animate="pulse"
                                    className="absolute inset-0 rounded-full bg-red-500/50 blur-sm"
                                />

                                {/* Badge */}
                                <motion.span
                                    className={cn(
                                        "relative flex items-center justify-center",
                                        "min-w-4.5 h-4.5 px-1",
                                        "rounded-full bg-linear-to-br from-red-500 to-rose-600",
                                        "text-[10px] font-bold text-white",
                                        "shadow-lg shadow-red-500/30",
                                        "border border-white"
                                    )}
                                >
                                    {unreadCount > 99 ? "99+" : unreadCount}
                                </motion.span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.button>
            </PopoverTrigger>

            <AnimatePresence>
                {isOpen && (
                    <PopoverContent
                        align="end"
                        sideOffset={12}
                        className="w-auto border-0 bg-transparent p-0 shadow-none"
                        asChild
                    >
                        <motion.div
                            variants={popoverVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className={cn(
                                "overflow-hidden rounded-2xl",
                                "bg-white/95 backdrop-blur-xl",
                                "border border-slate-200/60",
                                "shadow-2xl shadow-slate-900/10",
                                "ring-1 ring-black/5"
                            )}
                        >
                            <NotificationList />
                        </motion.div>
                    </PopoverContent>
                )}
            </AnimatePresence>
        </Popover>
    );
}

export default NotificationBell;

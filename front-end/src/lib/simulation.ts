/**
 * Simulation Engine for ZeroHunger Notification System
 *
 * This module provides utilities to simulate real-time activity
 * for demo/testing purposes without a backend.
 */

import type { NotificationType } from "@/context/NotificationContext";
import {
    Heart,
    Package,
    Truck,
    MapPin,
    Clock,
    Star,
    AlertTriangle,
    CheckCircle,
    Users,
    Sparkles,
} from "lucide-react";
import { createElement } from "react";

// ============================================================================
// Types
// ============================================================================

interface SimulatedNotification {
    title: string;
    message: string;
    type: NotificationType;
    icon?: React.ReactNode;
}

// ============================================================================
// Notification Templates
// ============================================================================

const notificationTemplates: SimulatedNotification[] = [
    // Success notifications
    {
        title: "Donation Claimed! 🎉",
        message:
            "Your fresh vegetables donation has been claimed by Downtown Food Pantry.",
        type: "success",
        icon: createElement(Heart, { className: "size-5 text-rose-500" }),
    },
    {
        title: "Pickup Completed",
        message:
            "Volunteer Sarah M. has successfully picked up your donation. Thank you for your generosity!",
        type: "success",
        icon: createElement(CheckCircle, { className: "size-5 text-emerald-500" }),
    },
    {
        title: "Delivery Confirmed",
        message:
            "Your donation of canned goods has been delivered to Community Kitchen.",
        type: "success",
        icon: createElement(Package, { className: "size-5 text-blue-500" }),
    },
    {
        title: "5-Star Rating Received!",
        message:
            "A recipient gave you a 5-star rating for your recent donation. You're making a difference!",
        type: "success",
        icon: createElement(Star, { className: "size-5 text-amber-500" }),
    },

    // Info notifications
    {
        title: "Volunteer Nearby",
        message:
            "A volunteer is within 2 miles of your location. They can pick up donations soon.",
        type: "info",
        icon: createElement(Truck, { className: "size-5 text-blue-500" }),
    },
    {
        title: "New Recipient Registered",
        message:
            "Hope Community Center has joined ZeroHunger and is now accepting donations.",
        type: "info",
        icon: createElement(Users, { className: "size-5 text-violet-500" }),
    },
    {
        title: "Pickup Scheduled",
        message:
            "Michael T. will pick up your donation today between 2:00 PM - 4:00 PM.",
        type: "info",
        icon: createElement(Clock, { className: "size-5 text-sky-500" }),
    },
    {
        title: "Donation Spotted Nearby",
        message:
            "A new donation of baked goods is available 0.5 miles from your location.",
        type: "info",
        icon: createElement(MapPin, { className: "size-5 text-orange-500" }),
    },
    {
        title: "Weekly Impact Report",
        message:
            "You've helped save 23 lbs of food this week! View your impact dashboard.",
        type: "info",
        icon: createElement(Sparkles, { className: "size-5 text-violet-500" }),
    },

    // Warning notifications
    {
        title: "Donation Expiring Soon",
        message:
            "Your bread donation expires in 4 hours. Consider reducing the pickup window.",
        type: "warning",
        icon: createElement(AlertTriangle, { className: "size-5 text-amber-500" }),
    },
    {
        title: "Pickup Delayed",
        message:
            "The volunteer encountered traffic. New ETA: 25 minutes. We apologize for the delay.",
        type: "warning",
        icon: createElement(Clock, { className: "size-5 text-amber-500" }),
    },
];

// ============================================================================
// Random Utilities
// ============================================================================

const getRandomItem = <T>(array: T[]): T => {
    const index = Math.floor(Math.random() * array.length);
    return array[index] as T;
};

const getRandomDelay = (min: number, max: number): number =>
    Math.floor(Math.random() * (max - min + 1)) + min;

// ============================================================================
// Simulation Functions
// ============================================================================

/**
 * Simulates a single random notification after a delay.
 *
 * @param addNotification - The function to add a notification (from useNotifications hook)
 * @param delayMs - Delay in milliseconds before triggering (default: 2000)
 * @returns A cleanup function to cancel the scheduled notification
 *
 * @example
 * ```tsx
 * const { addNotification } = useNotifications();
 *
 * // Simulate a notification after 2 seconds
 * const cancel = simulateActivity(addNotification);
 *
 * // Cancel if needed
 * cancel();
 * ```
 */
export function simulateActivity(
    addNotification: (
        title: string,
        message: string,
        type?: NotificationType,
        icon?: React.ReactNode
    ) => void,
    delayMs: number = 2000
): () => void {
    const timeoutId = setTimeout(() => {
        const notification = getRandomItem(notificationTemplates);
        addNotification(
            notification.title,
            notification.message,
            notification.type,
            notification.icon
        );
    }, delayMs);

    return () => clearTimeout(timeoutId);
}

/**
 * Simulates multiple notifications at random intervals.
 *
 * @param addNotification - The function to add a notification
 * @param count - Number of notifications to simulate (default: 3)
 * @param minDelayMs - Minimum delay between notifications (default: 3000)
 * @param maxDelayMs - Maximum delay between notifications (default: 8000)
 * @returns A cleanup function to cancel all scheduled notifications
 *
 * @example
 * ```tsx
 * const { addNotification } = useNotifications();
 *
 * // Simulate 5 notifications with random delays
 * const cancel = simulateBurst(addNotification, 5);
 * ```
 */
export function simulateBurst(
    addNotification: (
        title: string,
        message: string,
        type?: NotificationType,
        icon?: React.ReactNode
    ) => void,
    count: number = 3,
    minDelayMs: number = 3000,
    maxDelayMs: number = 8000
): () => void {
    const timeoutIds: ReturnType<typeof setTimeout>[] = [];
    let cumulativeDelay = 0;

    for (let i = 0; i < count; i++) {
        cumulativeDelay += getRandomDelay(minDelayMs, maxDelayMs);
        const timeoutId = setTimeout(() => {
            const notification = getRandomItem(notificationTemplates);
            addNotification(
                notification.title,
                notification.message,
                notification.type,
                notification.icon
            );
        }, cumulativeDelay);
        timeoutIds.push(timeoutId);
    }

    return () => {
        timeoutIds.forEach(clearTimeout);
    };
}

/**
 * Creates a continuous simulation that triggers notifications at random intervals.
 * Useful for demos to show a "live" feeling system.
 *
 * @param addNotification - The function to add a notification
 * @param minIntervalMs - Minimum interval between notifications (default: 10000)
 * @param maxIntervalMs - Maximum interval between notifications (default: 30000)
 * @returns A cleanup function to stop the simulation
 *
 * @example
 * ```tsx
 * useEffect(() => {
 *   const stop = startContinuousSimulation(addNotification);
 *   return stop; // Cleanup on unmount
 * }, [addNotification]);
 * ```
 */
export function startContinuousSimulation(
    addNotification: (
        title: string,
        message: string,
        type?: NotificationType,
        icon?: React.ReactNode
    ) => void,
    minIntervalMs: number = 10000,
    maxIntervalMs: number = 30000
): () => void {
    let isRunning = true;
    let currentTimeout: ReturnType<typeof setTimeout>;

    const scheduleNext = () => {
        if (!isRunning) return;

        const delay = getRandomDelay(minIntervalMs, maxIntervalMs);
        currentTimeout = setTimeout(() => {
            if (!isRunning) return;

            const notification = getRandomItem(notificationTemplates);
            addNotification(
                notification.title,
                notification.message,
                notification.type,
                notification.icon
            );
            scheduleNext();
        }, delay);
    };

    scheduleNext();

    return () => {
        isRunning = false;
        clearTimeout(currentTimeout);
    };
}

/**
 * Triggers a specific type of notification for testing purposes.
 *
 * @param addNotification - The function to add a notification
 * @param type - The type of notification to simulate
 */
export function simulateByType(
    addNotification: (
        title: string,
        message: string,
        type?: NotificationType,
        icon?: React.ReactNode
    ) => void,
    type: NotificationType
): void {
    const filteredTemplates = notificationTemplates.filter(
        (n) => n.type === type
    );
    const notification = getRandomItem(filteredTemplates);
    addNotification(
        notification.title,
        notification.message,
        notification.type,
        notification.icon
    );
}

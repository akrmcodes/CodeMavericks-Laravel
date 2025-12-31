"use client";

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
    type PropsWithChildren,
} from "react";
import { toast } from "sonner";
import {
    CheckCircle2,
    Info,
    AlertTriangle,
    Sparkles,
    Heart,
    Package,
} from "lucide-react";

// ============================================================================
// Types
// ============================================================================

export type NotificationType = "success" | "info" | "warning";

export interface Notification {
    id: string;
    title: string;
    message: string;
    type: NotificationType;
    timestamp: Date;
    read: boolean;
    icon?: React.ReactNode;
}

interface NotificationContextType {
    notifications: Notification[];
    unreadCount: number;
    addNotification: (
        title: string,
        message: string,
        type?: NotificationType,
        icon?: React.ReactNode
    ) => void;
    markAsRead: (id: string) => void;
    markAllAsRead: () => void;
    removeNotification: (id: string) => void;
    clearAll: () => void;
}

// ============================================================================
// Context
// ============================================================================

const NotificationContext = createContext<NotificationContextType | null>(null);

// ============================================================================
// Utility: Generate unique IDs
// ============================================================================

const generateId = () =>
    `notif_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

// ============================================================================
// Utility: Toast icon mapping
// ============================================================================

const getToastIcon = (type: NotificationType) => {
    switch (type) {
        case "success":
            return <CheckCircle2 className="size-5 text-emerald-500" />;
        case "warning":
            return <AlertTriangle className="size-5 text-amber-500" />;
        case "info":
        default:
            return <Info className="size-5 text-blue-500" />;
    }
};

// ============================================================================
// Utility: Play notification sound (optional, gentle)
// ============================================================================

const playNotificationSound = () => {
    // Create a gentle, short notification sound using Web Audio API
    try {
        const audioContext = new (window.AudioContext ||
            (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.setValueAtTime(880, audioContext.currentTime); // A5 note
        oscillator.type = "sine";

        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(
            0.01,
            audioContext.currentTime + 0.15
        );

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.15);
    } catch {
        // Silently fail if audio context is not available
    }
};

// ============================================================================
// Mock Data: Pre-filled notifications
// ============================================================================

const createMockNotifications = (): Notification[] => [
    {
        id: generateId(),
        title: "Welcome to ZeroHunger! 🌱",
        message:
            "Thank you for joining our mission to reduce food waste and fight hunger.",
        type: "info",
        timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
        read: false,
        icon: <Sparkles className="size-5 text-violet-500" />,
    },
    {
        id: generateId(),
        title: "Donation #1247 was claimed",
        message:
            "Great news! Your fresh vegetables donation has been claimed by a local shelter.",
        type: "success",
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        read: false,
        icon: <Heart className="size-5 text-rose-500" />,
    },
    {
        id: generateId(),
        title: "New pickup scheduled",
        message:
            "A volunteer is on the way to pick up your donation. ETA: 15 minutes.",
        type: "info",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        read: true,
        icon: <Package className="size-5 text-blue-500" />,
    },
];

// ============================================================================
// Provider Component
// ============================================================================

export function NotificationProvider({ children }: PropsWithChildren) {
    // Initialize with empty array for SSR hydration compatibility
    // Using lazy initializer with a flag to load mock data after first render
    const [notifications, setNotifications] = useState<Notification[]>([]);

    // Load mock notifications after hydration to prevent mismatch
    // Using a ref to track if initial load happened to avoid lint warning
    const hasInitializedRef = useRef(false);

    useEffect(() => {
        if (!hasInitializedRef.current) {
            hasInitializedRef.current = true;
            // Defer state update to next tick to avoid cascading render warning
            queueMicrotask(() => {
                setNotifications(createMockNotifications());
            });
        }
    }, []);

    // Compute unread count
    const unreadCount = useMemo(
        () => notifications.filter((n) => !n.read).length,
        [notifications]
    );

    // Add a new notification
    const addNotification = useCallback(
        (
            title: string,
            message: string,
            type: NotificationType = "info",
            icon?: React.ReactNode
        ) => {
            const newNotification: Notification = {
                id: generateId(),
                title,
                message,
                type,
                timestamp: new Date(),
                read: false,
                icon: icon || getToastIcon(type),
            };

            // 1. Add to internal state (History)
            setNotifications((prev) => [newNotification, ...prev]);

            // 2. Trigger Sonner toast for immediate visual feedback
            const toastFn =
                type === "success"
                    ? toast.success
                    : type === "warning"
                        ? toast.warning
                        : toast.info;

            toastFn(title, {
                description: message,
                icon: newNotification.icon,
                duration: 4000,
                className: "notification-toast",
            });

            // 3. Play subtle sound
            playNotificationSound();
        },
        []
    );

    // Mark a single notification as read
    const markAsRead = useCallback((id: string) => {
        setNotifications((prev) =>
            prev.map((n) => (n.id === id ? { ...n, read: true } : n))
        );
    }, []);

    // Mark all notifications as read
    const markAllAsRead = useCallback(() => {
        setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    }, []);

    // Remove a single notification
    const removeNotification = useCallback((id: string) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, []);

    // Clear all notifications
    const clearAll = useCallback(() => {
        setNotifications([]);
    }, []);

    const value = useMemo<NotificationContextType>(
        () => ({
            notifications,
            unreadCount,
            addNotification,
            markAsRead,
            markAllAsRead,
            removeNotification,
            clearAll,
        }),
        [
            notifications,
            unreadCount,
            addNotification,
            markAsRead,
            markAllAsRead,
            removeNotification,
            clearAll,
        ]
    );

    return (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    );
}

// ============================================================================
// Hook
// ============================================================================

export function useNotifications() {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error(
            "useNotifications must be used within a NotificationProvider"
        );
    }
    return context;
}

export default NotificationContext;

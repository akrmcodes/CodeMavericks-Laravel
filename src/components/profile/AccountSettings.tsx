"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    Lock,
    Key,
    Shield,
    AlertTriangle,
    Trash2,
    Bell,
    Moon,
    Eye,
    ShieldCheck,
    Sparkles,
    ChevronRight,
} from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

// =============================================================================
// Animation Variants
// =============================================================================

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring" as const,
            stiffness: 300,
            damping: 25,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            type: "spring" as const,
            stiffness: 400,
            damping: 25,
        },
    },
};

// =============================================================================
// Settings Item Component
// =============================================================================

interface SettingsItemProps {
    icon: React.ElementType;
    title: string;
    description: string;
    iconBg?: string;
    iconColor?: string;
    action?: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
}

interface ToggleProps {
    checked: boolean;
    onChange: () => void;
    label: string;
}

function Toggle({ checked, onChange, label }: ToggleProps) {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            aria-label={label}
            onClick={onChange}
            className={cn(
                "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                checked ? "bg-emerald-500" : "bg-slate-200"
            )}
        >
            <span
                className={cn(
                    "inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform",
                    checked ? "translate-x-5" : "translate-x-1"
                )}
            />
        </button>
    );
}

function SettingsItem({
    icon: Icon,
    title,
    description,
    iconBg = "bg-slate-100",
    iconColor = "text-slate-600",
    action,
    onClick,
    disabled = false,
}: SettingsItemProps) {
    return (
        <motion.div
            variants={itemVariants}
            onClick={disabled ? undefined : onClick}
            className={cn(
                "flex w-full items-center gap-4 rounded-xl p-4 text-left transition-colors",
                disabled
                    ? "cursor-not-allowed opacity-50"
                    : "hover:bg-slate-50 cursor-pointer"
            )}
            role={onClick && !disabled ? "button" : undefined}
            tabIndex={onClick && !disabled ? 0 : -1}
            aria-disabled={disabled || undefined}
        >
            <div
                className={cn(
                    "flex size-11 shrink-0 items-center justify-center rounded-xl",
                    iconBg
                )}
            >
                <Icon className={cn("size-5", iconColor)} />
            </div>
            <div className="min-w-0 flex-1">
                <p className="font-semibold text-slate-900">{title}</p>
                <p className="text-sm text-slate-500">{description}</p>
            </div>
            {action || <ChevronRight className="size-5 shrink-0 text-slate-400" />}
        </motion.div>
    );
}

// =============================================================================
// Main Component
// =============================================================================

export function AccountSettings() {
    const [settings, setSettings] = useState({
        darkMode: false,
        emailAlerts: true,
        pushAlerts: true,
        smsAlerts: false,
        profilePublic: true,
        shareActivity: true,
    });

    const saveToast = (message: string) =>
        toast.success("Settings saved (Demo)", { description: message });

    const toggleSetting = (key: keyof typeof settings, label: string) => {
        setSettings((prev) => {
            const next = { ...prev, [key]: !prev[key] };
            saveToast(`${label} ${!prev[key] ? "enabled" : "disabled"}`);
            return next;
        });
    };

    const handleSensitiveAction = (action: string) => {
        saveToast(`${action} (Demo)`);
    };

    return (
        <div className="space-y-6">
            {/* Appearance & Theme */}
            <motion.div
                variants={cardVariants}
                initial="hidden"
                animate="visible"
            >
                <Card className="border-slate-200/60 shadow-md">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Moon className="size-5 text-emerald-600" />
                            Appearance
                        </CardTitle>
                        <CardDescription>
                            Personalize your experience for this demo
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-1">
                        <SettingsItem
                            icon={Moon}
                            title="Dark Mode"
                            description="Switch between light and dark themes"
                            iconBg="bg-emerald-100"
                            iconColor="text-emerald-600"
                            action={
                                <Toggle
                                    checked={settings.darkMode}
                                    onChange={() => toggleSetting("darkMode", "Dark mode")}
                                    label="Dark mode"
                                />
                            }
                        />
                        <Separator className="my-2" />
                        <SettingsItem
                            icon={Sparkles}
                            title="Share Activity"
                            description="Show impact badges across the dashboard"
                            iconBg="bg-blue-100"
                            iconColor="text-blue-600"
                            action={
                                <Toggle
                                    checked={settings.shareActivity}
                                    onChange={() => toggleSetting("shareActivity", "Activity sharing")}
                                    label="Share activity"
                                />
                            }
                        />
                    </CardContent>
                </Card>
            </motion.div>

            {/* Notifications */}
            <motion.div
                variants={cardVariants}
                initial="hidden"
                animate="visible"
            >
                <Card className="border-slate-200/60 shadow-md">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Bell className="size-5 text-amber-600" />
                            Notifications
                        </CardTitle>
                        <CardDescription>
                            Control how you receive updates in this demo
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-1">
                        <SettingsItem
                            icon={Bell}
                            title="Email Alerts"
                            description="Donation updates and weekly summaries"
                            iconBg="bg-amber-100"
                            iconColor="text-amber-700"
                            action={
                                <Toggle
                                    checked={settings.emailAlerts}
                                    onChange={() => toggleSetting("emailAlerts", "Email alerts")}
                                    label="Email alerts"
                                />
                            }
                        />
                        <Separator className="my-2" />
                        <SettingsItem
                            icon={Shield}
                            title="Push Notifications"
                            description="Real-time status changes"
                            iconBg="bg-emerald-100"
                            iconColor="text-emerald-700"
                            action={
                                <Toggle
                                    checked={settings.pushAlerts}
                                    onChange={() => toggleSetting("pushAlerts", "Push notifications")}
                                    label="Push notifications"
                                />
                            }
                        />
                        <Separator className="my-2" />
                        <SettingsItem
                            icon={Key}
                            title="SMS Backup"
                            description="Only for critical delivery updates"
                            iconBg="bg-blue-100"
                            iconColor="text-blue-700"
                            action={
                                <Toggle
                                    checked={settings.smsAlerts}
                                    onChange={() => toggleSetting("smsAlerts", "SMS alerts")}
                                    label="SMS alerts"
                                />
                            }
                        />
                    </CardContent>
                </Card>
            </motion.div>

            {/* Privacy & Safety */}
            <motion.div
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.05 }}
            >
                <Card className="border-slate-200/60 shadow-md">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <ShieldCheck className="size-5 text-slate-700" />
                            Privacy & Safety
                        </CardTitle>
                        <CardDescription>
                            Control what others can see in this demo
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-1">
                        <SettingsItem
                            icon={Eye}
                            title="Public Profile"
                            description="Show your impact stats on leaderboards"
                            iconBg="bg-slate-100"
                            iconColor="text-slate-700"
                            action={
                                <Toggle
                                    checked={settings.profilePublic}
                                    onChange={() => toggleSetting("profilePublic", "Public profile")}
                                    label="Public profile"
                                />
                            }
                        />
                        <Separator className="my-2" />
                        <SettingsItem
                            icon={Shield}
                            title="Privacy Lock"
                            description="Hide contact details in listings"
                            iconBg="bg-purple-100"
                            iconColor="text-purple-700"
                            action={
                                <Toggle
                                    checked={!settings.profilePublic}
                                    onChange={() => toggleSetting("profilePublic", "Privacy lock")}
                                    label="Privacy lock"
                                />
                            }
                        />
                    </CardContent>
                </Card>
            </motion.div>

            {/* Danger Zone */}
            <motion.div
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.1 }}
            >
                <Card className="border-red-200/60 bg-red-50/30 shadow-md">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-red-700">
                            <AlertTriangle className="size-5" />
                            Danger Zone
                        </CardTitle>
                        <CardDescription className="text-red-600/80">
                            Irreversible actions (demo only)
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-xl border border-red-200 bg-white p-4">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <p className="font-semibold text-slate-900">
                                        Delete Account
                                    </p>
                                    <p className="text-sm text-slate-500">
                                        Permanently delete your account and all associated data
                                    </p>
                                </div>
                                <Button
                                    variant="outline"
                                    onClick={() => handleSensitiveAction("Delete account")}
                                    className="shrink-0 border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-400"
                                >
                                    <Trash2 className="mr-2 size-4" />
                                    Delete Account
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}

export default AccountSettings;

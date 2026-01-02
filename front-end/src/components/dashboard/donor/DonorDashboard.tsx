"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { PlusCircle } from "lucide-react";
import {
    Pie,
    PieChart,
    ResponsiveContainer,
    Cell,
    Tooltip,
    type TooltipProps,
} from "recharts";

import { ActionBanner } from "@/components/dashboard/shared/ActionBanner";
import { ActivityList } from "@/components/dashboard/shared/ActivityList";
import { StatCard } from "@/components/dashboard/shared/StatCard";
import { containerVariants, itemVariants } from "@/components/dashboard/shared/variants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import {
    getSimulatedStats,
    getImpactLevel,
    type DonorStats,
} from "@/lib/utils/profile-simulation";

type StatusDatum = {
    name: string;
    value: number;
    color: string;
};

/**
 * Generate deterministic activity items based on donation count
 */
function generateActivityItems(donations: number) {
    const baseActivities = [
        { title: "Donated fresh vegetables", time: "2h ago" },
        { title: "Claimed by volunteer Ahmed", time: "4h ago" },
        { title: "Delivered to Community Kitchen", time: "Yesterday" },
        { title: "Donated fresh bread", time: "2 days ago" },
        { title: "Pickup scheduled for tomorrow", time: "3 days ago" },
    ];
    // Show more activities for users with more donations
    const activityCount = Math.min(Math.max(2, Math.floor(donations / 8)), 5);
    return baseActivities.slice(0, activityCount);
}

/**
 * Generate deterministic status data based on donation stats
 */
function generateStatusData(donations: number): StatusDatum[] {
    const pending = Math.max(1, Math.floor(donations * 0.15));
    const claimed = Math.max(1, Math.floor(donations * 0.25));
    const delivered = Math.max(1, donations - pending - claimed);

    return [
        { name: "Pending", value: pending, color: "#94a3b8" },
        { name: "Claimed", value: claimed, color: "#f59e0b" },
        { name: "Delivered", value: delivered, color: "#10b981" },
    ];
}

interface ImpactRingProps {
    progress: number;
}

function ImpactRing({ progress }: ImpactRingProps) {
    const percentage = Math.round(progress);
    return (
        <div className="relative flex h-24 w-24 items-center justify-center">
            <svg className="h-24 w-24 -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" className="stroke-emerald-100" strokeWidth="10" fill="none" />
                <circle
                    cx="50"
                    cy="50"
                    r="42"
                    className="stroke-emerald-500"
                    strokeWidth="10"
                    fill="none"
                    strokeDasharray={`${(progress / 100) * 264} 999`}
                    strokeLinecap="round"
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-lg font-bold text-slate-900">{percentage}%</span>
                <span className="text-xs text-slate-500">to next level</span>
            </div>
        </div>
    );
}

type StatusTooltipProps = TooltipProps<number, string> & {
    payload?: Array<{ name?: string; value?: number }>;
    label?: string | number;
};

function StatusTooltip({ active, payload }: StatusTooltipProps) {
    if (!active || !payload?.length) return null;
    const item = payload[0];
    if (item?.name == null || item?.value == null) return null;

    return (
        <div className="rounded-md border bg-white px-3 py-2 text-sm shadow">
            <p className="font-semibold text-slate-900">{item.name}</p>
            <p className="text-slate-600">{item.value} donations</p>
        </div>
    );
}

export function DonorDashboard() {
    const { user } = useAuth();

    // Get deterministic stats from the simulation engine
    const stats = useMemo(() => {
        if (!user) return null;
        const result = getSimulatedStats(user);
        return result.role === "donor" ? result as DonorStats : null;
    }, [user]);

    const impactLevel = useMemo(() => {
        return getImpactLevel(stats?.impactScore ?? 0);
    }, [stats?.impactScore]);

    const statusData = useMemo(() => {
        return generateStatusData(stats?.donations ?? 1);
    }, [stats?.donations]);

    const activityItems = useMemo(() => {
        return generateActivityItems(stats?.donations ?? 1);
    }, [stats?.donations]);

    if (!stats) {
        return null;
    }

    const displayStats = [
        {
            title: "Total Donations",
            value: stats.donations.toString(),
            helper: `${stats.mealsProvided} meals provided`,
            accentClass: "bg-emerald-100 text-emerald-800",
        },
        {
            title: "Food Saved",
            value: `${stats.kgSaved} kg`,
            helper: "From going to waste",
            accentClass: "bg-blue-100 text-blue-800",
        },
        {
            title: "Impact Score",
            value: stats.impactScore.toLocaleString(),
            helper: `${impactLevel.level} • Level ${impactLevel.tier}`,
            accentClass: "bg-amber-100 text-amber-800",
        },
    ];

    return (
        <motion.div initial="hidden" animate="show" variants={containerVariants} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {displayStats.map((stat) => {
                    const isImpact = stat.title === "Impact Score";
                    return (
                        <motion.div key={stat.title} variants={itemVariants}>
                            <StatCard
                                title={stat.title}
                                value={stat.value}
                                helper={isImpact ? stat.helper : undefined}
                                badgeText={!isImpact ? stat.helper : undefined}
                                badgeClassName={!isImpact ? stat.accentClass : undefined}
                                endAddon={isImpact ? <ImpactRing progress={impactLevel.progress} /> : undefined}
                                tone="emerald"
                            />
                        </motion.div>
                    );
                })}
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
                <motion.div variants={itemVariants} className="lg:col-span-2">
                    <Card className="h-full border-emerald-100/70 bg-white/90 shadow-sm backdrop-blur">
                        <CardHeader>
                            <CardTitle>Recent Activity</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ActivityList
                                items={activityItems}
                                tone="emerald"
                                emptyMessage="No activity yet. Create your first donation."
                            />
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <Card className="h-full border-emerald-100/70 bg-white/90 shadow-sm backdrop-blur">
                        <CardHeader>
                            <CardTitle>Donation Status</CardTitle>
                        </CardHeader>
                        <CardContent className="h-72">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={statusData}
                                        dataKey="value"
                                        nameKey="name"
                                        innerRadius={55}
                                        outerRadius={80}
                                        paddingAngle={2}
                                    >
                                        {statusData.map((entry) => (
                                            <Cell key={entry.name} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip content={<StatusTooltip />} />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="mt-3 flex flex-wrap gap-3 text-sm text-slate-700">
                                {statusData.map((item) => (
                                    <div key={item.name} className="flex items-center gap-2">
                                        <span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                                        {item.name}
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            <motion.div variants={itemVariants}>
                <ActionBanner
                    title="Donate food now"
                    description="Create a new donation and connect with volunteers instantly."
                    icon={PlusCircle}
                    tone="emerald"
                    actions={[{ label: "Create Donation", href: "/donations/create" }]}
                />
            </motion.div>
        </motion.div>
    );
}

export default DonorDashboard;

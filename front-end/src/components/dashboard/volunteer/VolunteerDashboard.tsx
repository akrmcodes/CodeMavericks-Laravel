"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { CheckCircle, MapPin, Navigation, Scale, Search } from "lucide-react";
import {
    Bar,
    BarChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
    type TooltipProps,
} from "recharts";

import { ActionBanner } from "@/components/dashboard/shared/ActionBanner";
import { StatCard } from "@/components/dashboard/shared/StatCard";
import { containerVariants, itemVariants } from "@/components/dashboard/shared/variants";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import {
    getSimulatedStats,
    type VolunteerStats,
} from "@/lib/utils/profile-simulation";

/**
 * Generate deterministic weekly data based on deliveries count
 */
function generateWeeklyData(deliveries: number) {
    const baseMultiplier = Math.max(1, deliveries / 30);
    return [
        { day: "Mon", deliveries: Math.round(baseMultiplier * 4) },
        { day: "Tue", deliveries: Math.round(baseMultiplier * 6) },
        { day: "Wed", deliveries: Math.round(baseMultiplier * 5) },
        { day: "Thu", deliveries: Math.round(baseMultiplier * 7) },
        { day: "Fri", deliveries: Math.round(baseMultiplier * 3) },
        { day: "Sat", deliveries: Math.round(baseMultiplier * 8) },
        { day: "Sun", deliveries: Math.round(baseMultiplier * 4) },
    ];
}

type StatusTooltipProps = TooltipProps<number, string> & {
    payload?: Array<{ payload?: { day?: string; deliveries?: number } }>;
    label?: string | number;
};

function StatusTooltip({ active, payload }: StatusTooltipProps) {
    if (!active || !payload?.length) return null;
    const point = payload[0]?.payload;
    if (!point) return null;

    return (
        <div className="rounded-md border bg-white px-3 py-2 text-sm shadow">
            <p className="font-semibold text-slate-900">{point.day}</p>
            <p className="text-slate-600">{point.deliveries ?? 0} deliveries</p>
        </div>
    );
}

export function VolunteerDashboard() {
    const { user } = useAuth();

    // Get deterministic stats from the simulation engine
    const stats = useMemo(() => {
        if (!user) return null;
        const result = getSimulatedStats(user);
        return result.role === "volunteer" ? result as VolunteerStats : null;
    }, [user]);

    const weeklyData = useMemo(() => {
        return generateWeeklyData(stats?.deliveries ?? 1);
    }, [stats?.deliveries]);

    if (!stats) {
        return null;
    }

    // Calculate active claims as a portion of total deliveries
    const activeClaims = Math.max(1, Math.floor(stats.deliveries * 0.05));
    const thisWeekDeliveries = weeklyData.reduce((sum, d) => sum + d.deliveries, 0);

    const displayStats = [
        {
            title: "Active Claims",
            value: activeClaims.toString(),
            helper: `${Math.min(activeClaims, 2)} pickups today`,
            icon: MapPin,
            accent: "text-blue-700 bg-blue-100",
        },
        {
            title: "Completed Deliveries",
            value: stats.deliveries.toString(),
            helper: `+${thisWeekDeliveries} this week`,
            icon: CheckCircle,
            accent: "text-emerald-700 bg-emerald-100",
        },
        {
            title: "Total Impact",
            value: `${stats.kmTraveled} km`,
            helper: `${stats.activeHours} hrs volunteered`,
            icon: Scale,
            accent: "text-indigo-700 bg-indigo-100",
        },
    ];

    const hasActiveMission = activeClaims > 0;
    const mission = {
        pickup: "Sunrise Bakery",
        dropoff: "Hope Shelter",
        eta: "18 mins",
    };

    return (
        <motion.div initial="hidden" animate="show" variants={containerVariants} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {displayStats.map((stat) => (
                    <motion.div key={stat.title} variants={itemVariants}>
                        <StatCard
                            title={stat.title}
                            value={stat.value}
                            helper={stat.helper}
                            icon={stat.icon}
                            iconBackground={stat.accent}
                            tone="blue"
                        />
                    </motion.div>
                ))}
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
                <motion.div variants={itemVariants} className="lg:col-span-2">
                    <Card className="h-full border-blue-100/70 bg-blue-50/60 shadow-sm">
                        <CardHeader>
                            <CardTitle>Current Mission</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {hasActiveMission ? (
                                <div className="rounded-xl border border-blue-100 bg-white/90 p-4 shadow-sm">
                                    <div className="flex flex-col gap-2 text-slate-800">
                                        <div className="flex items-center gap-2">
                                            <MapPin className="h-4 w-4 text-blue-600" />
                                            <span className="font-semibold">Pickup:</span>
                                            <span>{mission.pickup}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Navigation className="h-4 w-4 text-emerald-600" />
                                            <span className="font-semibold">Deliver to:</span>
                                            <span>{mission.dropoff}</span>
                                        </div>
                                        <p className="text-sm text-slate-600">ETA: {mission.eta}</p>
                                    </div>
                                    <div className="mt-4 flex flex-wrap gap-3">
                                        <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                                            Mark Picked Up
                                        </Button>
                                        <Button className="bg-blue-600 hover:bg-blue-700">Navigate</Button>
                                    </div>
                                </div>
                            ) : (
                                <div className="rounded-xl border border-blue-100 bg-white/90 p-4 text-slate-700 shadow-sm">
                                    <p className="font-semibold text-slate-900">No active missions</p>
                                    <p className="text-sm text-slate-600">Find a donation to claim and start helping.</p>
                                    <div className="mt-3">
                                        <Button className="bg-blue-600 hover:bg-blue-700">Find Donations</Button>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <Card className="h-full border-blue-100/70 bg-white/90 shadow-sm backdrop-blur">
                        <CardHeader>
                            <CardTitle>Weekly Activity</CardTitle>
                        </CardHeader>
                        <CardContent className="h-72">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={weeklyData}>
                                    <XAxis dataKey="day" tickLine={false} axisLine={false} />
                                    <YAxis tickLine={false} axisLine={false} allowDecimals={false} width={32} />
                                    <Tooltip content={<StatusTooltip />} cursor={{ fill: "rgba(59,130,246,0.08)" }} />
                                    <Bar dataKey="deliveries" radius={[8, 8, 4, 4]} fill="#3b82f6" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            <motion.div variants={itemVariants}>
                <ActionBanner
                    title="Quick actions"
                    description="Find new donations or review your history."
                    icon={Search}
                    tone="blue"
                    actions={[
                        { label: "Find Donations", href: "/claims" },
                        { label: "My History", href: "/claims", variant: "outline" },
                    ]}
                />
            </motion.div>
        </motion.div>
    );
}

export default VolunteerDashboard;

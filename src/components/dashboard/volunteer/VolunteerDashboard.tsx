"use client";

import { motion, type Variants } from "framer-motion";
import { CheckCircle, MapPin, Navigation, Scale, Search } from "lucide-react";
import Link from "next/link";
import {
    Bar,
    BarChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
    type TooltipProps,
} from "recharts";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
    { title: "Active Claims", value: "3", helper: "2 pickups today", icon: MapPin, accent: "text-blue-700 bg-blue-100" },
    { title: "Completed Deliveries", value: "128", helper: "+6 this week", icon: CheckCircle, accent: "text-emerald-700 bg-emerald-100" },
    { title: "Total Impact", value: "6,450 kg", helper: "Food saved", icon: Scale, accent: "text-indigo-700 bg-indigo-100" },
];

const weeklyData = [
    { day: "Mon", deliveries: 4 },
    { day: "Tue", deliveries: 6 },
    { day: "Wed", deliveries: 5 },
    { day: "Thu", deliveries: 7 },
    { day: "Fri", deliveries: 3 },
    { day: "Sat", deliveries: 8 },
    { day: "Sun", deliveries: 4 },
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

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
    const hasActiveMission = true;
    const mission = {
        pickup: "Sunrise Bakery",
        dropoff: "Hope Shelter",
        eta: "18 mins",
    };

    return (
        <motion.div initial="hidden" animate="show" variants={containerVariants} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {stats.map((stat) => (
                    <motion.div key={stat.title} variants={itemVariants}>
                        <Card className="h-full border-blue-100/70 bg-white/90 shadow-sm backdrop-blur">
                            <CardHeader className="flex items-center gap-3">
                                <div className={`flex h-11 w-11 items-center justify-center rounded-full ${stat.accent}`}>
                                    <stat.icon className="h-5 w-5" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <CardTitle className="text-sm font-semibold text-slate-600">{stat.title}</CardTitle>
                                    <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                                    <p className="text-sm text-slate-600">{stat.helper}</p>
                                </div>
                            </CardHeader>
                        </Card>
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
                <Card className="border-dashed border-2 border-blue-200 bg-blue-50/60 shadow-sm">
                    <CardContent className="flex flex-col items-center justify-between gap-4 py-6 text-center sm:flex-row sm:text-left">
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                                <Search className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-lg font-semibold text-slate-900">Quick actions</p>
                                <p className="text-sm text-slate-600">Find new donations or review your history.</p>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <Button asChild className="bg-blue-600 hover:bg-blue-700">
                                <Link href="/claims">Find Donations</Link>
                            </Button>
                            <Button asChild variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                                <Link href="/claims">My History</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </motion.div>
    );
}

export default VolunteerDashboard;

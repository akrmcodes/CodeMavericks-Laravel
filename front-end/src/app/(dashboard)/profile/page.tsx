"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import {
    ProfileHeader,
    ProfileEditForm,
    ImpactScoreCard,
    ProfileStatsCards,
    ProfileStatsCardsSkeleton,
    AccountSettings,
} from "@/components/profile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { User, Settings, Shield } from "lucide-react";
import type { User as UserType } from "@/lib/api";

// =============================================================================
// Animation Variants
// =============================================================================

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
        },
    },
};

const itemVariants = {
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

// =============================================================================
// Loading Skeleton
// =============================================================================

function ProfileSkeleton() {
    return (
        <div className="space-y-6">
            {/* Header Skeleton */}
            <div className="rounded-2xl border border-slate-200/60 bg-white p-8">
                <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
                    <Skeleton className="size-28 rounded-full" />
                    <div className="flex-1 space-y-3 text-center sm:text-left">
                        <Skeleton className="mx-auto h-8 w-48 sm:mx-0" />
                        <Skeleton className="mx-auto h-6 w-24 sm:mx-0" />
                        <Skeleton className="mx-auto h-4 w-36 sm:mx-0" />
                    </div>
                </div>
            </div>

            {/* Stats Skeleton */}
            <ProfileStatsCardsSkeleton />
        </div>
    );
}

// =============================================================================
// Main Page Component
// =============================================================================

export default function ProfilePage() {
    const { user, updateUser, isLoading } = useAuth();
    const [isEditOpen, setIsEditOpen] = useState(false);

    // Handle profile update from the edit form
    const handleProfileUpdate = useCallback(
        (updatedUser: UserType) => {
            updateUser(updatedUser);
        },
        [updateUser]
    );

    // Handle edit button click
    const handleEditClick = useCallback(() => {
        setIsEditOpen(true);
    }, []);

    // Show skeleton while loading
    if (isLoading) {
        return (
            <div className="mx-auto max-w-5xl p-4 sm:p-6 lg:p-8">
                <ProfileSkeleton />
            </div>
        );
    }

    // Handle no user state
    if (!user) {
        return (
            <div className="flex min-h-100 items-center justify-center">
                <p className="text-slate-500">Please log in to view your profile.</p>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-5xl p-4 sm:p-6 lg:p-8">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-8"
            >
                {/* Page Header */}
                <motion.div variants={itemVariants}>
                    <h1 className="text-3xl font-bold text-slate-900">Your Profile</h1>
                    <p className="mt-1 text-slate-500">
                        Manage your identity and track your impact in the community
                    </p>
                </motion.div>

                {/* Profile Header Card */}
                <motion.div variants={itemVariants}>
                    <ProfileHeader user={user} onEditClick={handleEditClick} />
                </motion.div>

                {/* Tabs for Profile Sections */}
                <motion.div variants={itemVariants}>
                    <Tabs defaultValue="overview" className="w-full">
                        <TabsList className="mb-6 w-full justify-start gap-2 bg-transparent p-0">
                            <TabsTrigger
                                value="overview"
                                className="gap-2 rounded-xl data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-800 data-[state=active]:shadow-none"
                            >
                                <User className="size-4" />
                                Overview
                            </TabsTrigger>
                            <TabsTrigger
                                value="settings"
                                className="gap-2 rounded-xl data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-800 data-[state=active]:shadow-none"
                            >
                                <Settings className="size-4" />
                                Settings
                            </TabsTrigger>
                            <TabsTrigger
                                value="security"
                                className="gap-2 rounded-xl data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-800 data-[state=active]:shadow-none"
                            >
                                <Shield className="size-4" />
                                Security
                            </TabsTrigger>
                        </TabsList>

                        {/* Overview Tab */}
                        <TabsContent value="overview" className="mt-0">
                            <div className="grid gap-6 lg:grid-cols-3">
                                {/* Impact Score - Takes 1 column on lg */}
                                <div className="lg:col-span-1">
                                    <ImpactScoreCard score={user.impact_score ?? 0} />
                                </div>

                                {/* Stats Cards - Takes 2 columns on lg */}
                                <div className="lg:col-span-2">
                                    <ProfileStatsCards user={user} />
                                </div>
                            </div>
                        </TabsContent>

                        {/* Settings Tab (Placeholder) */}
                        <TabsContent value="settings" className="mt-0">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="rounded-2xl border border-slate-200/60 bg-white p-8 text-center"
                            >
                                <Settings className="mx-auto mb-4 size-12 text-slate-300" />
                                <h3 className="text-lg font-semibold text-slate-900">
                                    Account Settings
                                </h3>
                                <p className="mt-2 text-slate-500">
                                    Notification preferences and app settings coming soon.
                                </p>
                            </motion.div>
                        </TabsContent>

                        {/* Security Tab */}
                        <TabsContent value="security" className="mt-0">
                            <AccountSettings />
                        </TabsContent>
                    </Tabs>
                </motion.div>
            </motion.div>

            {/* Edit Profile Sheet */}
            <ProfileEditForm
                user={user}
                open={isEditOpen}
                onOpenChange={setIsEditOpen}
                onProfileUpdate={handleProfileUpdate}
            />
        </div>
    );
}

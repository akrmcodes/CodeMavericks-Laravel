/**
 * Profile Simulation Utilities
 * 
 * Generates deterministic "simulated" stats based on the user's real impact_score.
 * This provides consistent, believable data for demo purposes until the API
 * provides actual statistics.
 * 
 * The simulation uses the impact_score as a seed to derive other metrics,
 * ensuring the same user always sees the same numbers.
 */

import type { User } from "@/lib/api";

// =============================================================================
// Types
// =============================================================================

export type UserRole = "donor" | "volunteer" | "recipient";

export interface DonorStats {
    role: "donor";
    donations: number;
    kgSaved: number;
    impactScore: number;
    mealsProvided: number;
}

export interface VolunteerStats {
    role: "volunteer";
    deliveries: number;
    kmTraveled: number;
    impactScore: number;
    activeHours: number;
}

export interface RecipientStats {
    role: "recipient";
    mealsReceived: number;
    savingsEstimate: number;
    impactScore: number;
    monthsActive: number;
}

export type RoleStats = DonorStats | VolunteerStats | RecipientStats;

// =============================================================================
// Helper Functions
// =============================================================================

/**
 * Simple seeded random number generator (deterministic)
 * Uses the user ID as a seed modifier for slight variation
 */
function seededRandom(seed: number, modifier: number = 0): number {
    const x = Math.sin(seed + modifier) * 10000;
    return x - Math.floor(x);
}

/**
 * Get the primary role from a user object
 */
export function getPrimaryRole(user: User): UserRole {
    const role = user.roles?.[0];
    if (role === "donor" || role === "volunteer" || role === "recipient") {
        return role;
    }
    return "donor"; // Default fallback
}

// =============================================================================
// Main Simulation Function
// =============================================================================

/**
 * Generate deterministic stats based on the user's impact_score and role.
 * 
 * The formulas create believable relationships:
 * - Higher impact_score = more donations/deliveries/meals
 * - Stats scale proportionally with small randomization for realism
 * 
 * @param user - The user object from the API
 * @returns Role-specific stats object
 */
export function getSimulatedStats(user: User): RoleStats {
    const impactScore = user.impact_score ?? 0;
    const userId = user.id ?? 1;
    const role = getPrimaryRole(user);

    const baseScore = Math.max(impactScore, 0);
    const idVariance = seededRandom(userId, baseScore) + (userId % 5) * 0.05;
    const softRound = (value: number, precision = 1) =>
        Math.round(value * Math.pow(10, precision)) / Math.pow(10, precision);

    switch (role) {
        case "donor": {
            // Donor heuristic: impact_score ≈ donations*12 + kg*1.8
            const donations = Math.max(
                1,
                Math.floor(baseScore / 15) + Math.floor(idVariance * 4)
            );
            const kgSaved = softRound(donations * (1.8 + idVariance) + baseScore * 0.25, 1);
            const mealsProvided = Math.max(1, Math.floor(kgSaved * 2.6)); // ~2.6 meals per kg

            return {
                role: "donor",
                donations,
                kgSaved,
                impactScore,
                mealsProvided,
            };
        }

        case "volunteer": {
            // Volunteer heuristic: impact_score ≈ deliveries*14 + km*0.4
            const deliveries = Math.max(
                1,
                Math.floor(baseScore / 14) + Math.floor(idVariance * 3)
            );
            const kmTraveled = softRound(deliveries * (4 + idVariance * 5) + baseScore * 0.15, 1);
            const activeHours = softRound(deliveries * 0.8 + idVariance * 1.5, 1); // ~48min per delivery

            return {
                role: "volunteer",
                deliveries,
                kmTraveled,
                impactScore,
                activeHours,
            };
        }

        case "recipient": {
            // Recipient heuristic: impact_score ≈ meals*5
            const mealsReceived = Math.max(
                1,
                Math.floor(baseScore / 5) + Math.floor(idVariance * 6)
            );
            const savingsEstimate = Math.max(5, Math.round(mealsReceived * (3.2 + idVariance)));
            const monthsActive = Math.max(1, Math.floor(baseScore / 28) + 1);

            return {
                role: "recipient",
                mealsReceived,
                savingsEstimate,
                impactScore,
                monthsActive,
            };
        }
    }
}

// =============================================================================
// Impact Level Calculation
// =============================================================================

export interface ImpactLevel {
    level: string;
    tier: number;
    color: string;
    bgColor: string;
    borderColor: string;
    description: string;
    nextLevelAt: number | null;
    progress: number;
}

/**
 * Calculate the user's impact level/tier based on their score.
 * Provides consistent theming and progression information.
 */
export function getImpactLevel(score: number): ImpactLevel {
    if (score >= 1000) {
        return {
            level: "Legend",
            tier: 5,
            color: "text-amber-500",
            bgColor: "from-amber-500/20 to-orange-500/20",
            borderColor: "border-amber-300",
            description: "A true hero in the fight against hunger",
            nextLevelAt: null,
            progress: 100,
        };
    }

    if (score >= 500) {
        return {
            level: "Champion",
            tier: 4,
            color: "text-violet-500",
            bgColor: "from-violet-500/20 to-purple-500/20",
            borderColor: "border-violet-300",
            description: "Making a significant impact in your community",
            nextLevelAt: 1000,
            progress: Math.round(((score - 500) / 500) * 100),
        };
    }

    if (score >= 200) {
        return {
            level: "Hero",
            tier: 3,
            color: "text-emerald-500",
            bgColor: "from-emerald-500/20 to-teal-500/20",
            borderColor: "border-emerald-300",
            description: "Your contributions are changing lives",
            nextLevelAt: 500,
            progress: Math.round(((score - 200) / 300) * 100),
        };
    }

    if (score >= 50) {
        return {
            level: "Rising Star",
            tier: 2,
            color: "text-blue-500",
            bgColor: "from-blue-500/20 to-sky-500/20",
            borderColor: "border-blue-300",
            description: "Great progress on your food rescue journey",
            nextLevelAt: 200,
            progress: Math.round(((score - 50) / 150) * 100),
        };
    }

    return {
        level: "Newcomer",
        tier: 1,
        color: "text-sky-600",
        bgColor: "from-sky-400/30 to-blue-500/30",
        borderColor: "border-sky-200",
        description: "Welcome! Your journey to fight hunger starts now",
        nextLevelAt: 50,
        progress: Math.round((score / 50) * 100),
    };
}

// =============================================================================
// Stat Display Helpers
// =============================================================================

export interface StatDisplay {
    label: string;
    value: string | number;
    description: string;
    icon: "Package" | "Truck" | "Scale" | "Utensils" | "Clock" | "MapPin" | "DollarSign" | "Calendar" | "Zap";
    iconColor: string;
}

/**
 * Convert role-specific stats into displayable card data
 */
export function getStatsForDisplay(stats: RoleStats): StatDisplay[] {
    switch (stats.role) {
        case "donor":
            return [
                {
                    label: "Donations",
                    value: stats.donations,
                    description: "Food items shared",
                    icon: "Package",
                    iconColor: "text-emerald-600",
                },
                {
                    label: "Food Saved",
                    value: `${stats.kgSaved} kg`,
                    description: "From going to waste",
                    icon: "Scale",
                    iconColor: "text-violet-600",
                },
                {
                    label: "Meals Provided",
                    value: stats.mealsProvided,
                    description: "Estimated servings",
                    icon: "Utensils",
                    iconColor: "text-amber-600",
                },
            ];

        case "volunteer":
            return [
                {
                    label: "Deliveries",
                    value: stats.deliveries,
                    description: "Completed pickups",
                    icon: "Truck",
                    iconColor: "text-blue-600",
                },
                {
                    label: "Distance",
                    value: `${stats.kmTraveled} km`,
                    description: "Total traveled",
                    icon: "MapPin",
                    iconColor: "text-emerald-600",
                },
                {
                    label: "Active Hours",
                    value: `${stats.activeHours} hrs`,
                    description: "Time volunteered",
                    icon: "Clock",
                    iconColor: "text-violet-600",
                },
            ];

        case "recipient":
            return [
                {
                    label: "Meals Received",
                    value: stats.mealsReceived,
                    description: "Food assistance",
                    icon: "Utensils",
                    iconColor: "text-emerald-600",
                },
                {
                    label: "Estimated Savings",
                    value: `$${stats.savingsEstimate}`,
                    description: "Food cost offset",
                    icon: "DollarSign",
                    iconColor: "text-blue-600",
                },
                {
                    label: "Months Active",
                    value: stats.monthsActive,
                    description: "On the platform",
                    icon: "Calendar",
                    iconColor: "text-violet-600",
                },
            ];
    }
}

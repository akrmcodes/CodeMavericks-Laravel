"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useFormContext } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DonationFormValues } from "@/lib/validators/donation";

interface StepTwoLogisticsProps {
    onBack: () => void;
    onNext: () => void;
}

export function StepTwoLogistics({ onBack, onNext }: StepTwoLogisticsProps) {
    const form = useFormContext<DonationFormValues>();
    const [isLocating, setIsLocating] = useState(false);

    const handleUseLocation = () => {
        if (!navigator?.geolocation) {
            form.setError("pickup_address", { type: "manual", message: "Geolocation not supported in this browser" });
            return;
        }

        setIsLocating(true);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const simulatedAddress = `Lat: ${latitude.toFixed(5)}, Long: ${longitude.toFixed(5)}`;
                form.setValue("pickup_address", simulatedAddress, { shouldValidate: true, shouldDirty: true });
                setIsLocating(false);
            },
            (error) => {
                form.setError("pickup_address", { type: "manual", message: error.message || "Unable to fetch location" });
                setIsLocating(false);
            }
        );
    };

    const handleNext = form.handleSubmit(() => {
        onNext();
    });

    return (
        <motion.div
            key="step-2"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="space-y-6"
        >
            <FormField
                control={form.control}
                name="pickup_address"
                render={({ field }) => (
                    <FormItem className="space-y-2">
                        <div className="flex items-center justify-between">
                            <FormLabel>Pickup Address</FormLabel>
                            <Button variant="outline" size="sm" type="button" onClick={handleUseLocation} disabled={isLocating}>
                                <span className="mr-1">📍</span>
                                {isLocating ? "Locating..." : "Use Current Location"}
                            </Button>
                        </div>
                        <FormControl>
                            <textarea
                                rows={3}
                                className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none transition focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                                placeholder="Add pickup address or describe the location"
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="expires_at"
                render={({ field }) => (
                    <FormItem className="space-y-2">
                        <FormLabel>Expiry (date & time)</FormLabel>
                        <FormControl>
                            <Input type="datetime-local" className="[&::-webkit-calendar-picker-indicator]:cursor-pointer" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <div className="flex items-center justify-between">
                <Button variant="ghost" type="button" onClick={onBack}>
                    Back
                </Button>
                <Button type="button" onClick={handleNext}>
                    Review / Next
                </Button>
            </div>
        </motion.div>
    );
}

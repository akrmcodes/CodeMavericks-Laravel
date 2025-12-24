"use client";

import { Soup, Package, Salad, Wheat, UtensilsCrossed } from "lucide-react";
import { motion } from "framer-motion";
import { useFormContext } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { DonationFormValues } from "@/lib/validators/donation";
import { FoodType } from "@/types/donation";

const foodOptions: Array<{ value: FoodType; label: string; Icon: React.ComponentType<{ className?: string }> }> = [
    { value: FoodType.CookedMeal, label: "Cooked Meal", Icon: UtensilsCrossed },
    { value: FoodType.Groceries, label: "Groceries", Icon: Package },
    { value: FoodType.Bakery, label: "Bakery", Icon: Wheat },
    { value: FoodType.Vegetables, label: "Vegetables", Icon: Salad },
    { value: FoodType.Canned, label: "Canned", Icon: Soup },
];

interface StepOneDetailsProps {
    onNext: () => void;
}

export function StepOneDetails({ onNext }: StepOneDetailsProps) {
    const form = useFormContext<DonationFormValues>();
    const requiredFields: Array<keyof DonationFormValues> = ["title", "food_type", "quantity", "description"];

    const handleNext = async () => {
        const isValid = await form.trigger(requiredFields);
        if (!isValid) {
            console.warn("[Donation Wizard] Step 1 validation errors", form.formState.errors);
            return;
        }
        onNext();
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="space-y-6"
        >
            <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., Fresh vegetables from today's harvest" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="food_type"
                render={({ field }) => (
                    <FormItem className="space-y-2">
                        <FormLabel>Food Type</FormLabel>
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                            {foodOptions.map(({ value, label, Icon }) => {
                                const isActive = field.value === value;
                                return (
                                    <button
                                        type="button"
                                        key={value}
                                        onClick={() => field.onChange(value)}
                                        className={cn(
                                            "group flex items-center gap-3 rounded-lg border p-3 text-left transition hover:border-primary hover:bg-primary/5",
                                            isActive ? "border-primary bg-primary/10" : "border-border bg-card"
                                        )}
                                    >
                                        <span
                                            className={cn(
                                                "flex h-10 w-10 items-center justify-center rounded-md",
                                                isActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                                            )}
                                        >
                                            <Icon className="h-5 w-5" aria-hidden />
                                        </span>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-semibold">{label}</span>
                                            <span className="text-xs text-muted-foreground">{value.replace("_", " ")}</span>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Quantity (kg)</FormLabel>
                        <FormControl>
                            <div className="flex items-center gap-2">
                                <Input
                                    type="number"
                                    step="0.1"
                                    min="0"
                                    name={field.name}
                                    ref={field.ref}
                                    value={field.value ?? ""}
                                    onBlur={field.onBlur}
                                    onChange={(event) => {
                                        const value = event.target.value;
                                        const numericValue = event.target.valueAsNumber;
                                        field.onChange(value === "" ? undefined : numericValue);
                                    }}
                                />
                                <span className="text-sm text-muted-foreground">kg</span>
                            </div>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                            <textarea
                                rows={4}
                                className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none transition focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                                placeholder="Provide a helpful description for volunteers and recipients"
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <div className="flex justify-end">
                <Button onClick={handleNext}>Next Step</Button>
            </div>
        </motion.div>
    );
}

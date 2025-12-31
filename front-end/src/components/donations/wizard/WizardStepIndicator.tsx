import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface WizardStepIndicatorProps {
    currentStep: number;
    totalSteps: number;
}

export function WizardStepIndicator({ currentStep, totalSteps }: WizardStepIndicatorProps) {
    const progress = Math.max(0, Math.min(currentStep, totalSteps));
    const percent = (progress / totalSteps) * 100;

    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
                <span>
                    Step {currentStep} of {totalSteps}
                </span>
                <span>{Math.round(percent)}%</span>
            </div>
            <div className="relative h-2 w-full overflow-hidden rounded-full bg-muted">
                <motion.div
                    layout
                    className="absolute left-0 top-0 h-full rounded-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${percent}%` }}
                    transition={{ type: "spring", stiffness: 120, damping: 16 }}
                />
            </div>
            <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                {Array.from({ length: totalSteps }).map((_, index) => {
                    const stepNumber = index + 1;
                    const isActive = stepNumber === currentStep;
                    const isCompleted = stepNumber < currentStep;
                    return (
                        <div
                            key={stepNumber}
                            className={cn(
                                "flex flex-1 items-center gap-1",
                                stepNumber !== totalSteps && "pr-2"
                            )}
                        >
                            <motion.div
                                layout
                                className={cn(
                                    "flex h-6 w-6 items-center justify-center rounded-full border text-[11px] font-semibold",
                                    isActive && "border-primary bg-primary/10 text-primary",
                                    isCompleted && "border-primary bg-primary text-primary-foreground",
                                    !isActive && !isCompleted && "border-border bg-card"
                                )}
                                animate={isActive ? { scale: [1, 1.1, 1] } : { scale: 1 }}
                                transition={{ duration: 0.8, repeat: isActive ? Infinity : 0, repeatDelay: 1.2 }}
                            >
                                {stepNumber}
                            </motion.div>
                            {stepNumber !== totalSteps && (
                                <div className="h-px flex-1 rounded-full bg-border" aria-hidden />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

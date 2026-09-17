import { cn } from "../../../lib/utils";

export interface ProgressProps {
    value: number;
    max?: number;
    size?: "sm" | "md" | "lg";
    tone?: "indigo" | "emerald" | "rose";
    className?: string;
    showValue?: boolean;
}

export const Progress = ({
    value,
    max = 100,
    size = "md",
    tone = "indigo",
    className,
    showValue = false,
}: ProgressProps) => {
    const percentage = Math.min(Math.max(0, (value / max) * 100), 100);

    const heightClass = {
        sm: "h-1.5",
        md: "h-2.5",
        lg: "h-4",
    }[size];

    const toneClass = {
        indigo: "bg-indigo-600",
        emerald: "bg-emerald-600",
        rose: "bg-rose-600",
    }[tone];

    return (
        <div className={cn("w-full space-y-1", className)}>
            {showValue && (
                <div className="flex justify-end text-xs font-semibold text-slate-600 dark:text-slate-400">
                    {Math.round(percentage)}%
                </div>
            )}
            <div
                className={cn(
                    "w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700",
                    heightClass,
                )}
                role="progressbar"
                aria-valuenow={value}
                aria-valuemin={0}
                aria-valuemax={max}
            >
                <div
                    className={cn(
                        "h-full rounded-full transition-all duration-300 ease-out",
                        toneClass,
                    )}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
};

export interface SpinnerProps {
    size?: "sm" | "md" | "lg";
    tone?: "indigo" | "white" | "muted";
    className?: string;
}

export const Spinner = ({
    size = "md",
    tone = "indigo",
    className,
}: SpinnerProps) => {
    const sizeClass = {
        sm: "size-4 border-2",
        md: "size-6 border-2",
        lg: "size-8 border-3",
    }[size];

    const toneClass = {
        indigo: "border-indigo-600/20 border-t-indigo-600",
        white: "border-white/20 border-t-white",
        muted: "border-slate-400/20 border-t-slate-600 dark:border-slate-600/20 dark:border-t-slate-300",
    }[tone];

    return (
        <div
            role="status"
            aria-label="Loading"
            className={cn(
                "inline-block animate-spin rounded-full",
                sizeClass,
                toneClass,
                className,
            )}
        >
            <span className="sr-only">Loading...</span>
        </div>
    );
};

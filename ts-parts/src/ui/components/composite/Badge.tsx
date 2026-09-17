import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";
import { cn } from "../../../lib/utils";

export const badgeVariants = cva(
    "inline-flex items-center font-semibold rounded-full",
    {
        variants: {
            tone: {
                neutral:
                    "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
                success:
                    "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
                warning:
                    "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
                danger: "bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300",
                info: "bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300",
            },
            size: {
                sm: "px-2 py-0.5 text-[10px]",
                md: "px-2.5 py-1 text-xs",
                lg: "px-3 py-1.5 text-sm",
            },
        },
        defaultVariants: {
            tone: "neutral",
            size: "md",
        },
    },
);

export interface BadgeProps extends VariantProps<typeof badgeVariants> {
    children: ReactNode;
    className?: string;
}

export const Badge = ({ tone, size, className, children }: BadgeProps) => {
    return (
        <span className={cn(badgeVariants({ tone, size, className }))}>
            {children}
        </span>
    );
};

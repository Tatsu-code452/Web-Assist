import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";
import { cn } from "../../../lib/utils";

export const alertVariants = cva("rounded-xl border text-sm", {
    variants: {
        tone: {
            info: "border-indigo-200 bg-indigo-50 text-indigo-900 dark:border-indigo-900 dark:bg-indigo-950 dark:text-indigo-200",
            success:
                "border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-200",
            warning:
                "border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-200",
            danger: "border-rose-200 bg-rose-50 text-rose-900 dark:border-rose-900 dark:bg-rose-950 dark:text-rose-200",
        },
        size: {
            sm: "p-3 text-xs",
            md: "p-4 text-sm",
            lg: "p-5 text-base",
        },
    },
    defaultVariants: {
        tone: "info",
        size: "md",
    },
});

export interface AlertProps extends VariantProps<typeof alertVariants> {
    title: string;
    children: ReactNode;
    className?: string;
}

export const Alert = ({
    tone,
    size,
    title,
    children,
    className,
}: AlertProps) => {
    return (
        <div
            role="status"
            className={cn(alertVariants({ tone, size, className }))}
        >
            <p className="font-semibold">{title}</p>
            <p className="mt-1 opacity-80">{children}</p>
        </div>
    );
};

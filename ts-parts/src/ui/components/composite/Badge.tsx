import type { ReactNode } from "react";
import { cn } from "../../../lib/utils";

export const Badge = ({
    tone = "neutral",
    children,
}: {
    tone?: "neutral" | "success" | "warning" | "danger" | "info";
    children: ReactNode;
}) => {
    const tones = {
        neutral: "bg-slate-100 text-slate-600",
        success: "bg-emerald-50 text-emerald-700",
        warning: "bg-amber-50 text-amber-700",
        danger: "bg-rose-50 text-rose-700",
        info: "bg-indigo-50 text-indigo-700",
    };
    return (
        <span
            className={cn(
                "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold",
                tones[tone],
            )}
        >
            {children}
        </span>
    );
};

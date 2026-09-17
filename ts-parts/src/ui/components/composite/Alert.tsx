import type { ReactNode } from "react";
import { cn } from "../../../lib/utils";

export const Alert = ({
    tone = "info",
    title,
    children,
}: {
    tone?: "info" | "success" | "warning" | "danger";
    title: string;
    children: ReactNode;
}) => {
    const styles = {
        info: "border-indigo-200 bg-indigo-50 text-indigo-900",
        success: "border-emerald-200 bg-emerald-50 text-emerald-900",
        warning: "border-amber-200 bg-amber-50 text-amber-900",
        danger: "border-rose-200 bg-rose-50 text-rose-900",
    };
    return (
        <div
            role="status"
            className={cn("rounded-xl border p-4 text-sm", styles[tone])}
        >
            <p className="font-semibold">{title}</p>
            <p className="mt-1 opacity-80">{children}</p>
        </div>
    );
};

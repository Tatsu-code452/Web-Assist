import { cn } from "../../../lib/utils";
import { Card } from "./Card";

export interface StatCardProps {
    label: string;
    value: string;
    change?: string;
    tone?: "indigo" | "emerald" | "amber";
}
export const StatCard = ({
    label,
    value,
    change,
    tone = "indigo",
}: StatCardProps) => (
    <Card>
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            {value}
        </p>
        {change && (
            <p
                className={cn(
                    "mt-2 text-xs font-semibold",
                    tone === "emerald"
                        ? "text-emerald-600"
                        : tone === "amber"
                          ? "text-amber-600"
                          : "text-indigo-600",
                )}
            >
                {change}
            </p>
        )}
    </Card>
);

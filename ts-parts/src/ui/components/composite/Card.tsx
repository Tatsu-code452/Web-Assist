import type { ReactNode } from "react";
import { cn } from "../../../lib/utils";
export const Card = ({
    className,
    children,
}: {
    className?: string;
    children: ReactNode;
}) => (
    <div className={cn("rounded-2xl border bg-white p-5 shadow-sm", className)}>
        {children}
    </div>
);

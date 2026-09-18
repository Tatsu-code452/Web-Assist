import type { ReactNode } from "react";
import { cn } from "../../../lib/utils";
import { Label } from "../atomic";

export const Field = ({
    label,
    hint,
    error,
    required,
    children,
}: {
    label: string;
    hint?: string;
    error?: string;
    required?: boolean;
    children: ReactNode;
}) => (
    <div>
        <Label>
            {label}
            {required && (
                <span className="ml-1 text-rose-600" aria-label="必須">
                    *
                </span>
            )}
        </Label>
        {children}
        <p
            className={cn(
                "mt-1.5 text-xs",
                error ? "text-rose-600" : "text-slate-500",
            )}
        >
            {error ?? hint}
        </p>
    </div>
);

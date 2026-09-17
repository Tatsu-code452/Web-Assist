import { forwardRef, type InputHTMLAttributes } from "react";
import { ui } from "../../../lib/tokens";
import { cn } from "../../../lib/utils";

export interface SwitchProps extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "size"
> {
    size?: "sm" | "md" | "lg";
    label?: string;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
    ({ className, size = "md", label, checked, disabled, ...props }, ref) => {
        const trackSize = {
            sm: "w-8 h-4",
            md: "w-11 h-6",
            lg: "w-14 h-7",
        }[size];

        const thumbSize = {
            sm: "size-3 translate-x-0.5 peer-checked:translate-x-4",
            md: "size-5 translate-x-0.5 peer-checked:translate-x-5.5",
            lg: "size-6 translate-x-0.5 peer-checked:translate-x-7.5",
        }[size];

        return (
            <label
                className={cn(
                    "inline-flex items-center gap-2.5 cursor-pointer select-none",
                    disabled && "cursor-not-allowed opacity-50",
                    className,
                )}
            >
                <span className="relative inline-block">
                    <input
                        ref={ref}
                        type="checkbox"
                        role="switch"
                        aria-checked={checked}
                        checked={checked}
                        disabled={disabled}
                        className="peer sr-only"
                        {...props}
                    />
                    <span
                        className={cn(
                            "block rounded-full bg-slate-300 transition-colors peer-checked:bg-indigo-600 dark:bg-slate-700",
                            ui.focus,
                            trackSize,
                        )}
                    />
                    <span
                        className={cn(
                            "absolute top-0.5 left-0 rounded-full bg-white shadow-sm transition-transform pointer-events-none",
                            thumbSize,
                        )}
                    />
                </span>
                {label && (
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        {label}
                    </span>
                )}
            </label>
        );
    },
);
Switch.displayName = "Switch";

import {
    forwardRef,
    type InputHTMLAttributes
} from "react";
import { ui } from "../../../lib/tokens";
import { cn } from "../../../lib/utils";

export const Checkbox = forwardRef<
    HTMLInputElement,
    InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => (
    <input
        ref={ref}
        type="checkbox"
        className={cn(
            "size-4 rounded border-slate-300 text-indigo-600 accent-indigo-600",
            ui.focus,
            className,
        )}
        {...props}
    />
));
Checkbox.displayName = "Checkbox";

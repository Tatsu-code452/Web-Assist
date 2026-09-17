import {
    forwardRef,
    type TextareaHTMLAttributes
} from "react";
import { ui } from "../../../lib/tokens";
import { cn } from "../../../lib/utils";

export const Textarea = forwardRef<
    HTMLTextAreaElement,
    TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
    <textarea
        ref={ref}
        className={cn(
            ui.focus,
            "min-h-28 w-full resize-y rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm transition placeholder:text-slate-400 hover:border-slate-300 disabled:cursor-not-allowed disabled:bg-slate-100",
            className,
        )}
        {...props}
    />
));
Textarea.displayName = "Textarea";

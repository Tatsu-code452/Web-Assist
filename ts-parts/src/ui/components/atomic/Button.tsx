import {
    forwardRef,
    type ButtonHTMLAttributes
} from "react";
import { ui } from "../../../lib/tokens";
import { cn } from "../../../lib/utils";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";
const buttonVariants: Record<ButtonVariant, string> = {
    primary: ui.color.primary,
    secondary: ui.color.secondary,
    danger: ui.color.danger,
    ghost: "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
};
export const Button = forwardRef<
    HTMLButtonElement,
    ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant }
>(({ className, variant = "primary", ...props }, ref) => (
    <button
        ref={ref}
        type="button"
        className={cn(
            "inline-flex h-10 items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold shadow-sm transition active:scale-[.98] disabled:pointer-events-none disabled:opacity-50",
            ui.focus,
            buttonVariants[variant],
            className,
        )}
        {...props}
    />
));
Button.displayName = "Button";

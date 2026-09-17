import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { ui } from "../../../lib/tokens";
import { cn } from "../../../lib/utils";

export const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 rounded-xl font-semibold shadow-sm transition active:scale-[.98] disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                primary: ui.color.primary,
                secondary: ui.color.secondary,
                danger: ui.color.danger,
                ghost: "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white",
            },
            size: {
                sm: "h-8 px-3 text-xs",
                md: "h-10 px-4 text-sm",
                lg: "h-12 px-6 text-base",
            },
        },
        defaultVariants: {
            variant: "primary",
            size: "md",
        },
    },
);

export interface ButtonProps
    extends
        ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, ...props }, ref) => (
        <button
            ref={ref}
            type="button"
            className={cn(
                ui.focus,
                buttonVariants({ variant, size, className }),
            )}
            {...props}
        />
    ),
);
Button.displayName = "Button";

export type { ButtonProps as ButtonTestProps };


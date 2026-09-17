import {
    forwardRef,
    type InputHTMLAttributes
} from "react";
import { ui } from "../../../lib/tokens";
import { cn } from "../../../lib/utils";

export const Input = forwardRef<
    HTMLInputElement,
    InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
    <input
        ref={ref}
        className={cn(ui.control, ui.focus, className)}
        {...props}
    />
));
Input.displayName = "Input";

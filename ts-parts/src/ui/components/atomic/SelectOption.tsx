import {
    forwardRef,
    type SelectHTMLAttributes
} from "react";
import { ui } from "../../../lib/tokens";
import { cn } from "../../../lib/utils";

export interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
}
export const Select = forwardRef<
    HTMLSelectElement,
    SelectHTMLAttributes<HTMLSelectElement> & { options?: SelectOption[] }
>(({ className, options, children, ...props }, ref) => (
    <select
        ref={ref}
        className={cn(ui.control, ui.focus, "cursor-pointer", className)}
        {...props}
    >
        {options
            ? options.map((option) => (
                  <option
                      key={option.value}
                      value={option.value}
                      disabled={option.disabled}
                  >
                      {option.label}
                  </option>
              ))
            : children}
    </select>
));
Select.displayName = "Select";

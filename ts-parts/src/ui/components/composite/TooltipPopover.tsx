import { useState, type ReactNode } from "react";
import { ui } from "../../../lib/tokens";
import { cn } from "../../../lib/utils";

export interface TooltipProps {
    content: ReactNode;
    children: ReactNode;
    position?: "top" | "bottom" | "left" | "right";
    className?: string;
}

export const Tooltip = ({
    content,
    children,
    position = "top",
    className,
}: TooltipProps) => {
    const [isVisible, setIsVisible] = useState(false);

    const posClasses = {
        top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
        bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
        left: "right-full top-1/2 -translate-y-1/2 mr-2",
        right: "left-full top-1/2 -translate-y-1/2 ml-2",
    }[position];

    return (
        <div
            className="relative inline-block"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
            onFocus={() => setIsVisible(true)}
            onBlur={() => setIsVisible(false)}
        >
            {children}
            {isVisible && (
                <div
                    role="tooltip"
                    className={cn(
                        "absolute z-50 whitespace-nowrap rounded-md bg-slate-900 px-2.5 py-1 text-xs font-medium text-white shadow-md dark:bg-slate-100 dark:text-slate-900",
                        ui.animation.fadeIn,
                        posClasses,
                        className,
                    )}
                >
                    {content}
                </div>
            )}
        </div>
    );
};

export interface PopoverProps {
    trigger: ReactNode;
    children: ReactNode;
    className?: string;
}

export const Popover = ({ trigger, children, className }: PopoverProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative inline-block text-left">
            <div onClick={() => setIsOpen((prev) => !prev)}>{trigger}</div>
            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />
                    <div
                        className={cn(
                            "absolute right-0 z-50 mt-2 w-64 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl dark:border-slate-800 dark:bg-slate-900",
                            ui.animation.scaleUp,
                            className,
                        )}
                    >
                        {children}
                    </div>
                </>
            )}
        </div>
    );
};

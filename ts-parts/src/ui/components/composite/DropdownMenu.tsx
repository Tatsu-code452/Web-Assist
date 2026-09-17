import { useState, type ReactNode } from "react";
import { ui } from "../../../lib/tokens";
import { cn } from "../../../lib/utils";

export interface DropdownMenuItem {
    id: string;
    label: string;
    icon?: ReactNode;
    danger?: boolean;
    disabled?: boolean;
    onClick?: () => void;
}

export interface DropdownMenuProps {
    trigger: ReactNode;
    items: DropdownMenuItem[];
    align?: "left" | "right";
    className?: string;
}

export const DropdownMenu = ({
    trigger,
    items,
    align = "left",
    className,
}: DropdownMenuProps) => {
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
                        role="menu"
                        className={cn(
                            "absolute z-50 mt-2 w-48 rounded-xl border border-slate-200 bg-white/95 p-1.5 shadow-lg backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/95",
                            align === "right" ? "right-0" : "left-0",
                            ui.animation.slideInTop,
                            className,
                        )}
                    >
                        {items.map((item) => (
                            <button
                                key={item.id}
                                type="button"
                                role="menuitem"
                                disabled={item.disabled}
                                onClick={() => {
                                    if (item.onClick) item.onClick();
                                    setIsOpen(false);
                                }}
                                className={cn(
                                    "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold transition",
                                    ui.focus,
                                    item.danger
                                        ? "text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50"
                                        : "text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white",
                                    item.disabled &&
                                        "cursor-not-allowed opacity-50",
                                )}
                            >
                                {item.icon && (
                                    <span className="size-4">{item.icon}</span>
                                )}
                                {item.label}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

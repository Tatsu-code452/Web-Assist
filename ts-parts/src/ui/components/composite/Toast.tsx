import { useEffect } from "react";
import { cn } from "../../../lib/utils";

export interface ToastProps {
    id: string;
    message: string;
    tone?: "info" | "success" | "danger";
    onClose: (id: string) => void;
    duration?: number;
}

export const Toast = ({
    id,
    message,
    tone = "info",
    onClose,
    duration = 3000,
}: ToastProps) => {
    useEffect(() => {
        const timer = setTimeout(() => onClose(id), duration);
        return () => clearTimeout(timer);
    }, [id, duration, onClose]);

    const toneStyles = {
        info: "bg-indigo-600 text-white",
        success: "bg-emerald-600 text-white",
        danger: "bg-rose-600 text-white",
    };

    return (
        <div
            className={cn(
                "flex items-center justify-between rounded-xl px-4 py-3 shadow-lg text-sm font-medium transition-all min-w-[240px]",
                toneStyles[tone],
            )}
            role="status"
        >
            <span>{message}</span>
            <button
                type="button"
                onClick={() => onClose(id)}
                className="ml-3 text-xs opacity-80 hover:opacity-100"
            >
                ✕
            </button>
        </div>
    );
};

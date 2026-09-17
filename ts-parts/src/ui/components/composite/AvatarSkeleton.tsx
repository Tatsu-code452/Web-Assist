import { cn } from "../../../lib/utils";

export interface AvatarProps {
    src?: string;
    alt?: string;
    fallback: string;
    size?: "sm" | "md" | "lg";
}

export const Avatar = ({ src, alt, fallback, size = "md" }: AvatarProps) => {
    const sizeClasses = {
        sm: "size-8 text-xs",
        md: "size-10 text-sm",
        lg: "size-12 text-base",
    };

    return (
        <div
            className={cn(
                "relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-200 font-semibold text-slate-700 dark:bg-slate-700 dark:text-slate-200",
                sizeClasses[size],
            )}
        >
            {src ? (
                <img
                    src={src}
                    alt={alt || fallback}
                    className="h-full w-full object-cover"
                />
            ) : (
                <span>{fallback}</span>
            )}
        </div>
    );
};

export const Skeleton = ({ className }: { className?: string }) => (
    <div
        className={cn(
            "animate-pulse rounded-md bg-slate-200 dark:bg-slate-800",
            className,
        )}
    />
);

export const ui = {
    layout: {
        page: "min-h-screen bg-slate-50 text-slate-900",
        container: "mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8",
        stack: "flex flex-col gap-6",
        row: "flex flex-wrap items-center gap-3",
        grid: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
    },
    color: {
        text: "text-slate-900",
        muted: "text-slate-500",
        subtle: "text-slate-400",
        primary: "bg-indigo-600 text-white hover:bg-indigo-700",
        secondary:
            "border border-slate-200 bg-white text-slate-700 hover:border-indigo-300 hover:bg-indigo-50",
        danger: "bg-rose-600 text-white hover:bg-rose-700",
        surface: "border-slate-200 bg-white",
    },
    focus:
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2",
    focusRing: {
        indigo: "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2",
        rose: "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2",
        emerald: "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2",
    },
    glass: {
        subtle: "bg-white/70 backdrop-blur-md border border-white/20 shadow-sm dark:bg-slate-900/70 dark:border-slate-800/50",
        medium: "bg-white/80 backdrop-blur-lg border border-white/30 shadow-md dark:bg-slate-900/80 dark:border-slate-800/60",
        heavy: "bg-white/90 backdrop-blur-xl border border-white/40 shadow-lg dark:bg-slate-900/90 dark:border-slate-800/80",
    },
    animation: {
        fadeIn: "animate-[fadeIn_0.2s_ease-out_forwards]",
        slideInTop: "animate-[slideInTop_0.2s_ease-out_forwards]",
        slideInBottom: "animate-[slideInBottom_0.2s_ease-out_forwards]",
        scaleUp: "animate-[scaleUp_0.15s_ease-out_forwards]",
    },
    control:
        "h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 shadow-sm transition placeholder:text-slate-400 hover:border-slate-300 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400",
} as const;

export const utilityClasses = {
    display: ["block", "inline-block", "flex", "inline-flex", "grid", "hidden"],
    spacing: ["p-0", "p-1", "p-2", "p-3", "p-4", "p-6", "p-8", "gap-1", "gap-2", "gap-3", "gap-4", "gap-6"],
    typography: ["text-xs", "text-sm", "text-base", "text-lg", "text-xl", "text-2xl", "font-medium", "font-semibold", "font-bold"],
    radius: ["rounded-none", "rounded-md", "rounded-lg", "rounded-xl", "rounded-2xl", "rounded-full"],
    shadow: ["shadow-none", "shadow-sm", "shadow", "shadow-md", "shadow-lg"],
    color: ["bg-white", "bg-slate-50", "bg-slate-100", "bg-indigo-600", "bg-emerald-50", "bg-amber-50", "bg-rose-50", "text-slate-500", "text-slate-900"],
} as const;
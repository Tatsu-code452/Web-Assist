import { useMemo, useState } from "react";
import { ui } from "../lib/tokens";
import { cn } from "../lib/utils";
import { SearchField } from "./components/composite";
import { Tab, VisualMode, tabs } from "./types";

interface HeaderProps {
    tab: Tab;
    setTab: React.Dispatch<React.SetStateAction<Tab>>;
    visualMode: VisualMode;
    setVisualMode: React.Dispatch<React.SetStateAction<VisualMode>>;
}

export const Header = ({
    tab,
    setTab,
    visualMode,
    setVisualMode,
}: HeaderProps) => {
    const [query, setQuery] = useState("");
    const filteredTabs = useMemo(
        () =>
            tabs.filter(({ label }) =>
                label.toLowerCase().includes(query.toLowerCase()),
            ),
        [query],
    );

    return (
        <header className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
            <div className={cn(ui.layout.container, "py-5")}>
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
                            TS-PARTS
                        </p>
                        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                            Design system, made practical.
                        </h1>
                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            Tailwind
                            の定数・UIコンポーネント・実装パターンを一つの場所で確認。
                        </p>
                    </div>
                    <div className="flex w-full flex-col gap-3 sm:flex-row md:w-auto">
                        <div className="w-full sm:w-64">
                            <SearchField
                                value={query}
                                onChange={setQuery}
                                placeholder="セクションを検索"
                            />
                        </div>
                        <div
                            className="flex rounded-xl border border-slate-200 bg-slate-50 p-1 dark:border-slate-800 dark:bg-slate-800"
                            role="group"
                            aria-label="表示モード切替"
                        >
                            {(["classic", "dark", "studio"] as const).map(
                                (mode) => (
                                    <button
                                        type="button"
                                        key={mode}
                                        aria-pressed={visualMode === mode}
                                        onClick={() => setVisualMode(mode)}
                                        className={cn(
                                            "rounded-lg px-3 py-2 text-xs font-bold transition capitalize",
                                            ui.focus,
                                            visualMode === mode
                                                ? "bg-white text-indigo-700 shadow-sm dark:bg-slate-700 dark:text-white"
                                                : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200",
                                        )}
                                    >
                                        {mode}
                                    </button>
                                ),
                            )}
                        </div>
                    </div>
                </div>
                <nav
                    className="mt-6 flex gap-1 overflow-x-auto"
                    aria-label="メインナビゲーション"
                >
                    {(filteredTabs.length ? filteredTabs : tabs).map(
                        ({ id, label }) => (
                            <button
                                type="button"
                                key={id}
                                aria-current={tab === id ? "page" : undefined}
                                onClick={() => setTab(id)}
                                className={cn(
                                    "whitespace-nowrap rounded-lg px-3 py-2 text-sm font-semibold transition",
                                    ui.focus,
                                    tab === id
                                        ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300"
                                        : "text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200",
                                )}
                            >
                                {label}
                            </button>
                        ),
                    )}
                </nav>
            </div>
        </header>
    );
};

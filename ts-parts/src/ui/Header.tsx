import { useMemo, useState } from "react";
import { ui } from "../lib/tokens";
import { cn } from "../lib/utils";
import { SearchField } from "./components";
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
        <header className="border-b border-slate-200 bg-white">
            <div className={cn(ui.layout.container, "py-5")}>
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">
                            TS-PARTS
                        </p>
                        <h1 className="mt-1 text-2xl font-bold tracking-tight">
                            Design system, made practical.
                        </h1>
                        <p className="mt-1 text-sm text-slate-500">
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
                        <div className="flex rounded-xl border border-slate-200 bg-slate-50 p-1">
                            {(["classic", "studio"] as const).map((mode) => (
                                <button
                                    type="button"
                                    key={mode}
                                    aria-pressed={visualMode === mode}
                                    onClick={() => setVisualMode(mode)}
                                    className={cn(
                                        "rounded-lg px-3 py-2 text-xs font-bold",
                                        ui.focus,
                                        visualMode === mode
                                            ? "bg-white text-indigo-700 shadow-sm"
                                            : "text-slate-500",
                                    )}
                                >
                                    {mode === "classic" ? "Classic" : "Studio"}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                <nav className="mt-6 flex gap-1 overflow-x-auto">
                    {(filteredTabs.length ? filteredTabs : tabs).map(
                        ({ id, label }) => (
                            <button
                                type="button"
                                key={id}
                                onClick={() => setTab(id)}
                                className={cn(
                                    "whitespace-nowrap rounded-lg px-3 py-2 text-sm font-semibold",
                                    ui.focus,
                                    tab === id
                                        ? "bg-indigo-50 text-indigo-700"
                                        : "text-slate-500",
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

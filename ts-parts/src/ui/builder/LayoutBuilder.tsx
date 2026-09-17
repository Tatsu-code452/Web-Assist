import { useState } from "react";
import { cn } from "../../lib/utils";
import { Button, Checkbox, Label, Select } from "../components";
import { Section } from "../shared";

const gridColsMap: Record<string, string> = {
    "1": "grid-cols-1",
    "2": "grid-cols-2",
    "3": "grid-cols-3",
    "4": "grid-cols-4",
};

const justifyMap: Record<string, string> = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
    between: "justify-between",
    around: "justify-around",
    evenly: "justify-evenly",
};

const alignMap: Record<string, string> = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
    baseline: "items-baseline",
    stretch: "items-stretch",
};

const gapMap: Record<string, string> = {
    "0": "gap-0",
    "1": "gap-1",
    "2": "gap-2",
    "3": "gap-3",
    "4": "gap-4",
    "5": "gap-5",
    "6": "gap-6",
    "7": "gap-7",
    "8": "gap-8",
    "9": "gap-9",
    "10": "gap-10",
    "11": "gap-11",
    "12": "gap-12",
};

export const LayoutBuilder = () => {
    const [mode, setMode] = useState<"flex" | "grid">("flex");
    const [direction, setDirection] = useState<"row" | "column">("row");
    const [justify, setJustify] = useState("between");
    const [align, setAlign] = useState("center");
    const [gap, setGap] = useState("4");
    const [columns, setColumns] = useState("3");
    const [wrap, setWrap] = useState(false);
    const [copied, setCopied] = useState(false);

    const activeGridCol = gridColsMap[columns] || "grid-cols-3";
    const activeJustify = justifyMap[justify] || "justify-between";
    const activeAlign = alignMap[align] || "items-center";
    const activeGap = gapMap[gap] || "gap-4";

    const classes = [
        mode,
        mode === "flex"
            ? direction === "row"
                ? "flex-row"
                : "flex-col"
            : activeGridCol,
        mode === "flex" && wrap ? "flex-wrap" : "",
        activeJustify,
        activeAlign,
        activeGap,
    ]
        .filter(Boolean)
        .join(" ");

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(classes);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1600);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Section
            title="Layout Builder"
            description="Standalone Flex and Grid layout controls."
        >
            <div className="grid gap-6 xl:grid-cols-[280px_minmax(0,1fr)]">
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="layout-mode">Mode</Label>
                        <Select
                            id="layout-mode"
                            value={mode}
                            onChange={(e) =>
                                setMode(e.target.value as "flex" | "grid")
                            }
                            options={[
                                { value: "flex", label: "Flex" },
                                { value: "grid", label: "Grid" },
                            ]}
                        />
                    </div>
                    {mode === "flex" ? (
                        <div>
                            <Label htmlFor="layout-direction">Direction</Label>
                            <Select
                                id="layout-direction"
                                value={direction}
                                onChange={(e) =>
                                    setDirection(
                                        e.target.value as "row" | "column",
                                    )
                                }
                                options={[
                                    { value: "row", label: "Row" },
                                    { value: "column", label: "Column" },
                                ]}
                            />
                        </div>
                    ) : (
                        <div>
                            <Label htmlFor="layout-columns">Columns</Label>
                            <Select
                                id="layout-columns"
                                value={columns}
                                onChange={(e) => setColumns(e.target.value)}
                                options={["1", "2", "3", "4"].map((value) => ({
                                    value,
                                    label: value,
                                }))}
                            />
                        </div>
                    )}
                    <div>
                        <Label htmlFor="layout-justify">Justify Content</Label>
                        <Select
                            id="layout-justify"
                            value={justify}
                            onChange={(e) => setJustify(e.target.value)}
                            options={[
                                { value: "start", label: "start" },
                                { value: "center", label: "center" },
                                { value: "end", label: "end" },
                                { value: "between", label: "between" },
                                { value: "around", label: "around" },
                                { value: "evenly", label: "evenly" },
                            ]}
                        />
                    </div>
                    <div>
                        <Label htmlFor="layout-align">Align Items</Label>
                        <Select
                            id="layout-align"
                            value={align}
                            onChange={(e) => setAlign(e.target.value)}
                            options={[
                                { value: "start", label: "start" },
                                { value: "center", label: "center" },
                                { value: "end", label: "end" },
                                { value: "baseline", label: "baseline" },
                                { value: "stretch", label: "stretch" },
                            ]}
                        />
                    </div>
                    <div>
                        <Label htmlFor="layout-gap">Gap ({gap})</Label>
                        <input
                            id="layout-gap"
                            type="range"
                            min="0"
                            max="12"
                            value={gap}
                            onChange={(e) => setGap(e.target.value)}
                            className="w-full cursor-pointer accent-indigo-600"
                            aria-label={`レイアウトギャップサイズ: ${gap}`}
                        />
                    </div>
                    <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                        <Checkbox
                            checked={wrap}
                            onChange={(e) => setWrap(e.target.checked)}
                        />
                        Wrap
                    </label>
                </div>
                <div>
                    <div
                        className={cn(
                            "min-h-64 rounded-2xl border border-dashed border-indigo-200 bg-indigo-50/50 p-4",
                            mode === "flex" ? "flex" : "grid",
                            mode === "flex"
                                ? direction === "row"
                                    ? "flex-row"
                                    : "flex-col"
                                : activeGridCol,
                            mode === "flex" && wrap ? "flex-wrap" : "",
                            activeJustify,
                            activeAlign,
                            activeGap,
                        )}
                    >
                        {[
                            "Header",
                            "Content",
                            "Actions",
                            "Aside",
                            "Footer",
                        ].map((item) => (
                            <div
                                key={item}
                                className="rounded-xl border border-indigo-200 bg-white p-4 text-center text-sm font-medium text-indigo-700 shadow-sm"
                            >
                                {item}
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 flex items-center justify-between rounded-xl bg-slate-950 p-4">
                        <code className="text-xs text-indigo-200">
                            {classes}
                        </code>
                        <Button variant="secondary" onClick={copy}>
                            {copied ? "Copied" : "Copy classes"}
                        </Button>
                    </div>
                </div>
            </div>
        </Section>
    );
};

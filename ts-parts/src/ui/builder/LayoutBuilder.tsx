import { useState } from "react";
import { cn } from "../../lib/utils";
import { Button, Checkbox, Label, Select } from "../components";
import { Section } from "../shared";
export const LayoutBuilder = () => {
    const [mode, setMode] = useState<"flex" | "grid">("flex");
    const [direction, setDirection] = useState<"row" | "column">("row");
    const [justify, setJustify] = useState("between");
    const [align, setAlign] = useState("center");
    const [gap, setGap] = useState("4");
    const [columns, setColumns] = useState("3");
    const [wrap, setWrap] = useState(false);
    const [copied, setCopied] = useState(false);
    const classes = [
        mode,
        mode === "flex"
            ? direction === "row"
                ? "flex-row"
                : "flex-col"
            : `grid-cols-${columns}`,
        mode === "flex" && wrap ? "flex-wrap" : "",
        `justify-${justify}`,
        `items-${align}`,
        `gap-${gap}`,
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
                    {mode === "flex" ? (
                        <>
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
                        </>
                    ) : (
                        <>
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
                        </>
                    )}
                    <select
                        className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm"
                        value={justify}
                        onChange={(e) => setJustify(e.target.value)}
                    >
                        {[
                            "start",
                            "center",
                            "end",
                            "between",
                            "around",
                            "evenly",
                        ].map((value) => (
                            <option key={value}>{value}</option>
                        ))}
                    </select>
                    <select
                        className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm"
                        value={align}
                        onChange={(e) => setAlign(e.target.value)}
                    >
                        {["start", "center", "end", "baseline", "stretch"].map(
                            (value) => (
                                <option key={value}>{value}</option>
                            ),
                        )}
                    </select>
                    <label className="text-sm">
                        Gap {gap}
                        <input
                            type="range"
                            min="0"
                            max="12"
                            value={gap}
                            onChange={(e) => setGap(e.target.value)}
                            className="w-full"
                        />
                    </label>
                    <label className="flex items-center gap-2 text-sm">
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
                            "grid min-h-64 rounded-2xl border border-dashed border-indigo-200 bg-indigo-50/50 p-4",
                            mode === "flex" ? "flex" : "grid",
                            mode === "flex"
                                ? direction === "row"
                                    ? "flex-row"
                                    : "flex-col"
                                : `grid-cols-${columns}`,
                            mode === "flex" && wrap ? "flex-wrap" : "",
                            `justify-${justify}`,
                            `items-${align}`,
                            `gap-${gap}`,
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
                                className="rounded-xl border border-indigo-200 bg-white p-4 text-center text-sm text-indigo-700"
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

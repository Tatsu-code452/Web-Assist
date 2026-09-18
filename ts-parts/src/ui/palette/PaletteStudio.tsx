import { useState } from "react";
import { cn } from "../../lib/utils";
import { Input, Label } from "../components/atomic";
import { Card } from "../components/composite";
import { ColorPair, CopyButton } from "../shared";

export const PaletteStudio = () => {
    const [palette, setPalette] = useState([
        { name: "Primary", value: "#4f46e5" },
        { name: "Accent", value: "#0f766e" },
        { name: "Success", value: "#15803d" },
        { name: "Warning", value: "#b45309" },
        { name: "Danger", value: "#be123c" },
        { name: "Surface", value: "#f8fafc" },
    ]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const selected = palette[selectedIndex];

    const updateColor = (value: string) => {
        setPalette((current) =>
            current.map((color, index) =>
                index === selectedIndex ? { ...color, value } : color,
            ),
        );
    };

    const cssVariables = palette
        .map(({ name, value }) => `--color-${name.toLowerCase()}: ${value};`)
        .join("\n");
    const tailwindConfig = palette
        .map(({ name, value }) => `        ${name.toLowerCase()}: "${value}",`)
        .join("\n");

    return (
        <div className="space-y-6">
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {palette.map((color, index) => (
                        <button
                            type="button"
                            key={color.name}
                            onClick={() => setSelectedIndex(index)}
                            aria-pressed={selectedIndex === index}
                            className={cn(
                                "rounded-2xl border bg-white p-3 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md",
                                selectedIndex === index
                                    ? "border-indigo-500 ring-2 ring-indigo-100"
                                    : "border-slate-200",
                            )}
                        >
                            <span
                                className="block h-20 rounded-xl border border-black/10"
                                style={{ backgroundColor: color.value }}
                            />
                            <span className="mt-3 block text-sm font-semibold text-slate-800">
                                {color.name}
                            </span>
                            <span className="mt-1 block font-mono text-xs uppercase text-slate-500">
                                {color.value}
                            </span>
                        </button>
                    ))}
                </div>
                <Card className="h-fit bg-slate-50">
                    <Label htmlFor="palette-color">
                        選択中の色: {selected.name}
                    </Label>
                    <div className="flex gap-2">
                        <input
                            id="palette-color"
                            type="color"
                            value={selected.value}
                            onChange={(event) =>
                                updateColor(event.target.value)
                            }
                            aria-label={`${selected.name} のカラーピッカー`}
                            className="h-10 w-14 cursor-pointer rounded-lg border border-slate-200 bg-white p-1"
                        />
                        <Input
                            id="palette-color-hex"
                            value={selected.value}
                            onChange={(event) =>
                                updateColor(event.target.value)
                            }
                            pattern="^#[0-9a-fA-F]{6}$"
                            aria-label={`${selected.name} の HEX 値`}
                        />
                    </div>
                    <p className="mt-3 text-xs leading-relaxed text-slate-500">
                        HEX 値を直接入力するか、カラーピッカーで調整できます。
                    </p>
                </Card>
            </div>
            <div>
                <h3 className="mb-3 text-sm font-bold text-slate-700">
                    文字色と背景色の組み合わせ
                </h3>
                <div className="mb-5">
                    <h3 className="mb-3 text-sm font-bold text-slate-700">
                        Accessible same-hue scales
                    </h3>
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                        {[
                            {
                                name: "Indigo",
                                shades: [
                                    "#eef2ff",
                                    "#c7d2fe",
                                    "#818cf8",
                                    "#4f46e5",
                                    "#312e81",
                                ],
                            },
                            {
                                name: "Teal",
                                shades: [
                                    "#f0fdfa",
                                    "#99f6e4",
                                    "#2dd4bf",
                                    "#0f766e",
                                    "#134e4a",
                                ],
                            },
                            {
                                name: "Amber",
                                shades: [
                                    "#fffbeb",
                                    "#fde68a",
                                    "#f59e0b",
                                    "#b45309",
                                    "#78350f",
                                ],
                            },
                            {
                                name: "Rose",
                                shades: [
                                    "#fff1f2",
                                    "#fecdd3",
                                    "#fb7185",
                                    "#be123c",
                                    "#881337",
                                ],
                            },
                            {
                                name: "Slate",
                                shades: [
                                    "#f8fafc",
                                    "#cbd5e1",
                                    "#64748b",
                                    "#334155",
                                    "#0f172a",
                                ],
                            },
                        ].map((scale) => (
                            <div
                                key={scale.name}
                                className="overflow-hidden rounded-xl border border-slate-200"
                            >
                                <p className="bg-white px-3 py-2 text-xs font-bold text-slate-700">
                                    {scale.name}
                                </p>
                                <div className="flex">
                                    {scale.shades.map((shade) => (
                                        <span
                                            key={shade}
                                            title={shade}
                                            className="h-12 flex-1"
                                            style={{ backgroundColor: shade }}
                                        />
                                    ))}
                                </div>
                                <p className="bg-white px-3 py-2 text-[10px] text-slate-500">
                                    light ? dark ? accessible pairings
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                    <ColorPair
                        name="Primary action"
                        background={selected.value}
                        foreground="#ffffff"
                        usage="主要ボタン、選択中のタブ"
                    />
                    <ColorPair
                        name="Soft surface"
                        background={`${selected.value}18`}
                        foreground={selected.value}
                        usage="通知、補足情報、選択状態"
                    />
                    <ColorPair
                        name="Strong text"
                        background="#ffffff"
                        foreground="#172033"
                        usage="本文、見出し、フォームラベル"
                    />
                    <ColorPair
                        name="Muted text"
                        background="#f8fafc"
                        foreground="#64748b"
                        usage="説明文、メタ情報、プレースホルダー"
                    />
                </div>
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
                <div>
                    <div className="mb-2 flex items-center justify-between">
                        <h3 className="text-sm font-bold text-slate-700">
                            CSS variables
                        </h3>
                        <CopyButton value={`:root {\n${cssVariables}\n}`} />
                    </div>
                    <pre className="overflow-x-auto rounded-xl bg-slate-950 p-4 text-xs leading-relaxed text-slate-200">
                        {`:root {\n${cssVariables}\n}`}
                    </pre>
                </div>
                <div>
                    <div className="mb-2 flex items-center justify-between">
                        <h3 className="text-sm font-bold text-slate-700">
                            Tailwind theme
                        </h3>
                        <CopyButton
                            value={`colors: {\n${tailwindConfig}\n    }`}
                        />
                    </div>
                    <pre className="overflow-x-auto rounded-xl bg-slate-950 p-4 text-xs leading-relaxed text-slate-200">
                        {`colors: {\n${tailwindConfig}\n    }`}
                    </pre>
                </div>
            </div>
        </div>
    );
};

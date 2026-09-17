import { createElement, useState, type ReactNode } from "react";
import { cn } from "../../lib/utils";
import { Button, Input } from "../components";
import { CopyButton, Section } from "../shared";
import {
    usePageBuilder,
    type BuilderBlockType,
    type BuilderNode,
    type BuilderStyle,
} from "./usePageBuilder";

const builderPalette: { type: BuilderBlockType; label: string }[] = [
    { type: "heading", label: "Heading" },
    { type: "paragraph", label: "Paragraph" },
    { type: "button", label: "Button" },
    { type: "card", label: "Card" },
    { type: "input", label: "Input" },
    { type: "select", label: "Select" },
    { type: "textarea", label: "Textarea" },
    { type: "checkbox", label: "Checkbox" },
    { type: "badge", label: "Badge" },
    { type: "alert", label: "Alert" },
    { type: "image", label: "Image" },
    { type: "divider", label: "Divider" },
    { type: "section", label: "Section" },
    { type: "list", label: "List" },
    { type: "nav", label: "Navigation" },
];

const nodeLabel = (node: BuilderNode) =>
    node.type === "div"
        ? "Container"
        : builderPalette.find((item) => item.type === node.type)?.label ||
          node.type;

const typePresets: Record<BuilderNode["type"], string> = {
    div: "rounded-2xl border border-slate-200 bg-white p-6",
    heading: "text-2xl font-bold text-slate-900",
    paragraph: "text-base leading-7 text-slate-600",
    button: "rounded-xl bg-indigo-600 px-4 py-2 font-semibold text-white",
    card: "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm",
    input: "rounded-xl border border-slate-300 px-3 py-2",
    select: "rounded-xl border border-slate-300 px-3 py-2",
    textarea: "min-h-24 rounded-xl border border-slate-300 px-3 py-2",
    checkbox: "flex items-center gap-2",
    badge: "inline-flex rounded-full bg-indigo-100 px-3 py-1 text-xs",
    alert: "rounded-xl border border-indigo-200 bg-indigo-50 p-4",
    image: "grid min-h-32 place-items-center rounded-xl bg-slate-100",
    divider: "my-4 border-slate-200",
    section: "rounded-2xl bg-slate-50 p-6",
    list: "list-disc pl-5",
    nav: "flex gap-4 text-indigo-700",
};

export const PageBuilder = () => {
    const {
        tree,
        selectedId,
        setSelectedId,
        setDraggedId,
        selected,
        update,
        updateStyle,
        add,
        remove,
        drop,
    } = usePageBuilder();

    const [outputMode, setOutputMode] = useState<"components" | "html">(
        "components",
    );
    const [source, setSource] = useState("");

    const styleFields = (key: keyof BuilderStyle, label: string) => (
        <label className="block text-xs font-medium text-slate-600">
            {label}
            <Input
                value={selected.style[key]}
                onChange={(event) =>
                    updateStyle(selected.id, key, event.target.value)
                }
            />
        </label>
    );

    const tagFor = (type: BuilderNode["type"]) =>
        type === "div"
            ? "div"
            : type === "heading"
              ? "h2"
              : type === "paragraph"
                ? "p"
                : type === "button"
                  ? "button"
                  : type === "divider"
                    ? "hr"
                    : type === "section"
                      ? "section"
                      : type === "nav"
                        ? "nav"
                        : type === "list"
                          ? "ul"
                          : "div";

    const render = (node: BuilderNode): ReactNode => {
        const props = {
            style: { ...node.style } as React.CSSProperties,
            onClick: (event: React.MouseEvent) => {
                event.stopPropagation();
                setSelectedId(node.id);
            },
            draggable: node.id !== 1,
            onDragStart: () => setDraggedId(node.id),
            onDragOver: (event: React.DragEvent) => event.preventDefault(),
            onDrop: () => drop(node.id),
            className: cn(
                typePresets[node.type],
                selectedId === node.id && "ring-2 ring-indigo-400",
            ),
        };
        if (node.type === "div")
            return <div {...props}>{node.children.map(render)}</div>;
        if (node.type === "divider") return <hr {...props} />;
        return createElement(tagFor(node.type), props, node.text);
    };

    const jsx = (node: BuilderNode, depth = 0): string => {
        const pad = "  ".repeat(depth);
        const tag = tagFor(node.type);
        const className =
            outputMode === "components" ? typePresets[node.type] : "";
        const attrs =
            outputMode === "components"
                ? ` className="${className}" style={${JSON.stringify(node.style)}}`
                : ` style="${Object.entries(node.style)
                      .map(
                          ([key, value]) =>
                              `${key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}:${value}`,
                      )
                      .join(";")}"`;
        if (tag === "hr") return `${pad}<hr${attrs} />`;
        const content =
            node.type === "div"
                ? `\n${node.children.map((child) => jsx(child, depth + 1)).join("\n")}\n${pad}`
                : node.text;
        return `${pad}<${tag}${attrs}>${content}</${tag}>`;
    };

    const generated = jsx(tree);

    const applySource = () => {
        const text = source.trim();
        if (!text) return;
        update(selected.id, { text });
    };

    return (
        <Section
            title="Web Page Builder"
            description="Independent nested tree with preset classes and style overrides."
        >
            <div className="mt-4 grid gap-6 xl:grid-cols-[220px_minmax(0,1fr)_360px]">
                <div className="space-y-2">
                    <Button
                        variant="secondary"
                        className="w-full"
                        onClick={() => add("div")}
                    >
                        + Container div
                    </Button>
                    {builderPalette.map((item) => (
                        <Button
                            key={item.type}
                            variant="secondary"
                            className="w-full justify-start"
                            onClick={() => add(item.type)}
                        >
                            + {item.label}
                        </Button>
                    ))}
                </div>
                <div
                    className="min-h-96 rounded-2xl border border-slate-200 bg-slate-50 p-5"
                    onClick={() => setSelectedId(1)}
                >
                    {render(tree)}
                </div>
                <div className="space-y-3">
                    <p className="text-xs font-bold uppercase text-slate-400">
                        Selected: {nodeLabel(selected)}
                    </p>
                    {selected.type !== "div" && (
                        <Input
                            value={selected.text}
                            onChange={(event) =>
                                update(selected.id, {
                                    text: event.target.value,
                                })
                            }
                        />
                    )}
                    <div className="grid grid-cols-2 gap-3">
                        {styleFields("color", "Text color")}
                        {styleFields("backgroundColor", "Background")}
                        {styleFields("padding", "Padding")}
                        {styleFields("margin", "Margin")}
                        {styleFields("fontSize", "Font size")}
                        {styleFields("width", "Width")}
                        {styleFields("height", "Height")}
                        {styleFields("borderRadius", "Radius")}
                    </div>
                    {selected.id !== 1 && (
                        <Button
                            variant="ghost"
                            className="w-full text-rose-600"
                            onClick={() => remove(selected.id)}
                        >
                            Delete
                        </Button>
                    )}
                </div>
            </div>
            <div className="mt-6 grid gap-4 xl:grid-cols-2">
                <div>
                    <div className="mb-2 flex items-center justify-between">
                        <b>HTML editing</b>
                        <Button variant="secondary" onClick={applySource}>
                            Apply to selected
                        </Button>
                    </div>
                    <textarea
                        className="min-h-36 w-full rounded-xl border border-slate-200 bg-white p-3 font-mono text-xs"
                        value={source}
                        onChange={(event) => setSource(event.target.value)}
                        placeholder="Edit text or safe markup, then apply to the selected element"
                    />
                </div>
                <div>
                    <div className="mb-2 flex items-center justify-between">
                        <div className="flex gap-2">
                            <Button
                                variant={
                                    outputMode === "components"
                                        ? "primary"
                                        : "secondary"
                                }
                                onClick={() => setOutputMode("components")}
                            >
                                Tailwind + components
                            </Button>
                            <Button
                                variant={
                                    outputMode === "html"
                                        ? "primary"
                                        : "secondary"
                                }
                                onClick={() => setOutputMode("html")}
                            >
                                Raw HTML
                            </Button>
                        </div>
                        <CopyButton value={generated} />
                    </div>
                    <pre className="min-h-36 max-h-72 overflow-auto rounded-xl bg-slate-950 p-4 text-xs text-indigo-200">
                        {generated}
                    </pre>
                </div>
            </div>
        </Section>
    );
};

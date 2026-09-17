
export const builderPalette: { type: BuilderBlockType; label: string; }[] = [
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

export const typePresets: Record<BuilderNode["type"], string> = {
    div: "",
    heading: "text-2xl font-bold text-slate-900",
    paragraph: "text-base leading-7 text-slate-600",
    button: "inline-flex items-center justify-center gap-2 rounded-xl font-semibold shadow-sm bg-indigo-600 text-white px-4 py-2 text-sm",
    card: "rounded-2xl border bg-white p-5 shadow-sm",
    input: "h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 shadow-sm",
    select: "h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 shadow-sm cursor-pointer",
    textarea: "min-h-28 w-full resize-y rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm",
    checkbox: "size-4 rounded border-slate-300 text-indigo-600 accent-indigo-600",
    badge: "inline-flex items-center font-semibold rounded-full px-2.5 py-1 text-xs bg-indigo-50 text-indigo-700",
    alert: "rounded-xl border p-4 text-sm border-indigo-200 bg-indigo-50 text-indigo-900",
    image: "overflow-hidden rounded-xl bg-slate-100 border border-slate-200",
    divider: "my-4 border-slate-200 w-full",
    section: "rounded-2xl bg-slate-50 p-6 border border-slate-200",
    list: "list-disc pl-5 text-slate-700",
    nav: "flex gap-4 text-indigo-700 font-medium",
};
export const commonTailwindClasses = [
    "p-2",
    "p-4",
    "p-6",
    "m-2",
    "m-4",
    "rounded-none",
    "rounded-md",
    "rounded-xl",
    "rounded-full",
    "bg-white",
    "bg-slate-100",
    "bg-indigo-500",
    "text-slate-900",
    "text-white",
    "text-indigo-600",
    "shadow-sm",
    "shadow-md",
    "border",
    "border-slate-200",
];

export interface LayoutProps {
    display: "block" | "flex" | "grid";
    flexDirection: "row" | "col";
    justifyContent: "start" | "center" | "between" | "end";
    alignItems: "start" | "center" | "end" | "stretch";
    gap: string;
    gridCols: string;
}

export interface BuilderNode {
    id: string;
    type: BuilderBlockType;
    name: string;
    text: string;
    classes: string[];
    layoutProps: LayoutProps;
    props?: Record<string, any>;
    children: BuilderNode[];
}

export const initialTree: BuilderNode = {
    id: "root",
    type: "div",
    name: "Root Container",
    text: "",
    classes: ["p-6", "space-y-4"],
    layoutProps: {
        display: "block",
        flexDirection: "col",
        justifyContent: "start",
        alignItems: "stretch",
        gap: "gap-4",
        gridCols: "grid-cols-1",
    },
    props: {},
    children: [
        {
            id: "heading-1",
            type: "heading",
            name: "Main Title",
            text: "Form Editor",
            classes: [],
            layoutProps: {
                display: "block",
                flexDirection: "row",
                justifyContent: "start",
                alignItems: "start",
                gap: "gap-2",
                gridCols: "grid-cols-1",
            },
            props: {},
            children: [],
        },
    ],
};


export type BuilderBlockType =
    | "div"
    | "heading"
    | "paragraph"
    | "button"
    | "card"
    | "input"
    | "select"
    | "textarea"
    | "checkbox"
    | "badge"
    | "alert"
    | "image"
    | "divider"
    | "section"
    | "list"
    | "nav";


export type Tab =
    | "atoms"
    | "patterns"
    | "composites"
    | "layout"
    | "page-builder"
    | "palette";

export type VisualMode = "classic" | "dark" | "studio";

export const tabs: { id: Tab; label: string }[] = [
    { id: "atoms", label: "Atomic" },
    { id: "patterns", label: "Patterns" },
    { id: "composites", label: "Composites" },
    { id: "layout", label: "Layout Builder" },
    { id: "page-builder", label: "Web Page Builder" },
    { id: "palette", label: "Palette" },
];
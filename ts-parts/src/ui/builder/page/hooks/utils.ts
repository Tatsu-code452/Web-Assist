import { BuilderNode } from "../types";

export const getLayoutClasses = (node: BuilderNode) => {
    const {
        display,
        flexDirection,
        justifyContent,
        alignItems,
        gap,
        gridCols,
    } = node.layoutProps;
    if (display === "block") return "block";
    if (display === "flex") {
        const dir = flexDirection === "col" ? "flex-col" : "flex-row";
        return `flex ${dir} justify-${justifyContent} items-${alignItems} ${gap}`;
    }
    if (display === "grid") return `grid ${gridCols} ${gap}`;
    return "";
};

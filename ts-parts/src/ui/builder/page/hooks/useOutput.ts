import { cn } from "../../../../lib/utils";
import { BuilderNode, typePresets } from "../types";
import { PageBuilderState } from "./usePageBuilderState";
import { getLayoutClasses } from "./utils";

export interface OutputController {
    generateCode: (node: BuilderNode, depth?: number) => string;
}

export const useOutput = (states: PageBuilderState): OutputController => {
    const {
        outputMode,
    } = states;

    const tagFor = (type: BuilderNode["type"]) => {
        switch (type) {
            case "heading":
                return "h2";
            case "paragraph":
                return "p";
            case "button":
                return "button";
            case "input":
                return "input";
            case "select":
                return "select";
            case "textarea":
                return "textarea";
            case "checkbox":
                return "input";
            case "badge":
                return "span";
            case "alert":
                return "div";
            case "image":
                return "img";
            case "divider":
                return "hr";
            case "section":
                return "section";
            case "list":
                return "ul";
            case "nav":
                return "nav";
            default:
                return "div";
        }
    };

    const generateCode = (node: BuilderNode, depth = 0): string => {
        const pad = "  ".repeat(depth);
        const tag = tagFor(node.type);
        const isContainer =
            node.type === "div" ||
            node.type === "section" ||
            node.type === "card";
        const layoutCls = getLayoutClasses(node);
        const fullClasses = cn(
            typePresets[node.type],
            layoutCls,
            node.classes.join(" "),
        ).trim();

        const classAttr =
            fullClasses.length > 0
                ? outputMode === "jsx"
                    ? ` className="${fullClasses}"`
                    : ` class="${fullClasses}"`
                : "";

        if (tag === "hr") return `${pad}<hr${classAttr} />`;
        if (node.type === "image") {
            const src = node.props?.src
                ? ` src="${node.props.src}"`
                : ' src="https://via.placeholder.com/150"';
            const alt = node.props?.alt
                ? ` alt="${node.props.alt}"`
                : ` alt="${node.text}"`;
            return `${pad}<img${src}${alt}${classAttr} />`;
        }
        if (node.type === "input") {
            const type = node.props?.type
                ? ` type="${node.props.type}"`
                : ' type="text"';
            const placeholder = node.props?.placeholder
                ? ` placeholder="${node.props.placeholder}"`
                : "";
            return `${pad}<input${type}${placeholder}${classAttr} />`;
        }
        if (node.type === "textarea") {
            const placeholder = node.props?.placeholder
                ? ` placeholder="${node.props.placeholder}"`
                : "";
            return `${pad}<textarea${placeholder}${classAttr} />`;
        }

        const content = isContainer
            ? node.children.length > 0
                ? `\n${node.children.map((child) => generateCode(child, depth + 1)).join("\n")}\n${pad}`
                : ""
            : node.text;

        return `${pad}<${tag}${classAttr}>${content}</${tag}>`;
    };

    return {
        generateCode,
    };
};
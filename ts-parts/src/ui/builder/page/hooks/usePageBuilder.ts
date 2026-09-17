import { useEffect } from "react";
import { cn } from "../../../../lib/utils";
import { BuilderNode, typePresets } from "../types";
import { Node } from "./useNode";
import { PageBuilderState } from "./usePageBuilderState";
import { Tool } from "./useTool";

export interface PageBuilderController {
    handleAddCustomClass: (e: React.FormEvent) => void;
    tagFor: (type: BuilderNode["type"]) => "div" | "button" | "input" | "select" | "textarea" | "section" | "nav" | "h2" | "p" | "span" | "img" | "hr" | "ul";
    getLayoutClasses: (node: BuilderNode) => string;
    generateCode: (node: BuilderNode, depth?: number) => string;
    generated: string;
    viewportClasses: string;
}

export const usePageBuilder = (states: PageBuilderState, tool: Tool, node: Node): PageBuilderController => {
    const {
        outputMode,
        selectedId,
        viewport, tree,
        customClassInput, setCustomClassInput
    } = states;

    const {
        undo,
        redo,
        canUndo,
        canRedo
    } = tool;

    const {
        selected,
        toggleUtilityClass,
        duplicateNode,
        removeNode,
    } = node;

    const handleAddCustomClass = (e: React.FormEvent) => {
        e.preventDefault();
        if (!customClassInput.trim()) return;
        toggleUtilityClass(selected.id, customClassInput.trim());
        setCustomClassInput("");
    };

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

    const getLayoutClasses = (node: BuilderNode) => {
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

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (
                e.target instanceof HTMLInputElement ||
                e.target instanceof HTMLTextAreaElement ||
                (e.target as HTMLElement).isContentEditable
            )
                return;

            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "z") {
                if (e.shiftKey ? canRedo : canUndo) {
                    e.shiftKey ? redo() : undo();
                    e.preventDefault();
                }
            } else if (
                (e.metaKey || e.ctrlKey) &&
                e.key.toLowerCase() === "d"
            ) {
                if (selectedId !== "root") {
                    duplicateNode(selectedId);
                    e.preventDefault();
                }
            } else if (e.key === "Delete" || e.key === "Backspace") {
                if (selectedId !== "root") {
                    removeNode(selectedId);
                    e.preventDefault();
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [canUndo, canRedo, undo, redo, selectedId, duplicateNode, removeNode]);

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

    const generated = generateCode(tree);
    const viewportClasses = {
        desktop: "w-full",
        tablet: "max-w-[768px] mx-auto",
        mobile: "max-w-[375px] mx-auto",
    }[viewport];

    return {
        handleAddCustomClass,
        tagFor,
        getLayoutClasses,
        generateCode,
        generated,
        viewportClasses
    };
};
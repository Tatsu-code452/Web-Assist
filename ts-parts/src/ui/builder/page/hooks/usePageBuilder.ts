import { useEffect } from "react";
import { Node } from "./useNode";
import { PageBuilderState } from "./usePageBuilderState";
import { Tool } from "./useTool";

export interface PageBuilderController {
    viewportClasses: string;
}

export const usePageBuilder = (states: PageBuilderState, tool: Tool, node: Node): PageBuilderController => {
    const {
        selectedId,
        viewport,
    } = states;

    const {
        undo,
        redo,
        canUndo,
        canRedo
    } = tool;

    const {
        duplicateNode,
        removeNode,
    } = node;

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

    const viewportClasses = {
        desktop: "w-full",
        tablet: "max-w-[768px] mx-auto",
        mobile: "max-w-[375px] mx-auto",
    }[viewport];

    return {
        viewportClasses
    };
};
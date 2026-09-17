import { useState } from "react";
import { BuilderNode, initialTree } from "../types";

export interface PageBuilderState {
    tree: BuilderNode;
    setTree: React.Dispatch<React.SetStateAction<BuilderNode>>;
    selectedId: string;
    setSelectedId: React.Dispatch<React.SetStateAction<string>>;
    draggedId: string | null;
    setDraggedId: React.Dispatch<React.SetStateAction<string | null>>;
    history: BuilderNode[];
    setHistory: React.Dispatch<React.SetStateAction<BuilderNode[]>>;
    redoStack: BuilderNode[];
    setRedoStack: React.Dispatch<React.SetStateAction<BuilderNode[]>>;
    outputMode: "jsx" | "html";
    setOutputMode: React.Dispatch<React.SetStateAction<"jsx" | "html">>;
    viewport: "mobile" | "tablet" | "desktop";
    setViewport: React.Dispatch<React.SetStateAction<"mobile" | "tablet" | "desktop">>;
    customClassInput: string;
    setCustomClassInput: React.Dispatch<React.SetStateAction<string>>;
}

export const usePageBuilderState = (): PageBuilderState => {
    const [tree, setTree] = useState<BuilderNode>(initialTree);
    const [selectedId, setSelectedId] = useState<string>("root");
    const [draggedId, setDraggedId] = useState<string | null>(null);
    const [history, setHistory] = useState<BuilderNode[]>([]);
    const [redoStack, setRedoStack] = useState<BuilderNode[]>([]);

    const [outputMode, setOutputMode] = useState<"jsx" | "html">("jsx");
    const [viewport, setViewport] = useState<"mobile" | "tablet" | "desktop">(
        "desktop",
    );
    const [customClassInput, setCustomClassInput] = useState("");

    return {
        tree, setTree,
        selectedId, setSelectedId,
        draggedId, setDraggedId,
        history, setHistory,
        redoStack, setRedoStack,
        outputMode, setOutputMode,
        viewport, setViewport,
        customClassInput, setCustomClassInput
    }
}
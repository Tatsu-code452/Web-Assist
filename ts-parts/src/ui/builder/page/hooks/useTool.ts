import { PageBuilderState } from "./usePageBuilderState";

export interface Tool {
    saveHistory: () => void;
    undo: () => void;
    redo: () => void;
    canUndo: boolean;
    canRedo: boolean;
}

export const useTool = (states: PageBuilderState): Tool => {
    const {
        tree, setTree,
        history, setHistory,
        redoStack, setRedoStack
    } = states;

    const saveHistory = () => {
        setHistory((prev) => [...prev, structuredClone(tree)]);
        setRedoStack([]);
    };

    const undo = () => {
        if (history.length === 0) return;
        const previous = history[history.length - 1];
        setRedoStack((prev) => [...prev, structuredClone(tree)]);
        setTree(previous);
        setHistory((prev) => prev.slice(0, -1));
    };

    const redo = () => {
        if (redoStack.length === 0) return;
        const next = redoStack[redoStack.length - 1];
        setHistory((prev) => [...prev, structuredClone(tree)]);
        setTree(next);
        setRedoStack((prev) => prev.slice(0, -1));
    };

    return {
        saveHistory,
        undo,
        redo,
        canUndo: history.length > 0,
        canRedo: redoStack.length > 0,
    }
}
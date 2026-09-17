import { cn } from "../../../../lib/utils";
import { Button } from "../../../components";
import { Node } from "../hooks/useNode";
import { PageBuilderState } from "../hooks/usePageBuilderState";
import { Tool } from "../hooks/useTool";

interface ToolbarProps {
    states: PageBuilderState;
    tool: Tool;
    node: Node;
}

export const Toolbar = ({ states, tool, node }: ToolbarProps) => {
    const { viewport, setViewport } = states;
    const { undo, redo, canUndo, canRedo } = tool;
    const { selected, duplicateNode, moveNode, removeNode } = node;

    return (
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 p-2 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-2">
                <Button
                    variant="secondary"
                    size="sm"
                    onClick={undo}
                    disabled={!canUndo}
                >
                    ↩ Undo
                </Button>
                <Button
                    variant="secondary"
                    size="sm"
                    onClick={redo}
                    disabled={!canRedo}
                >
                    ↪ Redo
                </Button>
            </div>
            <div className="flex rounded-lg border border-slate-200 bg-white p-0.5 dark:border-slate-700 dark:bg-slate-800">
                {(["desktop", "tablet", "mobile"] as const).map((vp) => (
                    <button
                        key={vp}
                        type="button"
                        onClick={() => setViewport(vp)}
                        className={cn(
                            "px-2.5 py-1 text-xs font-semibold rounded-md transition capitalize",
                            viewport === vp
                                ? "bg-indigo-600 text-white"
                                : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700",
                        )}
                    >
                        {vp}
                    </button>
                ))}
            </div>
            {selected.id !== "root" && (
                <div className="flex items-center gap-2">
                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => moveNode(selected.id, "up")}
                    >
                        ↑ 上へ
                    </Button>
                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => moveNode(selected.id, "down")}
                    >
                        ↓ 下へ
                    </Button>
                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => duplicateNode(selected.id)}
                    >
                        📋 複製
                    </Button>
                    <Button
                        variant="danger"
                        size="sm"
                        onClick={() => removeNode(selected.id)}
                    >
                        🗑 削除
                    </Button>
                </div>
            )}
        </div>
    );
};

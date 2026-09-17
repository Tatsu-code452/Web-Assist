import { useState } from "react";
import { cn } from "../../../../lib/utils";
import { BuilderNode } from "../types";

interface TreeViewProps {
    node: BuilderNode;
    selectedId: string;
    onSelect: (id: string) => void;
    draggedId: string | null;
    setDraggedId: (id: string | null) => void;
    onDrop: (
        targetId: string,
        dropPosition: "inside" | "before" | "after",
    ) => void;
}

export const TreeView = ({
    node,
    selectedId,
    onSelect,
    draggedId,
    setDraggedId,
    onDrop,
}: TreeViewProps) => {
    const [collapsed, setCollapsed] = useState(false);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (
        e: React.DragEvent,
        position: "inside" | "before" | "after",
    ) => {
        e.preventDefault();
        e.stopPropagation();
        onDrop(node.id, position);
    };

    const isSelected = selectedId === node.id;
    const isContainer =
        node.type === "div" || node.type === "section" || node.type === "card";
    const hasChildren = node.children.length > 0;

    return (
        <div className="flex flex-col gap-1.5 p-3 rounded-xl border border-slate-200 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/50 flex-1 overflow-hidden">
            <p className="text-[11px] font-bold uppercase text-slate-400">
                Document Tree
            </p>
            <div className="max-h-[300px] overflow-y-auto">
                <div className="select-none text-xs">
                    <div
                        draggable={node.id !== "root"}
                        onDragStart={(e) => {
                            e.stopPropagation();
                            setDraggedId(node.id);
                        }}
                        onDragEnd={(e) => {
                            e.stopPropagation();
                            setDraggedId(null);
                        }}
                        onDragOver={handleDragOver}
                        onClick={(e) => {
                            e.stopPropagation();
                            onSelect(node.id);
                        }}
                        className={cn(
                            "group relative flex items-center justify-between rounded-md px-2 py-1.5 transition-colors cursor-pointer",
                            isSelected
                                ? "bg-indigo-600 text-white font-medium"
                                : "text-slate-700 hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-800",
                        )}
                    >
                        <div className="flex items-center gap-1.5 overflow-hidden">
                            {hasChildren ? (
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setCollapsed((prev) => !prev);
                                    }}
                                    className="w-4 text-center font-mono hover:bg-black/10 rounded"
                                >
                                    {collapsed ? "▶" : "▼"}
                                </button>
                            ) : (
                                <span className="w-4" />
                            )}
                            <span className="opacity-60 font-mono text-[10px]">
                                {isContainer ? "📁" : "📄"}
                            </span>
                            <span className="truncate">
                                {node.name || node.type}
                            </span>
                        </div>

                        {node.id !== "root" && (
                            <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1 text-[10px]">
                                {isContainer && (
                                    <button
                                        type="button"
                                        title="中にドロップ"
                                        onDrop={(e) => handleDrop(e, "inside")}
                                        onDragOver={handleDragOver}
                                        className="px-1 bg-black/10 rounded hover:bg-black/20"
                                    >
                                        ↙
                                    </button>
                                )}
                                <button
                                    type="button"
                                    title="前に配置"
                                    onDrop={(e) => handleDrop(e, "before")}
                                    onDragOver={handleDragOver}
                                    className="px-1 bg-black/10 rounded hover:bg-black/20"
                                >
                                    ↑
                                </button>
                                <button
                                    type="button"
                                    title="後に配置"
                                    onDrop={(e) => handleDrop(e, "after")}
                                    onDragOver={handleDragOver}
                                    className="px-1 bg-black/10 rounded hover:bg-black/20"
                                >
                                    ↓
                                </button>
                            </div>
                        )}
                    </div>

                    {hasChildren && !collapsed && (
                        <div className="ml-3 pl-2 border-l border-slate-300 dark:border-slate-700 space-y-0.5 mt-0.5">
                            {node.children.map((child) => (
                                <TreeView
                                    key={child.id}
                                    node={child}
                                    selectedId={selectedId}
                                    onSelect={onSelect}
                                    draggedId={draggedId}
                                    setDraggedId={setDraggedId}
                                    onDrop={onDrop}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

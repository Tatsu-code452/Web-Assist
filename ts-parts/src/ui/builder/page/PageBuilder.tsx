import { cn } from "../../../lib/utils";
import { Section } from "../../shared";
import { useNode } from "./hooks/useNode";
import { usePageBuilder } from "./hooks/usePageBuilder";
import { usePageBuilderState } from "./hooks/usePageBuilderState";
import { useTool } from "./hooks/useTool";
import { Output } from "./parts/Output";
import { Property } from "./parts/Property";
import { Toolbar } from "./parts/Toolbar";
import { ToolBox } from "./parts/ToolBox";
import { TreeView } from "./parts/TreeView";
import { PreviewRender } from "./render/PreviewRender";

export const PageBuilder = () => {
    const states = usePageBuilderState();
    const { tree, selectedId, setSelectedId, draggedId, setDraggedId } = states;

    const tool = useTool(states);
    const { saveHistory } = tool;

    const node = useNode(states, saveHistory);
    const { dropNode } = node;

    const pageBuilderController = usePageBuilder(states, tool, node);
    const { viewportClasses } = pageBuilderController;

    const { renderPreview } = PreviewRender(states, pageBuilderController);

    return (
        <Section
            title="Web Page Builder"
            description="ネスト構成・Tailwind操作・ツリー管理エディタ。"
        >
            {/* 上部操作バー */}
            <Toolbar states={states} tool={tool} node={node} />

            {/* メインレイアウト */}
            <div className="grid gap-4 xl:grid-cols-[220px_minmax(0,1fr)_300px] items-start">
                <div className="flex flex-col gap-4 max-h-[680px] overflow-hidden">
                    <ToolBox node={node} />
                    <TreeView
                        node={tree}
                        selectedId={selectedId}
                        onSelect={setSelectedId}
                        draggedId={draggedId}
                        setDraggedId={setDraggedId}
                        onDrop={dropNode}
                    />
                </div>

                <div
                    className="min-h-[600px] rounded-2xl border border-slate-200 bg-slate-50/50 p-6 dark:border-slate-800 dark:bg-slate-900/50 shadow-inner overflow-auto"
                    onClick={() => setSelectedId("root")}
                >
                    <div
                        className={cn(
                            "transition-all duration-300",
                            viewportClasses,
                        )}
                    >
                        {renderPreview(tree)}
                    </div>
                </div>

                {/* 右カラム: プロパティ設定エリア */}
                <Property
                    states={states}
                    node={node}
                    pageBuilderController={pageBuilderController}
                />
            </div>

            {/* コード出力 */}
            <Output
                states={states}
                pageBuilderController={pageBuilderController}
            />
        </Section>
    );
};

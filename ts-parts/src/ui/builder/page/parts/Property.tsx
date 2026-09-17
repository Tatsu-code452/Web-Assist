import { cn } from "../../../../lib/utils";
import { Button, Input, Select } from "../../../components";
import { Node } from "../hooks/useNode";
import { PageBuilderState } from "../hooks/usePageBuilderState";
import { useProperty } from "../hooks/useProperty";
import { PropsInspectorGUIRender } from "../render/PropsInspectorGUIRender";
import { commonTailwindClasses } from "../types";

interface PropertyProps {
    states: PageBuilderState;
    node: Node;
}

export const Property = ({ states, node }: PropertyProps) => {
    const { customClassInput, setCustomClassInput } = states;
    const { selected, updateNode, toggleUtilityClass, updateLayoutProps } =
        node;
    const { handleAddCustomClass } = useProperty(states, node);
    const { renderPropsInspectorGUI } = PropsInspectorGUIRender(node);

    return (
        <div className="flex flex-col gap-4 p-4 rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 max-h-[680px] overflow-y-auto">
            <div className="border-b border-slate-200 pb-2 dark:border-slate-800">
                <p className="text-xs font-bold uppercase text-indigo-600">
                    Properties
                </p>
                <p className="text-sm font-semibold text-slate-800 dark:text-white">
                    {selected.name}
                    <span className="text-xs font-normal text-slate-400">
                        ({selected.type})
                    </span>
                </p>
            </div>

            <div>
                <label className="block text-xs font-medium text-slate-600 mb-1 dark:text-slate-400">
                    要素名 (Element Name)
                </label>
                <Input
                    value={selected.name || ""}
                    onChange={(e) =>
                        updateNode(selected.id, {
                            name: e.target.value,
                        })
                    }
                />
            </div>

            <div>
                <label className="block text-xs font-medium text-slate-600 mb-1 dark:text-slate-400">
                    表示テキスト (Inner Text)
                </label>
                <Input
                    value={selected.text}
                    onChange={(e) =>
                        updateNode(selected.id, {
                            text: e.target.value,
                        })
                    }
                />
            </div>

            {/* Component-Specific Props Inspector (GUI) */}
            <div className="space-y-2 border-t border-slate-200 pt-3 dark:border-slate-800">
                <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Component Props
                </p>
                {renderPropsInspectorGUI()}
            </div>

            {/* レイアウト設定 */}
            <div className="space-y-2 border-t border-slate-200 pt-3 dark:border-slate-800">
                <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Layout
                </p>
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <label className="block text-[10px] text-slate-500 mb-1">
                            Display
                        </label>
                        <Select
                            value={selected.layoutProps.display}
                            onChange={(e) =>
                                updateLayoutProps(selected.id, {
                                    display: e.target.value as any,
                                })
                            }
                            options={[
                                { value: "block", label: "Block" },
                                { value: "flex", label: "Flex" },
                                { value: "grid", label: "Grid" },
                            ]}
                        />
                    </div>
                    {selected.layoutProps.display === "flex" && (
                        <div>
                            <label className="block text-[10px] text-slate-500 mb-1">
                                Direction
                            </label>
                            <Select
                                value={selected.layoutProps.flexDirection}
                                onChange={(e) =>
                                    updateLayoutProps(selected.id, {
                                        flexDirection: e.target.value as any,
                                    })
                                }
                                options={[
                                    { value: "row", label: "Row" },
                                    { value: "col", label: "Column" },
                                ]}
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Tailwind Styles */}
            <div className="space-y-2 border-t border-slate-200 pt-3 dark:border-slate-800">
                <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Tailwind Utility Classes
                </p>
                <div className="flex flex-wrap gap-1 mb-2">
                    {commonTailwindClasses.map((cls) => {
                        const active = selected.classes.includes(cls);
                        return (
                            <button
                                key={cls}
                                type="button"
                                onClick={() =>
                                    toggleUtilityClass(selected.id, cls)
                                }
                                className={cn(
                                    "px-2 py-0.5 text-[10px] rounded border font-mono transition",
                                    active
                                        ? "bg-indigo-600 text-white border-indigo-600"
                                        : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700",
                                )}
                            >
                                {cls}
                            </button>
                        );
                    })}
                </div>
                <form onSubmit={handleAddCustomClass} className="flex gap-1">
                    <Input
                        value={customClassInput}
                        onChange={(e) => setCustomClassInput(e.target.value)}
                        placeholder="カスタムクラス (例: opacity-80)"
                        className="text-xs h-8"
                    />
                    <Button type="submit" size="sm" variant="secondary">
                        追加
                    </Button>
                </form>
            </div>
        </div>
    );
};

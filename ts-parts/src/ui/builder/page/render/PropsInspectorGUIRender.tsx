import { Input, Select } from "../../../components";
import { Node } from "../hooks/useNode";

export const PropsInspectorGUIRender = (node: Node) => {
    const { selected, updateComponentProps } = node;

    const renderPropsInspectorGUI = () => {
        switch (selected.type) {
            case "input":
                return (
                    <div className="space-y-3">
                        <div>
                            <label className="block text-xs font-medium text-slate-600 mb-1 dark:text-slate-400">
                                入力タイプ (type)
                            </label>
                            <Select
                                value={selected.props?.type || "text"}
                                onChange={(e) =>
                                    updateComponentProps(selected.id, {
                                        type: e.target.value,
                                    })
                                }
                                options={[
                                    { value: "text", label: "テキスト (text)" },
                                    {
                                        value: "password",
                                        label: "パスワード (password)",
                                    },
                                    { value: "email", label: "メール (email)" },
                                    {
                                        value: "number",
                                        label: "数値 (number)",
                                    },
                                ]}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-slate-600 mb-1 dark:text-slate-400">
                                プレースホルダー (placeholder)
                            </label>
                            <Input
                                value={selected.props?.placeholder || ""}
                                onChange={(e) =>
                                    updateComponentProps(selected.id, {
                                        placeholder: e.target.value,
                                    })
                                }
                                placeholder="入力例: 山田 太郎"
                            />
                        </div>
                    </div>
                );

            case "badge":
            case "alert":
                return (
                    <div className="space-y-3">
                        <div>
                            <label className="block text-xs font-medium text-slate-600 mb-1 dark:text-slate-400">
                                トーン / カラー (tone)
                            </label>
                            <Select
                                value={selected.props?.tone || "info"}
                                onChange={(e) =>
                                    updateComponentProps(selected.id, {
                                        tone: e.target.value,
                                    })
                                }
                                options={[
                                    { value: "info", label: "Info (青)" },
                                    {
                                        value: "success",
                                        label: "Success (緑)",
                                    },
                                    {
                                        value: "warning",
                                        label: "Warning (黄)",
                                    },
                                    {
                                        value: "danger",
                                        label: "Danger (赤)",
                                    },
                                ]}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-slate-600 mb-1 dark:text-slate-400">
                                サイズ (size)
                            </label>
                            <Select
                                value={selected.props?.size || "md"}
                                onChange={(e) =>
                                    updateComponentProps(selected.id, {
                                        size: e.target.value,
                                    })
                                }
                                options={[
                                    { value: "sm", label: "Small" },
                                    { value: "md", label: "Medium" },
                                    { value: "lg", label: "Large" },
                                ]}
                            />
                        </div>
                    </div>
                );

            case "image":
                return (
                    <div className="space-y-3">
                        <div>
                            <label className="block text-xs font-medium text-slate-600 mb-1 dark:text-slate-400">
                                画像URL (src)
                            </label>
                            <Input
                                value={selected.props?.src || ""}
                                onChange={(e) =>
                                    updateComponentProps(selected.id, {
                                        src: e.target.value,
                                    })
                                }
                                placeholder="https://example.com/image.png"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-slate-600 mb-1 dark:text-slate-400">
                                代替テキスト (alt)
                            </label>
                            <Input
                                value={selected.props?.alt || ""}
                                onChange={(e) =>
                                    updateComponentProps(selected.id, {
                                        alt: e.target.value,
                                    })
                                }
                                placeholder="画像の説明"
                            />
                        </div>
                    </div>
                );

            default:
                return (
                    <p className="text-xs text-slate-400 italic">
                        選択中の要素には設定可能なプロパティがありません。
                    </p>
                );
        }
    };

    return {
        renderPropsInspectorGUI,
    };
};

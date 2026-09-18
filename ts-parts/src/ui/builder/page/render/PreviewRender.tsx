import { ReactNode } from "react";
import { cn } from "../../../../lib/utils";
import { Button, Input, Textarea } from "../../../components/atomic";
import { Alert, Badge, Card } from "../../../components/composite";
import { PageBuilderState } from "../hooks/usePageBuilderState";
import { getLayoutClasses } from "../hooks/utils";
import { BuilderNode, typePresets } from "../types";

export const PreviewRender = (states: PageBuilderState) => {
    const { selectedId, setSelectedId } = states;

    const renderPreview = (node: BuilderNode): ReactNode => {
        const isContainer =
            node.type === "div" ||
            node.type === "section" ||
            node.type === "card";
        const layoutCls = getLayoutClasses(node);
        const userClasses = node.classes.join(" ");
        const presetCls = typePresets[node.type];
        const containerPlaceholderCls =
            isContainer && node.children.length === 0
                ? "min-h-12 border border-dashed border-slate-300 p-4 rounded-xl"
                : "";

        const wrapperProps = {
            key: node.id,
            onClick: (event: React.MouseEvent) => {
                event.stopPropagation();
                setSelectedId(node.id);
            },
            className: cn(
                containerPlaceholderCls,
                presetCls,
                layoutCls,
                userClasses,
                selectedId === node.id &&
                    "outline-2 outline-indigo-500 outline-offset-1 ring-2 ring-indigo-400/30",
            ),
        };

        if (node.type === "image") {
            return (
                <div {...wrapperProps}>
                    <img
                        src={
                            node.props?.src || "https://via.placeholder.com/150"
                        }
                        alt={node.props?.alt || node.text}
                        className="w-full h-auto object-cover"
                    />
                </div>
            );
        }

        if (node.type === "button") {
            return (
                <div
                    key={node.id}
                    onClick={(e) => {
                        e.stopPropagation();
                        setSelectedId(node.id);
                    }}
                >
                    <Button
                        className={cn(
                            userClasses,
                            selectedId === node.id && "ring-2 ring-indigo-500",
                        )}
                    >
                        {node.text}
                    </Button>
                </div>
            );
        }

        if (node.type === "input") {
            return (
                <div
                    key={node.id}
                    onClick={(e) => {
                        e.stopPropagation();
                        setSelectedId(node.id);
                    }}
                    className="w-full"
                >
                    <Input
                        type={node.props?.type || "text"}
                        placeholder={node.props?.placeholder || node.text}
                        className={cn(
                            userClasses,
                            selectedId === node.id && "ring-2 ring-indigo-500",
                        )}
                        readOnly
                    />
                </div>
            );
        }

        if (node.type === "textarea") {
            return (
                <div
                    key={node.id}
                    onClick={(e) => {
                        e.stopPropagation();
                        setSelectedId(node.id);
                    }}
                    className="w-full"
                >
                    <Textarea
                        placeholder={node.props?.placeholder || node.text}
                        className={cn(
                            userClasses,
                            selectedId === node.id && "ring-2 ring-indigo-500",
                        )}
                        readOnly
                    />
                </div>
            );
        }

        if (node.type === "badge") {
            return (
                <div
                    key={node.id}
                    onClick={(e) => {
                        e.stopPropagation();
                        setSelectedId(node.id);
                    }}
                >
                    <Badge
                        tone={node.props?.tone || "info"}
                        size={node.props?.size || "md"}
                        className={userClasses}
                    >
                        {node.text}
                    </Badge>
                </div>
            );
        }

        if (node.type === "alert") {
            return (
                <div
                    key={node.id}
                    onClick={(e) => {
                        e.stopPropagation();
                        setSelectedId(node.id);
                    }}
                    className="w-full"
                >
                    <Alert
                        tone={node.props?.tone || "info"}
                        size={node.props?.size || "md"}
                        title={node.name}
                        className={userClasses}
                    >
                        {node.text}
                    </Alert>
                </div>
            );
        }

        if (node.type === "card") {
            return (
                <Card {...wrapperProps}>
                    {node.children.length > 0 ? (
                        node.children.map(renderPreview)
                    ) : (
                        <span className="text-xs text-slate-400">
                            {node.text}
                        </span>
                    )}
                </Card>
            );
        }

        if (node.type === "divider") return <hr {...wrapperProps} />;
        if (isContainer)
            return (
                <div {...wrapperProps}>{node.children.map(renderPreview)}</div>
            );

        return <div {...wrapperProps}>{node.text}</div>;
    };

    return { renderPreview };
};

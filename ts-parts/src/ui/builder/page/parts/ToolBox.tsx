import { Button } from "../../../components";
import { Node } from "../hooks/useNode";
import { builderPalette } from "../types";

interface ToolBoxProps {
    node: Node;
}

export const ToolBox = ({ node }: ToolBoxProps) => {
    const { addNode } = node;

    return (
        <div className="flex flex-col gap-1.5 p-3 rounded-xl border border-slate-200 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/50">
            <p className="text-[11px] font-bold uppercase text-slate-400">
                Toolbox
            </p>
            <Button
                variant="secondary"
                className="w-full justify-start text-xs h-7 px-2"
                onClick={() => addNode("div")}
            >
                + Container (div)
            </Button>
            <div className="grid grid-cols-2 gap-1 max-h-[160px] overflow-y-auto pr-1">
                {builderPalette.map((item) => (
                    <Button
                        key={item.type}
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start text-[11px] h-7 px-1.5 truncate"
                        onClick={() => addNode(item.type)}
                    >
                        + {item.label}
                    </Button>
                ))}
            </div>
        </div>
    );
};

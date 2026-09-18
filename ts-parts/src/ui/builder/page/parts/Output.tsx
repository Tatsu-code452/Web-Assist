import { Button } from "../../../components/atomic";
import { CopyButton } from "../../../shared";
import { useOutput } from "../hooks/useOutput";
import { PageBuilderState } from "../hooks/usePageBuilderState";

interface OutputProps {
    states: PageBuilderState;
}

export const Output = ({ states }: OutputProps) => {
    const { tree, outputMode, setOutputMode } = states;
    const { generateCode } = useOutput(states);
    const generated = generateCode(tree);

    return (
        <div className="mt-8">
            <div className="mb-2 flex items-center justify-between">
                <div className="flex gap-2">
                    <Button
                        variant={outputMode === "jsx" ? "primary" : "secondary"}
                        size="sm"
                        onClick={() => setOutputMode("jsx")}
                    >
                        JSX + Tailwind
                    </Button>
                    <Button
                        variant={
                            outputMode === "html" ? "primary" : "secondary"
                        }
                        size="sm"
                        onClick={() => setOutputMode("html")}
                    >
                        HTML + Tailwind
                    </Button>
                </div>
                <CopyButton value={generated} />
            </div>
            <pre className="min-h-40 max-h-72 overflow-auto rounded-xl bg-slate-950 p-4 font-mono text-xs text-indigo-200">
                {generated}
            </pre>
        </div>
    );
};

import { Button } from "../../../components";
import { CopyButton } from "../../../shared";
import { PageBuilderController } from "../hooks/usePageBuilder";
import { PageBuilderState } from "../hooks/usePageBuilderState";

interface OutputProps {
    states: PageBuilderState;
    pageBuilderController: PageBuilderController;
}

export const Output = ({ states, pageBuilderController }: OutputProps) => {
    const { outputMode, setOutputMode } = states;
    const { generated } = pageBuilderController;

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

import { useState, type ReactNode } from "react";
import { Button, Card } from "./components";

export const CopyButton = ({ value }: { value: string }) => {
    const [copied, setCopied] = useState(false);
    const copy = async () => {
        try {
            await navigator.clipboard.writeText(value);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1600);
        } catch (error) {
            console.error("Failed to copy component code.", error);
        }
    };
    return (
        <Button variant="ghost" onClick={copy} aria-label={`${value} をコピー`}>
            {copied ? "Copied" : "Copy"}
        </Button>
    );
};

export const Section = ({
    title,
    description,
    children,
    code,
}: {
    title: string;
    description: string;
    children: ReactNode;
    code?: string;
}) => (
    <section className="scroll-mt-6">
        <div className="mb-3 flex items-start justify-between gap-4">
            <div>
                <h2 className="text-lg font-bold text-slate-900">{title}</h2>
                <p className="mt-1 text-sm text-slate-500">{description}</p>
            </div>
            {code && <CopyButton value={code} />}
        </div>
        <Card>{children}</Card>
    </section>
);

export const ColorPair = ({
    name,
    background,
    foreground,
    usage,
}: {
    name: string;
    background: string;
    foreground: string;
    usage: string;
}) => (
    <div
        className="rounded-xl border border-slate-200 p-4"
        style={{ backgroundColor: background, color: foreground }}
    >
        <div className="flex items-center justify-between gap-2">
            <p className="font-semibold">{name}</p>
            <span className="rounded-full bg-black/10 px-2 py-1 text-xs">
                Aa
            </span>
        </div>
        <p className="mt-2 text-sm opacity-85">{usage}</p>
        <p className="mt-3 font-mono text-xs opacity-75">
            {foreground} on {background}
        </p>
    </div>
);

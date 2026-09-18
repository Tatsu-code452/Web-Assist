import { ui } from "../../../lib/tokens";
import { cn } from "../../../lib/utils";
import { Input } from "../atomic";

export const SearchField = ({
    value,
    onChange,
    placeholder = "検索...",
}: {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}) => (
    <div className="relative">
        <span
            className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400"
            aria-hidden="true"
        >
            <svg
                className="size-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
            </svg>
        </span>
        <Input
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder={placeholder}
            className="pl-9 pr-9"
            aria-label={placeholder}
        />
        {value && (
            <button
                type="button"
                onClick={() => onChange("")}
                className={cn(
                    "absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-slate-700",
                    ui.focus,
                )}
                aria-label="検索条件をクリア"
            >
                <svg
                    className="size-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </button>
        )}
    </div>
);

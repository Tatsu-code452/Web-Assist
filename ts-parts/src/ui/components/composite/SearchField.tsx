import { ui } from "../../../lib/tokens";
import { cn } from "../../../lib/utils";
import { Input } from "../atomic/atomic";

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
            ⌕
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
                    "absolute inset-y-0 right-3 text-slate-400 hover:text-slate-700",
                    ui.focus,
                )}
                aria-label="検索条件をクリア"
            >
                ×
            </button>
        )}
    </div>
);

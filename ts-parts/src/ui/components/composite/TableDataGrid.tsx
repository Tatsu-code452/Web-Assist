import { useMemo, useState } from "react";
import { ui } from "../../../lib/tokens";
import { cn } from "../../../lib/utils";
import { Input } from "../atomic/Input";

export interface Column<T> {
    key: keyof T;
    header: string;
    sortable?: boolean;
    render?: (row: T) => React.ReactNode;
}

export interface TableDataGridProps<T> {
    data: T[];
    columns: Column<T>[];
    searchable?: boolean;
    searchPlaceholder?: string;
    className?: string;
}

export function TableDataGrid<T extends { id: string | number }>({
    data,
    columns,
    searchable = true,
    searchPlaceholder = "データを検索...",
    className,
}: TableDataGridProps<T>) {
    const [search, setSearch] = useState("");
    const [sortKey, setSortKey] = useState<keyof T | null>(null);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

    const handleSort = (key: keyof T) => {
        if (sortKey === key) {
            setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
        } else {
            setSortKey(key);
            setSortOrder("asc");
        }
    };

    const filteredData = useMemo(() => {
        let result = [...data];
        if (search.trim()) {
            const query = search.toLowerCase();
            result = result.filter((item) =>
                Object.values(item).some((val) =>
                    String(val).toLowerCase().includes(query),
                ),
            );
        }
        if (sortKey) {
            result.sort((a, b) => {
                String(a[sortKey]);
                const valA = a[sortKey];
                const valB = b[sortKey];
                if (valA < valB) return sortOrder === "asc" ? -1 : 1;
                if (valA > valB) return sortOrder === "asc" ? 1 : -1;
                return 0;
            });
        }
        return result;
    }, [data, search, sortKey, sortOrder]);

    return (
        <div className={cn("space-y-3", className)}>
            {searchable && (
                <div className="w-full sm:w-64">
                    <Input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder={searchPlaceholder}
                    />
                </div>
            )}
            <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <table className="w-full text-left text-sm">
                    <thead className="border-b border-slate-200 bg-slate-50 text-xs font-bold uppercase text-slate-500 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-400">
                        <tr>
                            {columns.map((col) => (
                                <th key={String(col.key)} className="px-4 py-3">
                                    {col.sortable ? (
                                        <button
                                            type="button"
                                            onClick={() => handleSort(col.key)}
                                            className={cn(
                                                "flex items-center gap-1 hover:text-slate-900 dark:hover:text-white",
                                                ui.focus,
                                            )}
                                        >
                                            {col.header}
                                            {sortKey === col.key ? (
                                                <span>
                                                    {sortOrder === "asc"
                                                        ? "↑"
                                                        : "↓"}
                                                </span>
                                            ) : (
                                                <span className="opacity-30">
                                                    ↕
                                                </span>
                                            )}
                                        </button>
                                    ) : (
                                        col.header
                                    )}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {filteredData.length > 0 ? (
                            filteredData.map((row) => (
                                <tr
                                    key={row.id}
                                    className="transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-800/30"
                                >
                                    {columns.map((col) => (
                                        <td
                                            key={String(col.key)}
                                            className="px-4 py-3 text-slate-700 dark:text-slate-300"
                                        >
                                            {col.render
                                                ? col.render(row)
                                                : String(row[col.key] ?? "")}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="px-4 py-8 text-center text-slate-500"
                                >
                                    データが見つかりません。
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

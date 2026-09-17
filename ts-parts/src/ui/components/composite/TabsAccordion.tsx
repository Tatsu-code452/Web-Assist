import { useState } from "react";
import { cn } from "../../../lib/utils";

export interface TabItem {
    id: string;
    label: string;
    content: React.ReactNode;
}

export const Tabs = ({ items }: { items: TabItem[] }) => {
    const [activeTab, setActiveTab] = useState(items[0]?.id);

    return (
        <div className="w-full">
            <div className="flex border-b border-slate-200 dark:border-slate-800">
                {items.map((item) => (
                    <button
                        key={item.id}
                        type="button"
                        onClick={() => setActiveTab(item.id)}
                        className={cn(
                            "px-4 py-2.5 text-sm font-medium border-b-2 transition-colors",
                            activeTab === item.id
                                ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
                                : "border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300",
                        )}
                    >
                        {item.label}
                    </button>
                ))}
            </div>
            <div className="py-4 text-sm">
                {items.find((item) => item.id === activeTab)?.content}
            </div>
        </div>
    );
};

export interface AccordionItem {
    id: string;
    title: string;
    content: React.ReactNode;
}

export const Accordion = ({ items }: { items: AccordionItem[] }) => {
    const [openIds, setOpenIds] = useState<string[]>([]);

    const toggle = (id: string) => {
        setOpenIds((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
        );
    };

    return (
        <div className="divide-y divide-slate-200 rounded-xl border border-slate-200 dark:divide-slate-800 dark:border-slate-800">
            {items.map((item) => {
                const isOpen = openIds.includes(item.id);
                return (
                    <div key={item.id} className="bg-white dark:bg-slate-900">
                        <button
                            type="button"
                            onClick={() => toggle(item.id)}
                            className="flex w-full items-center justify-between p-4 text-left font-medium text-slate-900 dark:text-white"
                        >
                            {item.title}
                            <span>{isOpen ? "−" : "+"}</span>
                        </button>
                        {isOpen && (
                            <div className="px-4 pb-4 text-sm text-slate-600 dark:text-slate-400">
                                {item.content}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

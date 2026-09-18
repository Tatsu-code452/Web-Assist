import { useState } from "react";
import { Button, Input } from "../components/atomic";
import {
    Accordion,
    Avatar,
    Card,
    DropdownMenu,
    Modal,
    Popover,
    Skeleton,
    StatCard,
    TableDataGrid,
    Tabs,
    Toast,
    Tooltip,
} from "../components/composite";
import { Section } from "../shared";

export const CompositeShowcase = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [toasts, setToasts] = useState<
        { id: string; message: string; tone: "info" | "success" | "danger" }[]
    >([]);

    const addToast = (tone: "info" | "success" | "danger") => {
        const id = Date.now().toString();
        setToasts((prev) => [
            ...prev,
            { id, message: `Toast Notification (${tone})`, tone },
        ]);
    };

    const removeToast = (id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    const tableData = [
        { id: 1, name: "Alice Johnson", role: "Developer", status: "Active" },
        { id: 2, name: "Bob Smith", role: "Designer", status: "Inactive" },
        { id: 3, name: "Charlie Brown", role: "Manager", status: "Active" },
    ];

    return (
        <Section
            title="Composite examples"
            description="各種コンポーネント（Modal, Toast, Tooltip, Popover, Dropdown, Table 等）のデモ。"
        >
            <div className="space-y-6">
                <div>
                    <h3 className="mb-3 text-sm font-bold text-slate-700 dark:text-slate-300">
                        Interactive Overlay & Context Menus
                    </h3>
                    <div className="flex flex-wrap items-center gap-3">
                        <Button onClick={() => setIsModalOpen(true)}>
                            モーダルを開く
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() => addToast("success")}
                        >
                            トースト追加 (Success)
                        </Button>

                        <Tooltip content="補足情報を表示します" position="top">
                            <Button variant="ghost">Hover me (Tooltip)</Button>
                        </Tooltip>

                        <Popover
                            trigger={
                                <Button variant="secondary">Popover</Button>
                            }
                        >
                            <p className="text-sm font-bold text-slate-900 dark:text-white">
                                Popover Header
                            </p>
                            <p className="mt-1 text-xs text-slate-500">
                                任意のレイアウト・要素を入れることが可能です。
                            </p>
                        </Popover>

                        <DropdownMenu
                            trigger={
                                <Button variant="primary">Actions ▾</Button>
                            }
                            items={[
                                {
                                    id: "edit",
                                    label: "編集",
                                    onClick: () => alert("Edit"),
                                },
                                {
                                    id: "duplicate",
                                    label: "複製",
                                    onClick: () => alert("Duplicate"),
                                },
                                {
                                    id: "delete",
                                    label: "削除",
                                    danger: true,
                                    onClick: () => alert("Delete"),
                                },
                            ]}
                        />
                    </div>
                </div>

                <div>
                    <h3 className="mb-3 text-sm font-bold text-slate-700 dark:text-slate-300">
                        Table / DataGrid
                    </h3>
                    <TableDataGrid
                        data={tableData}
                        columns={[
                            { key: "id", header: "ID", sortable: true },
                            { key: "name", header: "Name", sortable: true },
                            { key: "role", header: "Role", sortable: true },
                            { key: "status", header: "Status" },
                        ]}
                    />
                </div>

                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    title="確認ダイアログ"
                >
                    これは CVA
                    および新しい統合コンポーネント体系によって動作するモーダルです。
                </Modal>

                <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2">
                    {toasts.map((toast) => (
                        <Toast
                            key={toast.id}
                            id={toast.id}
                            message={toast.message}
                            tone={toast.tone}
                            onClose={removeToast}
                        />
                    ))}
                </div>

                <div>
                    <h3 className="mb-3 text-sm font-bold text-slate-700 dark:text-slate-300">
                        Tabs & Accordion
                    </h3>
                    <div className="grid gap-6 md:grid-cols-2">
                        <Card>
                            <Tabs
                                items={[
                                    {
                                        id: "1",
                                        label: "概要",
                                        content: "プロジェクトの概要情報です。",
                                    },
                                    {
                                        id: "2",
                                        label: "設定",
                                        content: "詳細な環境設定を行えます。",
                                    },
                                ]}
                            />
                        </Card>
                        <Card>
                            <Accordion
                                items={[
                                    {
                                        id: "1",
                                        title: "よくある質問 1",
                                        content: "回答 1 がここに入ります。",
                                    },
                                    {
                                        id: "2",
                                        title: "よくある質問 2",
                                        content: "回答 2 がここに入ります。",
                                    },
                                ]}
                            />
                        </Card>
                    </div>
                </div>

                <div>
                    <h3 className="mb-3 text-sm font-bold text-slate-700 dark:text-slate-300">
                        Avatar & Skeleton Loader
                    </h3>
                    <Card className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <Avatar fallback="TS" size="lg" />
                            <div>
                                <p className="font-bold text-slate-900 dark:text-white">
                                    User Name
                                </p>
                                <p className="text-xs text-slate-500">
                                    user@example.com
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-3 w-20" />
                        </div>
                    </Card>
                </div>

                <div>
                    <h3 className="mb-3 text-sm font-bold text-slate-700 dark:text-slate-300">
                        Metrics & Analytics
                    </h3>
                    <div className="grid gap-4 sm:grid-cols-3">
                        <StatCard
                            label="Total Revenue"
                            value="$45,231.89"
                            change="+20.1% from last month"
                            tone="emerald"
                        />
                        <StatCard
                            label="Active Subscriptions"
                            value="+2,350"
                            change="+180.1% from last month"
                            tone="indigo"
                        />
                        <StatCard
                            label="Bounce Rate"
                            value="12.3%"
                            change="-4.5% from last month"
                            tone="amber"
                        />
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                        <h3 className="font-bold text-slate-900 dark:text-white">
                            Application header
                        </h3>
                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                            Brand, search, notifications and user actions.
                        </p>
                        <Input className="mt-3" placeholder="Search..." />
                    </Card>
                    <Card>
                        <h3 className="font-bold text-slate-900 dark:text-white">
                            Sidebar navigation
                        </h3>
                        <nav className="mt-3 space-y-2 text-sm text-indigo-700 dark:text-indigo-400">
                            <a href="#">Dashboard</a>
                            <a href="#">Projects</a>
                            <a href="#">Settings</a>
                        </nav>
                    </Card>
                </div>
            </div>
        </Section>
    );
};

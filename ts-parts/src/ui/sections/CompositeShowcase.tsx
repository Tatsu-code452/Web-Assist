import { useState } from "react";
import {
    Accordion,
    Avatar,
    Button,
    Card,
    Input,
    Modal,
    Skeleton,
    StatCard,
    Tabs,
    Toast,
} from "../components";
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

    return (
        <Section
            title="Composite examples"
            description="新規追加コンポーネント（Modal, Toast, Tabs, Accordion, Avatar, Skeleton）の対話型デモ。"
        >
            <div className="space-y-6">
                <div>
                    <h3 className="mb-3 text-sm font-bold text-slate-700 dark:text-slate-300">
                        Interactive Overlay & Notifications
                    </h3>
                    <div className="flex flex-wrap gap-3">
                        <Button onClick={() => setIsModalOpen(true)}>
                            モーダルを開く
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() => addToast("success")}
                        >
                            トースト追加 (Success)
                        </Button>
                        <Button
                            variant="danger"
                            onClick={() => addToast("danger")}
                        >
                            トースト追加 (Danger)
                        </Button>
                    </div>
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

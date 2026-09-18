import { Progress, Spinner } from "../../../components/atomic";
import { Section } from "../../../shared";

export const ProgressSpinnerSection = () => {
    return (
        <Section
            title="Progress & Spinner"
            description="ローディング状態と進捗状況を視覚化します。"
        >
            <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                    <Progress value={45} showValue tone="indigo" />
                    <Progress value={80} showValue tone="emerald" />
                </div>
                <div className="flex items-center gap-4">
                    <Spinner size="sm" />
                    <Spinner size="md" tone="indigo" />
                    <Spinner size="lg" tone="muted" />
                </div>
            </div>
        </Section>
    );
};

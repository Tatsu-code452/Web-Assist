import { useState } from "react";
import {
    Alert,
    Badge,
    Button,
    Checkbox,
    Field,
    Input,
    Progress,
    Select,
    Spinner,
    Switch,
    Textarea,
} from "../components";
import { Section } from "../shared";

export const AtomicSection = () => {
    const [enabled, setEnabled] = useState(false);

    return (
        <>
            <Section
                title="Button"
                description="cva によるバリアントとサイズ管理に対応した Button。"
                code={'<Button variant="primary" size="md">Save</Button>'}
            >
                <div className="flex flex-wrap items-center gap-3">
                    <Button size="sm">Small</Button>
                    <Button size="md">Medium</Button>
                    <Button size="lg">Large</Button>
                    <Button variant="secondary">Cancel</Button>
                    <Button variant="danger">Delete</Button>
                    <Button variant="ghost">Details</Button>
                    <Button disabled>Disabled</Button>
                </div>
            </Section>
            <Section
                title="Form controls & Switch"
                description="Inputs, field states, and switch toggle."
                code={'<Switch label="Enable notifications" />'}
            >
                <div className="grid gap-5 md:grid-cols-2">
                    <Field
                        label="Email"
                        required
                        hint="We will never share it."
                    >
                        <Input placeholder="you@example.com" />
                    </Field>
                    <Field label="Category">
                        <Select
                            options={[
                                { value: "design", label: "Design" },
                                { value: "engineering", label: "Engineering" },
                            ]}
                        />
                    </Field>
                    <Field label="Description">
                        <Textarea placeholder="Tell us more" />
                    </Field>
                    <div className="space-y-4">
                        <label className="flex items-center gap-2 text-sm">
                            <Checkbox />
                            Subscribe to updates
                        </label>
                        <div>
                            <Switch
                                label="ダークモードを有効化"
                                checked={enabled}
                                onChange={(e) => setEnabled(e.target.checked)}
                            />
                        </div>
                    </div>
                </div>
            </Section>
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
            <Section
                title="Status components"
                description="Badges and alerts communicate state."
            >
                <div className="flex flex-wrap items-center gap-2">
                    <Badge size="sm">Neutral SM</Badge>
                    <Badge tone="success" size="md">
                        Success MD
                    </Badge>
                    <Badge tone="warning" size="lg">
                        Warning LG
                    </Badge>
                    <Badge tone="danger">Danger</Badge>
                </div>
                <div className="mt-4 space-y-3">
                    <Alert tone="info" size="sm" title="Small Alert">
                        This is a small info alert.
                    </Alert>
                    <Alert tone="success" title="Heads up">
                        This is a success alert.
                    </Alert>
                </div>
            </Section>
        </>
    );
};

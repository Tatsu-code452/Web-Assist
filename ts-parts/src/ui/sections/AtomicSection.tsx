import {
    Alert,
    Badge,
    Button,
    Checkbox,
    Field,
    Input,
    Select,
    Textarea,
} from "../components";
import { Section } from "../shared";

export const AtomicSection = () => (
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
            title="Form controls"
            description="Inputs and field states."
            code={'<Field label="Email"><Input /></Field>'}
        >
            <div className="grid gap-5 md:grid-cols-2">
                <Field label="Email" required hint="We will never share it.">
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
                <label className="flex items-center gap-2 text-sm">
                    <Checkbox />
                    Subscribe to updates
                </label>
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

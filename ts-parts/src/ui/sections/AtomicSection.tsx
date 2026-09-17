import {
    Alert,
    Badge,
    Button,
    Checkbox,
    Field,
    Input,
    Select,
    Textarea
} from "../components";
import { Section } from "../shared";

export const AtomicSection = () => (
    <>
        <Section
            title="Button"
            description="Primary, secondary, danger and ghost actions."
            code={'<Button variant="primary">Save</Button>'}
        >
            <div className="flex flex-wrap gap-3">
                <Button>Save</Button>
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
            <div className="flex flex-wrap gap-2">
                <Badge>Neutral</Badge>
                <Badge tone="success">Success</Badge>
                <Badge tone="warning">Warning</Badge>
                <Badge tone="danger">Danger</Badge>
            </div>
            <div className="mt-4">
                <Alert title="Heads up">This is an informational alert.</Alert>
            </div>
        </Section>
    </>
);

import { Button, Input } from "../components/atomic";
import { Badge, Card, Field } from "../components/composite";
import { Section } from "../shared";

export const PatternsSection = () => (
    <>
        <Section
            title="Form pattern"
            description="A compact form layout with validation-ready fields."
        >
            <div className="grid gap-4 md:grid-cols-2">
                <Field label="Name" required>
                    <Input placeholder="Your name" />
                </Field>
                <Field label="Email" required>
                    <Input type="email" placeholder="you@example.com" />
                </Field>
            </div>
            <Button className="mt-4">Submit</Button>
        </Section>
        <Section
            title="Card pattern"
            description="Group related content in a clear surface."
        >
            <div className="grid gap-4 md:grid-cols-3">
                {["Planning", "In progress", "Complete"].map((title) => (
                    <Card key={title}>
                        <Badge tone="info">{title}</Badge>
                        <p className="mt-3 text-sm text-slate-600">
                            A reusable content pattern with clear hierarchy.
                        </p>
                    </Card>
                ))}
            </div>
        </Section>
    </>
);

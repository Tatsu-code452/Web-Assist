import { useState } from "react";
import {
    Checkbox,
    Input,
    Select,
    Switch,
    Textarea,
} from "../../../components/atomic";
import { Field } from "../../../components/composite";
import { Section } from "../../../shared";

export const FormSwitchSection = () => {
    const [enabled, setEnabled] = useState(false);

    return (
        <Section
            title="Form controls & Switch"
            description="Inputs, field states, and switch toggle."
            code={'<Switch label="Enable notifications" />'}
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
    );
};

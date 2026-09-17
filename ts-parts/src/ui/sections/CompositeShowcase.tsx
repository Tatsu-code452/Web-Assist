import {
    Card,
    Input
} from "../components";
import { Section } from "../shared";

export const CompositeShowcase = () => (
    <Section
        title="Composite examples"
        description="Reusable application-level compositions."
    >
        <div className="grid gap-4 md:grid-cols-2">
            <Card>
                <h3 className="font-bold">Application header</h3>
                <p className="mt-2 text-sm text-slate-600">
                    Brand, search, notifications and user actions.
                </p>
                <Input className="mt-3" placeholder="Search..." />
            </Card>
            <Card>
                <h3 className="font-bold">Sidebar navigation</h3>
                <nav className="mt-3 space-y-2 text-sm text-indigo-700">
                    <a href="#">Dashboard</a>
                    <a href="#">Projects</a>
                    <a href="#">Settings</a>
                </nav>
            </Card>
        </div>
    </Section>
);

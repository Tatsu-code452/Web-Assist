import { Alert, Badge } from "../../../components/composite";
import { Section } from "../../../shared";

export const StatusSection = () => {
    return (
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
    );
};

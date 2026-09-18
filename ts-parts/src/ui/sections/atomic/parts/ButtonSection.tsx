import { Button } from "../../../components/atomic";
import { Section } from "../../../shared";

export const ButtonSection = () => {
    return (
        <Section
            title="Button"
            description="cva によるバリアントとサイズ管理に対応した Button。"
            code={'<Button variant="primary" size="md">Save</Button>'}
        >
            <div className="flex flex-wrap items-center gap-3">
                <Button variant="primary" size="sm">
                    Small
                </Button>
                <Button variant="primary" size="md">
                    Medium
                </Button>
                <Button variant="primary" size="lg">
                    Large
                </Button>
                <Button variant="secondary">Cancel</Button>
                <Button variant="danger">Delete</Button>
                <Button variant="ghost">Details</Button>
                <Button variant="primary" disabled>
                    Disabled
                </Button>
            </div>
        </Section>
    );
};

import { ButtonSection } from "./parts/ButtonSection";
import { FormSwitchSection } from "./parts/FormSwitchSection";
import { ProgressSpinnerSection } from "./parts/ProgressSpinnerSection";
import { StatusSection } from "./parts/StatusSection";

export const AtomicSection = () => {
    return (
        <>
            <ButtonSection />

            <FormSwitchSection />

            <ProgressSpinnerSection />

            <StatusSection />
        </>
    );
};

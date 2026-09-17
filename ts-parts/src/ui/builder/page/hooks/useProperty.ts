import { Node } from "./useNode";
import { PageBuilderState } from "./usePageBuilderState";

export interface PropertyController {
    handleAddCustomClass: (e: React.FormEvent<Element>) => void;
}

export const useProperty = (
    states: PageBuilderState,
    node: Node
): PropertyController => {
    const {
        customClassInput, setCustomClassInput
    } = states;

    const {
        selected,
        toggleUtilityClass,
    } = node;

    const handleAddCustomClass = (e: React.FormEvent) => {
        e.preventDefault();
        if (!customClassInput.trim()) return;
        toggleUtilityClass(selected.id, customClassInput.trim());
        setCustomClassInput("");
    };

    return {
        handleAddCustomClass
    }
}

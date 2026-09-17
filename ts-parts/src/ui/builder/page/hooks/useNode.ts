import { BuilderBlockType, BuilderNode, LayoutProps } from "../types";
import { PageBuilderState } from "./usePageBuilderState";

export interface Node {
    selected: BuilderNode;
    updateNode: (id: string, fields: Partial<BuilderNode>) => void;
    toggleUtilityClass: (id: string, className: string) => void;
    updateLayoutProps: (id: string, props: Partial<LayoutProps>) => void;
    updateComponentProps: (id: string, props: Record<string, any>) => void;
    addNode: (type: BuilderBlockType) => void;
    duplicateNode: (id: string) => void;
    moveNode: (id: string, direction: "up" | "down") => void;
    removeNode: (id: string) => void;
    dropNode: (draggedId: string, targetId: string) => void;
}

export const useNode = (
    states: PageBuilderState,
    saveHistory: () => void
): Node => {
    const {
        tree, setTree,
        selectedId, setSelectedId,
    } = states;

    const findNode = (node: BuilderNode, id: string): BuilderNode | null => {
        if (node.id === id) return node;
        for (const child of node.children) {
            const found = findNode(child, id);
            if (found) return found;
        }
        return null;
    };

    const selected = findNode(tree, selectedId) || tree;

    const updateNodeInTree = (
        node: BuilderNode,
        id: string,
        updater: (target: BuilderNode) => void,
    ): BuilderNode => {
        const newNode = structuredClone(node);
        const target = findNode(newNode, id);
        if (target) {
            updater(target);
        }
        return newNode;
    };

    const updateNode = (id: string, fields: Partial<BuilderNode>) => {
        saveHistory();
        setTree((prev) =>
            updateNodeInTree(prev, id, (target) => {
                Object.assign(target, fields);
            }),
        );
    };

    const updateLayoutProps = (id: string, props: Partial<LayoutProps>) => {
        saveHistory();
        setTree((prev) =>
            updateNodeInTree(prev, id, (target) => {
                target.layoutProps = { ...target.layoutProps, ...props };
            }),
        );
    };

    const updateComponentProps = (id: string, props: Record<string, any>) => {
        saveHistory();
        setTree((prev) =>
            updateNodeInTree(prev, id, (target) => {
                target.props = { ...(target.props || {}), ...props };
            }),
        );
    };

    const toggleUtilityClass = (id: string, className: string) => {
        saveHistory();
        setTree((prev) =>
            updateNodeInTree(prev, id, (target) => {
                if (target.classes.includes(className)) {
                    target.classes = target.classes.filter(
                        (c) => c !== className,
                    );
                } else {
                    target.classes.push(className);
                }
            }),
        );
    };

    const addNode = (type: BuilderBlockType) => {
        saveHistory();
        const newId = `${type}-${Date.now()}`;
        const newNode: BuilderNode = {
            id: newId,
            type,
            name: `${type.charAt(0).toUpperCase() + type.slice(1)}`,
            text: type === "button" ? "Click Me" : type,
            classes: [],
            layoutProps: {
                display: "block",
                flexDirection: "row",
                justifyContent: "start",
                alignItems: "start",
                gap: "gap-2",
                gridCols: "grid-cols-1",
            },
            props: {},
            children: [],
        };

        setTree((prev) =>
            updateNodeInTree(prev, selectedId, (target) => {
                const isContainer =
                    target.type === "div" ||
                    target.type === "section" ||
                    target.type === "card";
                if (isContainer) {
                    target.children.push(newNode);
                } else {
                    prev.children.push(newNode);
                }
            }),
        );
        setSelectedId(newId);
    };

    const duplicateNode = (id: string) => {
        if (id === "root") return;
        saveHistory();

        const duplicateRecursive = (node: BuilderNode): BuilderNode => {
            const clone = structuredClone(node);
            clone.id = `${node.type}-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
            clone.children = clone.children.map(duplicateRecursive);
            return clone;
        };

        const parentFinder = (
            parent: BuilderNode,
        ): { parent: BuilderNode; index: number } | null => {
            const idx = parent.children.findIndex((c) => c.id === id);
            if (idx !== -1) return { parent, index: idx };
            for (const child of parent.children) {
                const res = parentFinder(child);
                if (res) return res;
            }
            return null;
        };

        setTree((prev) => {
            const nextTree = structuredClone(prev);
            const found = parentFinder(nextTree);
            if (found) {
                const targetNode = found.parent.children[found.index];
                const duplicated = duplicateRecursive(targetNode);
                found.parent.children.splice(found.index + 1, 0, duplicated);
            }
            return nextTree;
        });
    };

    const removeNode = (id: string) => {
        if (id === "root") return;
        saveHistory();
        const filterChildren = (node: BuilderNode): BuilderNode => {
            const clone = structuredClone(node);
            clone.children = clone.children
                .filter((child) => child.id !== id)
                .map(filterChildren);
            return clone;
        };
        setTree((prev) => filterChildren(prev));
        setSelectedId("root");
    };

    const moveNode = (id: string, direction: "up" | "down") => {
        if (id === "root") return;
        saveHistory();
        setTree((prev) => {
            const nextTree = structuredClone(prev);
            const findAndSwap = (parent: BuilderNode): boolean => {
                const idx = parent.children.findIndex((c) => c.id === id);
                if (idx !== -1) {
                    const targetIdx = direction === "up" ? idx - 1 : idx + 1;
                    if (targetIdx >= 0 && targetIdx < parent.children.length) {
                        const temp = parent.children[idx];
                        parent.children[idx] = parent.children[targetIdx];
                        parent.children[targetIdx] = temp;
                        return true;
                    }
                }
                for (const child of parent.children) {
                    if (findAndSwap(child)) return true;
                }
                return false;
            };
            findAndSwap(nextTree);
            return nextTree;
        });
    };

    const dropNode = (draggedId: string, targetId: string) => {
        if (draggedId === targetId || draggedId === "root") return;
        saveHistory();

        setTree((prev) => {
            const nextTree = structuredClone(prev);
            let draggedNode: BuilderNode | null = null;

            const removeDragged = (parent: BuilderNode) => {
                const idx = parent.children.findIndex(
                    (c) => c.id === draggedId,
                );
                if (idx !== -1) {
                    draggedNode = parent.children.splice(idx, 1)[0];
                    return;
                }
                parent.children.forEach(removeDragged);
            };

            removeDragged(nextTree);

            if (draggedNode) {
                const targetNode = findNode(nextTree, targetId);
                if (targetNode) {
                    const isContainer =
                        targetNode.type === "div" ||
                        targetNode.type === "section" ||
                        targetNode.type === "card";
                    if (isContainer) {
                        targetNode.children.push(draggedNode);
                    } else {
                        nextTree.children.push(draggedNode);
                    }
                }
            }
            return nextTree;
        });
    };

    return {
        selected,
        updateNode,
        toggleUtilityClass,
        updateLayoutProps,
        updateComponentProps,
        addNode,
        duplicateNode,
        moveNode,
        removeNode,
        dropNode,
    };
};
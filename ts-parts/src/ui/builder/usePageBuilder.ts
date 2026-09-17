import { useState } from "react";

export type BuilderBlockType =
    | "heading"
    | "paragraph"
    | "button"
    | "card"
    | "input"
    | "select"
    | "textarea"
    | "checkbox"
    | "badge"
    | "alert"
    | "image"
    | "divider"
    | "section"
    | "list"
    | "nav";

export type BuilderStyle = {
    color: string;
    backgroundColor: string;
    padding: string;
    margin: string;
    fontSize: string;
    width: string;
    height: string;
    borderRadius: string;
};

export type BuilderNode = {
    id: number;
    type: BuilderBlockType | "div";
    text: string;
    style: BuilderStyle;
    children: BuilderNode[];
};

export const defaultStyle = (): BuilderStyle => ({
    color: "#1e293b",
    backgroundColor: "#ffffff",
    padding: "12px",
    margin: "0px",
    fontSize: "16px",
    width: "auto",
    height: "auto",
    borderRadius: "12px",
});

export const makeNode = (
    type: BuilderNode["type"],
    text: string,
): BuilderNode => ({
    id: Date.now() + Math.random(),
    type,
    text,
    style: defaultStyle(),
    children: [],
});

export const usePageBuilder = () => {
    const [tree, setTree] = useState<BuilderNode>(() => ({
        id: 1,
        type: "div",
        text: "Page root",
        style: defaultStyle(),
        children: [{ ...makeNode("heading", "Page title"), id: 2 }],
    }));
    const [selectedId, setSelectedId] = useState<number>(1);
    const [draggedId, setDraggedId] = useState<number | null>(null);

    const find = (node: BuilderNode, id: number): BuilderNode | undefined =>
        node.id === id
            ? node
            : node.children.reduce<BuilderNode | undefined>(
                (found, child) => found || find(child, id),
                undefined,
            );

    const selected = find(tree, selectedId) || tree;

    const update = (id: number, patch: Partial<BuilderNode>) => {
        const walk = (node: BuilderNode): BuilderNode =>
            node.id === id
                ? { ...node, ...patch }
                : { ...node, children: node.children.map(walk) };
        setTree(walk(tree));
    };

    const updateStyle = (id: number, key: keyof BuilderStyle, value: string) => {
        const targetNode = find(tree, id);
        if (!targetNode) return;
        update(id, {
            style: {
                ...targetNode.style,
                [key]: value,
            },
        });
    };

    const add = (type: BuilderNode["type"]) => {
        const parent = selected.type === "div" ? selected.id : 1;
        const defaults: Record<BuilderNode["type"], string> = {
            div: "New container",
            heading: "New heading",
            paragraph: "New paragraph",
            button: "Action",
            card: "Card content",
            input: "Enter text",
            select: "Choose an option",
            textarea: "Enter details",
            checkbox: "I agree",
            badge: "New",
            alert: "Important notice",
            image: "Image placeholder",
            divider: "",
            section: "Section content",
            list: "Item 1, Item 2",
            nav: "Home, About, Settings",
        };
        const node = makeNode(type, defaults[type]);
        const walk = (item: BuilderNode): BuilderNode =>
            item.id === parent
                ? { ...item, children: [...item.children, node] }
                : { ...item, children: item.children.map(walk) };
        setTree(walk(tree));
        setSelectedId(node.id);
    };

    const remove = (id: number) => {
        if (id === 1) return;
        const walk = (node: BuilderNode): BuilderNode => ({
            ...node,
            children: node.children
                .filter((child) => child.id !== id)
                .map(walk),
        });
        setTree(walk(tree));
        setSelectedId(1);
    };

    const drop = (target: number) => {
        if (draggedId === null || draggedId === target) return;
        const walk = (node: BuilderNode): BuilderNode => {
            const from = node.children.findIndex(
                (child) => child.id === draggedId,
            );
            const to = node.children.findIndex((child) => child.id === target);
            if (from >= 0 && to >= 0) {
                const children = [...node.children];
                const [item] = children.splice(from, 1);
                children.splice(to, 0, item);
                return { ...node, children };
            }
            return { ...node, children: node.children.map(walk) };
        };
        setTree(walk(tree));
        setDraggedId(null);
    };

    return {
        tree,
        selectedId,
        setSelectedId,
        draggedId,
        setDraggedId,
        selected,
        update,
        updateStyle,
        add,
        remove,
        drop,
    };
};
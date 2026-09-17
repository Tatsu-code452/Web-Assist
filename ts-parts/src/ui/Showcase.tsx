import { useEffect, useState } from "react";
import { ui } from "../lib/tokens";
import { cn } from "../lib/utils";
import { Header } from "./Header";
import { LayoutBuilder, PageBuilder } from "./builder";
import { PaletteStudio } from "./palette";
import { AtomicSection, CompositeShowcase, PatternsSection } from "./sections";
import { Tab, VisualMode } from "./types";

export const Showcase = () => {
    const [tab, setTab] = useState<Tab>("atoms");
    const [visualMode, setVisualMode] = useState<VisualMode>("classic");

    useEffect(() => {
        const root = document.documentElement;
        if (visualMode === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
    }, [visualMode]);

    return (
        <div
            className={cn(
                ui.layout.page,
                visualMode === "studio" && "theme-studio",
            )}
        >
            <Header
                tab={tab}
                setTab={setTab}
                visualMode={visualMode}
                setVisualMode={setVisualMode}
            />
            <main className={cn(ui.layout.container, ui.layout.stack)}>
                {tab === "atoms" && <AtomicSection />}
                {tab === "patterns" && <PatternsSection />}
                {tab === "composites" && <CompositeShowcase />}
                {tab === "layout" && <LayoutBuilder />}
                {tab === "page-builder" && <PageBuilder />}
                {tab === "palette" && <PaletteStudio />}
            </main>
        </div>
    );
};

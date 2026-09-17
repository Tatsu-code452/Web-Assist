import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import { Showcase } from "./ui/Showcase";

const root = document.getElementById("root");

if (!root) {
    throw new Error("Unable to mount ts-parts: #root was not found.");
}

createRoot(root).render(
    <StrictMode>
        <Showcase />
    </StrictMode>,
);

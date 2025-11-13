import React, { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import { getTheme } from "../theme/theme";

export function MermaidDiagram({ chart, isDarkMode }) {
    const mermaidRef = useRef(null);
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState(null);
    const theme = getTheme(isDarkMode);

    useEffect(() => {
        if (chart && mermaidRef.current) {
            const renderDiagram = async () => {
                try {
                    setError(null);
                    const id = `mermaid-${Date.now()}`;
                    const { svg } = await mermaid.render(id, chart);
                    if (mermaidRef.current) {
                        mermaidRef.current.innerHTML = svg;
                    }
                } catch (err) {
                    console.error("Mermaid rendering error:", err);
                    setError("Failed to render diagram. Please check the Mermaid syntax.");
                }
            };
            renderDiagram();
        }
    }, [chart]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(chart).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    if (!chart) return null;

    return (
        <div>
            <div style={{ position: "relative" }}>
                <button
                    onClick={copyToClipboard}
                    style={{
                        ...theme.copyButton,
                        background: copied ? "#10b981" : "#4f46e5",
                    }}
                >
                    {copied ? "Copied" : "Copy Mermaid code"}
                </button>
                <pre style={theme.codeBlock}>{chart}</pre>
            </div>

            <div style={{ marginTop: 16 }}>
                <h4 style={theme.diagramTitle}>Rendered diagram</h4>
                {error ? (
                    <div style={{ ...theme.error, marginBottom: 0 }}>{error}</div>
                ) : (
                    <div
                        ref={mermaidRef}
                        style={theme.diagramContainer}
                    />
                )}
            </div>
        </div>
    );
}

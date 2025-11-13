import React, { useState, useCallback, useEffect, useRef } from "react";
import mermaid from "mermaid";

const UPLOAD_WEBHOOK = process.env.REACT_APP_UPLOAD_WEBHOOK;

export default function App() {
    const [roleName, setRoleName] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [uploadError, setUploadError] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [result, setResult] = useState(null);
    const [view, setView] = useState("form"); // "form" | "result"
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Sync with system theme preference
    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

        // Set initial theme
        setIsDarkMode(mediaQuery.matches);

        // Initialize Mermaid with the correct theme
        mermaid.initialize({
            startOnLoad: true,
            theme: mediaQuery.matches ? "dark" : "default",
            securityLevel: "loose",
        });

        // Listen for system theme changes
        const handleChange = (e) => {
            setIsDarkMode(e.matches);
            // Re-initialize Mermaid when theme changes
            mermaid.initialize({
                startOnLoad: true,
                theme: e.matches ? "dark" : "default",
                securityLevel: "loose",
            });
        };

        mediaQuery.addEventListener("change", handleChange);

        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    const submitUpload = useCallback(async () => {
        setUploadError("");

        if (!roleName.trim()) {
            return setUploadError("Please enter the Upwork role name / job title.");
        }
        if (!jobDescription.trim()) {
            return setUploadError("Please paste the Upwork job description.");
        }

        try {
            setSubmitting(true);
            const form = new FormData();

            form.append("role_name", roleName.trim());
            form.append("job_description", jobDescription.trim());

            const res = await fetch(UPLOAD_WEBHOOK, {
                method: "POST",
                body: form,
            });

            if (!res.ok) {
                const text = await res.text();
                throw new Error(`Upload failed: ${res.status} ${text}`);
            }

            const json = await res.json();
            setResult(json);
            setView("result");
        } catch (err) {
            setUploadError(err.message || "Unexpected error occurred.");
        } finally {
            setSubmitting(false);
        }
    }, [roleName, jobDescription]);

    const theme = getTheme(isDarkMode);

    return (
        <div style={theme.page}>
            <header style={theme.header}>
                <h1 style={{ margin: 0, fontSize: 22, color: theme.textPrimary }}>
                    Upwork Proposal Analyzer
                </h1>
                <div style={{ color: theme.textSecondary, fontSize: 14 }}>
                    Generate and visualize AI-tailored technical CV responses.
                </div>
            </header>

            <main style={theme.main}>
                {view === "form" && (
                    <section style={theme.card}>
                        <h2 style={theme.h2}>Job Details</h2>

                        <label style={theme.label}>Upwork role name / job title *</label>
                        <input
                            value={roleName}
                            onChange={(e) => setRoleName(e.target.value)}
                            placeholder="e.g., SQL + Python Reporting Analyst Interview Expert"
                            style={theme.input}
                        />

                        <label style={theme.label}>Upwork job description *</label>
                        <textarea
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                            placeholder="Paste the Upwork job description here..."
                            style={theme.textarea}
                        />

                        {uploadError && <div style={theme.error}>{uploadError}</div>}

                        <button
                            onClick={submitUpload}
                            disabled={submitting}
                            style={{
                                ...theme.button,
                                opacity: submitting ? 0.7 : 1,
                                cursor: submitting ? "not-allowed" : "pointer",
                            }}
                        >
                            {submitting ? "Processing…" : "Generate CV Response"}
                        </button>

                        {result && (
                            <div style={{ marginTop: 20 }}>
                                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                                    <button
                                        style={{
                                            ...theme.secondaryButton,
                                            padding: "6px 10px",
                                            fontSize: 12,
                                        }}
                                        onClick={() => setView("result")}
                                    >
                                        View Structured Analysis
                                    </button>
                                    <span style={{ fontSize: 12, color: theme.textSecondary }}>
                    Or inspect raw JSON below:
                  </span>
                                </div>
                                <pre style={{ ...theme.pre, marginTop: 8 }}>
                  {JSON.stringify(result, null, 2)}
                </pre>
                            </div>
                        )}
                    </section>
                )}

                {view === "result" && (
                    <ResultPage
                        result={result}
                        onBack={() => setView("form")}
                        roleName={roleName}
                        isDarkMode={isDarkMode}
                    />
                )}
            </main>
        </div>
    );
}

function MermaidDiagram({ chart, isDarkMode }) {
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
            {/* Code block with copy button */}
            <div style={{ position: "relative" }}>
                <button
                    onClick={copyToClipboard}
                    style={{
                        ...theme.copyButton,
                        background: copied ? "#10b981" : "#4f46e5",
                    }}
                >
                    {copied ? "✓ Copied!" : "Copy Code"}
                </button>
                <pre style={theme.codeBlock}>{chart}</pre>
            </div>

            {/* Rendered diagram */}
            <div style={{ marginTop: 16 }}>
                <h4 style={{ fontSize: 13, color: theme.textSecondary, marginBottom: 8 }}>
                    Rendered Diagram:
                </h4>
                {error ? (
                    <div style={{ ...theme.error, marginBottom: 0 }}>{error}</div>
                ) : (
                    <div
                        ref={mermaidRef}
                        style={{
                            background: theme.diagramBackground,
                            border: `1px solid ${theme.borderColor}`,
                            borderRadius: 10,
                            padding: 20,
                            display: "flex",
                            justifyContent: "center",
                            overflowX: "auto",
                        }}
                    />
                )}
            </div>
        </div>
    );
}

function ResultPage({ result, onBack, roleName, isDarkMode }) {
    const theme = getTheme(isDarkMode);

    if (!result) {
        return (
            <section style={theme.card}>
                <button onClick={onBack} style={theme.secondaryButton}>
                    ← Back to Job Input
                </button>
                <p style={{ marginTop: 16, color: theme.textPrimary }}>
                    No analysis results found. Please go back and submit a job description
                    first.
                </p>
            </section>
        );
    }

    // Support both array and single-object formats
    const item = Array.isArray(result) ? result[0] : result;

    const {
        painPointExtraction,
        technicalSolution,
        workflowMermaid,
        relevantExperience,
        solutionSummary,
        timeline,
        callToAction,
    } = item || {};

    const renderTextWithLineBreaks = (text) => {
        if (!text) return null;
        return text.split("\n").map((line, idx) => (
            <p key={idx} style={{ margin: "4px 0", lineHeight: 1.5 }}>
                {line}
            </p>
        ));
    };

    return (
        <section style={{ ...theme.card, maxWidth: 900 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                    <h2 style={theme.h2}>AI CV Response Overview</h2>
                    {roleName && (
                        <div style={{ fontSize: 13, color: theme.textSecondary }}>
                            Target Role: <strong style={{ color: theme.textPrimary }}>{roleName}</strong>
                        </div>
                    )}
                </div>
                <button onClick={onBack} style={theme.secondaryButton}>
                    ← Back to Job Input
                </button>
            </div>

            {/* Pain Points */}
            <section style={theme.sectionBlock}>
                <h3 style={theme.sectionTitle}>Pain Point Extraction</h3>
                <div style={theme.sectionBody}>
                    {renderTextWithLineBreaks(painPointExtraction)}
                </div>
            </section>

            {/* Technical Solution */}
            <section style={theme.sectionBlock}>
                <h3 style={theme.sectionTitle}>Technical Solution</h3>
                <div style={theme.sectionBody}>
                    {renderTextWithLineBreaks(technicalSolution)}
                </div>
            </section>

            {/* Workflow Mermaid */}
            <section style={theme.sectionBlock}>
                <h3 style={theme.sectionTitle}>Workflow Diagram (Mermaid)</h3>
                <p style={{ fontSize: 12, color: theme.textSecondary, marginTop: 0 }}>
                    Copy the code below or view the rendered diagram.
                </p>
                <MermaidDiagram chart={workflowMermaid} isDarkMode={isDarkMode} />
            </section>

            {/* Relevant Experience */}
            <section style={theme.sectionBlock}>
                <h3 style={theme.sectionTitle}>Relevant Experience Mapping</h3>
                <ul style={theme.list}>
                    {Array.isArray(relevantExperience) &&
                        relevantExperience.map((exp, idx) => (
                            <li key={idx} style={theme.listItem}>
                                {exp}
                            </li>
                        ))}
                </ul>
            </section>

            {/* Solution Summary */}
            <section style={theme.sectionBlock}>
                <h3 style={theme.sectionTitle}>Solution Summary</h3>
                <div style={theme.sectionBody}>
                    {renderTextWithLineBreaks(solutionSummary)}
                </div>
            </section>

            {/* Timeline & CTA */}
            <section style={theme.sectionBlock}>
                <h3 style={theme.sectionTitle}>Timeline & Next Steps</h3>
                <div style={theme.sectionBody}>{renderTextWithLineBreaks(timeline)}</div>
                {callToAction && (
                    <div style={{ marginTop: 8, fontWeight: 600, color: theme.textPrimary }}>
                        {renderTextWithLineBreaks(callToAction)}
                    </div>
                )}
            </section>
        </section>
    );
}

function getTheme(isDark) {
    return {
        // Color tokens
        textPrimary: isDark ? "#f9fafb" : "#111827",
        textSecondary: isDark ? "#9ca3af" : "#6b7280",
        background: isDark ? "#0f172a" : "#f9fafb",
        cardBackground: isDark ? "#1e293b" : "white",
        borderColor: isDark ? "#334155" : "#e5e7eb",
        diagramBackground: isDark ? "#1e293b" : "white",

        // Layout styles
        page: {
            fontFamily:
                "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            background: isDark ? "#0f172a" : "#f9fafb",
            minHeight: "100vh",
            color: isDark ? "#f9fafb" : "#111827",
        },
        header: {
            padding: "20px 24px",
            borderBottom: isDark ? "1px solid #334155" : "1px solid #e5e7eb",
            background: isDark ? "#1e293b" : "white",
            display: "flex",
            flexDirection: "column",
            gap: 4,
        },
        main: {
            display: "flex",
            justifyContent: "center",
            padding: 16,
        },
        card: {
            background: isDark ? "#1e293b" : "white",
            border: isDark ? "1px solid #334155" : "1px solid #e5e7eb",
            borderRadius: 12,
            padding: 20,
            maxWidth: 600,
            width: "100%",
            boxShadow: isDark
                ? "0 1px 2px rgba(0,0,0,0.3)"
                : "0 1px 2px rgba(0,0,0,0.04)",
        },
        h2: {
            marginBottom: 12,
            fontSize: 20,
            color: isDark ? "#f9fafb" : "#111827",
        },
        label: {
            display: "block",
            fontSize: 13,
            marginTop: 8,
            marginBottom: 4,
            color: isDark ? "#e5e7eb" : "#111827",
        },
        input: {
            width: "100%",
            border: isDark ? "1px solid #334155" : "1px solid #e5e7eb",
            borderRadius: 10,
            padding: "10px 12px",
            marginBottom: 10,
            fontSize: 14,
            background: isDark ? "#0f172a" : "white",
            color: isDark ? "#f9fafb" : "#111827",
        },
        textarea: {
            width: "100%",
            border: isDark ? "1px solid #334155" : "1px solid #e5e7eb",
            borderRadius: 10,
            padding: "10px 12px",
            minHeight: 140,
            resize: "vertical",
            fontFamily: "inherit",
            fontSize: 14,
            marginBottom: 10,
            background: isDark ? "#0f172a" : "white",
            color: isDark ? "#f9fafb" : "#111827",
        },
        button: {
            background: "#4f46e5",
            color: "white",
            border: "none",
            borderRadius: 10,
            padding: "10px 14px",
            fontWeight: 600,
            fontSize: 14,
        },
        secondaryButton: {
            background: isDark ? "#334155" : "white",
            color: isDark ? "#a5b4fc" : "#4f46e5",
            border: isDark ? "1px solid #475569" : "1px solid #c7d2fe",
            borderRadius: 999,
            padding: "8px 12px",
            fontWeight: 500,
            fontSize: 13,
        },
        error: {
            background: isDark ? "#7f1d1d" : "#fef2f2",
            color: isDark ? "#fca5a5" : "#991b1b",
            border: isDark ? "1px solid #991b1b" : "1px solid #fecaca",
            borderRadius: 10,
            padding: 10,
            marginBottom: 10,
            fontSize: 13,
        },
        pre: {
            background: isDark ? "#0f172a" : "#f3f4f6",
            border: isDark ? "1px solid #334155" : "1px solid #e5e7eb",
            borderRadius: 10,
            padding: 12,
            fontSize: 12,
            maxHeight: 400,
            overflow: "auto",
            whiteSpace: "pre-wrap",
            color: isDark ? "#e5e7eb" : "#111827",
        },
        sectionBlock: {
            marginTop: 20,
            paddingTop: 12,
            borderTop: isDark ? "1px solid #334155" : "1px solid #e5e7eb",
        },
        sectionTitle: {
            margin: 0,
            marginBottom: 8,
            fontSize: 16,
            color: isDark ? "#f9fafb" : "#111827",
        },
        sectionBody: {
            fontSize: 14,
            color: isDark ? "#e5e7eb" : "#111827",
        },
        codeBlock: {
            marginTop: 8,
            background: isDark ? "#020617" : "#0f172a",
            color: "#e5e7eb",
            borderRadius: 10,
            padding: 12,
            fontSize: 12,
            overflowX: "auto",
            whiteSpace: "pre",
        },
        list: {
            margin: 0,
            paddingLeft: 18,
            fontSize: 14,
            color: isDark ? "#e5e7eb" : "#111827",
        },
        listItem: {
            marginBottom: 6,
            lineHeight: 1.5,
            color: isDark ? "#e5e7eb" : "#111827",
        },
        copyButton: {
            position: "absolute",
            top: 8,
            right: 8,
            background: "#4f46e5",
            color: "white",
            border: "none",
            borderRadius: 6,
            padding: "6px 12px",
            fontSize: 12,
            fontWeight: 500,
            cursor: "pointer",
            zIndex: 10,
        },
    };
}
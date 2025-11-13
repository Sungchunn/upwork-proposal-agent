import React, { useState, useCallback } from "react";

const UPLOAD_WEBHOOK = process.env.REACT_APP_UPLOAD_WEBHOOK;

export default function App() {
    const [roleName, setRoleName] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [uploadError, setUploadError] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [result, setResult] = useState(null);
    const [view, setView] = useState("form"); // "form" | "result"

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

    return (
        <div style={styles.page}>
            <header style={styles.header}>
                <h1 style={{ margin: 0, fontSize: 22 }}>Upwork Proposal Analyzer</h1>
                <div style={{ color: "#6b7280", fontSize: 14 }}>
                    Generate and visualize AI-tailored technical CV responses.
                </div>
            </header>

            <main style={styles.main}>
                {view === "form" && (
                    <section style={styles.card}>
                        <h2 style={styles.h2}>Job Details</h2>

                        <label style={styles.label}>Upwork role name / job title *</label>
                        <input
                            value={roleName}
                            onChange={(e) => setRoleName(e.target.value)}
                            placeholder="e.g., SQL + Python Reporting Analyst Interview Expert"
                            style={styles.input}
                        />

                        <label style={styles.label}>Upwork job description *</label>
                        <textarea
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                            placeholder="Paste the Upwork job description here..."
                            style={styles.textarea}
                        />

                        {uploadError && <div style={styles.error}>{uploadError}</div>}

                        <button
                            onClick={submitUpload}
                            disabled={submitting}
                            style={{
                                ...styles.button,
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
                                            ...styles.secondaryButton,
                                            padding: "6px 10px",
                                            fontSize: 12,
                                        }}
                                        onClick={() => setView("result")}
                                    >
                                        View Structured Analysis
                                    </button>
                                    <span style={{ fontSize: 12, color: "#6b7280" }}>
                    Or inspect raw JSON below:
                  </span>
                                </div>
                                <pre style={{ ...styles.pre, marginTop: 8 }}>
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
                    />
                )}
            </main>
        </div>
    );
}

function ResultPage({ result, onBack, roleName }) {
    if (!result) {
        return (
            <section style={styles.card}>
                <button onClick={onBack} style={styles.secondaryButton}>
                    ← Back to Job Input
                </button>
                <p style={{ marginTop: 16 }}>
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
        <section style={{ ...styles.card, maxWidth: 900 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                    <h2 style={styles.h2}>AI CV Response Overview</h2>
                    {roleName && (
                        <div style={{ fontSize: 13, color: "#6b7280" }}>
                            Target Role: <strong>{roleName}</strong>
                        </div>
                    )}
                </div>
                <button onClick={onBack} style={styles.secondaryButton}>
                    ← Back to Job Input
                </button>
            </div>

            {/* Pain Points */}
            <section style={styles.sectionBlock}>
                <h3 style={styles.sectionTitle}>Pain Point Extraction</h3>
                <div style={styles.sectionBody}>
                    {renderTextWithLineBreaks(painPointExtraction)}
                </div>
            </section>

            {/* Technical Solution */}
            <section style={styles.sectionBlock}>
                <h3 style={styles.sectionTitle}>Technical Solution</h3>
                <div style={styles.sectionBody}>
                    {renderTextWithLineBreaks(technicalSolution)}
                </div>
            </section>

            {/* Workflow Mermaid */}
            <section style={styles.sectionBlock}>
                <h3 style={styles.sectionTitle}>Workflow Diagram (Mermaid)</h3>
                <p style={{ fontSize: 12, color: "#6b7280", marginTop: 0 }}>
                    Copy this code into a Mermaid-compatible viewer (or a future diagram
                    component) to render the hiring workflow.
                </p>
                <pre style={styles.codeBlock}>{workflowMermaid}</pre>
            </section>

            {/* Relevant Experience */}
            <section style={styles.sectionBlock}>
                <h3 style={styles.sectionTitle}>Relevant Experience Mapping</h3>
                <ul style={styles.list}>
                    {Array.isArray(relevantExperience) &&
                        relevantExperience.map((exp, idx) => (
                            <li key={idx} style={styles.listItem}>
                                {exp}
                            </li>
                        ))}
                </ul>
            </section>

            {/* Solution Summary */}
            <section style={styles.sectionBlock}>
                <h3 style={styles.sectionTitle}>Solution Summary</h3>
                <div style={styles.sectionBody}>
                    {renderTextWithLineBreaks(solutionSummary)}
                </div>
            </section>

            {/* Timeline & CTA */}
            <section style={styles.sectionBlock}>
                <h3 style={styles.sectionTitle}>Timeline & Next Steps</h3>
                <div style={styles.sectionBody}>{renderTextWithLineBreaks(timeline)}</div>
                {callToAction && (
                    <div style={{ marginTop: 8, fontWeight: 600 }}>
                        {renderTextWithLineBreaks(callToAction)}
                    </div>
                )}
            </section>
        </section>
    );
}

const styles = {
    page: {
        fontFamily:
            "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        background: "#f9fafb",
        minHeight: "100vh",
        color: "#111827",
    },
    header: {
        padding: "20px 24px",
        borderBottom: "1px solid #e5e7eb",
        background: "white",
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
        background: "white",
        border: "1px solid #e5e7eb",
        borderRadius: 12,
        padding: 20,
        maxWidth: 600,
        width: "100%",
        boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
    },
    h2: { marginBottom: 12, fontSize: 20 },
    label: { display: "block", fontSize: 13, marginTop: 8, marginBottom: 4 },
    input: {
        width: "100%",
        border: "1px solid #e5e7eb",
        borderRadius: 10,
        padding: "10px 12px",
        marginBottom: 10,
        fontSize: 14,
    },
    textarea: {
        width: "100%",
        border: "1px solid #e5e7eb",
        borderRadius: 10,
        padding: "10px 12px",
        minHeight: 140,
        resize: "vertical",
        fontFamily: "inherit",
        fontSize: 14,
        marginBottom: 10,
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
        background: "white",
        color: "#4f46e5",
        border: "1px solid #c7d2fe",
        borderRadius: 999,
        padding: "8px 12px",
        fontWeight: 500,
        fontSize: 13,
    },
    error: {
        background: "#fef2f2",
        color: "#991b1b",
        border: "1px solid #fecaca",
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        fontSize: 13,
    },
    pre: {
        background: "#f3f4f6",
        border: "1px solid #e5e7eb",
        borderRadius: 10,
        padding: 12,
        fontSize: 12,
        maxHeight: 400,
        overflow: "auto",
        whiteSpace: "pre-wrap",
    },
    sectionBlock: {
        marginTop: 20,
        paddingTop: 12,
        borderTop: "1px solid #e5e7eb",
    },
    sectionTitle: {
        margin: 0,
        marginBottom: 8,
        fontSize: 16,
    },
    sectionBody: {
        fontSize: 14,
        color: "#111827",
    },
    codeBlock: {
        marginTop: 8,
        background: "#0f172a",
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
    },
    listItem: {
        marginBottom: 6,
        lineHeight: 1.5,
    },
};
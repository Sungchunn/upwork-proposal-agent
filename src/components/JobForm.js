import React from "react";
import { getTheme } from "../theme/theme";

export function JobForm({
    roleName,
    setRoleName,
    jobDescription,
    setJobDescription,
    submitUpload,
    submitting,
    uploadError,
    result,
    setView,
    isDarkMode,
}) {
    const theme = getTheme(isDarkMode);

    return (
        <section style={theme.card}>
            <div style={theme.cardHeaderRow}>
                <div>
                    <h2 style={theme.h2}>Job Details</h2>
                    <p style={theme.cardSubtitle}>
                        Start with a precise role name and the full job description. The more
                        context, the better the proposal.
                    </p>
                </div>
            </div>

            <div style={theme.formGrid}>
                <div style={theme.formColumn}>
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
                            ...theme.buttonPrimary,
                            opacity: submitting ? 0.7 : 1,
                            cursor: submitting ? "not-allowed" : "pointer",
                        }}
                    >
                        {submitting ? "Analyzing job and drafting CV…" : "Generate CV Response"}
                    </button>
                </div>

                <aside style={theme.sidePanel}>
                    <p style={theme.sideTitle}>Tips for best results</p>
                    <ul style={theme.sideList}>
                        <li style={theme.sideItem}>
                            Include tech stack, deliverables, and any metrics in the job post.
                        </li>
                        <li style={theme.sideItem}>
                            Mention timeline, budget, or collaboration style if the client
                            specifies it.
                        </li>
                        <li style={theme.sideItem}>
                            The agent will extract pain points, design a workflow, and map it to
                            your experience.
                        </li>
                    </ul>
                    <div style={theme.sideHintBox}>
                        <div style={theme.sideHintLabel}>What you get</div>
                        <div style={theme.sideHintBody}>
                            Structured proposal sections, a Mermaid workflow diagram, and
                            talking points you can paste directly into Upwork.
                        </div>
                    </div>
                </aside>
            </div>

            {result && (
                <div style={theme.resultPreview}>
                    <div style={theme.previewHeader}>
                        <span style={theme.previewLabel}>Latest analysis ready</span>
                        <button
                            style={theme.buttonGhost}
                            onClick={() => setView("result")}
                        >
                            View structured analysis
                        </button>
                    </div>

                    <details style={theme.details}>
                        <summary style={theme.detailsSummary}>Show raw JSON</summary>
                        <pre style={theme.pre}>{JSON.stringify(result, null, 2)}</pre>
                    </details>
                </div>
            )}
        </section>
    );
}

import React from "react";
import { getTheme } from "../theme/theme";
import { MermaidDiagram } from "./MermaidDiagram";

export function ResultPage({ result, onBack, roleName, isDarkMode }) {
    const theme = getTheme(isDarkMode);

    if (!result) {
        return (
            <section style={theme.card}>
                <button onClick={onBack} style={theme.buttonGhost}>
                    ← Back to job input
                </button>
                <p style={{ marginTop: 16, color: theme.textPrimary }}>
                    No analysis results found. Please go back and submit a job description first.
                </p>
            </section>
        );
    }

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
            <p key={idx} style={{ margin: "4px 0", lineHeight: 1.6 }}>
                {line}
            </p>
        ));
    };

    return (
        <section style={{ ...theme.card, maxWidth: 960 }}>
            <div style={theme.resultHeaderRow}>
                <div>
                    <h2 style={theme.h2}>AI CV Response Overview</h2>
                    {roleName && (
                        <div style={theme.targetRole}>
                            <span style={theme.targetLabel}>Target role</span>
                            <span style={theme.targetValue}>{roleName}</span>
                        </div>
                    )}
                </div>
                <button onClick={onBack} style={theme.buttonGhost}>
                    ← Back to job input
                </button>
            </div>

            <div style={theme.resultGrid}>
                <section style={theme.sectionBlock}>
                    <h3 style={theme.sectionTitle}>Pain point extraction</h3>
                    <div style={theme.sectionBody}>
                        {renderTextWithLineBreaks(painPointExtraction)}
                    </div>
                </section>

                <section style={theme.sectionBlock}>
                    <h3 style={theme.sectionTitle}>Technical solution</h3>
                    <div style={theme.sectionBody}>
                        {renderTextWithLineBreaks(technicalSolution)}
                    </div>
                </section>
            </div>

            <section style={theme.sectionBlock}>
                <h3 style={theme.sectionTitle}>Workflow diagram (Mermaid)</h3>
                <p style={theme.sectionNote}>
                    Use this as a visual talking point in your proposal or during a call with the
                    client.
                </p>
                <MermaidDiagram chart={workflowMermaid} isDarkMode={isDarkMode} />
            </section>

            <section style={theme.sectionBlock}>
                <h3 style={theme.sectionTitle}>Relevant experience mapping</h3>
                <ul style={theme.list}>
                    {Array.isArray(relevantExperience) &&
                        relevantExperience.map((exp, idx) => (
                            <li key={idx} style={theme.listItem}>
                                {exp}
                            </li>
                        ))}
                </ul>
            </section>

            <section style={theme.sectionBlock}>
                <h3 style={theme.sectionTitle}>Solution summary</h3>
                <div style={theme.sectionBody}>{renderTextWithLineBreaks(solutionSummary)}</div>
            </section>

            <section style={theme.sectionBlock}>
                <h3 style={theme.sectionTitle}>Timeline & next steps</h3>
                <div style={theme.sectionBody}>{renderTextWithLineBreaks(timeline)}</div>
                {callToAction && (
                    <div style={theme.calloutBox}>
                        {renderTextWithLineBreaks(callToAction)}
                    </div>
                )}
            </section>
        </section>
    );
}

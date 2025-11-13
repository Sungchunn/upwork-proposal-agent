import React, { useState, useCallback, useEffect } from "react";
import mermaid from "mermaid";
import { getTheme } from "./theme/theme";
import { JobForm } from "./components/JobForm";
import { ResultPage } from "./components/ResultPage";

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

        setIsDarkMode(mediaQuery.matches);

        mermaid.initialize({
            startOnLoad: true,
            theme: mediaQuery.matches ? "dark" : "default",
            securityLevel: "loose",
        });

        const handleChange = (e) => {
            setIsDarkMode(e.matches);
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

            if (res.ok) {
                const json = await res.json();
                setResult(json);
                setView("result");
            } else {
                const text = await res.text();
                throw new Error(`Upload failed: ${res.status} ${text}`);
            }
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
                <div style={theme.headerInner}>
                    <div>
                        <div style={theme.logoRow}>
                            <div style={theme.logoDot} />
                            <span style={theme.logoText}>Proposal Studio</span>
                            <span style={theme.badge}>Beta</span>
                        </div>
                        <h1 style={theme.title}>Upwork Proposal Analyzer</h1>
                        <p style={theme.subtitle}>
                            Paste an Upwork job and generate a structured, AI-tailored CV response with
                            a visual workflow diagram.
                        </p>
                    </div>

                    <div style={theme.modeHint}>
                        <span
                            style={{
                                ...theme.modeDot,
                                background: isDarkMode ? "#22c55e" : "#0ea5e9",
                            }}
                        />
                        <span style={theme.modeText}>
                            Theme synced to system ({isDarkMode ? "Dark" : "Light"} mode)
                        </span>
                    </div>
                </div>
            </header>

            <main style={theme.main}>
                <div style={theme.layout}>
                    {view === "form" && (
                        <JobForm
                            roleName={roleName}
                            setRoleName={setRoleName}
                            jobDescription={jobDescription}
                            setJobDescription={setJobDescription}
                            submitUpload={submitUpload}
                            submitting={submitting}
                            uploadError={uploadError}
                            result={result}
                            setView={setView}
                            isDarkMode={isDarkMode}
                        />
                    )}

                    {view === "result" && (
                        <ResultPage
                            result={result}
                            onBack={() => setView("form")}
                            roleName={roleName}
                            isDarkMode={isDarkMode}
                        />
                    )}
                </div>
            </main>
        </div>
    );
}

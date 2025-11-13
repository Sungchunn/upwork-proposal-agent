export function getTheme(isDark) {
    const background = isDark ? "#000000" : "#f9fafb";
    const cardBg = isDark ? "#0a0a0a" : "#ffffff";
    const border = isDark ? "#1f1f1f" : "#e5e7eb";

    return {
        textPrimary: isDark ? "#f9fafb" : "#111827",
        textSecondary: isDark ? "#9ca3af" : "#6b7280",
        background,
        cardBackground: cardBg,
        borderColor: border,
        diagramBackground: cardBg,

        page: {
            fontFamily:
                "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            background,
            minHeight: "100vh",
            color: isDark ? "#f9fafb" : "#111827",
            margin: 0,
            padding: 0,
        },

        header: {
            position: "sticky",
            top: 0,
            zIndex: 20,
            borderBottom: `1px solid ${border}`,
            backdropFilter: "blur(10px)",
            background: isDark
                ? "rgba(0,0,0,0.96)"
                : "rgba(249,250,251,0.96)",
        },

        headerInner: {
            margin: "0 auto",
            maxWidth: 1120,
            padding: "16px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
        },

        logoRow: {
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 4,
        },
        logoDot: {
            width: 18,
            height: 18,
            borderRadius: "999px",
            background: "linear-gradient(135deg,#4f46e5,#a855f7)",
            boxShadow: "0 0 0 2px rgba(79,70,229,0.35)",
        },
        logoText: {
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: 0.04,
            textTransform: "uppercase",
            color: isDark ? "#c7d2fe" : "#4f46e5",
        },
        badge: {
            fontSize: 11,
            padding: "2px 8px",
            borderRadius: 999,
            border: `1px solid ${isDark ? "#2a2a2a" : "#d1d5db"}`,
            color: isDark ? "#9ca3af" : "#6b7280",
            background: isDark ? "#0a0a0a" : "#f9fafb",
        },

        title: {
            margin: 0,
            fontSize: 22,
            fontWeight: 650,
            color: isDark ? "#f9fafb" : "#0f172a",
        },
        subtitle: {
            margin: 0,
            marginTop: 4,
            fontSize: 14,
            color: isDark ? "#9ca3af" : "#6b7280",
            maxWidth: 640,
        },

        modeHint: {
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontSize: 12,
            color: isDark ? "#9ca3af" : "#6b7280",
            whiteSpace: "nowrap",
        },
        modeDot: {
            width: 8,
            height: 8,
            borderRadius: 999,
        },
        modeText: { fontSize: 12 },

        main: {
            padding: "24px 16px 40px",
            display: "flex",
            justifyContent: "center",
            background,
        },
        layout: {
            width: "100%",
            maxWidth: 1120,
            display: "flex",
            flexDirection: "column",
            gap: 20,
        },

        card: {
            background: cardBg,
            border: `1px solid ${border}`,
            borderRadius: 16,
            padding: 20,
            boxShadow: isDark
                ? "0 18px 45px rgba(0,0,0,0.65)"
                : "0 18px 45px rgba(15,23,42,0.12)",
            width: "100%",
        },

        cardHeaderRow: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 16,
            marginBottom: 16,
        },

        h2: {
            margin: 0,
            fontSize: 18,
            fontWeight: 600,
            color: isDark ? "#e5e7eb" : "#111827",
        },
        cardSubtitle: {
            marginTop: 6,
            marginBottom: 0,
            fontSize: 13,
            color: isDark ? "#9ca3af" : "#6b7280",
        },

        formGrid: {
            display: "grid",
            gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1.2fr)",
            gap: 20,
        },
        formColumn: { display: "flex", flexDirection: "column" },

        sidePanel: {
            borderRadius: 14,
            border: `1px dashed ${isDark ? "#2a2a2a" : "#d1d5db"}`,
            padding: 14,
            background: isDark ? "#0a0a0a" : "#f9fafb",
        },
        sideTitle: {
            fontSize: 13,
            fontWeight: 600,
            marginBottom: 8,
            color: isDark ? "#e5e7eb" : "#111827",
        },
        sideList: {
            margin: 0,
            paddingLeft: 18,
            fontSize: 13,
            color: isDark ? "#9ca3af" : "#4b5563",
        },
        sideItem: { marginBottom: 6, lineHeight: 1.5 },
        sideHintBox: {
            marginTop: 12,
            padding: 10,
            borderRadius: 10,
            background: isDark ? "#0a0a0a" : "#eef2ff",
            border: `1px solid ${isDark ? "#1e1e1e" : "#c7d2fe"}`,
        },
        sideHintLabel: {
            fontSize: 12,
            fontWeight: 600,
            color: isDark ? "#c7d2fe" : "#4338ca",
            marginBottom: 4,
        },
        sideHintBody: {
            fontSize: 12,
            color: isDark ? "#e5e7eb" : "#1f2937",
            lineHeight: 1.5,
        },

        label: {
            display: "block",
            fontSize: 13,
            marginTop: 4,
            marginBottom: 4,
            color: isDark ? "#e5e7eb" : "#111827",
            fontWeight: 500,
        },
        input: {
            width: "100%",
            borderRadius: 10,
            padding: "9px 11px",
            fontSize: 14,
            border: `1px solid ${isDark ? "#2a2a2a" : "#d1d5db"}`,
            background: isDark ? "#0a0a0a" : "#ffffff",
            color: isDark ? "#f9fafb" : "#111827",
            marginBottom: 8,
            outline: "none",
        },
        textarea: {
            width: "100%",
            borderRadius: 10,
            padding: "9px 11px",
            minHeight: 160,
            resize: "vertical",
            fontFamily: "inherit",
            fontSize: 14,
            border: `1px solid ${isDark ? "#2a2a2a" : "#d1d5db"}`,
            background: isDark ? "#0a0a0a" : "#ffffff",
            color: isDark ? "#f9fafb" : "#111827",
            marginBottom: 10,
            outline: "none",
        },

        buttonPrimary: {
            marginTop: 6,
            background: "linear-gradient(135deg, #4f46e5, #6366f1)",
            color: "#ffffff",
            border: "none",
            borderRadius: 999,
            padding: "9px 16px",
            fontWeight: 600,
            fontSize: 14,
            boxShadow: "0 10px 30px rgba(79,70,229,0.50)",
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
        },

        buttonGhost: {
            background: "transparent",
            color: isDark ? "#c7d2fe" : "#4f46e5",
            borderRadius: 999,
            border: `1px solid ${isDark ? "#3a3a3a" : "#c7d2fe"}`,
            padding: "7px 12px",
            fontSize: 13,
            fontWeight: 500,
            cursor: "pointer",
        },

        error: {
            background: isDark ? "#7f1d1d" : "#fef2f2",
            color: isDark ? "#fecaca" : "#991b1b",
            border: isDark ? "1px solid #991b1b" : "1px solid #fecaca",
            borderRadius: 10,
            padding: 10,
            marginTop: 4,
            marginBottom: 8,
            fontSize: 13,
        },

        pre: {
            background: isDark ? "#0a0a0a" : "#0f172a",
            borderRadius: 10,
            padding: 12,
            fontSize: 12,
            maxHeight: 280,
            overflow: "auto",
            whiteSpace: "pre-wrap",
            color: "#e5e7eb",
            border: `1px solid ${isDark ? border : "#111827"}`,
        },

        resultPreview: {
            marginTop: 20,
            borderTop: `1px solid ${border}`,
            paddingTop: 16,
        },
        previewHeader: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            marginBottom: 8,
        },
        previewLabel: {
            fontSize: 12,
            textTransform: "uppercase",
            letterSpacing: 0.08,
            color: isDark ? "#9ca3af" : "#6b7280",
            fontWeight: 600,
        },
        details: {
            marginTop: 6,
            fontSize: 12,
            color: isDark ? "#9ca3af" : "#4b5563",
        },
        detailsSummary: { cursor: "pointer", marginBottom: 6 },

        resultHeaderRow: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 16,
            marginBottom: 8,
        },
        targetRole: {
            marginTop: 6,
            display: "flex",
            alignItems: "baseline",
            gap: 6,
            fontSize: 13,
        },
        targetLabel: { color: isDark ? "#9ca3af" : "#6b7280" },
        targetValue: {
            color: isDark ? "#e5e7eb" : "#111827",
            fontWeight: 500,
        },

        resultGrid: {
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
            gap: 20,
            marginTop: 12,
        },

        sectionBlock: {
            marginTop: 18,
            paddingTop: 14,
            borderTop: `1px solid ${border}`,
        },
        sectionTitle: {
            margin: 0,
            marginBottom: 6,
            fontSize: 15,
            fontWeight: 600,
            color: isDark ? "#f9fafb" : "#111827",
        },
        sectionBody: {
            fontSize: 14,
            color: isDark ? "#e5e7eb" : "#111827",
        },
        sectionNote: {
            fontSize: 12,
            color: isDark ? "#9ca3af" : "#6b7280",
            marginTop: 2,
            marginBottom: 10,
        },

        list: {
            margin: 0,
            paddingLeft: 18,
            fontSize: 14,
            color: isDark ? "#e5e7eb" : "#111827",
        },
        listItem: { marginBottom: 6, lineHeight: 1.5 },

        codeBlock: {
            marginTop: 8,
            background: isDark ? "#0a0a0a" : "#0f172a",
            color: "#e5e7eb",
            borderRadius: 10,
            padding: 12,
            fontSize: 12,
            overflowX: "auto",
            whiteSpace: "pre",
            border: `1px solid ${isDark ? border : "#111827"}`,
        },
        copyButton: {
            position: "absolute",
            top: 8,
            right: 8,
            background: "#4f46e5",
            color: "white",
            border: "none",
            borderRadius: 999,
            padding: "5px 10px",
            fontSize: 11,
            fontWeight: 500,
            cursor: "pointer",
        },
        diagramTitle: {
            fontSize: 13,
            color: isDark ? "#9ca3af" : "#6b7280",
            margin: 0,
            marginBottom: 6,
        },
        diagramContainer: {
            background: cardBg,
            border: `1px solid ${border}`,
            borderRadius: 12,
            padding: 16,
            display: "flex",
            justifyContent: "center",
            overflowX: "auto",
        },

        calloutBox: {
            marginTop: 12,
            padding: 12,
            borderRadius: 10,
            border: `1px solid ${isDark ? "#16a34a" : "#22c55e"}`,
            background: isDark ? "rgba(21,128,61,0.12)" : "rgba(34,197,94,0.06)",
            fontSize: 14,
            color: isDark ? "#bbf7d0" : "#166534",
        },
    };
}

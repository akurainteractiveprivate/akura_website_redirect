"use client";

import React, { useEffect, useState } from "react";

interface RedirectViewProps {
  subpath?: string;
}

const TARGET_DOMAIN = "https://akurainteractive.dpdns.org";

export default function RedirectView({ subpath = "" }: RedirectViewProps) {
  const [targetUrl, setTargetUrl] = useState(`${TARGET_DOMAIN}${subpath}`);
  const [secondsLeft, setSecondsLeft] = useState(2);

  useEffect(() => {
    // Preserve current browser pathname and search params if available
    if (typeof window !== "undefined") {
      const fullPath = window.location.pathname + window.location.search;
      const cleanPath = fullPath.startsWith("/") ? fullPath : `/${fullPath}`;
      const destination = `${TARGET_DOMAIN}${cleanPath}`;
      setTargetUrl(destination);

      // Instant redirection via window.location.replace (replaces browser history entry)
      const timer = setTimeout(() => {
        window.location.replace(destination);
      }, 500);

      // Visual countdown timer
      const interval = setInterval(() => {
        setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);

      return () => {
        clearTimeout(timer);
        clearInterval(interval);
      };
    }
  }, [subpath]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${TARGET_DOMAIN}/#website`,
        url: TARGET_DOMAIN,
        name: "Akura Interactive",
        description:
          "Official interactive entertainment studio and developer of Tongue Twister: Frog Puzzle and FlapRush3D.",
      },
      {
        "@type": "Organization",
        "@id": `${TARGET_DOMAIN}/#organization`,
        name: "Akura Interactive",
        url: TARGET_DOMAIN,
        logo: `${TARGET_DOMAIN}/logo.svg`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main
        style={{
          maxWidth: "600px",
          width: "90%",
          padding: "32px 24px",
          backgroundColor: "#18181b",
          border: "1px solid #27272a",
          borderRadius: "16px",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7)",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Cyberpunk accent lines */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "3px",
            background: "linear-gradient(90deg, #dc2626, #ef4444, #b91c1c)",
          }}
        />

        {/* Studio Badge */}
        <div
          style={{
            display: "inline-block",
            fontSize: "11px",
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            color: "#ef4444",
            backgroundColor: "rgba(220, 38, 38, 0.12)",
            border: "1px solid rgba(220, 38, 38, 0.3)",
            padding: "4px 12px",
            borderRadius: "9999px",
            marginBottom: "20px",
          }}
        >
          HTTP 301 Permanent Domain Migration
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: "26px",
            fontWeight: 900,
            color: "#ffffff",
            letterSpacing: "-0.03em",
            margin: "0 0 12px 0",
            textTransform: "uppercase",
          }}
        >
          Akura Interactive Has Moved
        </h1>

        {/* Subtext */}
        <p
          style={{
            fontSize: "14px",
            lineHeight: "1.6",
            color: "#a1a1aa",
            margin: "0 0 24px 0",
          }}
        >
          Our official digital studio has permanently relocated to{" "}
          <strong style={{ color: "#ffffff" }}>akurainteractive.dpdns.org</strong>.
          Search engines, rankings, and visitors are automatically forwarded to
          our new primary domain.
        </p>

        {/* Destination preview box */}
        <div
          style={{
            backgroundColor: "#09090b",
            border: "1px solid #27272a",
            borderRadius: "8px",
            padding: "12px 16px",
            marginBottom: "24px",
            fontSize: "13px",
            fontFamily: "monospace",
            color: "#f87171",
            wordBreak: "break-all",
          }}
        >
          {targetUrl}
        </div>

        {/* Action button */}
        <a
          href={targetUrl}
          style={{
            display: "inline-block",
            width: "100%",
            boxSizing: "border-box",
            backgroundColor: "#dc2626",
            color: "#ffffff",
            padding: "14px 20px",
            borderRadius: "8px",
            fontWeight: 700,
            fontSize: "14px",
            textDecoration: "none",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            transition: "background-color 0.2s ease",
            marginBottom: "16px",
          }}
        >
          Proceed to New Site ({secondsLeft}s) &rarr;
        </a>

        <div
          style={{
            fontSize: "12px",
            color: "#71717a",
          }}
        >
          Automatic 301 redirection active. If not redirected, click the button above.
        </div>
      </main>
    </>
  );
}

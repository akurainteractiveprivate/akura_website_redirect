import type { Metadata } from "next";

const TARGET_DOMAIN = (
  process.env.TARGET_DOMAIN || "https://akurainteractive.dpdns.org"
).replace(/\/$/, "");

export const metadata: Metadata = {
  metadataBase: new URL(TARGET_DOMAIN),
  title: "Akura Interactive | Site Moved Permanently",
  description: `Akura Interactive has permanently migrated to ${TARGET_DOMAIN}. You are being redirected automatically.`,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
    },
  },
  alternates: {
    canonical: TARGET_DOMAIN,
  },
  other: {
    "http-equiv": "refresh",
    content: `0;url=${TARGET_DOMAIN}`,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta httpEquiv="refresh" content={`0;url=${TARGET_DOMAIN}`} />
        <link rel="canonical" href={TARGET_DOMAIN} />
      </head>
      <body
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: "#09090b",
          color: "#d4d4d8",
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </body>
    </html>
  );
}

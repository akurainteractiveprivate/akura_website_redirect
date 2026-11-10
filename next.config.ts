import type { NextConfig } from "next";

const TARGET_DOMAIN = (
  process.env.TARGET_DOMAIN || "https://akurainteractive.dpdns.org"
).replace(/\/$/, "");

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        destination: `${TARGET_DOMAIN}/:path*`,
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "index, follow",
          },
          {
            key: "Link",
            value: `<${TARGET_DOMAIN}/:path*>; rel="canonical"`,
          },
        ],
      },
    ];
  },
};

export default nextConfig;

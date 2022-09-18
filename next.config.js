/** @type {import('next').NextConfig} */
const { withContentlayer } = require("next-contentlayer");

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  experimental: {
    newNextLinkBehavior: true,
  },
  i18n: {
    localeDetection: true,
    locales: ["en-US", "pt-BR"],
    defaultLocale: "en-US",
  },
};

module.exports = withContentlayer({ nextConfig });

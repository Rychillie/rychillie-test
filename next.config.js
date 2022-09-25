const { withContentlayer } = require("next-contentlayer");

/**
 * @type {import('next').NextConfig}
 */
module.exports = withContentlayer({
  reactStrictMode: false,
  swcMinify: true,
  reactStrictMode: true,
  images: {
    domains: [
      "rychillie-net-git-feat-og-image-rychillie.vercel.app",
      "0759m6-3000.preview.csb.app",
    ],
  },
  i18n: {
    localeDetection: true,
    locales: ["en-US", "pt-BR"],
    defaultLocale: "en-US",
  },
  experimental: {
    legacyBrowsers: false,
    browsersListForSwc: true,
    newNextLinkBehavior: true,
  },
});

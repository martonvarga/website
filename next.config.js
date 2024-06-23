/** @type {import('next').NextConfig} */

const { i18n } = require("./next-i18next.config");

const nextConfig = {
  output: "export",
  reactStrictMode: true,
};

module.exports = nextConfig;

module.exports = {
  i18n,
};

// export default nextConfig;

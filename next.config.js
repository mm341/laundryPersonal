/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["en", "ar"],
    defaultLocale: "en",
  },
  images: {
    domains: ["laundrydashboard.otloob.net", "localhost"], //Domain of image host
  },
  // /app/public
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "laundrydashboard.otloob.net",
        port: "",
        pathname: "/**",
      },
    ],
    // loader: 'akamai',
    // unoptimized: true,
    // loader: "custom",
    // loaderFile: "./src/imageloader.js",
  },
};

module.exports = nextConfig;

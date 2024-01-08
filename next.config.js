/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["en", "ar"],
    defaultLocale: "en",
  },
  images: {
    domains: ["adminlaundry.razinsoft.com", "localhost"], //Domain of image host
  },
  // /app/public
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "adminlaundry.razinsoft.com",
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

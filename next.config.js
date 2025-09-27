/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    compiler: {
        styledComponents: true,
    },
    images: {
        remotePatterns: [
            // {
            //   protocol: 'https',
            //   hostname: 'images.unsplash.com'
            // },
        ],
        unoptimized: true, // Wichtig für statischen Export
    },
    output: "export", // Aktiviert statischen Export
    trailingSlash: true, // URLs enden mit /
};

module.exports = nextConfig;

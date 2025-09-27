/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
<<<<<<< HEAD
    swcMinify: true,
=======
>>>>>>> refs/remotes/origin/main
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
<<<<<<< HEAD
        unoptimized: true, // Wichtig für statischen Export
    },
    output: "export", // Aktiviert statischen Export
    trailingSlash: true, // URLs enden mit /
=======
    },
>>>>>>> refs/remotes/origin/main
};

module.exports = nextConfig;

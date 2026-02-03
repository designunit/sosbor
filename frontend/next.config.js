const BACKEND_URL = process.env.BACKEND_URL ?? ""

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    output: 'standalone',
    async redirects() {
        return [
            {
                source: '/media/:path*',
                destination: `${BACKEND_URL}/media/:path*`,
                permanent: true,
            },
        ]
    },
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: `${BACKEND_URL}/api/:path*`,
            },
        ]
    },
}

export default nextConfig
